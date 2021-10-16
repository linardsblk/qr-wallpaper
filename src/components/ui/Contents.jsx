import React from 'react';
import Slide from '@material-ui/core/Slide';
import { steps } from '../../constants';
import { useStore } from '../../customHooks';

export const Contents = () => {
  const { activeStep, prevActiveStep } = useStore();

  const component = <div className="contents">{React.createElement(steps[activeStep]?.component)}</div>;

  return prevActiveStep === undefined ? (
    component
  ) : (
    <Slide key={activeStep} direction={activeStep > prevActiveStep ? 'left' : 'right'} in mountOnEnter unmountOnExit>
      {component}
    </Slide>
  );
};
