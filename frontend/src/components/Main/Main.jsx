import YandexMap from "../YandexMap/YandexMap";
import Container from "@material-ui/core/Container";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import UserRegisterForm from "../../Profiles/UserRegisterForm";
import ProfileUser from "../../Profiles/ProfileUser";
import Route from "react-router-dom";
import IventCreateForm from "../IventCreateForm/IventCreateForm";
import Weather from "../Weather/Weather";
import { useSelector } from "react-redux";
import SpringModal from "../IventModal/IventModal";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  right: {
    height: "468.5px",
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 0,
    border: 0,
  },
}));

const Main = () => {
  const currentUser = useSelector((state) => state.user);

  console.log("Main compot render");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <YandexMap />
          </Paper>
        </Grid>

        {currentUser?.role === 'tandem' &&
          <Grid item xs>
            <Paper className={(classes.paper, classes.right)}>
              <IventCreateForm />
            </Paper>
          </Grid>}
      </Grid>
      {currentUser &&
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <Weather />
            </Paper>
          </Grid>
        </Grid>
      }
    </div>

  );
};
export default Main;
