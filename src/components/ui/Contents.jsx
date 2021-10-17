import React from 'react';
import Slide from '@material-ui/core/Slide';
import { steps } from '../../constants';
import { useStore } from '../../customHooks';

export const Contents = () => {
  const { activeStep, prevActiveStep } = useStore();

  const currentStep = steps[activeStep] || {};
  const component = (
    <div className="contents">
      {currentStep.icon && (
        <img src={currentStep.icon} style={{ width: '40%', opacity: 0.4, marginBottom: '3rem' }} alt="icon" />
      )}
      {React.createElement(currentStep.component)}
    </div>
  );

  return prevActiveStep === undefined ? (
    component
  ) : (
    <Slide key={activeStep} direction={activeStep > prevActiveStep ? 'left' : 'right'} in mountOnEnter unmountOnExit>
      {component}
    </Slide>
  );
};
