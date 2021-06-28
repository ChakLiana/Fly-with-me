import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { useDispatch, useSelector } from "react-redux";
// import { editSquareThunk } from "../../redux/actions/tictac";
import { Grid, Paper, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  span: {
    fontSize: 20,
  },
  root: {
    margin: "0 auto",
    minWidth: 275,
    maxWidth: 800,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bullet: {
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 16,
    marginBottom: 16,
  },
});

export default function ProfilePassenger() {
  const curUser = useSelector((state) => state.user);
  const classes = useStyles();
  const history = useHistory();
  // const bull = <span className={classes.bullet}>•</span>;

  function handleClick() {
    history.push("/");
  }
  return (
    <>
      <Grid justify-center>
        <Grid item>
          <Typography variant="h5" component="h2">
            Личный кабинет пользователя
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography> </Typography>
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.pos} color="textSecondary">
                Почтовый адрес:
              </Typography>
              <Typography
                className={classes.pos}
                component="span"
                color="textPrimary"
              >
                {curUser.email}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Ник:
              </Typography>
              <Typography
                className={classes.pos}
                component="span"
                color="textPrimary"
              >
                {curUser.nickName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Возраст:
              </Typography>
              <Typography
                className={classes.pos}
                component="span"
                color="textPrimary"
              >
                {curUser.age}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Вес:
              </Typography>
              <Typography
                className={classes.pos}
                component="span"
                color="textPrimary"
              >
                {curUser.weight}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Контакт:
              </Typography>
              <Typography
                className={classes.pos}
                component="span"
                color="textPrimary"
              >
                {curUser.tel}
              </Typography>
              <Typography variant="body2" component="p">
                <br />
                Для редактирования информации о себе нажмите кнопку:
                <br />
                {'"ОТРЕДАКТИРОВАТЬ ДАННЫЕ"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={handleClick} size="big">
                Отредактировать данные
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
