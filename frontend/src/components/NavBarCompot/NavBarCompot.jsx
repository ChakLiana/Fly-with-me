import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

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

export default function NavBarCompot() {
  const history = useHistory();
  const classes = useStyles();
  console.log("NavBarCompot render");
  return (
    <div className="NavBarCompot">
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button onClick={() => history.push("/")} color="inherit">
            Войти
          </Button>
          <Button onClick={() => history.push("/signup")} color="inherit">
            Регистрация
          </Button>
          <Button color="inherit">Личный кабинет</Button>
          <Button color="inherit">Мои полёты</Button>

          <Button
            onClick={() => {
              history.push("/");
            }}
            color="inherit"
          >
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
