/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import ResponsiveAppBar from "../layout/Appbar";
// import { useNavigate } from "react-router-dom";

interface childrenProp {
  children: ReactNode;
}

const UserRoute = ({ children }: childrenProp) => {
  const { user } = useSelector((state: any) => ({ ...state }));
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("test123", user.user.token ? "1" : "0");
  //   if (user?.user.token === '') {
  //     console.log('ddd')

  //   }
  // },[user]);

  console.log("userRoute", user);

  return user && user.user.token ? (
    <div>
      <ResponsiveAppBar />
      {children}
    </div>
  ) : (
    <div>
      <ResponsiveAppBar />
      No login
    </div>
  );
};

export default UserRoute;
