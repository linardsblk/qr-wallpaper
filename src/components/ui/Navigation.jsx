import React from 'react';
import { Button } from '@material-ui/core';
import { steps } from '../../constants';
import { useStore } from '../../customHooks';

export const Navigation = () => {
  const { activeStep } = useStore();

  const stepObj = steps[activeStep] || {};

  const buttonDisabled = stepObj.validation && !stepObj.validation();

  return (
    <div className="navigation">
      {stepObj.backAction && (
        <Button disabled={activeStep === 0} onClick={stepObj.backAction}>
          Back
        </Button>
      )}

      <Button variant="contained" color="primary" onClick={stepObj.forwardAction} disabled={buttonDisabled}>
        {stepObj.forwardLabel || 'Next'}
      </Button>
    </div>
  );
};
