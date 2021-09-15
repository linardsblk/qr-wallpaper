import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { TwitterPicker } from 'react-color';
import { useStore } from '../../customHooks';
import { Or } from './Or';

export const ChooseBackground = () => {
  const { increaseActiveStep, backgroundImage, setBackgroundImage, backgroundColor, setBackgroundColor } = useStore();

  const handleChange = (e) => {
    console.log(e);
    if (e.target.files.length) {
      setBackgroundImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      increaseActiveStep();
    }
  };

  if (backgroundImage.preview) {
    return (
      <>
        <img
          style={{ maxWidth: '100%', height: 'auto', marginBottom: '3rem' }}
          src={backgroundImage.preview}
          alt="Uploaded"
        ></img>
        <Button variant="outlined" color="secondary" onClick={() => setBackgroundImage({})}>
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
          colors={[
            '#000000',
            '#FFFFFF',
            '#FF6900',
            '#FCB900',
            '#7BDCB5',
            '#00D084',
            '#8ED1FC',
            '#0693E3',
            '#ABB8C3',
            '#EB144C',
          ]}
        >
          Pick a background color
        </TwitterPicker>
      </div>
      <Or />
      <Button variant="contained" color="primary" component="label">
        Upload image
        <input accept="image/*" style={{ display: 'none' }} id="upload-image" type="file" onChange={handleChange} />
      </Button>
    </>
  );
};
