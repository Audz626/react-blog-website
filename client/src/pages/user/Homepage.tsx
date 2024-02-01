/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { getList, searchData } from "../../service/blog";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import SearchIcon from "@mui/icons-material/Search";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import NoimageLogo from "../../assets/noimage.jpg";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import "../../assets/style/input.css"
import "../../assets/style/manageindex.css"

const API_IMG = import.meta.env.VITE_IMG ? import.meta.env.VITE_IMG : "";

// ต้องรับค่าเป็นคำว่า "children" เท่านั้น เป็นคำอื่นติด err
export default function Homepage() {
  // console.log("Homepage api img",API_IMG);
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    getList()
      .then((res) => {
        // console.log('homepage :',res.data)
        setData(res.data);
      })
      .catch((err) => {
        console.log("homepage err :", err);
      });
  }, [search]);

  const handleSearch = async () => {
    console.log("data search @hompage user :", search);
    searchData(search)
    .then((res) => {
      console.log("data resp @hompage user",res.data);
      setData(res.data);
    }).catch((err) => {
      console.error(err);  
    });
  };

  const handlePageChange = (_event: any, newPage: any) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginationData = data.slice(startIndex, endIndex);

  console.log("homepage", data);

  return (
    <>
      <div className="manage mx-auto my-5 px-[10rem]">
        {/* <TextField className="bg-white hover:!border-[#39947D]" id="outlined-basic" value={search} onChange={(e) => setSearch(e.target.value)} label="Search" variant="outlined" /> */}
        <input
          className="search rounded-full w-[300px] h-[40px] hover:border-[#39947D] shadow-lg"
          type="text"
          placeholder="   Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 text-white rounded-full w-[40px] h-[40px] bg-[#39947D] border-2 border-[#39947D]"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="setcard manage mx-auto my-5 px-[10rem] grid grid-cols-4 gap-4">
        {paginationData?.map((data, index) => (
          <Link to={`/read/${data.slug}`}>
            <Card
              className="!rounded-xl !shadow-lg hover:!text-[#39947D]"
              key={index}
              sx={{ maxWidth: 345 }}
            >
              <div className="!overflow-hidden !rounded-t-[1rem] !aspect-w-1 !aspect-h-1">
                <CardMedia
                  className="max-w-full max-h-full object-cover cursor-pointer rounded-t-[1rem] transition-transform !duration-500 ease-in-out hover:scale-110 aspect-w-1 aspect-h-1"
                  component="img"
                  alt={data.title}
                  height="140"
                  image={
                    data.file && data.file != "noimage.jpg"
                      ? `${API_IMG}/${data.file}`
                      : NoimageLogo
                  }
                />
              </div>

              <CardContent>
                <Typography
                  className="!font-bold !text-[19.125px] hover:!text-[#39947D] text-ellipsis overflow-hidden whitespace-nowrap"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {data.title}
                </Typography>
                <div className="overflow-hidden">
                  <Typography variant="body2" color="text.secondary">
                    <span className="truncate overflow-ellipsis font-bold hover:!text-[#000000]">
                      {/* {data.summary?data.summary:data.title} */}
                      {data.slug ? data.slug : "no slugdata"}
                    </span>
                    {/* <p className="content" dangerouslySetInnerHTML={{__html:data.content}} /> */}
                  </Typography>
                </div>
              </CardContent>
              <CardActions className="!font-semibold float-end mr-1">
                {/* <Button className="hover:!bg-[red] !rounded-full" size="small">
                Share
              </Button> */}
                <Link to={`/user/blog/read/${data.slug}`}>Read more</Link>
              </CardActions>
            </Card>
          </Link>
        ))}
      </div>
      <div className="justify-center flex">
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
    </>
  );
}
