/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getblogbyid, remove } from "../../service/blog";
import NoimageLogo from "../../assets/noimage.jpg";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const API_IMG = import.meta.env.VITE_IMG ? import.meta.env.VITE_IMG : "";

const Myblog = () => {
  const { user } = useSelector((state: any) => ({ ...state }));
  console.log("user @myblog", user.user);
  console.log("user id @myblog", user.user.id);
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (user.user) {
      console.log("123");
      getblogbyid(user.user.id)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [user]);
  console.log("data @myblog", data);

  const handleremove = async (id: string) => {
    console.log("remove @myblog", id);

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
          Swal.fire({
            title: "Deleted!",
            text: res.data,
            icon: "success"
          });


          window.location.reload();
          navigate("/user/myblog");
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

  return (
    <div className="m-[2rem] grid grid-cols-4 gap-4">
      {data?.map((data, index) => (
        <Card
          className="!rounded-xl !shadow-lg"
          key={index}
          sx={{ maxWidth: 345 }}
        >
          <CardMedia
            component="img"
            alt={data.title}
            height="140"
            image={
              data.file && data.file != "noimage.jpg"
                ? `${API_IMG}/${data.file}`
                : NoimageLogo
            }
          />
          <CardContent>
            <Typography
              className="!font-bold"
              gutterBottom
              variant="h5"
              component="div"
            >
              {data.title}
            </Typography>
            <div className="overflow-hidden">
              <Typography variant="body2" color="text.secondary">
                <span className="truncate overflow-ellipsis font-semibold">
                  {data.summary ? data.summary : data.title}
                </span>
                {/* <p className="content" dangerouslySetInnerHTML={{__html:data.content}} /> */}
              </Typography>
            </div>
          </CardContent>
          <CardActions className="gap-4">
            <Button
              className="!text-black hover:!bg-[#e4f5ea] !rounded-lg"
              size="small"
            >
              <Link to={`/user/blog/read/${data.slug}`}>Learn More</Link>
            </Button>
            <div className="pl-[5rem]">
              <Button
                className="!rounded-full 
              !text-[#39947D] 
              hover:!text-[white] 
              !bg-[#CDFAD5]
              hover:!bg-[#39947D]
              !mr-1
              "
              >
                <Link to={`/user/myblog/editblog/${data._id}`}>
                  <EditIcon />
                </Link>
              </Button>
              <Button
                onClick={() => handleremove(data._id)}
                className="!rounded-full 
              !text-[#D04848] 
              hover:!text-[white] 
              !bg-[#F6D6D6] 
              hover:!bg-[#D04848] 
              
              "
              >
                <DeleteIcon />
              </Button>
            </div>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Myblog;
