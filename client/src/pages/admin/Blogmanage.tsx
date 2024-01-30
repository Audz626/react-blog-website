/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { getList } from "../../service/blog";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import noimageLogo from "../../assets/noimage.jpg";
import { useNavigate } from "react-router-dom";
// import { UseSelector, useSelector } from "react-redux";
import { remove } from "../../service/blog";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const API_IMG = import.meta.env.VITE_IMG ? import.meta.env.VITE_IMG : "";

const Blogmanage = () => {
//   const { user } = useSelector((state: any) => ({ ...state }));
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

//   console.log('user @blogmanage',user);

  useEffect(() => {
    getList()
      .then((res) => {
        // console.log('data @blogmanage :',res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err@blogmanage :", err);
      });
  }, []);

  console.log("data @blogmanage :", data);

  const handleremove = async (id:string) => {
    console.log('remove @blogmanage',id);

    

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          remove(id)
          .then((res) => {
            console.log("remove", res);
            let timerInterval: any;
            Swal.fire({
              // title: "Auto close alert!",
              // html: "I will close in <b></b> milliseconds.",
              timer: 1500,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
              },
              willClose: () => {
                clearInterval(timerInterval);
                navigate("/admin/manageblog");
                window.location.reload();
              },
            });
  
          })
          .catch((err) => {
            console.log("error", err);
            Swal.fire({
              title: "Deleted!",
              text: err.data,
              icon: "error"
            });
          });
  
        }
      });
  };

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const handlePageChange = (e:any, newPage:any)=>{
    setPage(newPage);
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginationData = data.slice(startIndex, endIndex);

  return (
    <div>
      <h1 className="text-center text-[30px] font-bold">Manage Blog</h1>
      <TableContainer className="!bg-[#f1f0f0] !rounded-lg !shadow-xl" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="!font-bold" align="center">
                Article
              </TableCell>
              <TableCell className="!font-bold" align="center">
                Cover
              </TableCell>
              <TableCell className="!font-bold" align="center">
                Author&nbsp;
              </TableCell>
              <TableCell className="!font-bold" align="center">
                Create&nbsp;
              </TableCell>
              <TableCell className="!font-bold" align="center">
                Update&nbsp;
              </TableCell>
              <TableCell className="!font-bold" align="center">
                Action&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginationData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">
                  {row.file && row.file != "noimage.jpg" ? (
                    <div className="w-[auto] max-w-[250px] flex justify-center items-center">
                      <img src={`${API_IMG}/${row.file}`} alt={row.file} />
                    </div>
                  ) : (
                    <div className="w-[auto] max-w-[250px] flex justify-center items-center">
                      <img src={`${noimageLogo}`} alt={row.file} />
                    </div>
                  )}
                </TableCell>
                <TableCell align="right">{row.author.name}</TableCell>
                <TableCell align="right">
                  {moment(row.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="right">
                  {moment(row.updatedAt).format("DD-MM-YY HH:mm:ss")}
                </TableCell>
                <TableCell align="right">
                  <span className="mr-2 text-[#39947D] cursor-pointer">
                    <Link to={`/admin/edit/${row._id}`}>
                      <ModeIcon fontSize="large" />
                    </Link>
                  </span>
                  <span className="mr-2 text-[#D04848] cursor-pointer"
                  onClick={()=>handleremove(row._id)}
                  >
                      <DeleteIcon fontSize="large" />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="justify-center flex mt-5">
        {data.length && (
          <Stack className="mx-10 mb-10" spacing={2}>
            <Pagination
              className="rounded-full"
              // boundaryCount={data?.length}
              count={Math.ceil(data.length / pageSize)}
              page={page}
              onChange={(page, size) => {
                handlePageChange(page, size);
              }}
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Blogmanage;
