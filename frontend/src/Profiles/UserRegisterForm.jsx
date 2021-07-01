import { useFormik } from "formik";

import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { TextField, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  textField: {
    marginBottom: 30,
  },
  divPos: {
    // marginTop: 200,
  },
});

const validationSchema = yup.object({
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

export default function UserRegisterForm() {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      nickName: "",
      age: "",
      weight: "",
      tel: "",
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

          <Button color="textSecondary" variant="contained" type="submit">
            Изменить данные
          </Button>
        </form>
      </Container>
    </div>
  );
}
