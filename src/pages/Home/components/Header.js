import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuBox from './MenuBox';

const useStyles = makeStyles ({
    appBar: {
        boxShadow: 'none',
    },
    img: {
        maxHeight: '55px',
    },
    grow: {
        flexGrow: 1
    }
});

function Header(){
    const classes = useStyles();

    return (
        <AppBar position='fixed' color='inherit' className={classes.appBar}>
            <Toolbar>
                <MenuBox/>
                <img src="\images\wine_icon.jpg" alt='logo' className={classes.img}></img>
                <div className={classes.grow}></div>
                <div>
                    <Button color='secondary' variant='contained'>
                        Carrinho 
                    </Button>
                </div>
                {/* <div>
                    <span >   
                        Estudo Front-End, Aplicação de Vinhos
                    </span>
                </div>
                <div>
                    <Button color='primary' variant='contained'>Adicionar Vinho</Button>
                    <span> img1 </span> 
                    <span> img2 </span>
                </div> */}
            </Toolbar>
        </AppBar>
    );
}

export default Header;