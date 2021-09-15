import React from 'react';
import { Button, ButtonGroup, TextField } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { useStore } from '../../customHooks';
import { Or } from './Or';

export const InputQR = () => {
  const { qrContent, setQrContent } = useStore();

  const handleChange = (event) => {
    setQrContent(event.target.value);
  };

  return (
    <>
      <TextField id="standard-basic" label="Input QR content" value={qrContent} onChange={handleChange} />
      <Or />
      <ButtonGroup color="primary" aria-label="outlined primary button group" orientation="vertical">
        <Button endIcon={<PublishIcon />}>Upload image with QR</Button>
        <Button disabled endIcon={<CropFreeIcon />}>
          Scan QR code
        </Button>
      </ButtonGroup>
    </>
  );
};
