import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';

function ItemCart({ id, name, type, weight, classes }, ref) {


  const [errorMessage, setErrorMessage] = useState('');
  const [openErro, setOpenErro] = React.useState(true);
  const [quantity = 1, setQuantity] = useState(1);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    function validQuantity() {
      if (quantity <= 0 && quantity !== '') {
        setErrorMessage('Quantidade não pode ser negativa');
        setOpenErro(true);
        setQuantity(1);
      }
    }
    validQuantity();
  }, [quantity])

  if (remove !== true) {
    return (
      <div ref={ref} data-id={id} data-name={name} data-type={type} data-weight={weight} data-quantity={quantity}>
        <div>
          {errorMessage &&
            <Collapse in={openErro}>
              <Alert variant="filled" severity='error'
                action={
                  <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpenErro(false); }}>
                    <CloseIcon fontSize="inherit" /></IconButton>
                }>
                {errorMessage}
              </Alert>
            </Collapse>}
        </div>

        <ListItem key={id} className={classes.root} name={'item'}>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
              <Avatar className={classes.avatar}>
                <img src="\images\wine_icon.png" alt='logo' style={{ maxWidth: 20 }} />
              </Avatar>
            </Grid>
            <Grid item>
              <ListItemText primary={name} secondary={'Type: ' + type + ' | Weight: ' + weight + ' kg'} ></ListItemText>
            </Grid>
            <Grid item>
              <TextField label="Quantidade" type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} name="product_quantity" variant="outlined" id={id} size='small' style={{ width: 120 }} />
            </Grid>
            <Grid item>
              <IconButton aria-label="close" color="inherit" size="small" onClick={() => setRemove(true)}>
                <CloseIcon fontSize="inherit" /></IconButton>
            </Grid>
          </Grid>
        </ListItem>
      </div>
    );
  } else {
    return (
      <div></div>
    )
  }
}

const forwaredItemCart = React.forwardRef(ItemCart);

export default forwaredItemCart;