import React from 'react';
import { useNavigate } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';

import MenuBox from './MenuBox';

const useStyles = makeStyles ( (theme) => ({
    appBar: {
        boxShadow: 'none',
        backgroundColor: theme.palette.menuBar.main
    },
    img: {
        maxHeight: '40px',
    },
    grow: {
        flexGrow: 1
    }   
}));

function Header(){
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
                <MenuBox/>
                <IconButton onClick={() => navigate('/')}>
                    <img src="\images\wine_icon.png" alt='logo' className={classes.img} title='home'/>
                </IconButton>
                <div className={classes.grow}/>
                <IconButton onClick={() => navigate('/cart')}>
                    <ShoppingCartIcon color='primary' variant='contained' fontSize='large' titleAccess='carrinho'/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;