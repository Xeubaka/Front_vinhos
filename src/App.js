import React from 'react';
import Home from './pages/Home/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles ({
  app: {
    background: '#f9f9f9',
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Home />
    </div>
  );
}

export default App;
