import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Card,
  CardActions,
  Button,
} from "@material-ui/core";
import moment from "moment";
import localization from "moment/locale/ru";
import { iventDeletePassengerOnBack } from "../../redux/actions/iventActions";
import { useDispatch, useSelector } from "react-redux";

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
  },
  wordDescript: {
    wordBreak: "break-all",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function IventPasseng({ el }) {
  const user = useSelector((state) => state.user);
  console.log("user", user);
  const dispatch = useDispatch();
  const deletePassengerHandler = (selectIventId, curUserId) => {
    dispatch(iventDeletePassengerOnBack(selectIventId, curUserId));
  };

  // console.log("element v  ivent", el);

  const classes = useStyles();

  const curDate = moment(el.dateOfEvent)
    .locale("ru", localization)
    .format("MMMM Do YYYY, h:mm:ss a");
  return (
    <Grid item>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom component="h6">
            <b>Дата проведения:</b> {curDate}
          </Typography>{" "}
          <Typography gutterBottom component="h6">
            <b>Место проведения:</b> {el.coords[0]} {el.coords[1]}
          </Typography>
          <Typography className={classes.wordDescript}>
            Описание:{el.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.card}>
          <Button
            onClick={() => deletePassengerHandler(el._id, user._id)}
            size="small"
            color="secondary"
          >
            Удалить
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
