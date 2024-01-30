/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LoginIcon from "@mui/icons-material/Login";
import BioLogo from "../assets/biology.png";
import ProfileLogo from "/profile.png";
import Swal from "sweetalert2";

import { logout } from "../store/userSlice";

const pages = [
  {
    title: "Blog",
    icon: "",
    to: "/user/index",
  },
  {
    title: "CareteBlog",
    icon: "",
    to: "/user/createblog",
  },
  {
    title: "MyBlog",
    icon: "",
    to: "/user/myblog",
  },
  {
    title: "About us",
    icon: "",
    to: "/aboutus",
  },
];

const pages2 = [
  {
    title: "Blog",
    icon: "",
    to: "/",
  },
  {
    title: "CreateBlog",
    icon: "",
    to: '/login',
  },
  {
    title: "Contract",
    icon: "",
    to: "/contract",
  },
];

const authen = [
  {
    title: "Register",
    icon: <PeopleAltOutlinedIcon />,
    to: "/register",
  },
  {
    title: "Login",
    icon: <LoginIcon />,
    to: "/login",
  },
];

const settings = [
  // {
  //   title: "Profile",
  //   icon: "",
  //   to: "/profile",
  // },
  {
    title: "Logout",
    icon: "",
    to: "/logout",
  },
];

interface RootState {
  user: {
    user: any;
    id: string;
    // Define the structure of your user object here
    // For example:
    name: string;
    role: string;
    token: string;
    // Add other properties as needed
  };
  // Add other slices of your Redux state as needed
}

function ResponsiveAppBar() {
  const { user } = useSelector((state: RootState) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("data appbar :", user.user.token);
  console.log("data appbar:", user);
  // console.log("user appbar :", Object.keys(user).length);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate("/");
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    console.log('event @appbar',event)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  // const tologin = () => {
  //   Swal.fire({
  //     title: "Please Login...",
  //     // text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "login"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       navigate('/login');
  //     }
  //   });
  // }

  return (
    <AppBar position="sticky" style={{ backgroundColor: "#80cc96 " }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <IconButton>
              <Avatar alt="Remy Sharp" src={BioLogo} />
            </IconButton>
          </Typography>
          {/* /LOGO */}

          {/* Minimize Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page.to} style={{ textDecoration: "none" }}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}

              {authen.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page.to} style={{ textDecoration: "none" }}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* /Minimize Menu */}

          {/* LOGO Minimize */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <IconButton>
              <Avatar
                alt="Remy Sharp"
                src={ProfileLogo}
              />
            </IconButton>
          </Typography>
          {/* /LOGO Minimize */}

          {/* Menu Left Full */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user.user.token
              ? pages.map((page, index) => (
                  <Link to={page.to} className="inline-block bg-[#80cc96] rounded-full text-sm font-semibold text-gray-700 no-underline transition-transform duration-300 ease-in-out
                  hover:text-white
                  hover:-translate-y-1 
                    " >
                    <Button
                    className="!rounded-full hover:!bg-[#ffffff] hover:rounded-full hover:text-[black]"
                      key={index}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", mr: 5 }}
                    >
                      {page.title}
                    </Button>
                  </Link>
                ))
              : pages2.map((page, index) => (
                  <Link to={page.to}
                  className="inline-block bg-[#80cc96] rounded-full text-sm font-semibold text-gray-700 no-underline transition-transform duration-300 ease-in-out
                  hover:text-white
                  hover:-translate-y-1 
                    " >
                    <Button
                    className="!rounded-full hover:!bg-[#ffffff] hover:rounded-full hover:text-[black]"
                      key={index}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", mr: 5 }}
                    >
                      {page.title}
                    </Button>
                   </Link>
                ))}
          </Box>
          {/* /Menu Left Full */}

          {/* Menu Right Full */}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {!user.user.token &&
              authen.map((page, index) => (
                <div >
                    {/* hover:bg-[#006c5b] */}

                  <Link
                  className="inline-block bg-[#80cc96] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 no-underline transition-transform duration-300 ease-in-out
                  hover:text-white
                  hover:-translate-y-1 
                    " 
                  to={page.to}>
                    <Button
                    className="!rounded-full hover:!bg-[#ffffff] hover:rounded-full hover:text-[black]"
                      key={index}
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "white",
                        mr: 2,
                      }}
                      startIcon={page.icon}
                    >
                      {page.title}
                    </Button>
                  </Link>
                </div>
              ))}
          </Box>
          {/* /Menu Right Full */}

          {/* User Menu */}
          {user.user.token && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={ProfileLogo}
                  />
                  :{user.user.name}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={index}
                    onClick={
                      setting.title == "Logout"
                        ? handleLogout
                        : handleCloseUserMenu
                    }
                  >
                    <Link to={setting.to} style={{ textDecoration: "none" }}>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {/* /User Menu */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
