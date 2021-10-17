import React, { useState } from 'react';
import { Button, ButtonGroup, TextField, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PublishIcon from '@material-ui/icons/Publish';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { useStore } from '../../../customHooks';
import { Or } from '../Or';
import { readQrCode } from './functions';

export const InputQR = () => {
  const { qrContent, setQrContent, setActiveStep } = useStore();
  const [error, setError] = useState();

  const handleChange = (event) => {
    setQrContent(event.target.value);
    if (error) {
      setError(null);
    }
  };

  const onInputChange = (e) => {
    const fr = new FileReader();
    setError(null);
    fr.onload = () =>
      readQrCode(fr.result, (code) => {
        if (code?.data) {
          setQrContent(code?.data);
          setActiveStep(1);
        } else {
          setError('Could not find QR data in image');
        }
      });
    fr.readAsDataURL(e.currentTarget.files[0]);
    e.target.value = null;
  };

  return (
    <>
      <TextField id="standard-basic" label="Input QR content" value={qrContent} onChange={handleChange} />
      <Or />
      <ButtonGroup color="primary" aria-label="outlined primary button group" orientation="vertical">
        <Button endIcon={<PublishIcon />} component="label">
          Upload image with QR
          <input accept="image/*" style={{ display: 'none' }} type="file" onChange={onInputChange} />
        </Button>
        <Button disabled endIcon={<CropFreeIcon />}>
          Scan QR code
        </Button>
      </ButtonGroup>

      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)}>
        <Alert elevation={6} variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
