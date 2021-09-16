import React from 'react';
import { Button } from '@material-ui/core';
import { steps } from '../../constants';
import { useStore } from '../../customHooks';

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
        {steps[activeStep].forwardLabel || 'Next'}
      </Button>
    </div>
  );
};
