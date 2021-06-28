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
  divPos: {
    marginTop: 20,
  },
});

const validationSchema = yup.object({
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
  tandemcontacts: yup
    .string()
    .matches(
      /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      "Неправильно введен номер телефона"
    )

    .required("* Поле вес обязательно для заполнения"),
});

export default function UserRegisterForm() {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      nickName: "",
      experience: "",
      fHours: "",
      tandemcontacts: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch("http://localhost:8080/user/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify(values),
      });
    },
  });

  return (
    <div className={classes.divPos}>
      <Container maxWidth="sm">
        <Typography variant="h5" component="h2">
          Введите дополнительную информацию о себе
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
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
            className={classes.textField}
            fullWidth
            id="experience"
            name="experience"
            label="Ваш опыт"
            type="text"
            value={formik.values.experience}
            onChange={formik.handleChange}
            error={
              formik.touched.experience && Boolean(formik.errors.experience)
            }
            helperText={formik.touched.experience && formik.errors.experience}
          />
          <TextField
            className={classes.textField}
            fullWidth
            id="fHours"
            name="fHours"
            label="часы налета"
            type="text"
            value={formik.values.tandemhours}
            onChange={formik.handleChange}
            error={formik.touched.fHours && Boolean(formik.errors.fHours)}
            helperText={formik.touched.fHours && formik.errors.fHours}
          />
          <TextField
            className={classes.textField}
            fullWidth
            id="tel"
            name="tel"
            label="Контактная информация"
            // placeholder="+7 (999) 99-99-99"
            type="text"
            value={formik.values.tel}
            onChange={formik.handleChange}
            error={formik.touched.tel && Boolean(formik.errors.tel)}
            helperText={formik.touched.tel && formik.errors.tel}
            // InputProps={{
            //   inputComponent: CustomInput,
            // }}
          />

          <Button color="textSecondary" variant="contained" type="submit">
            Изменить данные
          </Button>
        </form>
      </Container>
    </div>
  );
}
