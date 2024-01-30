/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// rfc
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getListUser, changeRole } from "../../service/admin";
import { Select, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

export default function UserManage() {
  const [data, setData] = useState<any[]>([]);
  const { user } = useSelector((state: any) => ({ ...state }));
  console.log("user from usermanagepage :", user);
  console.log("data from usermanagepage :", data);

  useEffect(() => {
    loadData(user.user.token);
  }, [user]);

  const loadData = async (authentication: string) => {
    await getListUser(authentication)
      .then((res) => {
        console.log("data from usermanagepage : ", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const role = ["admin", "user"];

  const handlechangeRole = async (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("handle Role", id, event.target.value);
    const token = user.user.token;
    const data = {
      id: id,
      role: event.target.value,
    };

    await changeRole(token ? token : user.user.token, data)
      .then((res) => {
        console.log(res.data);
        loadData(token ? token : user.user.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-center text-[30px] font-bold my-[20px]">Manage Users</h1>
      <TableContainer className="!rounded-xl" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="">#</TableCell>
              <TableCell>name&nbsp;</TableCell>
              <TableCell>role&nbsp;</TableCell>
              <TableCell>updatedAt&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.name == "admin" ? (
                    <Select
                     disabled
                      className="w-[100px] !rounded-[15px]"
                      value={row.role}
                      onChange={(event: any) =>
                        handlechangeRole(row._id, event)
                      }
                    >
                      {role.map((role, index) => (
                        <MenuItem key={index} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Select
                      className="w-[100px] !rounded-[15px]"
                      value={row.role}
                      onChange={(event: any) =>
                        handlechangeRole(row._id, event)
                      }
                    >
                      {role.map((role, index) => (
                        <MenuItem key={index} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </TableCell>
                <TableCell>
                  {moment(row.updatedAt).format("DD/MM/YYYY , HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
