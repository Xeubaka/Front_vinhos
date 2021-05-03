import React, { useState, useEffect, useRef, createRef } from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCart from './itemCart';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import WineService from '../../../services/wineService'

function Content(classes) {

    const [openWine, setOpenWine] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [id, setId] = useState('');
    const [wine, setWine] = useState({});
    const [list, setList] = useState([]);
    const [products, setProducts] = useState([]);
    const [subTotal, setSubTotal] = useState('');
    const [distance, setDistance] = useState('');
    const [total, setTotal] = useState('');
    const [itens, setItens] = useState([]);
    let refs = useRef([createRef()]);

    useEffect(() => {
        async function wineList() {
            let itens = await WineService.listWine();
            setList(itens.resposta);
            setId(itens.resposta[0].id);
        }
        wineList();
    }, [])

    useEffect(() => {
        async function getWine(id) {
            let response = await WineService.getWine(id);
            if (response.tipo === 'sucesso') {
                setWine(response.resposta);
            }
        }
        getWine(id);
    }, [id])

    useEffect(() => {
        function validDistance() {
            if (distance <= 0 && distance !== '') {
                setDistance(0);
            }
        }
        validDistance();
    }, [distance])

    function updateLength(value) {
        refs.current = refs.current.splice(0, value);
        for(let i = 0; i< value; i++) {
          refs.current[i] = refs.current[i] || createRef();
        }
        refs.current = refs.current.map((item) => item || createRef());
      }

    const handleClickOpenWine = () => {
        setOpenWine(true);
    };

    const handleCloseWine = () => {
        setOpenWine(false);
    };

    const handleClickOpenEnd = () => {
        itensEnd();
        setOpenEnd(true);
      };
    
      const handleCloseEnd = () => {
        setOpenEnd(false);
      };

    function addItem() {
        handleAdd(wine)
    }

    function handleAdd(wine) {
        const newProducts = products.concat(wine);
        setProducts(newProducts);
        updateLength(products.length + 1);
        calc();
        setWine('');
    }

    function getValidItens() {
        const newRefs = refs.current.filter( (item) => (item.current !== null))
        return newRefs 
    }

    function calc(frete){
        calcSubTotal();
        calcTotal(frete);
    }

    function calcSubTotal() {
        let products = getValidItens();
        let value = products.reduce( (value, item) => value = value + (item.current.dataset.quantity * 5 * item.current.dataset.weight), 0)
        setSubTotal(Number(value).toFixed(2))
    }

    function calcTotal(frete) {
        let products = getValidItens();
        let value = products.reduce( (value, item) => value = value + (item.current.dataset.quantity * 5 * item.current.dataset.weight), 0)
        if (distance > 100 ){
            value = (value*distance)/100
        }
        if (frete > 100){
           value = (value*frete)/100
        }
        setTotal(Number(value).toFixed(2))
    }

    function itensEnd(){
        let products = getValidItens();
        let itens = []
        itens = products.map( (prod, i) => itens[i] = prod.current.dataset)
        setItens(itens)
    }

    function endGame(){
        setProducts([]);
        setSubTotal('');
        setDistance('');
        setTotal('');
        setItens([]);
    }

    return (
        <Grid container className={classes.root} alignItems='stretch' >
            <Grid item md={7}>
                <List>
                    {products.map((item, i) => <ItemCart ref={refs.current[i]} id={item.id} key={i} name={item.Name} type={item.Type} weight={item.Weight} clearText classes />)}
                </List>
                <Fab color="primary" aria-label="add" size='small' title='Adicionar Item' >
                    <AddIcon onClick={handleClickOpenWine} />
                </Fab>
                <Dialog  open={openWine} onClose={handleCloseWine}>
                    <DialogTitle>Selecione o Vinho</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="demo-dialog-native">Vinho</InputLabel>
                                <Select
                                    native
                                    value={id}
                                    onChange={(event) => setId(event.target.value)}
                                    input={<Input id="demo-dialog-native" />}
                                >
                                    {list.map((item) => <option key={item.id} value={item.id} >Vinho: {item.Name} ({item.Type}|{item.Weight}g)</option>)}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseWine} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={() => { handleCloseWine(); addItem(); }} color="primary">
                            Ok
                    </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <hr />
            <Grid item md={4} className={classes.form}>
                <Grid container spacing={1} alignItems='center' justify='center' direction='column'>
                    <Grid item>
                        <TextField label="Sub Total" name="subTotal" id={'subTotal'} value={subTotal} onChange={(event) => { setSubTotal(event.target.value); calc();}} size='small' type="number" InputProps={{ readOnly: true, }} />
                    </Grid>
                    <Grid item>
                        <TextField label="Frete (km)" name="distance" id={'distance'} value={distance} onChange={(event) => { setDistance(event.target.value); calc(event.target.value);}}  size='small' type="number" />
                    </Grid>
                    <Grid item>
                        <TextField label="Total" name="total" id={'total'} value={total} onChange={(event) => { setTotal(event.target.value); calc(); }} size='small' type="number" InputProps={{ readOnly: true, }} />
                    </Grid>
                    <Grid item >
                        <Button variant="contained" color="primary" onClick={() => handleClickOpenEnd()}>
                            Finalizar
                        </Button>
                    </Grid>
                    <Dialog
                        open={openEnd}
                        onClose={handleCloseEnd}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle id="scroll-dialog-title">Pedido</DialogTitle>
                        <DialogContent dividers={true}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            {itens.map( (item) => item.quantity+'x '+item.name+' ('+item.type+'|'+item.weight+'kg)' , ).join('\n')}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseEnd} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={ () => { handleCloseEnd(); endGame();}} color="primary">
                            Confirm
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Content;