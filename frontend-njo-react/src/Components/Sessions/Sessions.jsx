import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";
import Header2 from "../Header2/Header2";
import { Button } from "@mui/material";
import axios from "axios";
import "./Sessions.css";
import SessionPopup from "./SessionPopup";
import SearchIcon from "@mui/icons-material/Search";
import SessionTable from "./SessionTable";
import CloseIcon from "@mui/icons-material/Close";
import SortIcon from "@mui/icons-material/Sort";
import Sort from "@mui/icons-material/Sort";
import { MenuItem, Select } from "@material-ui/core";
import {
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

import AsyncSelect from "react-select/async";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import FilterListIcon from "@material-ui/icons/FilterList";

const Sessions = (props) => {
  const loc = useLocation();
  const [users, setUsers] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [sesName, setSessionName] = useState("");
  const [ses_desc, setSessionDescription] = useState("");
  const [ses_duration, setSessionDuration] = useState("");
  const [ses_link, setSessionLink] = useState("");
  const [sesDate, setSessionDate] = useState("");
  const [dept_name, setDeptName] = useState("");

  //For filtering
  const [filterDept, setFilterDept] = useState("");
  const [click, setClick] = useState(false);
  const [filteruser, setFilterUser] = useState([]);
  const [str, setStr] = useState("");
  const [sortType, setSortType] = useState("sort");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [boolCalendar, setCalendar] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [boolFilter, setFilter] = useState(false);
  const [boolSort, setSort] = useState(false);
  const [inputValue, setValue] = useState("");

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
    setCalendar(true);
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    if (month == 10) month = month;
    else month = "0" + month;

    if (day<10)
      day="0"+day

    var newdate = year + "-" + month + "-" + day;
    console.log(newdate, typeof newdate);
    setFilterDept(newdate);
  };

  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleChange = (value) => {
    setFilter(true);
    setSelectedValue(value);

    setFilterDept(value.dept_name);
  };

  const fetchData = () => {
    const value = {};
    console.log(" called");
    return axios
      .get("http://localhost:8089/department/", {
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

  useEffect(() => {
    const getUsers = () => {
      axios
        .get("http://localhost:8089/session/department/")
        .then((response) => setUsers(response.data));
    };
    getUsers();
  });

  //POSTING DATA
  const postData = () => {
    if (
      sesName.length === 0 ||
      ses_desc.length === 0 ||
      dept_name.length === 0 ||
      ses_duration.length === 0 ||
      sesDate.length === 0 ||
      ses_link.length === 0
    ) {
      setButtonPopup(true);
      alert("Fields cannot be empty");
    } else {
      axios.post(`http://localhost:8089/session/${dept_name}`, {
        sesName,
        ses_desc,
        dept_name,
        ses_duration,
        sesDate,
        ses_link,
      });
      setButtonPopup(false);
    }
  };

  const renderHomeComponent = () => {
    window.location.reload(false);
  };

  async function SortUsers() {
    console.log(sortType);
    setClick(true);
    await axios
      .get(`http://localhost:8089/session/orderByDate/${sortType}/ascending`)
      .then((response) => {
        console.log(response.data);
        setFilterUser(response.data);
        //return {filteruser};
      });
  }

  // Logic to filter the employees
  async function filter() {
    setClick(true);
    
    console.log("aaaaaaaaaaa", boolCalendar, boolFilter, filterDept, boolSort, sortType)
    // setStr(filterDept);

    if (boolSort) {
      SortUsers();
      setSort(false);
    } else if (boolCalendar || boolFilter) {
      await axios
        .get(`http://localhost:8089/session/filter/${filterDept}`, {
          headers: {
            filterDept: dept_name,
          },
        })
        .then((response) => {
          console.log(response.data);
          setFilterUser(response.data);
          //return {filteruser};
        });

      setCalendar(false);
      setFilter(false);
    }
    setFilterDept("");
    setCalendar(false);
      setFilter(false);
      setSort(false);
  }
  //Logic ends

  const handleSortChange = (event) => {
    setSort(true);
    setSortType(event.target.value);
    // SortUsers();
  };

  return (
    <>
      <Header2 />
      <Sidenav />
      <div className="main_content">
      <h3
          style={{
            height: "20px",
            marginTop: "40px",
            marginLeft: "1%",
            fontSize: "2.5rem",
          }}
        >
          <b>Welcome to Sessions Page</b>
        </h3>
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
                  // style={}
                  type="search"
                  placeholder="What're you searching for?"
                  aria-describedby="button-addon1"
                  className="form-control border-0 bg-light"
                  value={filterDept}
                  onChange={(e) => { setFilter(true);setFilterDept(e.target.value)}}
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
        </div>

        <div
          style={{ alignSelf: "center", marginTop: "20px", flex: "flex-end" }}
        >
          <div>
            <button
              type="button"
              className="btn btn-success float-right"
              style={{
                marginLeft: "75%",
                marginTop: "-25px",
                marginBottom: "15px",
                height: "50px",
                width: "10rem",
              }}
              onClick={() => setButtonPopup(true)}
            >
              ADD SESSION
            </button>
          </div>
        </div>

        <SessionPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <form style={{ marginTop: "10px" }}>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Session Name:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={sesName}
                onChange={(e) => setSessionName(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Description:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                onChange={(e) => setSessionDescription(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput3">Department:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setDeptName(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput4">Duration:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput4"
                onChange={(e) => setSessionDuration(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput5">Date:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput5"
                placeholder="YYYY-MM-DD"
                onChange={(e) => setSessionDate(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput6">Link:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput6"
                onChange={(e) => setSessionLink(e.target.value)}
              />
            </div>
            <br />

            <button
              type="button"
              class="btn btn-success"
              style={{ marginTop: "2%" }}
              onClick={() => {
                postData();
              
              }}
            >
              Create
            </button>
          </form>
        </SessionPopup>

        {/*Adding the table contents below */}
        {click ? (
          <>
            <table
              className="table"
              style={{
                width: "88%",
                marginLeft: "5px",
                marginTop: "1.5%",
                minWidth: "200px",
              }}
            >
              <thead
                className="thead-dark"
                style={{ backgroundColor: "black" }}
              >
                <tr
                  style={{
                    "&:hover": {
                      background: "#f00",
                    },
                    color: "white",
                    height: "20px",
                  }}
                >
                  <th scope="col">Session name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Session Duration</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteruser.map((value) => {
                  return (
                    <>
                      <tr style={{
                    height: "70px",
                    backgroundColor: "#fff",
                    // backgroundColor:"#f8f8ff",
                    boxShadow:
                      "0 1px 6px rgb(0 0 0 / 12%), 0 1px 4px rgb(0 0 0 / 24%)",
                  }}>
                        <th scope="row">{value.sesName}</th>
                        <td>{value.ses_desc}</td>
                        <td>{value.ses_duration}</td>
                        <td>{value.sesDate}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <SessionTable users={users} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Sessions;
