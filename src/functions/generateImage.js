import Jimp from 'jimp/es';
import { AwesomeQR } from 'awesome-qr';
import { useEffect, useState } from 'react';
import './App.css';

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

const QR_TEXT = 'https://twitter.com/nedefinets';
const WIDTH = 400;
const QR_SIZE = 0.8 * WIDTH;
const HEIGHT = 900;

const [src, setSrc] = useState();
const [background, setBackground] = useState();
const [qrBackground, setQrBackground] = useState();

useEffect(() => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://picsum.photos/${WIDTH}/${HEIGHT}`);
  xhr.responseType = 'blob';
  xhr.send();
  xhr.addEventListener('load', function () {
    const reader = new FileReader();
    reader.readAsDataURL(xhr.response);
    reader.addEventListener('loadend', () => {
      const splitted = reader.result.split(',');
      const [, string] = splitted;
      Jimp.read(Buffer.from(string, 'base64')).then((jimpObj) => {
        setBackground(jimpObj);
      });

      Jimp.read(Buffer.from(string, 'base64')).then((jimpObj) => {
        jimpObj
          .crop(WIDTH / 2 - QR_SIZE / 2, HEIGHT / 2 - QR_SIZE / 2, QR_SIZE, QR_SIZE)
          .getBase64Async(Jimp.MIME_JPEG)
          .then(setQrBackground);
      });
    });
  });
}, []);

if (background && qrBackground) {
  new AwesomeQR({
    text: QR_TEXT,
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

        background.blit(jimpQr, WIDTH / 2 - QR_SIZE / 2, HEIGHT / 2 - QR_SIZE / 2);
        background.getBase64Async(Jimp.MIME_JPEG).then(setSrc);
      });
    });
}
