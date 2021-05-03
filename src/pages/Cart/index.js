import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import Header from '../../components/header/';
import Content from './components/content.js';

const useStyles = makeStyles( (theme) => ({
    form: {
        height: '50vh'
    },
    img: {
        maxHeight: '40px'
    },
    avatar: {
        color: theme.palette.getContrastText(theme.palette.menuBar.dark),
        backgroundColor: theme.palette.menuBar.dark
    },
    paper: theme.paper,
    main: theme.main,
    content: theme.content(theme)
}));


function Cart() {
    const classes = useStyles();
    return(
        <div className={classes.paper}>
            <Header/>
            <main className={classes.main}>
                <Container maxWidth='lg'>
                    <Box m={2}>
                        <Paper className={classes.content}>
                            <Content classes />
                        </Paper>
                    </Box>
                </Container>
            </main>
        </div>    
    )
}

export default Cart;