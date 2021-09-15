import React from 'react';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import { useStore } from '../customHooks';
import { steps } from '../constants';

export const Contents = () => {
  const { activeStep, prevActiveStep } = useStore();

  const component = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      style={{ minHeight: '15rem', flexGap: '5rem', marginRight: '5rem', marginLeft: '5rem' }}
    >
      {React.createElement(steps[activeStep]?.component)}
    </Box>
  );

  return prevActiveStep === undefined ? (
    component
  ) : (
    <Slide key={activeStep} direction={activeStep > prevActiveStep ? 'left' : 'right'} in mountOnEnter unmountOnExit>
      {component}
    </Slide>
  );
};
