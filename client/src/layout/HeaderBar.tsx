/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import InfoIcon from "@mui/icons-material/Info";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { logout } from "../store/userSlice";
import Swal from "sweetalert2";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const { user } = useSelector((state: any) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("user headerbar : ", user);

  const handleLogout = () => {
    console.log("logout");
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval: any;
        Swal.fire({
          // title: "Auto close alert!",
          // html: "I will close in <b></b> milliseconds.",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
    
            dispatch(logout());
            navigate("/");
          },
        }); 
      }
    });

  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(null);

  //"Inbox", "Starred", "Send email", "Drafts"
  const menu = [
    {
      title: "Manage Blog",
      icon: (
        <AppRegistrationTwoToneIcon
          className=" hover:text-[#80cc96]"
          fontSize="medium"
        />
      ),
      path: "/admin/manageblog",
    },
    {
      title: "Manage User",
      icon: (
        <ManageAccountsRoundedIcon
          className="hover:text-[#80cc96]"
          fontSize="medium"
        />
      ),
      path: "/admin/manageuser",
    },
    {
      title: "Aboue Me",
      icon: <InfoIcon className="hover:text-[#80cc96]" fontSize="medium" />,
      path: "/admin/about",
    },
  ];

  const handleMenuItemClick = (path: any) => {
    setSelectedMenuItem(path);
    navigate(path);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <CssBaseline />
        <AppBar position="fixed" open={open} >
          <Toolbar className="bg-[#80cc96]">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div>
              <Typography variant="h6" noWrap component="div">
                Admin
              </Typography>
            </div>

            <div className="!flex underline ml-[85%] cursor-pointer">
              <Typography variant="h6" noWrap component="div">
                <AccountCircleRoundedIcon fontSize="medium" />
                {user.user.name}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer className="" variant="permanent" open={open}>
          <DrawerHeader className="bg-[#80cc96]">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon className="!bg-[#80cc96]" />
              ) : (
                <ChevronLeftIcon className="!text-white" />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menu.map((item, index) => (
              <ListItem
                // className="bg-[#b2cbd2]"
                key={index}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  className="text-[#683e81]"
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    handleMenuItemClick(item.path);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {/* {['All mail', 'Trash', 'Spam'].map((text, index) => ( */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutRoundedIcon className="hover:text-[red]" />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            {/* ))} */}
          </List>
        </Drawer>
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {selectedMenuItem === "/manage" && (
            <Typography paragraph>Content for Manage</Typography>
          )}
          {selectedMenuItem === "/about" && (
            <Typography paragraph>Content for About Me</Typography>
          )}
        </Box> */}
      </Box>
    </div>
  );
}
