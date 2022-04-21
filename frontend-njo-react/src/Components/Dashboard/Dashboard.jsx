// export default Dashboard;
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";
import axios from "axios";
import "./Dashboard.css";
import UserCard from "./UserCard";
import SearchIcon from "@mui/icons-material/Search";
import UserPopup from "./UserPopup";
import {
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import CloseIcon from "@mui/icons-material/Close";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AsyncSelect from "react-select/async";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import FilterListIcon from "@material-ui/icons/FilterList";

import SortIcon from "@mui/icons-material/Sort";
import { MenuItem, Select } from "@material-ui/core";
// import Option from "react-select/dist/declarations/src/components/Option";
const Dashboard = (props) => {
  const loc = useLocation();
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [emp_name, setName] = useState("");
  const [filteruser, setFilterUser] = useState([]);
  const [click, setClick] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setValue] = useState("");
  const [departments, setDepartments] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sortType, setSortType] = useState("sort");
  const [boolCalendar, setCalendar] = useState(false);
  const [boolFilter, setFilter] = useState(false);
  const [boolSort, setSort] = useState(false);
  const [boolDept, setDept] = useState(false);

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
    setCalendar(true);
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    if (month == 10) month = month;
    else month = "0" + month;
    if (day < 10) day = "0" + day;

    var newdate = year + "-" + month + "-" + day;
    console.log(newdate, typeof newdate);
    setName(newdate);
  };
  // image
  const imgsrc =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";
  const history = useHistory();

  useEffect(() => {
    const getUsers = () => {
      axios
        .get(" http://localhost:8089/employee/", {
          auth: {
            username: loc.state.username,
            password: loc.state.password,
          },
        })
        .then((response) => {
          setUsers(response.data);
        });
    };
    const getDepartment = () => {
      // console.log("Am here")
      axios
        .get(" http://localhost:8089/department/", {
          auth: {
            username: loc.state.username,
            password: loc.state.password,
          },
        })
        .then((response) => {
          console.log(response.data);
          setDepartments(response.data);
        });
      return departments;
    };

    getUsers();
    getDepartment();
  }, [loc]);

  const fetchData = () => {
    const value = {};
    console.log(" called");
    return axios
      .get(" http://localhost:8089/department/", {
        auth: {
          username: loc.state.username,
          password: loc.state.password,
        },
      })
      .then((result) => {
        console.log(result.data);
        const res = result.data;
        // res.map((curr)=>value.append(curr.dept_name))

        // console.log("value",value)
        return res;
      });
  };

  const renderHomeComponent = () => {
    window.location.reload(false);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (value) => {
    setValue(value);
  };
  const handleChange = (value) => {
    // setFilter(true);
    setDept(true);
    setSelectedValue(value);
    // setName(value.dept_name);
  };
  // Logic to filter the employees
  async function filter() {
    setClick(true);
    // comment
    console.log(
      boolCalendar,
      boolFilter,
      boolSort,
      boolDept,
      sortType,
      emp_name,
      selectedValue
    );
    if (boolCalendar || boolFilter) {
      await axios
        .get(` http://localhost:8089/employee/fuzzyfilter/${emp_name}`, {
          headers: {
            emp_name: emp_name,
          },
        })
        .then((response) => {
          console.log(response.data);
          setFilterUser(response.data);
          //return {filteruser};
        });

      setCalendar(false);
      setFilter(false);
    } else if (boolSort) {
      SortUsers();
      setSort(false);
    } else if (boolDept) {
      DeptUsers();
    }

    setName("");
    setFilter(false);
    setCalendar(false);
    setSort(false);
    setDept(false);
  }

  async function SortUsers() {
    console.log(sortType);
    setClick(true);
    await axios
      .get(`http://localhost:8089/employee/orderby/${sortType}`)
      .then((response) => {
        console.log(response.data);
        setFilterUser(response.data);
        //return {filteruser};
      });
  }
  async function DeptUsers() {
    console.log(sortType);
    setClick(true);
    await axios
      .get(
        `http://localhost:8089/employee/department/${selectedValue.dept_name}/`
      )
      .then((response) => {
        console.log(response.data);
        setFilterUser(response.data);
        //return {filteruser};
      });
  }

  const handleSortChange = (event) => {
    setSort(true);
    setSortType(event.target.value);
  };

  //Logic ends
  return (
    <>
      <Sidenav />
      <Header name="LOGOUT" />

      <div className="main_content">
        <div className="demo">
          <div
            className="p-1 bg-light rounded rounded-pill shadow-sm mb-4"
            style={{
              width: "40%",
              marginLeft: "110px",
              marginTop: "50px",
              height: "3rem",
            }}
          >
            <div>
              <div className="input-group">
                <SearchIcon />
                <input
                  style={{ width: "75%" }}
                  type="search"
                  placeholder="What're you searching for?"
                  aria-describedby="button-addon1"
                  className="form-control border-0 bg-light"
                  value={emp_name}
                  onChange={(e) => {
                    setFilter(true);
                    setName(e.target.value);
                  }}
                />
                <button className="btn btn-light" onClick={renderHomeComponent}>
                  <CloseIcon />
                </button>
                <button className="btn btn-primary" onClick={filter}>
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="button-wrapper">
            {/* Date Picker*/}
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  label="Material Date Picker"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </div>

            {/* Select box*/}
            <div>
              <AsyncSelect
                style={{ height: "100px", width: "10rem" }}
                cacheOptions
                defaultOptions
                value={selectedValue}
                getOptionLabel={(e) => e.dept_name}
                getOptionValue={(e) => e.dept_name}
                loadOptions={fetchData}
                onInputChange={handleInputChange}
                onFocus={handleChange}
                onChange={handleChange}
              />
            </div>
            {/* <Select options={fetchData} onChange={handleChange} value={selectedValue} placeholder="Select a region"/> */}

            <div>
              {/* Sort (braod)*/}
              <button
                className="btn btn-secondary "
                style={{
                  marigLeft: "auto",
                  height: "50px",
                  width: "100px",
                  color: "White",
                }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortType}
                  label="Sort"
                  onChange={handleSortChange}
                  style={{ color: "white" }}
                >
                  <MenuItem value="sort">
                    <SortIcon />
                  </MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="department">Department</MenuItem>
                </Select>
              </button>

              {/* Sort (apply)*/}
              <button
                className="btn btn-secondary "
                style={{
                  marginLeft: "auto",
                  height: "50px",
                  width: "50px",
                }}
                onClick={filter}
              >
                <FilterListIcon />
              </button>
            </div>
          </div>

          {/* Adding dropdown here */}

          {/* Ending dropdown here */}
        </div>

        <div className="join-temp">
          <button
            type="button"
            className=" btn btn-success float-right"
            style={{
              height: "50px",
              width: "10rem",
            }}
            onClick={toggleModal}
          >
            ADD JOINEE
          </button>
        </div>

        {modal && <UserPopup toggleModal={toggleModal} />}

        <h2 style={{ marginTop: "20px" }}>
          <b>List of New Joinees</b>
        </h2>
        {click ? <UserCard users={filteruser} /> : <UserCard users={users} />}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
