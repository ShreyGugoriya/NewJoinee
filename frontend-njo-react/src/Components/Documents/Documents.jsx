import React, { useEffect, useState } from "react";
import {
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Footer from "../Footer/Footer";
import Sidenav from "../Sidenav/Sidenav";
import "./Documents.css";
import Header2 from "../Header2/Header2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import e from "cors";
const Documents = (props) => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [click, setClick] = useState(false);
  const [clickButton, setClickButton] = useState(false);
  const [documentsRequired, setDocumentsRequired] = useState([]);
  const [documentName, setDocumentName] = useState();
  const [approveButton, setApproveButton] = useState(false);
  const [empId, setEmpId] = useState();
  const [check, setCheck] = useState(false);

  const loc = useLocation();
  console.log(loc.userProps);
  let count = 1;
  let count1 = 1;
  useEffect(() => {
    const docsRequired = () => {
      axios
        .get(" http://localhost:8089/document/", {
          auth: {
            username: loc.state.username,
            password: loc.state.password,
          },
        })
        .then((response) => setDocumentsRequired(response.data));
    };

    getUsers();
    docsRequired();
  }, [loc]);

  const getUsers = () => {
    axios
      .get(" http://localhost:8089/employee/", {
        auth: {
          username: loc.state.username,
          password: loc.state.password,
        },
      })
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      });
  };

  const postData = (e) => {
    e.preventDefault();
    axios.post(` http://localhost:8089/document/`, {
      doc_name: documentName,
    });
    alert("Document added!");
    window.location.reload(false);
  };

  function deleteData(itemId) {
    fetch(` http://localhost:8089/document/${itemId}`, { method: "DELETE" })
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        alert("Document deleted");
        window.location.reload(false);
      })
      .catch((error) => {
        // element.parentElement.innerHTML = `Error: ${error}`;
        alert(
          "Cannot delete as the document is already alloted to an employee."
        );
        console.error("There was an error!", error);
      });
  }

  const getApprove = () => {
    setCheck(!check);
    const article = { documentApproved: true };
    console.log(typeof empId, empId);
    axios
      .put(` http://localhost:8089/status/approved/${empId}`, article)
      .then((response) => {
        console.log(response);
      });
    alert("Approved!");
  };

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const getEmployeeDocuments = (value) => {
    setEmpId(value.emp_id);
    setApproveButton(!approveButton);
    setClick(!click);
    axios
      .get(` http://localhost:8089/files/emp/${value.emp_id}`)
      .then((response) => setDocuments(response.data));

    // return documents;
  };

  return (
    <>
      <Header2 />
      <Sidenav props={props} />
      <div className="main_content">
        <h3
          style={{
            marginTop: "40px",
            marginLeft: "5.8%",
            fontSize: "2.2rem",
            marginBottom:"2rem"
          }}
        >
          <b> USER DETAILS</b>
        </h3>
       
        <div className="document">
          <div className="wrapper1">
            <div className="accordion">
              {users.map((value, i) => {
                return (
                  <>
                    <div className="item">
                      <div className="title" onClick={() => toggle(i)}>
                     
                          {value.emp_name}
                      

                        <span>
                          {selected === i ? <RemoveIcon /> : <AddIcon />}
                        </span>
                      </div>
                      <div
                        className={selected === i ? "content show" : "content"}
                      >
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                            <b>Email id: </b> {value.emp_email}
                          </li>

                          <li class="list-group-item">
                            <b>Designation: </b> {value.designation}
                          </li>

                          <li class="list-group-item">
                            <b>Joining Date: </b> {value.joiningDate}
                          </li>

                          <li class="list-group-item">
                            <b>Address: </b> {value.emp_address}
                          </li>

                          <li class="list-group-item">
                            <b>Phone No: </b> {value.emp_phone}
                          </li>
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={() => getEmployeeDocuments(value)}
                            style={{ margin: "0px" }}
                          >
                            Employee Documents
                          </button>

                          {click &&
                            documents.map((doc) => {
                              return (
                                <>
                                  <li class="list-group-item">
                                    <a href={doc.url}>{doc.name}</a>
                                  </li>
                                </>
                              );
                            })}
                          {approveButton ? (
                            <button
                              style={{ width: "25%", marginLeft: "75%" }}
                              type="button"
                              class={
                                check ? "btn btn-success" : "btn btn-danger"
                              }
                              onClick={() => getApprove()}
                            >
                              {check ? "APPROVED" : "APPROVE"}
                            </button>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div class="outer">
            <div>
              <h2>
                <b>Required Documents</b>
              </h2>
              <button
                type="button"
                className="btn btn-success float-right"
                style={{
                  marginLeft: "75%",
                  marginTop: "-74px",
                  marginBottom: "12px",
                  // marginTop: "px",
                  // height: "50px",
                  width: "11rem",
                }}
                onClick={() => setClickButton(!clickButton)}
              >
                ADD DOCUMENT
              </button>
              <div
                className={clickButton === true ? "content show1" : "content1"}
              >
                {/* <ul class="list-group list-group-flush"> */}
                <form style={{ marginTop: "10px" }}>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput">
                      Document Name:
                    </label>
                    <div className="a">
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput"
                          value={documentName}
                          onChange={(e) => setDocumentName(e.target.value)}
                          style={{ width: "300px" }}
                        />
                      </div>
                      <div>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            color: "#3498db",
                            marginTop: "4px",
                          }}
                          onClick={postData}
                        >
                          <CheckCircleOutlineIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <br />
              {documentsRequired.map((reqd) => {
                return (
                  <>
                    <ul class="list-group ">
                      <li class="list-group-item" style={{fontSize:"18px"}}>
                        {count1++}. {reqd.doc_name}
                        <button
                          style={{
                            marginLeft: "90%",
                            backgroundColor: "transparent",

                            // color: "#3498db",
                          }}
                          onClick={() => deleteData(reqd.doc_id)}
                        >
                          <DeleteIcon />
                        </button>
                      </li>
                    </ul>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Documents;
