import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import logo_new from "../../assets/final_logo.png";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
var Link = require("react-router-dom").Link;
const Userheader = (props) => {
  const history = useHistory();
  const loc = useLocation();
  console.log("USER HEADERSS", props);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ height: "100px", width: "100vw", backgroundColor: "#ecf4f8" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img
              className="rounded"
              src={logo_new}
              alt="no img"
              style={{
                height: "80px",
                width: "250px",
                marginTop: "10px",
                marginBottom: "8px",
                marginLeft: "15px",
              }}
            />
          </Typography>
          {/* Providing navlinks here */}
          <nav className="nav nav-pills flex-column flex-sm-row">
            {/* <a className="flex-sm-fill text-sm-center nav-link" href="/">
              NOTICES
            </a> */}

            <Link
              to={{
                pathname: "/schedules",
                state: {
                  username: loc.state.username,
                  password: loc.state.password,
                  isValid: loc.state.isValid,
                },
              }}
              style={{textDecoration:"none"}}
            >
              <b className="flex-sm-fill text-sm-center nav-link" >DASHBOARD</b>
            </Link>

            <Link
              to={{
                pathname: "/docupload",
                state: {
                  username: loc.state.username,
                  password: loc.state.password,
                  isValid: loc.state.isValid,
                },
              }}
              style={{textDecoration:"none"}}
            >
              <b className="flex-sm-fill text-sm-center nav-link">DOCUMENTS</b>
            </Link>
          </nav>
          {/* Navlink code ends here */}

          <button
            className="btn btn-dark mx-3"
            onClick={() =>
              props.name === "LOGOUT"
                ? history.push("/")
                : history.push("/dashboard")
            }
          >
            {props.name}
          </button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Userheader;
