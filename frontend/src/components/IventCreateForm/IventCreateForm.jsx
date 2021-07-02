import { useFormik } from "formik";

import * as yup from "yup";
import Button from "@material-ui/core/Button";
import {
  TextField,
  Container,
  Typography,
  InputAdornment,
  Paper,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { iventCreateOnBack } from "../../redux/actions/iventActions";
import moment from "moment";

const useStyles = makeStyles({
  textField: {
    marginBottom: 15,
  },
  divPos: {},
  paper: {
    minWidth: "100%",
    padding: 15,
    height: 600,
  },
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
    .required("* Поле цена обязательно для заполнения")
    .typeError("Убедитесь что вы ввели число"),
  stopList: yup.string().required("* Заполните поле ограничения"),
});

export default function IventCreateForm() {
  const dispatch = useDispatch();

  const classes = useStyles();
  const date = new Date();
  const formatDate = moment(date).format("YYYY-MM-DD[T]HH:mm");

  const curentCoords = useSelector((state) => state.curentCoords);
  const currentWeather = useSelector((state) => state.currentWeather);
  const currentUser = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      dateOfEvent: formatDate,
      description: "",
      price: "",
      stopList: "",
    },
    validationSchema: validationSchema,
    onSubmit: (formValues) => {
      const iventData = {
        ...formValues,
        coords: curentCoords,
        creator: currentUser._id,
        currentWeather: currentWeather,
      };
      dispatch(iventCreateOnBack(iventData));
      formik.resetForm();
    },
  });

  return (
    <div className={classes.divPos}>
      <Paper className={classes.paper}>
        <Typography variant="h6" component="h3">
          Конструктор полета:
        </Typography>
        <Typography>
          координаты:{" "}
          {curentCoords.map((coord) => {
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
            locale="ru"
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
            InputProps={{
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
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
            rows={8}
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
      </Paper>
    </div>
  );
}
