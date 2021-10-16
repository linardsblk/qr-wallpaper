import Jimp from 'jimp/es';
import { AwesomeQR } from 'awesome-qr';

const roundCorners = (img, radius) => {
  img.scanQuiet(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
    const a = img.bitmap.width / 2;
    const b = img.bitmap.height / 2;

    const _x = x - a;
    const _y = y - b;

    const cr = radius;

    const modX = _x >= 0 ? _x : -_x;
    const modY = _y >= 0 ? _y : -_y;

    const xres = modX < a - cr ? 0 : Math.pow((modX - (a - cr)) / cr, 2);
    const yres = modY < b - cr ? 0 : Math.pow((modY - (b - cr)) / cr, 2);
    const res = xres + yres;

    img.bitmap.data[idx + 3] = res > 1 ? 0 : 255;
  });

  return img;
};

export const generateImage = async ({
  backgroundColor,
  backgroundImage,
  qrContent,
  resolution: { width, height },
  callback,
  croppedAreaPixels,
}) => {
  const QR_SIZE = 0.8 * (width > height ? height : width);

  const getBackground = async () => {
    if (backgroundColor) {
      return new Jimp(width, height, backgroundColor);
    }
    if (backgroundImage) {
      return backgroundImage.raw
        .arrayBuffer()
        .then((data) => Jimp.read(data))
        .then((image) =>
          image
            .crop(croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height)
            .resize(width, height)
        );
    }
  };

  const getQRBackground = async (jimpObj) => {
    return jimpObj
      .clone()
      .crop(width / 2 - QR_SIZE / 2, height / 2 - QR_SIZE / 2, QR_SIZE, QR_SIZE)
      .getBase64Async(Jimp.MIME_JPEG);
  };

  const backgroundJimp = await getBackground();

  const qrBackground = await getQRBackground(backgroundJimp);

  new AwesomeQR({
    text: qrContent,
    size: QR_SIZE,
    margin: 20,
    backgroundImage: qrBackground,
    components: {
      data: {
        scale: 1,
      },
      timing: {
        scale: 0.5,
        protectors: true,
      },
      alignment: {
        scale: 0.5,
        protectors: true,
      },
      cornerAlignment: {
        scale: 0.5,
        protectors: true,
      },
    },
  })
    .draw()
    .then((res) => {
      const splitted = res.split(',');
      const [, string] = splitted;

      Jimp.read(Buffer.from(string, 'base64')).then((jimpQr) => {
        roundCorners(jimpQr, 15);

        backgroundJimp
          .blit(jimpQr, width / 2 - QR_SIZE / 2, height / 2 - QR_SIZE / 2)
          .getBase64Async(Jimp.MIME_JPEG)
          .then(callback);
      });
    });
};
