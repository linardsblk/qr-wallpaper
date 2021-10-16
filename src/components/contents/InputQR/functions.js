import jsQR from 'jsqr';

export const readQrCode = (fileReaderResult, callback) => {
  const img = new Image();
  img.src = fileReaderResult;
  img.onload = () => {
    const imgWidth = img.width;
    const imgHeight = img.height;
    const c = document.createElement('canvas');
    c.width = imgWidth;
    c.height = imgHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
    const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
    const code = jsQR(imageData.data, imgWidth, imgHeight);

    callback(code);
  };
};
