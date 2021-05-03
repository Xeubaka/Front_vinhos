import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import Content from './components/content';
import Header from '../../components/header/';

const useStyles = makeStyles( (theme) => ({
    form: {
        height: '50vh'
    }, 
    paper: theme.paper,
    content: theme.content(theme),
    main: theme.main
}));
function Register(){
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Header/>
            <main className={classes.main}>
                <Container maxWidth='lg'>
                    <Box m={2}>
                        <Paper className={classes.content}>
                           <Content classes/>
                        </Paper>
                    </Box>
                </Container>
            </main>
        </div>  
    );
}


export default Register;