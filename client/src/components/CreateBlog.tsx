/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import Editor from "./Editor";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { create } from "../service/blog";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import "froala-editor/css/froala_style.min.css";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditor from "react-froala-wysiwyg";
import Swal from "sweetalert2";
// interface dataType {
//   name: string;
//   detail: string;
//   price: number;
//   _id: string;
// }

const CreateBlog = () => {
  const { user } = useSelector((state: any) => ({ ...state }));
  const userdata = user.user.name;
  const nevigate = useNavigate();

  const [form, setForm] = useState<{ [key: string]: string | File }>({});
  const [content, setContent] = useState("");

  console.log("Createblog page", user);

  Froalaeditor.DefineIcon("clear", { NAME: "remove", SVG_KEY: "remove" });
  Froalaeditor.RegisterCommand("clear", {
    title: "Clear HTML",
    focus: false,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      this.html.set("");
      this.events.focus();
    },
  });

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
    // console.log("handlechange form Createblogspage : ", e.target.value);
    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files ? e.target.files[0] : "",
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  //   console.log("form crateblog page : ", form);

  const handlesubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formimage = new FormData();
    for (const key in form) {
      console.log("key :", key);
      formimage.append(key, form[key]);
    }
    formimage.append("content", content);
    formimage.append("author", userdata);
    console.log("content createblog", content);

    let timerInterval: any;
    Swal.fire({
      timer: 1200,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
        // func

        create(formimage)
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "saved",
              showConfirmButton: false,
              timer: 1200,
            });
            console.log(res);
            // setTimeout(()=>{
            //   window.location.reload();
            // },3000)
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            console.log("error creating", err);
          });
      },
    });
  };

  console.log("user from createblogpage : ", user);
  return (
    <div
      className="m-20 p-10 w-[60] h-[100]
    bg-white rounded-xl border-2"
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
              name={content}
              onChange={setContent}
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
            <Button type="submit" variant="contained">
              submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
