import React from 'react';
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
    { id: 1, name: 'listar vinhos'},
    { id: 2, name: 'cadastrar vinhos'}
]

function MenuBox(){
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return ( 
        <div>
            <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
                <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
            
            {
                list.map((item) => (
                    <MenuItem onClick={handleClose}>
                        {item.name}
                    </MenuItem>
                ))
            }
            </Menu>
        </div>
    )
}

export default MenuBox;