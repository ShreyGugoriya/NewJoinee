import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Header2 from "../Header2/Header2";
import CancelIcon from "@mui/icons-material/Cancel";
import UserPopup from "../Dashboard/UserPopup";
import "./UserInformation.css";
import Userheader from "../Userheader/Userheader";
import e from "cors";
import { Pending } from "@mui/icons-material";
import OutboxIcon from "@mui/icons-material/Outbox";
const UserInformation = (props) => {
  const loc = useLocation();
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [click, setClick] = useState(false);
  const [ses, setSes] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [feedclick, setFeedclick] = useState(false);

  const [doc, setDoc] = useState([]);
  const [clickdoc, setClickdoc] = useState(false);
  const [displayStatus, setStatus] = useState([]);
  const [modal, setModal] = useState(false);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");

  const [trackerDocsApprove, setTrackerDocsApprove] = useState(false);
  const [trackerDocsSubmitted, setTrackerDocsSubmitted] = useState(false);
  const [trackerKitStatus, setTrackerKitStatus] = useState("");
  const [hrFeedData, setHrFeedData] = useState("");
  const employeeid = loc.state.id;
  const employeename = loc.state.name;
  const toggle = () => {
    setClick(!click);
    setSes(users.department.session);
    //console.log(ses);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const togglefeedback = () => {
    setFeedclick(!feedclick);
  };

  const toggledocument = () => {
    setClickdoc(!clickdoc);
  };

  useEffect(() => {
    const getUsers = () => {
      axios
        .get(` http://localhost:8089/employee/${employeeid}`, {
          auth: {
            username: loc.state.username,
            password: loc.state.password,
          },
        })
        .then((response) => {
          setUsers(response.data);

          setEmployeeName(response.data.emp_name);
          setEmployeeId(response.data.emp_email);
          setEmployeeAddress(response.data.emp_address);
          setEmployeePhone(response.data.emp_phone);
        });
    };

    const getStatus = () => {
      axios
        .get(` http://localhost:8089/welcomekit/filter/${employeename}`, {
          auth: {
            username: loc.state.username,
            password: loc.state.password,
          },
        })
        .then((res) => {
          console.log(res.data);
          setStatus(res.data);
        });
    };

    const getTrackerDetails = () => {
      axios
        .get(` http://localhost:8089/status/employee/${employeeid}`, {
          auth: {
            username: loc.state.username,
            password: loc.state.password,
          },
        })
        .then((response) => {
          console.log(response.data.documentSubmitted);

          setTrackerDocsSubmitted(response.data.documentSubmitted);

          setTrackerDocsApprove(response.data.documentApproved);
        });
    };

    const getTrackerKitStatus = () => {
      axios
        .get(` http://localhost:8089/welcomekit/employee/${employeeid}`, {
          auth: {
            username: loc.state.username,
            password: loc.state.password,
          },
        })
        .then((response) => {
          console.log(response.data.status);
          setTrackerKitStatus(response.data.status);
        });
    };

    getTrackerKitStatus();

    getTrackerDetails();

    getUsers();
    getStatus();
  }, [loc]);

  const putData = () => {
    axios
      .put(` http://localhost:8089/employee/${employeeid}`, {
        emp_name: employeeName,
        emp_email: employeeId,
        emp_address: employeeAddress,
        emp_phone: employeePhone,
      })
      .then((response) => console.log("updating data"))
      .catch((error) => {
        console.log(error);
      });
  };
  //api call to get all feedback

  const getFeedback = () => {
    console.log("Feedback function called");
    axios
      .get(` http://localhost:8089/feedback/employee/${employeeid}`, {
        auth: {
          username: loc.state.username,
          password: loc.state.password,
        },
      })
      .then((response) => {
        console.log(response);
        setFeedback(response.data);
      });
  };
  //posting hr feedback
  const postHrFeed = () => {
    console.log("IDDDDDDDDDd", employeeid);
    console.log("Function called to post a reply by HRRR ");

    axios
      .post(
        ` http://localhost:8089/notification/${employeeid}`,
        {
          message: hrFeedData,
        }
        // {
        //   auth: {
        //     username: loc.state.username,
        //     password: loc.state.password,
        //   },
        // }
      )
      .then((res) => {
        console.log("POSTEDDDD");
        alert("Query sent");
        setHrFeedData("");
      })
      .catch((error) => {
        alert("Error sending query");
      });
  };

  // const postHrFeed = () => {
  //   console.log(employeeid);
  //   console.log("HRRRR", hrFeedData);
  //   axios
  //     .post(`http://localhost:8089/notification/${employeeid}`, {
  //       message: hrFeedData,
  //     })
  //     .response(console.log("POSTING HR FEEDBACK"));
  // };

  //api call to get all documents
  const getDocument = () => {
    console.log("Document called");
    axios
      .get(` http://localhost:8089/files/emp/${employeeid}`, {
        auth: {
          username: loc.state.username,
          password: loc.state.password,
        },
      })
      .then((response) => setDoc(response.data));
  };

  if (users.length === 0) {
    return "Loading";
  } else {
    return (
      <>
        <Header2 />
        <Sidenav props={props} />
        <div className="main_content22">
          <div className="user-flex">
            <div className="left-side-user">
              {/* USER PROFILE STARTS HERE */}
              <div
                className="card mb-3"
                style={{ width: "75rem", height: "300px", marginTop: "30px" }}
              >
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={"data:image/png;base64," + users.profilePhoto}
                      // src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                      // src={imgsrc}
                      // onError={({currentTarget})=>{currentTarget.onerror = null; currentTarget.src={imgsrc}}}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";
                      }}
                      class="card-img"
                      alt="..."
                      style={{ height: "300px", width: "300px" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        Employee name : {users.emp_name}
                      </h5>
                      <p className="card-text">
                        <h3>Employee Id: {users.emp_id}</h3>
                        <h3>Designation : {users.designation}</h3>
                        <h3>Address : {users.emp_address}</h3>
                        <h3>Phone No. : {users.emp_phone}</h3>
                        <h3>Department : {users.department.dept_name}</h3>
                        <button
                          className="btn btn-success"
                          onClick={toggleModal}
                          style={{ marginTop: "-62px", marginLeft: "80%" }}
                        >
                          EDIT DETAILS
                        </button>
                        {modal && (
                          <>
                            {/* <div className="modal"></div> */}
                            <div className="popupppp rounded">
                              <div className="popupppp-inner rounded">
                                <button
                                  className="close-btn"
                                  onClick={() => toggleModal(!modal)}
                                >
                                  <CancelIcon />
                                </button>
                                <form style={{ marginTop: "10px" }}>
                                  <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">
                                      Employee Name:
                                    </label>
                                    <input
                                      placeholder={employeename}
                                      type="text"
                                      className="form-control"
                                      id="formGroupExampleInput"
                                      value={employeeName}
                                      onChange={(e) =>
                                        setEmployeeName(e.target.value)
                                      }
                                    />
                                  </div>
                                  <br />
                                  <div className="form-group">
                                    <label htmlFor="formGroupExampleInput2">
                                      Email id:
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="formGroupExampleInput2"
                                      value={employeeId}
                                      onChange={(e) =>
                                        setEmployeeId(e.target.value)
                                      }
                                    />
                                  </div>
                                  <br />

                                  <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">
                                      Address:
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="formGroupExampleInput"
                                      value={employeeAddress}
                                      onChange={(e) =>
                                        setEmployeeAddress(e.target.value)
                                      }
                                    />
                                  </div>
                                  <br />
                                  <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">
                                      Phone No:
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="formGroupExampleInput"
                                      value={employeePhone}
                                      onChange={(e) =>
                                        setEmployeePhone(e.target.value)
                                      }
                                    />
                                  </div>
                                  <br />
                                  <button
                                    type="button"
                                    class="btn btn-warning"
                                    style={{ marginTop: "4%" }}
                                    onClick={() => {
                                      putData();
                                      toggleModal(!modal);
                                      // window.location.reload(false);
                                    }}
                                  >
                                    UPDATE
                                  </button>
                                </form>
                              </div>
                            </div>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* USER PROFILE ENDS HERE */}

              {/* Welcome kit status */}
              <div class="kit">
                {displayStatus.map((value) => {
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h4 style={{ marginTop: "12px", fontSize: "1.5rem" }}>
                          <b>WELCOME KIT STATUS : </b>

                          {(() => {
                            if (value.status) {
                              return <>{value.status}</>;
                            } else {
                              return <>Not initiated</>;
                            }
                          })()}
                        </h4>
                      </div>
                    </>
                  );
                })}
              </div>
              {/* Welcome kit status ends */}

              {/*  Session Collapse */}
              <div className="wrapper2">
                <div className="accordion1">
                  <div className="item1">
                    <div className="title1" onClick={toggle}>
                      <h3
                        style={{
                          marginLeft: "42%",
                          fontSize: "2.2rem",
                        }}
                      >
                        <b>All Sessions</b>
                      </h3>

                      <span>
                        {click === true ? (
                          <RemoveIcon style={{ color: "black" }} />
                        ) : (
                          <AddIcon style={{ color: "black" }} />
                        )}
                      </span>
                    </div>

                    <div
                      className={click === true ? "content show1" : "content1"}
                    >
                      <table className="table-ses">
                        <tr>
                          <th className="user-data">SESSION NAME</th>
                          <th className="user-data">SESSION DATE</th>
                          <th className="user-data">LINK</th>
                        </tr>
                        {ses.map((value) => {
                          return (
                            <>
                              <tr>
                                <td className="actual-data">{value.sesName}</td>
                                <td className="actual-data">{value.sesDate}</td>
                                <td className="actual-data">
                                  <a
                                    href={value.ses_link}
                                    style={{ color: "white" }}
                                  >
                                    Click here
                                  </a>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
                {/* Session Collapse ends*/}

                {/* Feedback collapse starts */}

                <div className="accordion1">
                  <div className="item2">
                    <div className="title1" onClick={togglefeedback}>
                      <h3
                        style={{
                          marginLeft: "42%",
                          fontSize: "2.2rem",
                        }}
                      >
                        <b>All Queries</b>
                      </h3>
                      <span>
                        {feedclick === true ? (
                          <RemoveIcon style={{ color: "black" }} />
                        ) : (
                          <AddIcon
                            onClick={getFeedback}
                            style={{ color: "black" }}
                          />
                        )}
                      </span>
                    </div>

                    <div
                      className={
                        feedclick === true ? "content show" : "content"
                      }
                    >
                      <table className="table-ses">
                        <tr>
                          <th className="user-data">FEEDBACK</th>
                          <th className="user-data">REPLY FROM HR</th>
                        </tr>
                        {feedback.map((value) => {
                          return (
                            <>
                              <tr>
                                <td className="actual-data">
                                  {value.description}
                                </td>
                                <td className="actual-data">
                                  {value.replies.length === 0
                                    ? "Not Replied"
                                    : " REPLIED"}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>

                {/* Feedback collpase ends */}

                {/* Document collapse starts here */}
                <div className="accordion1">
                  <div className="item2">
                    <div className="title1" onClick={toggledocument}>
                      <h3
                        style={{
                          marginLeft: "42%",
                          fontSize: "2.2rem",
                        }}
                      >
                        <b>All Documents</b>
                      </h3>

                      <span>
                        {clickdoc === true ? (
                          <RemoveIcon style={{ color: "black" }} />
                        ) : (
                          <AddIcon
                            onClick={getDocument}
                            style={{ color: "black" }}
                          />
                        )}
                      </span>
                    </div>

                    <div
                      className={clickdoc === true ? "content show" : "content"}
                    >
                      <table className="table-ses">
                        <tr>
                          <th className="user-data">DOCUMENT NAME</th>
                          <th className="user-data">DOCUMENT URL</th>
                        </tr>

                        {doc.map((value) => {
                          return (
                            <>
                              <tr>
                                <td className="actual-data">{value.name}</td>
                                <td className="actual-data">
                                  <a
                                    href={value.url}
                                    style={{ color: "white" }}
                                  >
                                    Click here
                                  </a>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>

                {/* Document collapse ends here */}

                {/* HR feed box starts */}

                <form style={{ marginTop: "25px" }}>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput">
                      Send Feedback to user:
                    </label>
                    <div className="a">
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput"
                          style={{ width: "600px", height: "43px" }}
                          value={hrFeedData}
                          onChange={(e) => setHrFeedData(e.target.value)}
                        />
                      </div>
                      <div></div>
                    </div>
                  </div>
                </form>
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    width: "40px",
                    height: "43px",
                    marginLeft:"620px",
                    marginTop:"-73px"
                  }}
                  onClick={postHrFeed}
                >
                  <OutboxIcon />
                </button>

                {/* HR feed box ends */}
              </div>
            </div>

            {/* Tracker */}
            <div className="right-side-user">
              <div
                className="stepper d-flex flex-column mt-5"
                style={{ marginLeft: "35px" }}
              >
                <div className="d-flex mb-1" style={{ marginTop: "30%" }}>
                  <div className="d-flex flex-column pr-4 align-items-center">
                    <div
                      className={
                        trackerDocsSubmitted === true
                          ? "rounded-circle py-2 px-3 bg-success text-white mb-1"
                          : "rounded-circle py-2 px-3 bg-danger text-white mb-1"
                      }
                    >
                      1
                    </div>
                    <div className="line h-100"></div>
                  </div>
                  <div>
                    <h5 className="text-dark">DOCUMENT SUBMISSION</h5>
                    <p className="lead text-muted pb-3">
                      {trackerDocsSubmitted === true ? (
                        <h4>Completed</h4>
                      ) : (
                        <h4>Pending</h4>
                      )}
                    </p>
                  </div>
                </div>
                <div className="d-flex mb-1">
                  <div className="d-flex flex-column pr-4 align-items-center">
                    <div
                      className={
                        trackerDocsApprove === true
                          ? "rounded-circle py-2 px-3 bg-success text-white mb-1"
                          : "rounded-circle py-2 px-3 bg-danger text-white mb-1"
                      }
                    >
                      2
                    </div>
                    <div className="line h-100"></div>
                  </div>
                  <div>
                    <h5 className="text-dark">DOCUMENT APPROVAL</h5>
                    <p className="lead text-muted pb-3">
                      {trackerDocsApprove === true ? (
                        <h4>Completed</h4>
                      ) : (
                        <h4>Pending</h4>
                      )}
                    </p>
                  </div>
                </div>
                <div className="d-flex mb-1">
                  {(() => {
                    if (trackerKitStatus === "delivered") {
                      return (
                        <>
                          <div className="d-flex flex-column pr-4 align-items-center">
                            <div className="rounded-circle py-2 px-3 bg-success text-white mb-1">
                              3
                            </div>
                            <div className="line h-100 d-none"></div>
                          </div>
                          <div>
                            <h5 className="text-dark">WELCOME KIT STATUS</h5>
                            <p className="lead text-muted pb-3">Delivered</p>
                          </div>
                        </>
                      );
                    } else if (trackerKitStatus === "Delivery Initiated") {
                      return (
                        <>
                          <div className="d-flex flex-column pr-4 align-items-center">
                            <div className="rounded-circle py-2 px-3 bg-warning text-white mb-1">
                              3
                            </div>
                            <div className="line h-100 d-none"></div>
                          </div>
                          <div>
                            <h5 className="text-dark">WELCOME KIT STATUS</h5>
                            <p className="lead text-muted pb-3">Initiated</p>
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div className="d-flex flex-column pr-4 align-items-center">
                            <div className="rounded-circle py-2 px-3 bg-danger text-white mb-1">
                              3
                            </div>
                            <div className="line h-100 d-none"></div>
                          </div>
                          <div>
                            <h5 className="text-dark">WELCOME KIT STATUS</h5>
                            <p className="lead text-muted pb-3">
                              Not initiated
                            </p>
                          </div>
                        </>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default UserInformation;
