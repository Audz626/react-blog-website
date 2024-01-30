/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
// import React,{useState} from 'react'
import "./App.css";
import "react-quill/dist/quill.snow.css"
import Product from "./components/product_page";
import Usermanager from "./pages/admin/UserManage";
import Product_edit from "./components/form_edit";
import { chkcurrentUser } from "./service/auth";
// import MiniDrawer from "./layout/HeaderBar";
import Login from "./pages/auth/Login";
import Aboutme from "./components/admin/Aboutme";
import SignInSide from "./pages/auth/Register";
import _slug from "./pages/user/_slug";
import Myblog from "./pages/user/Myblog";
import Editblog from "./pages/user/Editblog";
import Index from "./pages/Index_page";
import Blogmanage from "./pages/admin/Blogmanage";
import Edit from "./pages/admin/Edit";

import HomepageUser from "./pages/user/Homepage";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import { loginStore } from "./store/userSlice";
import Pagenotfound from "./pages/Pagenotfound";

import ResponsiveAppBar from "./layout/Appbar";
import CreateBlog from "./components/CreateBlog";
import Index_slug from "./pages/Index_slug";

function App() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const idToken = localStorage.getItem("token");
  const current_user_token = `Bearer ${idToken}`;

  chkcurrentUser(current_user_token)
    .then((res) => {
      console.log("res.data @app", res.data);
      const data = {
        id: res.data._id,
        name: res.data.name,
        role: res.data.role,
        token: current_user_token,
      };
      console.log(res);
      dispatch(loginStore(data));
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <BrowserRouter>
      <>
        {/* <CssBaseline /> */}
        {/* <HomepageUser>audddxd</HomepageUser> */}
        <Routes>
          <Route path="*" element={<Pagenotfound />}></Route>
          <Route path="/" element={<Index />}></Route>
          <Route path="/register" element={<SignInSide />} />
          <Route path="/login" element={<Login />} />
          <Route path="/read/:slug" element={<Index_slug />} />

          {/* User */}
          <Route
            path="/user/*"
            element={
              <UserRoute>
                <Routes>
                  <Route path="index" element={<HomepageUser />} />
                  <Route path="blog/read/:slug" element={<_slug />} />
                  <Route path="createblog" element={<CreateBlog />} />
                  <Route path="myblog" element={<Myblog />} />
                  <Route path="myblog/editblog/:id" element={<Editblog />} />
                  
                </Routes>
              </UserRoute>
            }
          />
          {/* Use "/admin/*" as the parent route path */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Routes>
                  <Route path="about" element={<Aboutme />} />
                  <Route path="manageblog" element={<Blogmanage />} />
                  <Route path="manageuser" element={<Usermanager />} />
                  {/* <Route path="edit/:id" element={<Product_edit />} /> */}
                  <Route path="edit/:id" element={<Edit />} />
                </Routes>
              </AdminRoute>
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
