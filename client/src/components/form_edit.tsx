// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getByid, update } from "../service/api";
import Button from "@mui/material/Button";

export default function Form_edit() {
  const [data, setData] = useState({
    name: "",
    detail: "",
    price: 0,
    _id: "",
  });
  const [imageold, setImageold] = useState();
  const { id } = useParams<{ id: string }>();
  const nevigate = useNavigate();
  //   console.log(typeof id);

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]);

  const loadData = async (id: string) => {
    getByid(id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setImageold(res.data.file);
      })
      .catch((error) => console.log(error));
  };

  //   console.log("data >>>", data?._id);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    if (e.target.name === "file") {
      setData({
        ...data,
        [e.target.name as string]: e.target.files ? e.target.files[0] : null,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlesubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    console.log(imageold);

    const formimage = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const validKey = key as keyof typeof data;
        formimage.append(validKey, data[validKey] as string | Blob | File); // Adjust the type here
      }
    }

    if (imageold !== undefined) {
      formimage.append("imageold", imageold as string | Blob | File);
    }
    if (id) {
      update(id, formimage)
        .then((res) => {
          console.log(res);
          nevigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1>edit page</h1>
      <form onSubmit={handlesubmit} encType="multipart/form-data">
        <label>name</label>
        <br />
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={(e) => handlechange(e)}
        />
        <br />
        <label>detail:</label>
        <br />
        <input
          type="text"
          name="detail"
          value={data.detail}
          onChange={(e) => handlechange(e)}
        />
        <br />
        <label>price:</label>
        <br />
        <input
          type="text"
          name="price"
          value={data.price}
          onChange={(e) => handlechange(e)}
        />
        <br />
        <div className="!my-5">
          <input type="file" name="file" onChange={(e) => handlechange(e)} />
        </div>
        <div className="flex justify-center">
          <Button type="submit" variant="contained">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
}
