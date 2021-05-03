import React from 'react';
import { useNavigate } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles ( (theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    }
}));

const list = [
    { id: 1, name: 'Cadastrar Vinhos', path: '/register'},
    { id: 2, name: 'Carrinho', path: '/cart'}
]

function MenuBox(){
    const classes = useStyles();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [stateMenu, setStateMenu] = React.useState({
        isOpen: false
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setStateMenu({
            isOpen: true
        });
    };
  
    const handleClose = () => {
        setStateMenu({
            isOpen: false
        });
    };

    return ( 
        <div>
            <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu"  onClick={handleClick} title='menu'>
                <MenuIcon aria-controls="simple-menu" aria-haspopup="true" />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={stateMenu.isOpen} onClose={handleClose} >
                {
                    list.map((item) => (
                        <MenuItem key={item.id} onClick={() => navigate(item.path)}>
                            {item.name}
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    )
}

export default MenuBox;