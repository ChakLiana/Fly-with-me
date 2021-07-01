import { useSelector } from "react-redux";
import IventPasseng from "./IventPassenger.jsx";
import { Grid, Container, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function IventListPassenger() {
  const ivents = useSelector((state) => state.ivents);
  // console.log(ivents);
  const curUserId = useSelector((state) => state.user)._id;

  // console.log("curUserID", curUserId);
  const [accept, setAccept] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    setAccept(
      ivents.filter((ivent) =>
        ivent.passengerAccepted.find((el) => el._id === curUserId)
      )
    );

    setPending(
      ivents.filter((ivent) =>
        ivent.passengerPending.find((el) => el._id === curUserId)
      )
    );
  }, [ivents]);

  return (
    <>
      {pending.length ? (
        <>

          <Container maxWidth="sm">
            <Typography
              variant="h4"
              style={{
                color: "white",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Ожидает подтверждения:
            </Typography>
          </Container>

          <Grid container spacing={1} justify="center">
            {pending.map((el) => {
              return <IventPasseng key={el._id} el={el} />;
            })}
          </Grid>
        </>
      ) : null}
      {accept.length ? (
        <>

          <Container maxWidth="sm">
            <Typography
              variant="h4"
              style={{
                color: "white",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Подтверждено:
            </Typography>
          </Container>


          <Grid container spacing={1} justify="center">
            {accept.map((el) => {
              return <IventPasseng key={el._id} el={el} />;
            })}
          </Grid>
        </>
      ) : null}
    </>
  );
}
