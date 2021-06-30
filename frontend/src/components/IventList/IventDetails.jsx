import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Card,
  CardActions,
  Button,
  Container,
  Box,
} from "@material-ui/core";
import moment from "moment";
import localization from "moment/locale/ru";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import WeatherForItem from "../Weather/WeatherForItem.jsx";
import PendingPassenger from "../UserDetail/PendingPassenger";
import AcceptedPassenger from "../UserDetail/AcceptedPassenger";

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
    maxWidth: "600px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  wordDescript: {
    wordBreak: "break-all",
  },
  cardMedia: {
    paddingTop: "20%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  userconteiner: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
  },
}));

export default function IventDetails() {
  const { id } = useParams();
  const ivents = useSelector((state) => state.ivents);
  const curIvent = ivents.find((el) => el._id === id);

  const classes = useStyles();
  console.log("passengers", curIvent.passengers);
  const curDate = moment(curIvent.dateOfEvent)
    .locale("ru", localization)
    .format("MMMM Do YYYY, h:mm:ss");
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={7}>
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
                <b>Место проведения:</b> {curIvent.coords[0]}{" "}
                {curIvent.coords[1]}
              </Typography>
              <Typography gutterBottom component="h6">
                <b>Количество участников:</b> 1
              </Typography>{" "}
              <Typography gutterBottom component="h6">
                {/* <b>Место проведения:</b> {el.coords[0]} {el.coords[1]} */}
              </Typography>
              <Typography className={classes.wordDescript}>
                {/* Описание:{el.description} */}
              </Typography>
              <Box>
                <WeatherForItem weather={curIvent.currentWeather} />
              </Box>
            </CardContent>
            <CardActions className={classes.card}>
              {/* <Button size="small" color="primary">
              Редактировать
            </Button> */}
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs={5}>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
              >
                <Grid item xs={12}>
                  {" "}
                  <Typography className={classes.wordDescript}>
                    Ожидают:
                  </Typography>
                  {curIvent.passengerPending.length !== 0 ? (
                    curIvent.passengerPending.map((pas) => (
                      <PendingPassenger passenger={pas} />
                    ))
                  ) : (
                    <p>пока пусто </p>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
              >
                <Grid item xs={12}>
                  {" "}
                  <Typography className={classes.wordDescript}>
                    Одобренные:
                  </Typography>
                  {curIvent.passengerAccepted.length !== 0 ? (
                    curIvent.passengerAccepted.map((pas) => (
                      <AcceptedPassenger passenger={curIvent.passengers[0]} />
                    ))
                  ) : (
                    <h3>пока никто не одобрен </h3>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
