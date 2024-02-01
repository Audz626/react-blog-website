/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getblogbyslug } from "../../service/blog";
import moment from "moment";
import "../../assets/style/quill.css";
import "../../assets/style/slug.css"

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

const _slug = () => {
  const { slug } = useParams();
  console.log("slug @_slug", slug);
  const [data, setData] = useState<BlogData | null>(null);
  console.log("data @_slug", data);
  useEffect(() => {
    if (slug) {
      getblogbyslug(slug)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [slug]);
  return (
    data && (
      <div
        className="slug mx-[10rem] my-10 p-[10rem] w-[auto] h-[100]
    bg-white rounded-xl border-2
     "
      >
        <div>
          <h1 className=" title font-bold text-center text-[30px]">{data.title}</h1>
          <br />
          {data.file && data.file != "noimage.jpg" ? (
            <div className="w-[auto] flex justify-center items-center">
              <img
                src={`${API_IMG}/${data.file}`}
                alt={data.file}
              />
            </div>
          ) : (
            ""
          )}
          <br />
          <div className="!justify-center !items-center !mb-10">
            <p
              className="content !justify-center !items-center grid"
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></p>
          </div>
          <div className="mt-[5rem]">
            <span>author : {data.author?.name}</span>
          </div>
          <span>createdAt : {moment(data.createdAt).format("DD-MM-YYYY")}</span>
          <br />
          <span>
            updatedAt : {moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
          </span>
        </div>
      </div>
    )
  );
};

export default _slug;
