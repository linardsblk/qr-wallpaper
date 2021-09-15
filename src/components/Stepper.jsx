import React from 'react';
import { Stepper as StepperComponent, Step, StepLabel } from '@material-ui/core';
import { useStore } from '../customHooks';
import { steps } from '../constants';

export const Stepper = () => {
  const { activeStep } = useStore();

  return (
    <StepperComponent activeStep={activeStep} alternativeLabel>
      {steps.map(({ label }) => {
        return (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </StepperComponent>
  );
};
