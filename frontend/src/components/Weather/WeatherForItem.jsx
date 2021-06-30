import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { currentWeatherGetFromApi } from "../../redux/actions/currentWeatherAction";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    backgroundColor: "#f8f9ff",
    "& .MuiTableCell-root": {
      color: "#444",
    },
  },
});

function createData(name, now, tomorrow, afterTomorrow, inThreeDays) {
  return { name, now, tomorrow, afterTomorrow, inThreeDays };
}

export default function WeatherForItem({ weather }) {
  const classes = useStyles();
  console.log("pogoda -------------->", weather);

  // Название строк и содержание ячеек в строках
  const rows = [
    createData(
      "Температура воздуха (\u{00B0}C)",
      `${weather.todayTemp}`,
      `${weather.tomorrowTemp}`,
      `${weather.afterTomorrowTemp}`,
      `${weather.inThreeDaysTemp}`
    ),
    createData(
      "Сила ветра (м/с)",
      `${weather.todayWindSpeed}`,
      `${weather.tomorrowWindSpeed}`,
      `${weather.afterTomorrowWindSpeed}`,
      `${weather.inThreeDaysWindSpeed}`
    ),
    createData(
      "Направление ветра",
      `${weather.todayWindDirection}`,
      `${weather.tomorrowWindDirection}`,
      `${weather.afterTomorrowWindDirection}`,
      `${weather.inThreeDaysWindDirection}`
    ),
    createData(
      "Высота облачной базы (м)",
      `${weather.todayCloudBaseHeight}`,
      `${weather.tomorrowCloudBaseHeight}`,
      `${weather.afterTomorrowCloudBaseHeight}`,
      `${weather.inThreeDaysCloudBaseHeight}`
    ),
    createData(
      "Вероятность осадков (%)",
      `${weather.todayPrecipitationProbability}`,
      `${weather.tomorrowPrecipitationProbability}`,
      `${weather.afterTomorrowPrecipitationProbability}`,
      `${weather.inThreeDaysPrecipitationProbability}`
    ),
    createData(
      "Грозовая активность (%)",
      `${weather.todayThunderstormActivity}`,
      `${weather.tomorrowThunderstormActivity}`,
      `${weather.afterTomorrowThunderstormActivity}`,
      `${weather.inThreeDaysThunderstormActivity}`
    ),
    createData(
      "Облачность (%)",
      `${weather.todayCloudy}`,
      `${weather.tomorrowCloudy}`,
      `${weather.afterTomorrowCloudy}`,
      `${weather.inThreeDaysCloudy}`
    ),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* Заголовки */}
            <TableCell>Погодные условия</TableCell>
            <TableCell align="right">Сейчас</TableCell>
            <TableCell align="right">Завтра</TableCell>
            <TableCell align="right">Послезавтра</TableCell>
            <TableCell align="right">Через 3 дня</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.now}</TableCell>
              <TableCell align="right">{row.tomorrow}</TableCell>
              <TableCell align="right">{row.afterTomorrow}</TableCell>
              <TableCell align="right">{row.inThreeDays}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
