import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { TextField, Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { signUp } from "../../../redux/actions/user.ac";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  whiteText: {
    color: "white",
  },
  textField: {
    marginBottom: 30,
  },
  divPos: {
    padding: 15,
    borderRadius: "3px",
    backgroundColor: "rgba(0, 0,0, 0.5)",
    color: "white",
  },
  container: {
    backgroundColor: 'rgba("200, 200,200, 0.5")',
  },
  multilineColor: {
    color: "#ffffff !important",
    "&::after": {
      borderColor: "#ffffff",
    },
  },
});

const validationSchema = yup.object({
  email: yup
    .string("email")
    .email("Некорректный ввод")
    .required("Поле обязательно для заполнения")
    .typeError("Некорректный ввод"),

  password: yup.string().required("Поле обязательно для заполнения"),

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

    .required("* Поле  обязательно для заполнения"),
});

export default function UserRegisterForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      nickName: "",
      age: "",
      weight: "",
      tel: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      dispatch(signUp({ ...values, role: "passenger" }, history));
    },
  });

  return (
    <div className={classes.divPos}>
      <Container maxWidth="sm">
        <Typography variant="h5" component="h2">
          Регистрация
        </Typography>
        <form className={classes.container} onSubmit={formik.handleSubmit}>
          <TextField
            classes={{}}
            InputProps={{
              className: classes.multilineColor,
            }}
            InputLabelProps={{
              className: classes.multilineColor,
            }}
            fullWidth
            className={classes.textField}
            id="email"
            name="email"
            label="Ваша почта"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            InputProps={{
              className: classes.multilineColor,
            }}
            InputLabelProps={{
              className: classes.multilineColor,
            }}
            fullWidth
            className={classes.textField}
            id="password"
            name="password"
            label="Ваш пароль"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            InputProps={{
              className: classes.multilineColor,
            }}
            InputLabelProps={{
              className: classes.multilineColor,
            }}
            fullWidth
            className={classes.textField}
            id="nickName"
            name="nickName"
            label="Ваш ник"
            type="text"
            value={formik.values.nickName}
            onChange={formik.handleChange}
            error={formik.touched.nickName && Boolean(formik.errors.nickName)}
            helperText={formik.touched.nickName && formik.errors.nickName}
          />

          <TextField
            InputProps={{
              className: classes.multilineColor,
            }}
            InputLabelProps={{
              className: classes.multilineColor,
            }}
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
          <TextField
            InputProps={{
              className: classes.multilineColor,
            }}
            InputLabelProps={{
              className: classes.multilineColor,
            }}
            className={classes.textField}
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
            InputProps={{
              className: classes.multilineColor,
            }}
            InputLabelProps={{
              className: classes.multilineColor,
            }}
            className={classes.textField}
            fullWidth
            id="tel"
            name="tel"
            label="Контактная информация(телефон)"
            // placeholder="+7 (999) 99-99-99"
            type="tel"
            value={formik.values.tel}
            onChange={formik.handleChange}
            error={formik.touched.tel && Boolean(formik.errors.tel)}
            helperText={formik.touched.tel && formik.errors.tel}
            // InputProps={{
            //   inputComponent: CustomInput,
            // }}
          />

          <Grid container justify="center">
            <Button
              style={{ color: "#2d2d2c", backgroundColor: "#29b6f6" }}
              variant="contained"
              type="submit"
            >
              Зарегистрироваться
            </Button>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
