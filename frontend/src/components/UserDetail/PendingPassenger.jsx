import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  // CardMedia,
  CardContent,
  Typography,
  Card,
  CardActions,
  Button,
} from "@material-ui/core";
// import moment from "moment";
// import localization from "moment/locale/ru";
// import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    maxWidth: 250,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    "& .MuiButtonBase-root": {
      fontSize: "14px",
    },
    "& .MuiTypography-root": {
      fontSize: "14px",
    },
  },
  wordDescript: {
    wordBreak: "break-all",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function PendingPassenger({ passenger }) {
  console.log("passenger ------------> ", passenger);

  const classes = useStyles();

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography>
            Пользователь<b> {passenger.nickName}</b> хочет полетать
          </Typography>{" "}
          <Typography>
            <b>Вес:</b> {passenger.weight} кг.
          </Typography>
        </CardContent>
        <CardActions className={classes.card}>
          <Button size="small" color="primary">
            Принять заявку
          </Button>
          <Button size="small" color="secondary">
            Отклонить заявку
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
