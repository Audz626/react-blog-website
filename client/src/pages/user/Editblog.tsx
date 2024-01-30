/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getblogeditbyid } from "../../service/blog";
import { Button, TextField } from "@mui/material";
import { update } from "../../service/blog";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Swal from "sweetalert2";

const Editblog = () => {
  const [data, setData] = useState({
    title: "",
    author: "",
    summary: "",
    content: "",
    _id: "",
  });
  const [newcontent, setNewcontent] = useState("");
  const [oldimage, setOldimage] = useState();
  const { id } = useParams<{ id: string }>();

  console.log("id @editblog", id);

  useEffect(() => {
    if (id) {
      getblogeditbyid(id)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setOldimage(res.data.file);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  console.log("data @editblog", data);

  const sunoption = {
    // [{ header: [1, 2, false] }],
    buttonList: [
      ["undo", "redo"],
      ["font", "fontSize", "formatBlock"],
      ["paragraphStyle", "blockquote"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor", "textStyle"],
      ["removeFormat"],
      ["outdent", "indent"],
      ["align", "horizontalRule", "list", "lineHeight"],
      ["table", "link", "image", "video", "audio"],
    ],
  };

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
    console.log("data @editblog", data);
    // console.log('newcontent @editblog',newcontent);
    console.log("oldimage @editblog", oldimage);

    data.content = newcontent;
    console.log("newdatacontent @editblog", data);
    console.log("new content @editblog", data.content);

    const formimage = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const validKey = key as keyof typeof data;
        formimage.append(validKey, data[validKey] as string | Blob | File); // Adjust the type here
      }
    }

    if (oldimage !== undefined) {
      formimage.append("imageold", oldimage as string | Blob | File);
    }

    let timerInterval: any;
    if (id) {
      Swal.fire({
        // title: "Auto close alert!",
        // html: "I will close in <b></b> milliseconds.",
        timer: 1200,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);

          update(id, formimage)
            .then((res) => {
              console.log(res.data);
              Swal.fire({
                // position: "top-end",
                icon: "success",
                title: res.data,
                showConfirmButton: false,
                timer: 1500
              });
              //   nevigate("/");
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message
              });
            });
        },
      });
    }
    // if (id) {
    //   update(id, formimage)
    //     .then((res) => {
    //       console.log(res.data);
    //       //   nevigate("/");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  };

  return (
    <div
      className="m-20 p-10 w-[60] h-[100]
    bg-white rounded-xl border-2 shadow-lg"
    >
      <h1 className="text-center p-10">Create Blog</h1>
      <div>
        <form onSubmit={handlesubmit} encType="multipart/form-data">
          <div className="justify-center flex">
            <TextField
              className="w-[55rem]"
              id="outlined-basic"
              variant="outlined"
              label="Title"
              name="title"
              value={data.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlechange(e)
              }
            />
          </div>

          <br />
          <div className="justify-center flex">
            <TextField
              className="w-[55rem] "
              id="outlined-basic"
              variant="outlined"
              label="Summary"
              name="summary"
              value={data.summary}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlechange(e)
              }
            />
          </div>
          <br />

          <br />
          <div className="mb-[2rem] justify-center flex">
            <label>cover: &nbsp;&nbsp;&nbsp;</label>
            <input type="file" name="file" onChange={(e) => handlechange(e)} />
          </div>
          {/* <div className=" justify-center flex pb-10">
            <ReactQuill 
              className="w-[55rem]"
              placeholder= 'Compose an epic...'
              modules={modules}
              // formats={formats}
              value={content}
              onChange={setContent}
            />
          </div> */}
          <div className="justify-center flex">
            <SunEditor
              setOptions={sunoption}
              placeholder="Compose an epic..."
              setContents={data.content}
              onChange={setNewcontent}
            />
          </div>
          <br />
          {/* <div>
            <FroalaEditor
              tag="textarea"
              config={editorConfig}
              model={content}
              onModelChange={setContent}
            />
          </div> */}
          <br />
          <div className="text-center">
            <Button className="!mr-2" type="submit" variant="contained">
              Update
            </Button>
            <Link to={"/user/myblog"}>
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editblog;
