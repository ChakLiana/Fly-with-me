import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  
  root: {
    flexGrow: 1,
    marginBottom: 5,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBarCompot = () => {
  const classes = useStyles();
  console.log("NavBarCompot render");
  return <div className="NavBarCompot">

<AppBar className={classes.root} position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      News
    </Typography>
    <Button color="inherit">Войти</Button>
    <Button color="inherit">Регистрация</Button>
    <Button color="inherit">Личный кабинет</Button>
    <Button color="inherit">Мои полёты</Button>
    <Button color="inherit">Выйти</Button>
    
  </Toolbar>
</AppBar>
  </div>;
};

export default NavBarCompot;
