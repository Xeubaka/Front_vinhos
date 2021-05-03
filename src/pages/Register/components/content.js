import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import utf8 from 'utf8';

import WineService from '../../../services/wineService'


function Content(classes){
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [weight, setWeight] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSuccess, setOpenSuccess] = React.useState(true);
    const [openErro, setOpenErro] = React.useState(true);
    const data = JSON.stringify({ name, type, weight });
    // let response;

    async function handleRegister(){
        cleanWarnings();
        let message;
        let response = await WineService.createWine(data);
        if (response.tipo === 'erro'){
            message = utf8.decode(response.resposta);
            setErrorMessage(message);
            setOpenSuccess(false);
            setOpenErro(true);
        } else {
            message = 'Registro salvo com sucesso! (Id: ' + response.resposta.id_inserido + ')';
            setSuccessMessage(message);
            setOpenErro(false);
            setOpenSuccess(true);
            cleanFields();
        }
    }
    
    function cleanWarnings(){
        setSuccessMessage(null);
        setOpenSuccess(false);

        setErrorMessage(null);
        setOpenErro(false);
    }

    function cleanFields(){
        setName('');
        setType('');
        setWeight('');
    }
    
    useEffect ( () => {
        function validWeight() {
            if(weight < 0){
                setErrorMessage('Peso não pode ser negativo');
                setOpenErro(true);
                setWeight(0);
            }
        }
        validWeight();
    }, [weight]) 

    return (
        <Grid container className={classes.root} direction='column' alignItems='center' justify='center'>
            <div>
                { errorMessage && 
                    <Collapse in={openErro}>
                        <Alert variant="filled" severity='error'
                        action={
                            <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpenErro(false); }}>
                            <CloseIcon fontSize="inherit" /></IconButton>
                        }>
                        {errorMessage}
                        </Alert> 
                    </Collapse>}
                { successMessage && 
                    <Collapse in={openSuccess}>
                        <Alert variant="filled" severity='success'
                        action={
                            <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpenSuccess(false); }}>
                            <CloseIcon fontSize="inherit" /></IconButton>
                        }>
                        {successMessage}
                        </Alert>
                    </Collapse>}
                </div>
            <Grid item>
                <TextField label="Nome" name="name" id={'name'} value={name} onChange={ (event) => setName(event.target.value)}/>
            </Grid>
            <Grid item>
                <TextField label="Tipo" name="type" id={'type'} value={type} onChange={ (event) => setType(event.target.value)}/>
            </Grid>
            <Grid item>
                <TextField label="Peso (kg)" name="weight" type="number" value={weight} id={'weight'} onChange={ (event) => setWeight(event.target.value)} />
            </Grid>
            <hr/>
            <Grid container direction='row' alignItems='flex-end'>
                <Grid item md={6}></Grid>
                <Grid item md={6}>
                    <Button variant="contained" color="primary" onClick={handleRegister}>
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Content;