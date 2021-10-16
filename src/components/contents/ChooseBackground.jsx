import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { TwitterPicker } from 'react-color';
import { useStore } from '../../customHooks';
import { Or } from './Or';
import { Crop } from './SetResolution/Crop';

export const ChooseBackground = () => {
  const { backgroundImage, setBackgroundImage, backgroundColor, setBackgroundColor } = useStore();

  const handleChange = (e) => {
    if (e.target.files.length) {
      setBackgroundImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  if (backgroundImage.preview) {
    return (
      <>
        <Crop src={backgroundImage.preview} />

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setBackgroundImage({})}
          style={{ marginTop: '3rem' }}
        >
          Clear image
        </Button>
      </>
    );
  }

  return (
    <>
      <div>
        <Typography align="center">Pick a background color</Typography>
        <TwitterPicker
          color={backgroundColor}
          onChange={(color) => setBackgroundColor(color.hex)}
          triangle="hide"
          colors={['#000000', '#FFFFFF', '#7c3f14', '#127022', '#791974', '#00198a', '#be45d6', '#008669', '#686868']}
        >
          Pick a background color
        </TwitterPicker>
      </div>
      <Or />
      <Button variant="contained" color="primary" component="label">
        Upload image
        <input accept="image/*" style={{ display: 'none' }} type="file" onChange={handleChange} />
      </Button>
    </>
  );
};
