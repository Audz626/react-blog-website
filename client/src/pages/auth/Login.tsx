/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../service/auth";
import { loginStore } from "../../store/userSlice";
import Swal from "sweetalert2";

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Green Blog
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Loin() {
  const nevigated = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sendData = {
      name: data.get("name"),
      password: data.get("password"),
    };
    console.log("data LoginPage", sendData);
    console.log({
      name: data.get("name"),
      password: data.get("password"),
    });

    login(sendData)
      .then((res) => {
        console.log("payload data Loginpage", res.data);
        const datalist = {
          id: res.data.payload.user.id,
          name: res.data.payload.user.name,
          role: res.data.payload.user.role,
          token: res.data.token,
        };
        console.log("datalist", datalist);

        let timerInterval: any;
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

            dispatch(loginStore(datalist));
            localStorage.setItem("token", res.data.token);
            roleRedirect(res.data.payload.user.role);
          },
        });
        // nevigated('/user/index');
      })
      .catch((err) => {
        console.log("err", err.response.data);
        let timerInterval: any;
        Swal.fire({
          // title: "Auto close alert!",
          // html: "I will close in <b></b> milliseconds.",
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data,
              // footer: '<a href="#">Why do I have this issue?</a>'
            });
          },
        });
      });
  };

  const roleRedirect = (role: any) => {
    if (role === "admin") {
      nevigated("/admin/manage");
    } else {
      nevigated("/user/index");
    }
    // console.log("role", role);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Homepage
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
