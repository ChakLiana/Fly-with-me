import { useSelector } from "react-redux";
import IventPasseng from "./IventPassenger";
import { Grid } from "@material-ui/core";

export default function IventListPassenger() {
  const ivents = useSelector((state) => state.ivents);
  // console.log(ivents);
  const curUserId = useSelector((state) => state.user)._id;
  // console.log("curUserID", curUserId);

  const render = ivents.filter((ivent) =>
    ivent.passengers.find((el) => el._id === curUserId)
  );

  return (
    <Grid container spacing={1} justify="center">
      {render.map((el) => {
        return <IventPasseng key={el._id} el={el} />;
      })}
    </Grid>
  );
}
