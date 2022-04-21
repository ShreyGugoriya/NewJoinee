import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";
import "./Feedback.css";
import axios from "axios";
import Header2 from "../Header2/Header2";
import FeedbackTable from "./FeedbackTable";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Feedback = () => {
  const [users, setUsers] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [click, setClick] = useState(false);
  const [filteruser, setFilterUser] = useState([]);
  useEffect(() => {
    const getUsers = () => {
      axios
        .get(" http://localhost:8089/feedback/employee/")
        .then((response) => setUsers(response.data));
    };
    getUsers();
  });

  const renderHomeComponent = () => {
    window.location.reload(false);
  };

  // Logic to filter the employees
  async function filter() {
    setClick(true);
    await axios
      .get(` http://localhost:8089/feedback/filter/${filterName}`, {
        headers: {
          empName: filterName,
        },
      })
      .then((response) => {
        console.log(response.data);
        setFilterUser(response.data);
        //return {filteruser};
      });
  }
  //Logic ends

  return (
    <>
      <Header2 />
      <Sidenav />
      <div className="main_content">
        <h3
          style={{
            margin: "50px 0px 20px",
            marginLeft: "1%",
            fontSize: "2.5rem",
          }}
        >
          <b>Welcome to the queries page</b>
        </h3>
        <div
          className="p-1 bg-light rounded rounded-pill shadow-sm mb-4"
          style={{
            width: "50%",
            marginLeft: "20px",
            marginTop: "50px",
            height: "3rem",
          }}
        >
          <div className="input-group">
            <SearchIcon />
            <input
              style={{ width: "75%" }}
              type="search"
              placeholder="What're you searching for?"
              aria-describedby="button-addon1"
              className="form-control border-0 bg-light"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
            <button className="btn btn-light" onClick={renderHomeComponent}>
              <CloseIcon />
            </button>
            <button className="btn btn-primary" onClick={filter}>
              Search
            </button>
          </div>
        </div>
        {click ? (
          <FeedbackTable users={filteruser} />
        ) : (
          <FeedbackTable users={users} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Feedback;

