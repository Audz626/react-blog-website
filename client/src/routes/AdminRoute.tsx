/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react";
import { Box } from "@mui/material";
import MiniDrawer from "../layout/HeaderBar";
import { useSelector } from "react-redux";
import { chkcurrentAdmin } from "../service/auth";

interface chindrenType {
  children: ReactNode;
}

const AdminRoute = ({ children }: chindrenType) => {
  const [ok, setOk] = useState(false);
  const { user } = useSelector((state: any) => ({ ...state }));
  console.log("adminRoute", user);
  const admintoken = `${user.user.token}`;
  console.log("adminToken", admintoken);


  useEffect(() => {
    if (user && user.user.token) {
      chkcurrentAdmin(user.user.token)
        .then((res) => {
          console.log('adminRoutePage',res.data);
          setOk(true);
        })
        .catch((err) => {
          console.error(err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <div className="app m-20">
      <main className="content flex justify-center m-0">
        <MiniDrawer />
        <div className="">
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  ) : (
    <h1>No admin</h1>
  );
};

export default AdminRoute;
