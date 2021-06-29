import { useSelector } from "react-redux";
import IventItem from "./IventItem";
import { Grid } from "@material-ui/core";

export default function IventList() {
  const ivents = useSelector((state) => state.ivents);
  const curUserId = useSelector((state) => state.user)._id;

  const sortIvents = ivents.filter((ivent) => ivent.creator._id === curUserId);

  return (
    <Grid container spacing={1} justify="center">
      {sortIvents.map((el) => {
        return <IventItem key={el._id} el={el} />;
      })}
    </Grid>
  );
}
