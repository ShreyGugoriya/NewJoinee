import React from "react";
import {
  NavLink,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import "./Sidenav.css";
import AdminPic from "../../assets/admin_pic.png";
import logo from "../../assets/logo.png";
// import { Link } from 'react-router';
var Link = require("react-router-dom").Link;
const Sidenav = (props) => {
  const loc = useLocation();
  // console.log(loc.state);
  // console.log(props);
  return (
    <>
      {/* {console.log(props.username)}
      {console.log(props.password)} */}
      <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

      <div className="wrapper">
        <div className="sidebar">
          <img
            src={AdminPic}
            class="rounded-circle"
            style={{
              width: "150px",
              height: "150px",
              marginLeft: "25px",
              marginBottom: "20px",
            }}
            alt=""
          />
          <small
            style={{
              marginLeft: "50px",
              color: "whitesmoke",
              marginBottom: "40px",
              marginTop: "30px",
              textTransform: "uppercase",
              paddingTop: "10px",
            }}
          >
            Hello {loc.state.username}
          </small>
          <ul>
            <li>
              {/* <NavLink to="/dashboard" >
                <i className="fas fa-home"></i>Dashboard
              </NavLink> */}

              <Link
                to={{
                  pathname: "/dashboard",
                  state: {
                    username: loc.state.username,
                    password: loc.state.password,
                  },
                }}
              >
                <i className="fas fa-home" style={{ marginTop: "100px" }}></i>
                Dashboard
              </Link>
            </li>
            <li>
              {/* <NavLink to="/sessions">
                <i className="fas fa-user"></i>Sessions
              </NavLink> */}
              <Link
                to={{
                  pathname: "/sessions",
                  state: {
                    username: loc.state.username,
                    password: loc.state.password,
                  },
                }}
              >
                <i className="fas fa-home"></i>Sessions
              </Link>
            </li>
            <li>
              {/* <NavLink to="/welcomekit">
                <i className="fas fa-address-card"></i>Welcome Kit
              </NavLink> */}
              <Link
                to={{
                  pathname: "/welcomekit",
                  state: {
                    username: loc.state.username,
                    password: loc.state.password,
                  },
                }}
              >
                <i className="fas fa-home"></i>Welcome Kit
              </Link>
            </li>
            <li>
              {/* <NavLink to="/feedback">
                <i className="fas fa-project-diagram"></i>Feedback
              </NavLink> */}
              <Link
                to={{
                  pathname: "/feedback",
                  state: {
                    username: loc.state.username,
                    password: loc.state.password,
                  },
                }}
              >
                <i className="fas fa-home"></i>Queries
              </Link>
            </li>
            <li>
              {/* <NavLink to="/notices">
                <i className="fas fa-blog"></i>Notices
              </NavLink> */}
              <Link
                to={{
                  pathname: "/notices",
                  state: {
                    username: loc.state.username,
                    password: loc.state.password,
                  },
                }}
              >
                <i className="fas fa-home"></i>Notices
              </Link>
            </li>
            {/* <li>
             
              <Link
                to={{
                  pathname: "/schedules",
                  state: {
                    username: loc.state.username,
                    password: loc.state.password,
                  },
                }}
              >
                <i className="fas fa-home"></i>Schedules
              </Link>
            </li>

            <li>
              <Link
                to={{
                  pathname: "/docupload",
                  state: {
                    username: loc.state.username,
                    password: loc.state.password,
                  },
                }}
              >
                <i className="fas fa-home"></i>UPLOAD DOC
              </Link>
            </li> */}

            <li>
              {/* <NavLink to="/documents">
                <i className="fas fa-map-pin"></i>Documents
              </NavLink> */}
              <Link
                to={{
                  pathname: "/documents",
                  state: {
                    username: loc.state.username,
                    password: loc.state.password,
                  },
                }}
              >
                <i className="fas fa-home"></i>Documents
              </Link>
            </li>
          </ul>

          {/* <img
              className="rounded"
              src={logo}
              alt="no img"
              style={{
                height: "95px",
                width: "170px",
                marginTop: "10px",
                marginBottom: "8px",
                marginLeft:"15px"
              }}
            /> */}
        </div>
        {/* <div className="main_content">
          <div className="header">Welcome!! Have a nice day.</div>
          <div className="info">DASHBOARD!</div>
        </div> */}
      </div>
    </>
  );
};

export default Sidenav;
