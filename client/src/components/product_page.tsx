import React, { useState, useEffect } from "react";
import { getList, remove, save } from "../service/api";
import { Link } from "react-router-dom";
// import _slug from "../pages/user/_slug";
import { TextField, Button } from "@mui/material";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// interface ItemType {
//   name: string;
//   detail: string;
//   price: number;
//   _id: string;
//   // other properties...
// }

interface dataType {
  name: string;
  detail: string;
  price: number;
  _id: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_URL = import.meta.env.VITE_API ? import.meta.env.VITE_API : null;
console.log("API_URL>>>", API_URL);

export default function Product_page() {
  const [data, setData] = useState<dataType[]>([]);
  const [form, setForm] = useState<{ [key: string]: string | File }>({});

  useEffect(() => {
    loadData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadData = async () => {
    getList()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(data);
  // console.log(typeof data[0]?._id);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files ? e.target.files[0] : "",
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };
  // console.log(form);

  const handlesubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formimage = new FormData();
    for (const key in form) {
      // console.log(typeof key);
      formimage.append(key, form[key]);
    }
    // console.log(formimage)
    // console.log(form)
    save(formimage)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleremove = async (id: string) => {
    // console.log(typeof id);
    remove(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div> {/*className="!mx-auto text-center"*/} 
      <h1 className="text-3xl font-bold ">Create Product</h1>
      <div className="">
        <form onSubmit={handlesubmit} encType="multipart/form-data">
          <div>
            <TextField
              id="standard-basic"
              label="Name"
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlechange(e)
              }
              variant="standard"
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Detail"
              name="detail"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlechange(e)
              }
              variant="standard"
            />
          </div>
          <div>
            <TextField
              type="number"
              id="standard-basic"
              label="Price"
              name="price"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlechange(e)
              }
              variant="standard"
            />
          </div>
          {/* <div>
            <TextField
              type="file"
              id="standard-basic"
              label="File"
              name="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlechange(e)
              }
              variant="standard"
            />
          </div> */}

          {/* <label>name:</label>
          <br />
          <input type="text" name="name" onChange={(e) => handlechange(e)} />
          <br />
          <label>detail:</label>
          <br />
          <input type="text" name="detail" onChange={(e) => handlechange(e)} />
          <br />
          <label>price:</label>
          <br />
          <input type="text" name="price" onChange={(e) => handlechange(e)} />
          <br /> */}
          <br />
          <div>
            <input type="file" name="file" onChange={(e) => handlechange(e)} />
          </div>
          <br />
          <Button type="submit" variant="contained">submit</Button>
        </form>
      </div>
      {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">detail</th>
            <th scope="col">price</th>
            <th scope="col">delete</th>
            <th scope="col">edit</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item: ItemType, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.detail}</td>
                  <td>{item.price !== undefined ? item.price : "N/A"}</td>
                  <td>
                    <button onClick={() => handleremove(item._id)}>
                      delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/edit/` + item._id}>edit</Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table> */}
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="!font-bold" align="right">#</TableCell>
            <TableCell className="!font-bold" align="right">name&nbsp;</TableCell>
            <TableCell className="!font-bold" align="right">detail&nbsp;</TableCell>
            <TableCell className="!font-bold" align="right">price&nbsp;</TableCell>
            <TableCell className="!font-bold" align="right">delete&nbsp;</TableCell>
            <TableCell className="!font-bold" align="right">edit&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.detail}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleremove(row._id)}>
                      <DeleteTwoToneIcon fontSize="large"/>
                    </Button></TableCell>
              <TableCell align="right"><Link to={`/admin/edit/` + row._id}><EditTwoToneIcon fontSize="large"/></Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
