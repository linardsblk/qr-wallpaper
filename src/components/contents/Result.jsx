import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useStore } from '../../customHooks';
import { generateImage } from '../../functions/generateImage';

export const Result = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  const store = useStore();

  useEffect(() => {
    setLoading(true);
    generateImage({
      ...store,
      callback: (res) => {
        setResult(res);
        setLoading(false);
      },
    });
  }, [store]);

  return loading ? (
    <CircularProgress />
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '100%' }}>
      <img style={{ maxHeight: '100%', marginBottom: '1rem', objectFit: 'contain' }} src={result} alt="Result"></img>
      <a href={result} download="QRWallpaper">
        <Button variant="contained" color="primary" component="label">
          Download image
        </Button>
      </a>
    </div>
  );
};
