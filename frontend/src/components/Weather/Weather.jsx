import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { currentWeatherGetFromApi } from '../../redux/actions/currentWeatherAction';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, now, tomorrow, afterTomorrow, inThreeDays) {
  return { name, now, tomorrow, afterTomorrow, inThreeDays };
}

export default function Weather() {
  const dispatch = useDispatch();
  const curentCoords = useSelector((state) => state.curentCoords);
  const currentWeather = useSelector((state) => state.currentWeather);

  useEffect(() => {
    if (curentCoords.length) {
      dispatch(currentWeatherGetFromApi(curentCoords));
    }
  }, [curentCoords]);

  const classes = useStyles();

  // Название строк и содержание ячеек в строках
  const rows = [
    createData('Температура воздуха (\u{00B0}C)', `${currentWeather.todayTemp}`, `${currentWeather.tomorrowTemp}`, `${currentWeather.afterTomorrowTemp}`, `${currentWeather.inThreeDaysTemp}`),
    createData('Сила ветра (м/с)', `${currentWeather.todayWindSpeed}`, `${currentWeather.tomorrowWindSpeed}`, `${currentWeather.afterTomorrowWindSpeed}`, `${currentWeather.inThreeDaysWindSpeed}`),
    createData('Направление ветра', `${currentWeather.todayWindDirection}`, `${currentWeather.tomorrowWindDirection}`, `${currentWeather.afterTomorrowWindDirection}`, `${currentWeather.inThreeDaysWindDirection}`),
    createData('Высота облачной базы (м)', `${currentWeather.todayCloudBaseHeight}`, `${currentWeather.tomorrowCloudBaseHeight}`, `${currentWeather.afterTomorrowCloudBaseHeight}`, `${currentWeather.inThreeDaysCloudBaseHeight}`),
    createData('Вероятность осадков (%)', `${currentWeather.todayPrecipitationProbability}`, `${currentWeather.tomorrowPrecipitationProbability}`, `${currentWeather.afterTomorrowPrecipitationProbability}`, `${currentWeather.inThreeDaysPrecipitationProbability}`),
    createData('Грозовая активность (%)', `${currentWeather.todayThunderstormActivity}`, `${currentWeather.tomorrowThunderstormActivity}`, `${currentWeather.afterTomorrowThunderstormActivity}`, `${currentWeather.inThreeDaysThunderstormActivity}`),
    createData('Облачность (%)', `${currentWeather.todayCloudy}`, `${currentWeather.tomorrowCloudy}`, `${currentWeather.afterTomorrowCloudy}`, `${currentWeather.inThreeDaysCloudy}`),
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
