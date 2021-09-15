import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Contents, Navigation, Stepper } from './components';

const useStyles = makeStyles((theme) => ({
  App: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '90vh',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Stepper />
      <Contents />
      <Navigation />
    </div>
  );
};

export default App;
