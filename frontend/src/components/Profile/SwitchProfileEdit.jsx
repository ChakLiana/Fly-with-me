import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import ProfileTandem from "./ProfileTandem";
import ProfilePassenger from "./ProfilePassenger";
import { cornsilk } from "color-name";

export default function ProfileSwitches() {
  // return <div>123213213123123213</div>;
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
