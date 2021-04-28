import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2), // 8*2
        width: 800
    }
}));

function Content(){
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <ListSubheader>Carrinho</ListSubheader>
        </Paper>
    );
}

export default Content;