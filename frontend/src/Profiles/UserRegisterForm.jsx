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
    // marginTop: 200,
  },
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

// const CustomInput = (props) => {
//   console.log(props);
//   return (
//     <MaskedInput
//       {...props}
//       mask={[
//         "+7 ",
//         "(",
//         /[1-9]/,
//         /\d/,
//         /\d/,
//         ")",
//         " ",
//         /\d/,
//         /\d/,
//         /\d/,
//         "-",
//         /\d/,
//         /\d/,
//         /\d/,
//         /\d/,
//       ]}
//     />
//   );
// };

export default function UserRegisterForm() {
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
          Дополнительная информация о пользователе
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
            // placeholder="+7 (999) 99-99-99"
            type="text"
            value={formik.values.usercontacts}
            onChange={formik.handleChange}
            error={
              formik.touched.usercontacts && Boolean(formik.errors.usercontacts)
            }
            helperText={
              formik.touched.usercontacts && formik.errors.usercontacts
            }
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

// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
// import Input from "@material-ui/core/Input";
// import Typography from "@material-ui/core/Typography";
// // import { useDispatch, useSelector } from "react-redux";
// // import { editSquareThunk } from "../../redux/actions/tictac";
// import { FormControl, InputLabel, FormHelperText } from "@material-ui/core";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import TextField from "@material-ui/core/TextField";

// const validationSchema = yup.object({
//   name: yup
//     .string("Введите имя")
//     .min(4, "Имя должно быть не менее 4 символов")
//     .required("Имя должно быть"),
//   password: yup
//     .string("Enter your password")
//     .min(8, "Passpropword should be of minimum 8 characters length")
//     .required("Password is required"),
// });

// const useStyles = makeStyles({
//   userForm: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   span: {
//     fontSize: 20,
//   },
//   root: {
//     margin: "0 auto",
//     minWidth: 275,
//     maxWidth: 800,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   bullet: {
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginTop: 16,
//     marginBottom: 16,
//   },
// });

// export default function UserRegisterForm() {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>*</span>;
//   const formik = useFormik({
//     initialValues: {
//       // name: "Ваше имя",
//       password: "foobar",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   return (
//     <div>
//       <Card className={classes.root}>
//         <CardContent>
//           <Typography variant="h5" component="h2">
//             Введите данные для заполнения профиля
//           </Typography>
//           <form
//             onSubmit={formik.handleSubmit}
//             className={classes.userForm}
//             component="form"
//           >
//             <FormControl>
//               {/* <InputLabel htmlFor="user-name">Имя</InputLabel> */}
//               <TextField
//                 fullWidth
//                 name="name"
//                 id="name"
//                 // aria-describedby="my-helper-user-name"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 error={formik.touched.name && Boolean(formik.errors.name)}
//                 helperText={formik.touched.name && formik.errors.name}
//               />
//               <FormHelperText id="my-helper-user-name">
//                 {bull} Введите свое имя
//               </FormHelperText>
//             </FormControl>
//             <FormControl>
//               <InputLabel htmlFor="user-age">Возраст</InputLabel>
//               <Input id="user-age" aria-describedby="my-helper-user-age" />
//               <FormHelperText id="my-helper-user-age">
//                 {bull} Введите свой возраст
//               </FormHelperText>
//             </FormControl>
//             <FormControl>
//               <InputLabel htmlFor="">Вес</InputLabel>
//               <Input
//                 id="user-weight"
//                 aria-describedby="my-helper-user-weight"
//               />
//               <FormHelperText id="my-helper-user-weight">
//                 {bull} Введите свой вес
//               </FormHelperText>
//             </FormControl>
//             <FormControl>
//               <InputLabel htmlFor="user-contact">Контактные данные</InputLabel>
//               <Input
//                 id="user-contact"
//                 aria-describedby="my-helper-user-contact"
//               />
//               <FormHelperText id="my-helper-user-contact">
//                 {bull} Введите контактные данные
//               </FormHelperText>
//             </FormControl>
//           </form>
//         </CardContent>
//         <Typography variant="body2" component="p">
//           <br />* - поля обязательные для заполнения
//         </Typography>
//         <CardActions>
//           <Button type="submit" fullWidth size="big">
//             Принять изменения
//           </Button>
//         </CardActions>
//       </Card>
//     </div>
//   );
// }
