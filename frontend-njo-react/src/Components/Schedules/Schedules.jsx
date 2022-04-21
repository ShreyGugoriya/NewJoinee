import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "./Schedules.css";
import Userheader from "../Userheader/Userheader";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

let formdata = new FormData();
let image;

const Schedules = (props) => {
  const loc = useLocation();
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [click, setClick] = useState(false);
  const [ses, setSes] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [feedclick, setFeedclick] = useState(false);

  const [doc, setDoc] = useState([]);
  const [clickdoc, setClickdoc] = useState(false);
  const [displayStatus, setStatus] = useState();
  const [empId, setEmpId] = useState(loc.state.isValid);
  const [checked, setChecked] = React.useState(false);

  const [modal, setModal] = useState(false);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");

  const [trackerDocsApprove, setTrackerDocsApprove] = useState(false);
  const [trackerDocsSubmitted, setTrackerDocsSubmitted] = useState(false);
  const [trackerKitStatus, setTrackerKitStatus] = useState("");

  console.log("DASHBOARDDDD", props);
  const [uploadimg, setUpload] = useState("");

  const [replyuser, setReply] = useState("");

  const [repliess, setReplies] = useState([]);

  const [popup, setPopup] = useState(false);
  const [content, setContent] = useState([]);
  const [desc, setDesc] = useState([]);

  const [rp, setRp] = useState("");
  const [hrFeed, setHrFeed] = useState(false);
  const [hrArr, setHrArr] = useState([]);
  // console.log(empId)

  const sendReplyToFeedback = (value) => {
    console.log("ufffffffffffffff", value.fdbk_id);
    const article = { reply: rp, replyBy: "user" };
    axios
      .post(` http://localhost:8089/reply/${value.fdbk_id}/`, article)
      .then((resp) => console.log("SENTTTTTTTTT", resp));
  };

  const toggle = () => {
    setClick(!click);
    setSes(users.department.session);
    //console.log(ses);
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
        .get(` http://localhost:8089/employee/${empId}`, {
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

    //api to get the kit details of a particular user
    const getStatus = () => {
      axios
        .get(` http://localhost:8089/welcomekit/employee/${empId}`, {
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
        .get(` http://localhost:8089/status/employee/${empId}`, {
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
        .get(` http://localhost:8089/welcomekit/employee/${empId}`, {
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

  //upload image into the form data
  const uploadImage = (e) => {
    console.log(e.target.files[0]);
    image = e.target.files[0];
    setUpload(e.target.files[0]);
    formdata.append("file", image, image.name);
  };

  //api to upload image using post request to api
  const putImage = () => {
    console.log("Function called to upload image");

    return axios
      .post(` http://localhost:8089/employee/upload/image/${empId}/`, formdata)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //api call to get all queries
  const toggleModal = () => {
    setModal(!modal);
  };

  //filter the reply
  const filterReply = (value) => {
    setContent(value.replies);
    setDesc([value]);
  };

  const getFeedback = () => {
    // console.log("Feedback function called");
    axios
      .get(` http://localhost:8089/feedback/employee/${empId}`, {
        auth: {
          username: loc.state.username,
          password: loc.state.password,
        },
      })
      .then((response) => {
        console.log(response);
        setFeedback(response.data);
        let replyArr = [];
        let l = response.data.length;
        for (let i = 0; i < l; i++) {
          replyArr[i] = response.data[i].replies;
        }

        console.log("AAAAAAAAAAAAA", replyArr);

        setReplies(replyArr);
      });
  };

  //api to submit a query by user
  const sendQuery = () => {
    console.log("Function called to post a reply by user ");
    console.log(replyuser);
    axios
      .post(` http://localhost:8089/feedback/${empId}`, {
        description: replyuser,
      })
      .catch((error) => {
        alert("Error sending query");
      });
    alert("Query sent");
  };

  //api call to get all documents
  const getDocument = () => {
    // console.log("Document called");
    axios
      .get(` http://localhost:8089/files/emp/${empId}`, {
        auth: {
          username: loc.state.username,
          password: loc.state.password,
        },
      })
      .then((response) => setDoc(response.data));
  };
  const updateKitStatus = () => {
    console.log("Button clicked to update kit status");

    const article = { status: "delivered" };
    axios
      .put(` http://localhost:8089/welcomekit/${empId}`, article)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      });
    alert("Status Updated");
  };

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
    const article = { documentSubmitted: true };
    axios
      .put(` http://localhost:8089/status/${empId}`, article)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      });
  };
  //viewAllHrFeeds
  const viewAllHrFeeds = () => {
    axios
      .get(` http://localhost:8089/notification/${empId}`, {
        auth: {
          username: loc.state.username,
          password: loc.state.password,
        },
      })
      .then((response) => setHrArr(response.data));
  };

  //api to edit the details of the user
  const putData = () => {
    return axios
      .put(` http://localhost:8089/employee/${empId}`, {
        emp_name: employeeName,
        emp_email: employeeId,
        emp_address: employeeAddress,
        emp_phone: employeePhone,
      })
      .then((response) => console.log("updating data"));
  };

  if (users.length === 0) {
    return "Loading";
  } else {
    return (
      <>
        <Userheader name="LOGOUT" props={props} />
        {/* <Sidenav props={props} /> */}
        <div className="main_content2">
          {/* <div className="info2">WELCOME TO USER DASHBOARD !</div> */}
          <div className="user-flex">
            <div className="left-side-user">
              {/* USER PROFILE STARTS HERE */}
              <div
                className="card mb-3"
                style={{ width: "75rem", height: "300px" }}
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
                      <h3 className="card-title">
                        <b>Employee name :</b> {users.emp_name}
                      </h3>
                      <p className="card-text">
                        <h3>
                          <b>Employee Id:</b> {users.emp_id}
                        </h3>
                        <h3>
                          <b>Designation : </b>
                          {users.designation}
                        </h3>
                        <h3>
                          <b>Address : </b>
                          {users.emp_address}
                        </h3>
                        <h3>
                          <b>Phone No. : </b>
                          {users.emp_phone}
                        </h3>
                        <h3>
                          <b>Department : </b>
                          {users.department.dept_name}
                        </h3>
                        <button
                          className="btn btn-success"
                          onClick={toggleModal}
                          style={{ marginTop: "-77px", marginLeft: "80%" }}
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
                                      // placeholder={employeName}
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
                                  <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">
                                      Upload image:
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      onChange={uploadImage}
                                    />
                                  </div>

                                  <button
                                    type="button"
                                    class="btn btn-warning"
                                    style={{ marginTop: "4%" }}
                                    onClick={() => {
                                      const promise1 = putData();
                                      const promise2 = putImage();
                                      toggleModal(!modal);

                                      Promise.all([promise1, promise2]).then(
                                        () => {
                                          window.location.reload(false);
                                        }
                                      );
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
                        if (displayStatus) {
                          return (
                            <>
                              {displayStatus.status}

                              {/* <button
                                className="btn btn-dark"
                                style={{
                                  marginLeft: "720px",
                                  marginTop: "-55px",
                                  height: "57px",
                                  width:"140px"
                                }}
                                onClick={updateKitStatus}
                              >
                                RECEIVED KIT
                              </button> */}
                            </>
                          );
                        } else {
                          return <>Not Initiated</>;
                        }
                      })()}
                    </h4>
                  </div>

                  <button
                    className="btn btn-secondary"
                    style={{
                      marginLeft: "720px",
                      marginTop: "-90px",
                      height: "57px",
                    }}
                    onClick={updateKitStatus}
                  >
                    RECEIVED KIT
                  </button>
                </>
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
                      {feedback.map((value) => {
                        return (
                          <>
                            <h4 style={{ fontSize: "25px", color: "black" }}>
                              <b>Query: </b>
                              {value.description}
                            </h4>

                            {value.replies.map((z) => {
                              return (
                                <>
                                  <ul className="list-group">
                                    <li className="list-group-item">
                                      {z.reply ? (
                                        <>
                                          Reply by {z.replyBy} : {z.reply}
                                        </>
                                      ) : (
                                        "NOT REPLIED"
                                      )}
                                      <ReplyAllIcon
                                        style={{ marginLeft: "20px" }}
                                        onClick={() => {
                                          filterReply(value);
                                          setPopup(true);
                                        }}
                                      />
                                    </li>
                                  </ul>
                                  {console.log("LA LA LA LA", content)}
                                  {content.map((j) => {
                                    return (
                                      <>
                                        <Modal
                                          size="lg"
                                          isOpen={popup}
                                          toggle={() => setPopup(!popup)}
                                          style={{
                                            height: "800px",
                                            marginTop: "200px",
                                          }}
                                        >
                                          <ModalHeader
                                            toggle={() => setPopup(!popup)}
                                          ></ModalHeader>
                                          <ModalBody>
                                            <form>
                                              {desc.map((w) => {
                                                return (
                                                  <>
                                                    <div>
                                                      <label>
                                                        <b>YOUR QUERY</b>
                                                      </label>{" "}
                                                      <br />
                                                      <input
                                                        type="text"
                                                        value={w.description}
                                                        style={{
                                                          width: "500px",
                                                          height: "55px",
                                                          marginTop: "20px",
                                                        }}
                                                        readOnly
                                                      />
                                                    </div>
                                                  </>
                                                );
                                              })}

                                              <br />
                                              <div>
                                                <label>
                                                  <b>ALL REPLIES</b>
                                                </label>{" "}
                                                <br />
                                                <input
                                                  type="text"
                                                  value={j.reply}
                                                  style={{
                                                    width: "500px",
                                                    height: "110px",
                                                    marginTop: "20px",
                                                  }}
                                                  readOnly
                                                />
                                              </div>
                                              <br />
                                              <div>
                                                <label>
                                                  <b>GIVE YOUR REPLY</b>
                                                </label>{" "}
                                                <br />
                                                <input
                                                  type="text"
                                                  style={{
                                                    width: "500px",
                                                    height: "130px",
                                                    marginTop: "20px",
                                                  }}
                                                  value={rp}
                                                  onChange={(e) =>
                                                    setRp(e.target.value)
                                                  }
                                                />
                                              </div>
                                              <br />
                                              <button
                                                className="btn btn-primary"
                                                style={{ width: "100px" }}
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  sendReplyToFeedback(value);
                                                  setPopup(false);
                                                }}
                                              >
                                                <b>SEND</b>
                                              </button>
                                            </form>
                                          </ModalBody>
                                        </Modal>
                                      </>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </>
                        );
                      })}

                      <div
                        className="form-group"
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        <label
                          for="exampleFormControlTextarea1"
                          style={{
                            paddingTop: "45px",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          ENTER NEW QUERY HERE
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="5"
                          style={{ width: "1125px" }}
                          value={replyuser}
                          onChange={(e) => setReply(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        className="btn btn-warning"
                        style={{ paddingTop: "10px", marginTop: "20px" }}
                        onClick={sendQuery}
                      >
                        SEND QUERY
                      </button>
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={handleCheckChange}
                          />
                        }
                        label="I have submitted all the required documents"
                        style={{ color: "black" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Document collapse ends here */}

                {/* HR Feedback starts here */}
                <div className="accordion1">
                  <div className="item2">
                    <div className="title1" onClick={() => setHrFeed(!hrFeed)}>
                      <h3
                        style={{
                          marginLeft: "42%",
                          fontSize: "2.2rem",
                        }}
                      >
                        <b>All HR Feedbacks</b>
                      </h3>

                      <span>
                        {hrFeed === true ? (
                          <RemoveIcon style={{ color: "black" }} />
                        ) : (
                          <AddIcon
                            style={{ color: "black" }}
                            onClick={viewAllHrFeeds}
                          />
                        )}
                      </span>
                    </div>

                    <div
                      className={hrFeed === true ? "content show" : "content"}
                    >
                      <div class="outer-display">
                        <div style={{ background: "white" }}>
                          <ul>
                            {/* <li>ABC</li>
                            <l1>XYZ</l1> */}
                            {hrArr.map((r) => {
                              return (
                                <li
                                  style={{
                                    color: "black",
                                    listStyleType: "square",
                                  }}
                                >
                                  {r.message}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default Schedules;
