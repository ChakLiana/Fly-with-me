import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import Dragger from "../Dragger/Drager";
import { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/actions/user.ac";
import { useFormik } from "formik";
// import { useHistory } from "react-router";
import { TextField, Typography, Container } from "@material-ui/core";
import IventList from "../IventList/IventList";

const useStyles = makeStyles((theme) => ({
  span: {
    fontSize: 20,
  },
  // root: {
  //   margin: "0 auto",
  //   minWidth: 275,
  //   maxWidth: 800,
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   color: "white",
  //   backgroundColor: "rgba(255, 255, 255, 0.8)",
  // },
  root: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 400,
      color: "#fff",
      "& .MuiInput-underline:after": {
        borderBottomColor: "white",
        color: "#fff",
      },
      "& .MuiInput-input": {
        color: "#fff",
      },
      "& .MuiInputLabel-animated": {
        color: "#fff",
      },
    },
    "& label.Mui-focused": {
      color: "#fff",
    },
    "& .MuiCardActions-root": {
      backgroundColor: "#29b6f6",
      display: "flex",
      justifyContent: "center",
    },
  },
  bullet: {
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    color: "white",
  },
  pos: {
    marginTop: 16,
    marginBottom: 16,
    color: "white",
    textAlign: "center",
  },
  fieldColor: {
    color: "#00bfff",
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },
  paper: {
    width: 400,
    height: 400,
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
    },
    // borderRadius: "50%",
  },
  dragger: {
    minWidth: "250px",
    minHeight: "250px",
    borderRadius: "50%",
  },
  textColor: {
    color: "white",
  },
  btnColor: {
    backgroundColor: "#29b6f6",
  },
}));

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
  experience: yup
    .number("Введите  возраст")
    .max(101, "Вы ввели слишком большое число, проверьте еще раз")
    .required("* Поле возраст обязательно для заполнения")
    .typeError("Возраст должен быть цифрой"),
  fHours: yup
    .number("Введите количество часов налета")
    .required("* Поле часы налета обязательно для заполнения")
    .typeError("Убедитесь что вы ввели число"),
  tel: yup
    .string()
    .matches(
      /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      "Неправильно введен номер телефона"
    )

    .required("* Поле вес обязательно для заполнения"),
});

export default function ProfileTandem() {
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
      experience: curUser.experience,
      fHours: curUser.fHours,
      tel: curUser.tel,
      email: curUser.email,
      password: curUser.password,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("VALUES to send", values, curUser.id);
      dispatch(editUser({ ...values, id: curUser.id, token: curUser.token }));
      handleClickfalse();
    },
  });

  return (
    <>
      {isEdit ? (
        <>
          <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
              <Grid justify-center>
                <Grid item>
                  <Typography
                    className={classes.pos}
                    variant="h5"
                    component="h2"
                  >
                    Форма для редактирования данных
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid container> */}
              <Grid item>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography className={classes.fieldColor}>
                      Почтовый адрес:
                    </Typography>
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

                    <Typography
                      className={classes.fieldColor}
                      color="textSecondary"
                    >
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

                    <Typography
                      className={classes.fieldColor}
                      color="textSecondary"
                    >
                      Опыт:
                    </Typography>

                    <TextField
                      className={classes.textField}
                      fullWidth
                      id="experience"
                      name="experience"
                      label="Ваш опыт"
                      type="text"
                      value={formik.values.experience}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.experience &&
                        Boolean(formik.errors.experience)
                      }
                      helperText={
                        formik.touched.experience && formik.errors.experience
                      }
                    />

                    <Typography
                      className={classes.fieldColor}
                      color="textSecondary"
                    >
                      Часы налета:
                    </Typography>

                    <TextField
                      className={classes.textField}
                      fullWidth
                      id="fHours"
                      name="fHours"
                      label="часы налета"
                      type="text"
                      value={formik.values.fHours}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.fHours && Boolean(formik.errors.fHours)
                      }
                      helperText={formik.touched.fHours && formik.errors.fHours}
                    />

                    <Typography
                      color="textSecondary"
                      className={classes.fieldColor}
                    >
                      Контакт:
                    </Typography>

                    <TextField
                      className={classes.textField}
                      fullWidth
                      id="tel"
                      name="tel"
                      label="Контактная информация"
                      type="text"
                      value={formik.values.tel}
                      onChange={formik.handleChange}
                      error={formik.touched.tel && Boolean(formik.errors.tel)}
                      helperText={formik.touched.tel && formik.errors.tel}
                    />

                    <Typography
                      className={classes.textColor}
                      variant="body2"
                      component="p"
                    >
                      <br />
                      Для редактирования информации о себе нажмите кнопку:
                      <br />
                      {'"ОТРЕДАКТИРОВАТЬ ДАННЫЕ"'}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      className={classes.btnColor}
                      type="submit"
                      size="big"
                      variant="contained"
                    >
                      Принять изменения
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              {/* </Grid> */}
            </form>
          </Container>
        </>
      ) : (
        <>
          {/* <Grid justify-center>
            <Grid item>
              <Typography variant="h5" component="h2">
                Личный кабинет Тандемщика
              </Typography>
            </Grid>
          </Grid> */}
          <Container maxWidth="sm">
            <Grid container item flex justify="center">
              <Grid
                item
                xs={6}
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                <Dragger />
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography className={classes.fieldColor}>
                      Почтовый адрес:
                    </Typography>
                    <Typography
                      className={classes.pos}
                      component="span"
                      color="textPrimary"
                    >
                      {curUser.email}
                    </Typography>
                    <Typography
                      className={classes.fieldColor}
                      color="textSecondary"
                    >
                      Ник:
                    </Typography>
                    <Typography
                      className={classes.pos}
                      component="span"
                      color="textPrimary"
                    >
                      {curUser.nickName}
                    </Typography>
                    <Typography
                      className={classes.fieldColor}
                      color="textSecondary"
                    >
                      Опыт:
                    </Typography>
                    <Typography
                      className={classes.pos}
                      component="span"
                      color="textPrimary"
                    >
                      {curUser.experience}
                    </Typography>
                    <Typography
                      className={classes.fieldColor}
                      color="textSecondary"
                    >
                      Часы налета:
                    </Typography>
                    <Typography
                      className={classes.pos}
                      component="span"
                      color="textPrimary"
                    >
                      {curUser.fHours}
                    </Typography>
                    <Typography
                      className={classes.fieldColor}
                      color="textSecondary"
                    >
                      Контакт:
                    </Typography>
                    <Typography
                      className={classes.pos}
                      component="span"
                      color="textPrimary"
                    >
                      {curUser.tel}
                    </Typography>
                    <Typography
                      className={classes.textColor}
                      variant="body2"
                      component="p"
                    >
                      <br />
                      Для редактирования информации о себе нажмите кнопку:
                      <br />
                      {'"ОТРЕДАКТИРОВАТЬ ДАННЫЕ"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      className={classes.btnColor}
                      onClick={handleClick}
                      size="big"
                    >
                      Отредактировать данные
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
