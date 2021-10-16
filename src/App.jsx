import { Container } from '@material-ui/core';
import React from 'react';
import { Contents, Navigation, Stepper } from './components/ui';

const App = () => {
  return (
    <Container className="app" maxWidth="sm">
      <Stepper />
      <Contents />
      <Navigation />
    </Container>
  );
};

export default App;
