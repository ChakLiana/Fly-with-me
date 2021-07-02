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
import { useDispatch } from "react-redux";
import {
  iventRejectPassengerOnBack,
  iventPendingPassengerOnBack,
} from "../../redux/actions/iventActions";

const useStyles = makeStyles((theme) => ({
  item: { marginBottom: 10 },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: "theme.palette.background.paper",
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
    backgroundColor: "#ADD8E6",
    // width: 200,
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
    flexGrow: 0,
  },
}));

export default function AcceptedPassenger({ currentIventId, passenger }) {
  const dispatch = useDispatch();

  const pendingPasengerHandler = (currentIventId, passengerId) => {
    dispatch(iventPendingPassengerOnBack(currentIventId, passengerId));
  };

  const rejectPasengerHandler = (currentIventId, passengerId) => {
    dispatch(iventRejectPassengerOnBack(currentIventId, passengerId));
  };

  console.log("passenger ------------> ", passenger);

  const classes = useStyles();

  return (
    <Grid item className={classes.item}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography>
            Пользователь<b> {passenger?.nickName}</b> добавлен в полет
          </Typography>{" "}
          <Typography>
            <b>Вес:</b> {passenger?.weight} кг.
          </Typography>
          <Typography>
            <b>Контактная информация:</b> {passenger?.tel} .
          </Typography>
        </CardContent>
        <CardActions className={classes.card}>
          <Button
            onClick={() =>
              pendingPasengerHandler(currentIventId, passenger._id)
            }
            size="small"
            color="default"
          >
            Вернуть в ожидание
          </Button>
          <Button
            onClick={() => rejectPasengerHandler(currentIventId, passenger._id)}
            size="small"
            color="secondary"
          >
            Отклонить заявку
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
