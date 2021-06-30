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
    height: 533,
  },
  right: {
    height: 533,
    overflow: "auto",
    maxWidth: "400px",
    margin: "0px auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 0,
    border: 0,
    backgroundColor: "rgba(0, 0,0, 0.5)",
  },
}));

const Main = () => {
  const currentUser = useSelector((state) => state.user);

  console.log("Main compot render");
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Paper className={classes.paper}>
            <YandexMap />
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={2}
      >
        {currentUser && (
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Weather />
            </Paper>
          </Grid>
        )}
        {currentUser?.role === "tandem" && (
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <IventCreateForm />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
export default Main;
