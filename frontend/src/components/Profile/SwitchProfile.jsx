import { Typography, Fade } from "@material-ui/core";
import { useSelector } from "react-redux";
import ProfileTandem from "./ProfileTandem";
import ProfilePassenger from "./ProfilePassenger";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(66, 182, 255, 0.1)",
  },
  textColor: {
    color: "white",
    textAlign: "center",
  },
}));

export default function ProfileSwitches() {
  const curUser = useSelector((state) => state.user);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Fade in={true} timeout={2000}>
            <Typography className={classes.textColor}>
              Добро пожаловать в личный кабинет: <b>{curUser.nickName}</b>
            </Typography>
          </Fade>
          <Grid item xs={12}>
            <Fade in={true} timeout={2000}>
              <Typography className={classes.textColor}>
                Вы выступаете в роли{" "}
                {curUser?.role === "tandem" ? "Пилота" : "Пассажира"}
              </Typography>
            </Fade>
          </Grid>
        </Grid>

        {curUser?.role === "tandem" ? <ProfileTandem /> : <ProfilePassenger />}
      </Grid>
    </div>
  );
}
