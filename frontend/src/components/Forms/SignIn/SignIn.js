import { useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import MaskedInput from "react-text-mask";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { TextField, Container, Typography, Input } from "@material-ui/core";
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

// const SignIn = () => {
//   const [userSignIn, setUserSignIn] = useState({
//     email: '',
//     password: ''
//   })

//   let history = useHistory();
//   let location = useLocation();

//

//   const changeHandler = (e) => {
//     setUserSignIn(prev => ({...prev, [e.target.name]: e.target.value}))
//   }

//   const dispatch = useDispatch()

//   const submitHandler = (e) => {
//     e.preventDefault()
//     let payload = Object.entries(userSignIn).filter((el) => el[1] ? el[1].trim() : el[1])
//     if (payload.length) {
//       payload = Object.fromEntries(payload)
//       dispatch(signIn(payload, history, from))
//     }
//   }

//   return (
//     (
//     <div className="d-flex justify-content-center">
//       <form onSubmit={submitHandler} className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3">
//         <legend className="text-center mb-4">User Sign In</legend>
//         <div className="mb-3">
//           <input onChange={changeHandler} value={userSignIn.email} className="form-control" type="email" name="email" placeholder='Email' />
//         </div>

//         <div className="mb-3">
//           <input onChange={changeHandler} value={userSignIn.password} className="form-control" type="password" name="password" placeholder='Pass' />
//         </div>

//         <button type="submit" className="btn btn-primary">Sign In</button>
//       </form>
//     </div>
//     )
//   )
// }

// export default SignIn
