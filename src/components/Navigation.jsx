import React from 'react';
import { Button } from '@material-ui/core';
import { useStore } from '../customHooks';
import { steps } from '../constants';

export const Navigation = () => {
  const { activeStep, increaseActiveStep, decreaseActiveStep } = useStore();

  return (
    <div>
      {activeStep !== 0 && (
        <Button disabled={activeStep === 0} onClick={decreaseActiveStep}>
          Back
        </Button>
      )}

      <Button variant="contained" color="primary" onClick={increaseActiveStep}>
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </div>
  );
};
