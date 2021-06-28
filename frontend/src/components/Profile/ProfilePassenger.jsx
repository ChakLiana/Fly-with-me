import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { editSquareThunk } from "../../redux/actions/tictac";
import { Grid, Paper, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Dragger from "../Dragger/Drager";
import { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/actions/user.ac";
import { useFormik } from "formik";
import { TextField, Container, Typography, Input } from "@material-ui/core";

const useStyles = makeStyles({
  textField: {
    // marginBottom: 30,
  },
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

const validationSchema = yup.object({
  email: yup
    .string("email")
    .email("Некорректный ввод")
    .required("Поле обязательно для заполнения")
    .typeError("Некорректный ввод"),

  nickName: yup
    .string("Имя")
    .min(4, "Имя должно состоять не менне чем из 5 букв")
    .required("*Имя обязательно для заполнения"),
  age: yup
    .number("Введите  возраст")
    .max(101, "Вы ввели слишком большое число, проверьте еще раз")
    .required("* Поле возраст обязательно для заполнения")
    .typeError("Возраст должен быть цифрой"),
  weight: yup
    .number("Введите Ваш вес")
    .max(200, "Вы ввели слишком большое число, проверьте еще раз")
    .required("* Поле вес обязательно для заполнения")
    .typeError("Убедитесь что вы ввели число"),
  tel: yup
    .string()
    .matches(
      /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      "Неправильно введен номер телефона"
    )

    .required("* Поле вес обязательно для заполнения"),
});

export default function ProfilePassenger() {
  const curUser = useSelector((state) => state.user);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  // const bull = <span className={classes.bullet}>•</span>;

  function handleClick() {
    setIsEdit(true);
    // history.push("/");
  }

  const formik = useFormik({
    initialValues: {
      nickName: curUser.nickName,
      age: curUser.age,
      weight: curUser.weight,
      tel: curUser.tel,
      email: curUser.email,
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      // fetch("http://localhost:8080/user/", {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   // credentials: "include",
      //   body: JSON.stringify(values),
      // });
      console.log("---------------------------> ", values);
      // dispatch(signUp({ ...values, role: "passenger" }, history));
    },
  });

  return (
    <>
      {isEdit ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Grid justify-center>
              <Grid item>
                <Typography variant="h5" component="h2">
                  Форма для редактирования данных
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
                    <Typography
                      className={classes.pos}
                      color="textSecondary"
                    ></Typography>
                    <TextField
                      fullWidth
                      className={classes.textField}
                      id="email"
                      name="email"
                      label="Почтовый адрес:"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />

                    <Typography className={classes.pos} color="textSecondary">
                      Ник:
                    </Typography>

                    <TextField
                      fullWidth
                      className={classes.textField}
                      id="nickName"
                      name="nickName"
                      label="Ваш ник"
                      type="text"
                      value={formik.values.nickName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.nickName &&
                        Boolean(formik.errors.nickName)
                      }
                      helperText={
                        formik.touched.nickName && formik.errors.nickName
                      }
                    />

                    <Typography className={classes.pos} color="textSecondary">
                      Возраст:
                    </Typography>

                    <TextField
                      className={classes.textField}
                      fullWidth
                      id="age"
                      name="age"
                      label="Ваш возраст"
                      type="text"
                      value={formik.values.age}
                      onChange={formik.handleChange}
                      error={formik.touched.age && Boolean(formik.errors.age)}
                      helperText={formik.touched.age && formik.errors.age}
                    />

                    <Typography className={classes.pos} color="textSecondary">
                      Вес:
                    </Typography>

                    <TextField
                      className={classes.textField}
                      fullWidth
                      id="weight"
                      name="weight"
                      label="Ваш вес"
                      type="text"
                      value={formik.values.weight}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.weight && Boolean(formik.errors.weight)
                      }
                      helperText={formik.touched.weight && formik.errors.weight}
                    />

                    <Typography className={classes.pos} color="textSecondary">
                      Контакт:
                    </Typography>

                    <TextField
                      className={classes.textField}
                      fullWidth
                      id="tel"
                      name="tel"
                      label="Контактная информация(телефон)"
                      type="tel"
                      value={formik.values.tel}
                      onChange={formik.handleChange}
                      error={formik.touched.tel && Boolean(formik.errors.tel)}
                      helperText={formik.touched.tel && formik.errors.tel}
                    />

                    <Typography variant="body2" component="p">
                      <br />
                      Для редактирования информации о себе нажмите кнопку:
                      <br />
                      {'"ОТРЕДАКТИРОВАТЬ ДАННЫЕ"'}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button type="submit" size="big" variant="contained">
                      Отредактировать данные
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </form>
        </>
      ) : (
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
          <Dragger />
        </>
      )}
    </>
  );
}
