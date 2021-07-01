import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid, Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import Dragger from "../Dragger/Drager";
import React, { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/actions/user.ac";
import { useFormik } from "formik";
import { TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  textField: {
    marginTop: 16,
    marginBottom: 16,
  },
  divPos: {
    color: "white",
    maxWidth: 500,
  },
  span: {
    fontSize: 20,
  },
  whiteText: {
    color: "white",
  },
  root: {
    padding: 15,
    borderRadius: "3px",
    margin: "0 auto",
    minWidth: 275,
    maxWidth: 800,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0,0, 0.5)",
    textAlign: "left",
    "& .MuiTextField-root": {
      width: 400,
      color: "#fff",
      "& .MuiInput-underline:after": {
        borderBottomColor: "white",
        color: "#fff",
      },
      "& .MuiInput-input": {
        color: "#fff",
        marginTop: 28,
      },
      "& .MuiInputLabel-animated": {
        color: "#fff",
        marginTop: 28,
      },
    },
    "& label.Mui-focused": {
      color: "#fff",
    },
    "& .MuiButtonBase-root": {
      backgroundColor: "#29b6f6",
      marginTop: 20,
    },
  },
  rootcard: {
    backgroundColor: "rgba(0, 0,0, 0.5)",
    "& .MuiCardActions-root": {
      backgroundColor: "#29b6f6",
      display: "flex",
      justifyContent: "center",
    },
    "$ .MuiTypography-root": {
      textAlign: "left",
    },
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

function ProfilePassenger() {
  console.log("ProfilePassenger Compot render");
  const curUser = useSelector((state) => state.user);
  const classes = useStyles();
  // const history = useHistory();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  // const bull = <span className={classes.bullet}>•</span>;

  function handleClick() {
    setIsEdit(true);
    // history.push("/");
  }
  function handleClickfalse() {
    setIsEdit(false);
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
      console.log(
        "VALUES to send",
        values,
        "Current User ID =",
        curUser.id,
        "TOKEN",
        curUser.token
      );
      dispatch(editUser({ ...values, id: curUser.id, token: curUser.token }));
      handleClickfalse();
    },
  });

  return (
    <>
      {isEdit ? (
        <>
          <Container maxWidth="sm">
            <form className={classes.root} onSubmit={formik.handleSubmit}>
              <Typography
                className={classes.whiteText}
                variant="h5"
                component="h2"
              >
                Форма для редактирования данных
              </Typography>

              <TextField
                fullWidth
                id="email"
                name="email"
                label="Почтовый адрес:"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                id="nickName"
                name="nickName"
                label="Ваш ник"
                type="text"
                value={formik.values.nickName}
                onChange={formik.handleChange}
                error={
                  formik.touched.nickName && Boolean(formik.errors.nickName)
                }
                helperText={formik.touched.nickName && formik.errors.nickName}
              />

              <TextField
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

              <TextField
                fullWidth
                id="weight"
                name="weight"
                label="Ваш вес"
                type="text"
                value={formik.values.weight}
                onChange={formik.handleChange}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
              />

              <TextField
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

              <Typography
                className={classes.whiteText}
                variant="body2"
                component="p"
              >
                <br />
                Для редактирования информации о себе нажмите кнопку:
                <br />
                {'"ОТРЕДАКТИРОВАТЬ ДАННЫЕ"'}
              </Typography>

              <Button type="submit" size="big" variant="contained">
                Отредактировать данные
              </Button>
            </form>
          </Container>
        </>
      ) : (
        <>
          {/* <Grid justify-center>
            <Grid item>
              <Typography variant="h5" component="h2">
                Личный кабинет пользователя
              </Typography>
            </Grid>
          </Grid> */}
          <Grid container justify="center">
            <Grid item>
              <Card className={classes.rootcard}>
                <CardContent className={classes.whiteText}>
                  <Typography className={classes.pos}>
                    Почтовый адрес:
                  </Typography>
                  <Typography
                    className={classes.pos}
                    component="span"
                    color="textWhite"
                  >
                    {curUser.email}
                  </Typography>
                  <Typography className={classes.pos}>Ник:</Typography>
                  <Typography className={classes.pos} component="span">
                    {curUser.nickName}
                  </Typography>
                  <Typography className={classes.pos}>Возраст:</Typography>
                  <Typography className={classes.pos} component="span">
                    {curUser.age}
                  </Typography>
                  <Typography className={classes.pos}>Вес:</Typography>
                  <Typography className={classes.pos} component="span">
                    {curUser.weight}
                  </Typography>
                  <Typography className={classes.pos}>Контакт:</Typography>
                  <Typography className={classes.pos} component="span" c>
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
          {/* <Dragger /> */}
        </>
      )}
    </>
  );
}

export default React.memo(ProfilePassenger);
