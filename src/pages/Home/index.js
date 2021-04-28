import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header';
import Content from './components/Content';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    main: {
        height: '100vh',
        display: 'center',
        margin: '0 auto'
    },
    toolBar: {
        minHeight: 64
    }
});

function Home() {
    const classes = useStyles();

    return ( 
        <div className={classes.root}>
            <Header/>
            <div className={classes.toolBar}></div>
            <main className={classes.main}>
                <Container maxWidth='lg'>
                    <Box>
                        <Content/>
                    </Box>
                </Container>
            </main>
        </div>    
    );
}

export default Home;