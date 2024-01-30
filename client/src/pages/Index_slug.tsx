import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "../layout/Appbar";
import { getblogbyslug } from "./../service/blog";
import moment from "moment";
import "../assets/style/quill.css";

const API_IMG = import.meta.env.VITE_IMG ? import.meta.env.VITE_IMG : "";

interface BlogData {
  title: string;
  file: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  // Add other properties as needed
}

const Index_slug = () => {
  const { slug } = useParams();
  const [data, setData] = useState<BlogData | null>(null);
  console.log("slug@index_slug", slug);

  useEffect(() => {
    if (slug) {
      getblogbyslug(slug)
        .then((res) => {
          console.log("data @index_slug", res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [slug]);

  console.log("data @index_slug", data);

  return (
    data && (
      <>
        <ResponsiveAppBar />
        <div
          className="mx-[10rem] my-10 px-[10rem] pb-[7rem] pt-[5rem] w-[auto] h-[100]
    bg-white rounded-xl border-2
     "
        >
          <div className="">
            <h1 className="font-bold text-center text-[34px]">{data.title}</h1>
            <br />
            {data.file && data.file != "noimage.jpg" ? (
              <img src={`${API_IMG}/${data.file}`} alt={data.file} />
            ) : (
              ""
            )}
            <br />
            <div className="!justify-center !items-center !mb-10">
              <p
                className="!justify-center !items-center"
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></p>
            </div>
            <div className="mt-[5rem]">
              <span>author : {data.author?.name}</span>
            </div>
            <span>
              createdAt : {moment(data.createdAt).format("DD-MM-YYYY")}
            </span>
            <br />
            <span>
              updatedAt : {moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
            </span>
          </div>
        </div>
      </>
    )
  );
};

export default Index_slug;
