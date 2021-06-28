import { useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import MaskedInput from "react-text-mask";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { TextField, Container, Typography, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import moment from "moment";

const useStyles = makeStyles({
  textField: {
    marginBottom: 15,
  },
  divPos: {},
});

const validationSchema = yup.object({
  dateOfEvent: yup
    .string("Дата мероприятия")
    .required("*Дата обязательна для заполнения"),
  description: yup
    .string("Описание мероприятия")
    .required("*Добавьте описание события")
    .typeError("Возраст должен быть цифрой"),
  price: yup
    .number("Укажите цену")
    .max(10000, "Вы ввели слишком большое число, проверьте еще раз")
    .required("* Поле вес обязательно для заполнения")
    .typeError("Убедитесь что вы ввели число"),
  stopList: yup.string().required("* Заполните поле ограничения"),
});

export default function IventCreateForm() {
  const classes = useStyles();
  const date = new Date();

  const formatDate = moment(date).format("YYYY-MM-DD[T]HH:mm");

  const coordForNewIvent = useSelector((state) => state.curentCoords);
  const curWeather = useSelector((state) => state.currentWeather);

  const formik = useFormik({
    initialValues: {
      dateOfEvent: formatDate,
      description: "",
      price: "",
      stopList: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const curData = {
        ...values,
        coords: coordForNewIvent,
        creator: "ID текущего юзера",
        currentWeather: curWeather,
      };
      alert(JSON.stringify(curData, null, 2));
    },
  });

  return (
    <div className={classes.divPos}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h2">
          Конструктор полета:
        </Typography>
        <Typography variant="h5" component="h2">
          Вы хотите создать событие на точке{" "}
          {coordForNewIvent.map((coord) => {
            return (
              <span>
                <b>{coord.toFixed(4)} </b>
              </span>
            );
          })}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            className={classes.textField}
            id="dateOfEvent"
            name="dateOfEvent"
            label="Дата события"
            type="datetime-local"
            // defaultValue="2017-05-24T10:30"
            value={formik.values.dateOfEvent}
            onChange={formik.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            error={
              formik.touched.dateOfEvent && Boolean(formik.errors.dateOfEvent)
            }
            helperText={formik.touched.dateOfEvent && formik.errors.dateOfEvent}
          />

          <TextField
            className={classes.textField}
            fullWidth
            id="price"
            name="price"
            label="Цена"
            type="text"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            className={classes.textField}
            fullWidth
            id="stopList"
            name="stopList"
            label="Ограничения"
            type="text"
            value={formik.values.stopList}
            onChange={formik.handleChange}
            error={formik.touched.stopList && Boolean(formik.errors.stopList)}
            helperText={formik.touched.stopList && formik.errors.stopList}
          />
          <TextField
            className={classes.textField}
            fullWidth
            multiline
            variant="outlined"
            rows={4}
            id="description"
            name="description"
            label="Описание события"
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Button color="textSecondary" variant="contained" type="submit">
            Создать событие
          </Button>
        </form>
      </Container>
    </div>
  );
}
