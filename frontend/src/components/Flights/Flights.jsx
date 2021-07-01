import IventList from "../IventList/IventList";
import IventListPassenger from "../IventPassenger/IventPassenList";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";

export default function Flight() {
  const curUser = useSelector((state) => state.user);
  console.log(curUser.role);

  return (
    <>
      <Typography>
        {curUser?.role === "passenger" ? <IventListPassenger /> : <IventList />}
      </Typography>
    </>
  );
}
