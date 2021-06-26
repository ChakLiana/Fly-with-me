import { useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import MaskedInput from "react-text-mask";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { TextField, Container, Typography, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  textField: {
    marginBottom: 30,
  },
  divPos: {},
});

const validationSchema = yup.object({
  username: yup
    .string("Имя")
    .min(4, "Имя должно состоять не менне чем из 5 букв")
    .required("*Имя обязательно для заполнения"),
  userage: yup
    .number("Введите  возраст")
    .max(101, "Вы ввели слишком большое число, проверьте еще раз")
    .required("* Поле возраст обязательно для заполнения")
    .typeError("Возраст должен быть цифрой"),
  userweight: yup
    .number("Введите Ваш вес")
    .max(200, "Вы ввели слишком большое число, проверьте еще раз")
    .required("* Поле вес обязательно для заполнения")
    .typeError("Убедитесь что вы ввели число"),
  usercontacts: yup
    .string()
    .matches(
      /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      "Неправильно введен номер телефона"
    )

    .required("* Поле вес обязательно для заполнения"),
});

export default function IventCreateForm() {
  const classes = useStyles();

  

  const formik = useFormik({
    initialValues: {
      username: "",
      userage: "",
      userweight: "",
      usercontacts: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={classes.divPos}>
      <Container maxWidth="sm">
        <Typography variant="h5" component="h2">
          Конструктор полета
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            className={classes.textField}
            id="username"
            name="username"
            label="Имя пользователя"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            className={classes.textField}
            fullWidth
            id="userage"
            name="userage"
            label="Возраст пользователя"
            type="text"
            value={formik.values.userage}
            onChange={formik.handleChange}
            error={formik.touched.userage && Boolean(formik.errors.userage)}
            helperText={formik.touched.userage && formik.errors.userage}
          />
          <TextField
            className={classes.textField}
            fullWidth
            id="userweight"
            name="userweight"
            label="Вес пользователя"
            type="text"
            value={formik.values.userweight}
            onChange={formik.handleChange}
            error={
              formik.touched.userweight && Boolean(formik.errors.userweight)
            }
            helperText={formik.touched.userweight && formik.errors.userweight}
          />
          <TextField
            className={classes.textField}
            fullWidth
            id="usercontacts"
            name="usercontacts"
            label="Контактная информация"
            type="text"
            value={formik.values.usercontacts}
            onChange={formik.handleChange}
            error={
              formik.touched.usercontacts && Boolean(formik.errors.usercontacts)
            }
            helperText={
              formik.touched.usercontacts && formik.errors.usercontacts
            }
          />

          <Button color="textSecondary" variant="contained" type="submit">
            Изменить данные
          </Button>
        </form>
      </Container>
    </div>
  );
}
