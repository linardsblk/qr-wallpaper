import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useStore } from '../../../customHooks';

export const Crop = ({ src }) => {
  const { resolution, setCroppedAreaPixels } = useStore();
  const [aspect] = useState(resolution.width / resolution.height);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels]
  );

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: 500 }}>
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </>
  );
};
