import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import localization from "moment/locale/ru";
import Button from "@material-ui/core/Button";
import { iventAddPassengerOnBack } from "../../redux/actions/iventActions";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function IventModal(props) {
  const dispatch = useDispatch();

  const selectIvent = useSelector((state) => state.selectIvent);
  const currentUser = useSelector((state) => state.user);

  // Все ломает, поэтому убрал
  // useEffect(() => {
  //   dispatch(getSelectIventFromBack(selectIvent.coords[0], selectIvent.coords[1]));
  // }, [])

  const addPassengerHandler = () => {
    dispatch(iventAddPassengerOnBack(selectIvent._id, currentUser._id));
    // Дописал строчку ниже
    // Спасает, так как при повторном открытии диспачится обновление текущего события
    props.handleCloseModal();
  };

  const deletePassengerHandler = () => {};

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Пилот: {selectIvent.creator.nickName}</h2>
      <p>
        Дата полета:{" "}
        {moment(selectIvent?.dateOfEvent)
          .locale("ru", localization)
          .format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <p>
        Кооринаты места: {selectIvent.coords[0]}, {selectIvent.coords[1]}
      </p>
      <p>Стаж пилота (годы): {selectIvent.creator.experience}</p>
      <p>Налет часов: {selectIvent.creator.fHours}</p>
      <p>Ограничения от организатора: {selectIvent.stopList}</p>
      <p>Комментарии: {selectIvent.description}</p>
      <p>Цена полета: {selectIvent.price}</p>
      <p>Моб. тел. организатора: {selectIvent.creator.tel}</p>
      <p>Email: {selectIvent.creator.email}</p>
      {console.log(selectIvent)}
      {selectIvent.passengers.filter((elem) => elem._id === currentUser._id)
        .length ? (
        <Button
          onClick={() => deletePassengerHandler()}
          data-passenger="delete"
          color="textSecondary"
          variant="contained"
        >
          Отказаться
        </Button>
      ) : (
        <Button
          onClick={() => addPassengerHandler()}
          data-passenger="add"
          color="textSecondary"
          variant="contained"
        >
          Записаться
        </Button>
      )}

      <IventModal />
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
