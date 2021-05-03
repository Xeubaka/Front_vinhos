import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './theme/';
import Home from './pages/Home/';
import Cart from './pages/Cart';
import Register from './pages/Register';

const useStyles = makeStyles ({
  app: {
    background: '#f9f9f9',
  }
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
      <BrowserRouter>
        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<h1>Not Found; 404!</h1>} />
        </Routes>
      </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
