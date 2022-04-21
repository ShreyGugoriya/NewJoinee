import * as React from "react";
import { useState, useEffect } from "react";
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
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
const theme = createTheme();

export default function Login() {
  let history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  // const toDashboard = () => {
  // return history.push("/dashboard");
  // };

  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const url="http://localhost:8089/api/login/${username}/${password}";

  async function getLogin() {
    await axios
      .get(` http://localhost:8089/api/login/admin/user/${username}/${password}`, {
        headers: {
          username: username,
          password: password,
        },
      }).then((response) => {
        setLogin(response);
        console.log(response.data);
       if (response.data.role === "ADMIN") return history.push({
         pathname:"/dashboard",
         state:{username:username,password:password},
       });
       else if (response.data.role === "USER")return history.push({
         pathname:"/schedules",
         state:{username:username,password:password,isValid:response.data.isValid},
        //  console.log(response.data.isValid)
       });
       else return alert("Access denied");
     });
      // .then((response) => {
      //   setLogin(response);
      //   if (response.data === true) return history.push({
      //     pathname:"/dashboard",
      //     state:{username:username,password:password},
      //   });
      //   else return alert("Access denied");
      // });
  }
  return (
    <div className="login-container">
    <div className="outer">
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://www.zenefits.com/workest/wp-content/uploads/2018/08/bigstock-Businessman-Employed-After-A-J-88321580-e1535489363894.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
                Login
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
                  id="email"
                  label="Username"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {/* <NavLink to="/dashboard"> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={getLogin}
                >
                  Login
                </Button>
                {/* </NavLink> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
    </div>
  );
}
