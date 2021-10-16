import React from 'react';
import { Stepper as StepperComponent, Step, StepLabel } from '@material-ui/core';
import { steps } from '../../constants';
import { useStore } from '../../customHooks';

export const Stepper = () => {
  const { activeStep } = useStore();

  return (
    <div className="stepper">
      <StepperComponent activeStep={activeStep} alternativeLabel>
        {steps.map(({ label }) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </StepperComponent>
    </div>
  );
};
