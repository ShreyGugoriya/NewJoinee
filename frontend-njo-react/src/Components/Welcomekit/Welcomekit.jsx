import Footer from "../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";
import Header2 from "../Header2/Header2";
import "./Welcomekit.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import WelcomeKitTable from "./WelcomeKitTable";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CloseIcon from "@mui/icons-material/Close";
import AsyncSelect from "react-select/async";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import SortIcon from "@mui/icons-material/Sort";
import { MenuItem, Select } from "@material-ui/core";

const Welcomekit = (props) => {

  let count1=1;

  const loc = useLocation();
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [click, setClick] = useState(false);
  const [filteruser, setFilterUser] = useState([]);

  const [boolFilter, setFilter] = useState(false);
  const [boolDep, setDep] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setValue] = useState("");
  const [statusType, setStatusType] = useState("sort");
  const [boolStatus, setBoolStatus] = useState(false);
  const renderHomeComponent = () => {
    window.location.reload(false);
  };

  const updateStatus = (value) => {
    const article = { status: "Delivery Initiated" };
    axios
      .post(` http://localhost:8089/welcomekit/${value.empId}`, article)
      .then((response) => console.log(response));
  };

  useEffect(() => {
    const getUsers = () => {
      axios
        .get(" http://localhost:8089/welcomekit/employee/")
        .then((response) => setUsers(response.data));
    };
    getUsers();
  });

  // Logic to filter the employees
  async function filter() {
    console.log(
      "BOOOOOOOOL",
      boolFilter,
      boolDep,
      searchValue,
      selectedValue,
      boolStatus,
      statusType
    );
    setClick(true);
    if (boolFilter) {
      await axios
        .get(` http://localhost:8089/welcomekit/filter/${searchValue}`, {
          headers: {
            status: searchValue,
            kit_id: searchValue,
          },
        })
        .then((response) => {
          console.log(response.data);
          setFilterUser(response.data);
        });
    } else if (boolDep) {
      getByDep();
    } else {
      getByStatus();
    }
  }
  //Logic ends

  async function getByDep() {
    await axios
      .get(` http://localhost:8089/welcomkit/dept/${selectedValue.dept_name}`)
      .then((response) => {
        console.log(response.data);
        setFilterUser(response.data);
      });
  }

  async function getByStatus() {
    await axios
      .get(` http://localhost:8089/welcomkit/status/${statusType}`)
      .then((response) => {
        console.log(response.data);
        setFilterUser(response.data);
      });
  }

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

  const handleInputChange = (value) => {
    setValue(value);
  };
  const handleChange = (value) => {
    setSelectedValue(value);
    setDep(true);
  };

  const handleStatusChange = (value) => {
    setStatusType(value.target.value);
    setBoolStatus(true);
  };
  return (
    <>
      <Header2 />
      <Sidenav props={props} />
      <div className="main_content">
        <h3
          style={{
            height: "20px",
            marginTop: "50px",
            marginLeft: "1%",
            fontSize: "2.5rem",
          }}
        >
          <b>Onboarding kit status for new joinees</b>
        </h3>
        <div
          className="p-1 bg-light rounded rounded-pill shadow-sm mb-4"
          style={{ width: "50%", marginLeft: "5px", marginTop: "50px" }}
        >
          <div className="input-group">
            <SearchIcon />
            <input
              style={{ width: "80%" }}
              type="search"
              placeholder="What're you searching for?"
              aria-describedby="button-addon1"
              className="form-control border-0 bg-light"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setFilter(true);
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

        <div className="xyz">
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
          <div style={{ marginLeft: "10px" }}>
            <button
              className="btn btn-secondary "
              style={{
              
                height: "50px",
                width: "100px",
                color: "White",
              }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusType}
                label="Status"
                onChange={handleStatusChange}
                style={{ color: "white" }}
              >
                <MenuItem value="sort">
                  <SortIcon />
                </MenuItem>
                <MenuItem value="abc">Not initiated</MenuItem>
                <MenuItem value="initiated">Delivery Initiated</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
              </Select>
            </button>
          </div>

          <div>
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

        {click ? (
          <table
            className="table"
            style={{
              width: "88%",
              marginLeft: "5px",
              marginTop: "1.5%",
              borderCollapse: "separate",

              borderSpacing: " 0 15px",
            }}
          >
            <thead className="thead-dark" style={{ backgroundColor: "black" }}>
              <tr style={{ color: "white" }}>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Joining Date</th>
                <th scope="col">Initiate</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteruser.map((value) => {
                return (
                  <>
                    <tr
                      style={{
                        height: "70px",
                        backgroundColor: "#fff",
                        // backgroundColor:"#f8f8ff",
                        boxShadow:
                          "0 1px 6px rgb(0 0 0 / 12%), 0 1px 4px rgb(0 0 0 / 24%)",
                      }}
                    >
                      <th scope="row">{value.empId}</th>
                      <th scope="row">{value.empName}</th>
                      <th scope="row">{value.designation}</th>
                      <th scope="row">{value.joiningDate}</th>
                      {/* <th scope="row">{value.status}</th> */}

                      <td>
                        <LocalShippingIcon
                          style={{ marginLeft: "15px" }}
                          onClick={() => {
                            updateStatus(value);
                            window.location.reload(false);
                          }}
                        ></LocalShippingIcon>
                      </td>

                      {(() => {
                        if (value.status) {
                          return <td>{value.status}</td>;
                        } else {
                          return <td>Not initiated</td>;
                        }
                      })()}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        ) : (
          <WelcomeKitTable users={users} />
        )}
      </div>

      <Footer />
    </>
  );
};
export default Welcomekit;