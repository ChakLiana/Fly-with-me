
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { TextField, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/actions/user.ac";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  textField: {
    marginBottom: 30,
  },
  divPos: {
    // marginTop: 200,
  },
  btnColor: {
    backgroundColor: "#29b6f6",
  },
});

const validationSchema = yup.object({
  email: yup
    .string("email")
    .email("Некорректный ввод")
    .required("Поле обязательно для заполнения")
    .typeError("Некорректный ввод"),

  password: yup.string().required("Поле обязательно для заполнения"),
});
export default function UsersignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      dispatch(signIn(values, history));
    },
  });

  return (
    <div className={classes.divPos}>
      <Container maxWidth="sm">
        <Typography variant="h5" component="h2">
          Войти
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
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
          <Button
            className={classes.btnColor}
            color="#039be5"
            variant="contained"
            type="submit"
          >
            Войти
          </Button>
        </form>
      </Container>
    </div>
  );
}

