import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import ProfileTandem from "./ProfileTandem";
import ProfilePassenger from "./ProfilePassenger";

export default function ProfileSwitches() {
  const curUser = useSelector((state) => state.user);
  console.log(curUser.role);

  return (
    <>
      <Typography>
        Добро пожаловать в личный кабинет: <b>{curUser.nickName}</b>
      </Typography>
      <Typography>
        {curUser?.role === "tandem" ? <ProfileTandem /> : <ProfilePassenger />}
      </Typography>
    </>
  );
}
