import React, { useEffect, useState } from "react";
import "./UserPopup.css";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import HashedIn from "../../assets/HashedIn_Logo.jpg";
import { WindowSharp } from "@mui/icons-material";
const UserPopup = (props) => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeDesignation, setEmployeeDesignation] = useState("");
  const [employeeJoiningDate, setEmployeeJoiningDate] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [emp_dept, setDept] = useState("");
  const [phoneErr, setPhoneErr] = useState(false);
  const postData = () => {
    
     
    if (
      employeeName.length === 0 ||
      employeeId.length === 0 ||
      employeeDesignation.length === 0 ||
      employeeAddress.length === 0 ||
      employeeJoiningDate.length === 0 ||
      employeeAddress.length === 0 ||
      employeePhone.length === 0 ||
      emp_dept.length === 0
    ) {
      alert("Fields cannot be empty");
    } else {
      axios
      .post(` http://localhost:8089/employee/department/${emp_dept}/`, {
        headers: {
          dept_name: emp_dept,
        },
        emp_name: employeeName,
        emp_email: employeeId,
        designation: employeeDesignation,
        joiningDate: employeeJoiningDate,
        emp_address: employeeAddress,
        emp_phone: employeePhone,
      })
      .then((response) => {console.log("Posting data");
           if(response.data =="User Already exists")
        
              alert("Sorry user exists");
              window.location.reload(false);

        }).catch((error)=>{alert("Error! Creating user")});
      m();
    }

    
  };

  const m = () => {
    props.toggleModal();
  };

  const phoneHandler = (e) => {
    setEmployeePhone(e.target.value);
    if (employeePhone.length === 9 || employeePhone.length > 10) {
      setPhoneErr(false);
    } else setPhoneErr(true);
  };

  return (
    <>
      {/* <div className="modal"></div> */}
      <div className="popup rounded">
        <div className="popup-inner rounded">
          <button className="close-btn" onClick={props.toggleModal}>
            <CancelIcon />
          </button>
          <form style={{ marginTop: "10px" }}>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Employee Name:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Email id:</label>
              <input
                type="text"
                className="form-control"
                placeholder="demo@deloitte.com"
                id="formGroupExampleInput2"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Designation:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                value={employeeDesignation}
                onChange={(e) => setEmployeeDesignation(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Onboarding Date:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="YYYY-MM-DD"
                value={employeeJoiningDate}
                onChange={(e) => setEmployeeJoiningDate(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Address:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={employeeAddress}
                onChange={(e) => setEmployeeAddress(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Phone No:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={employeePhone}
                onChange={phoneHandler}
              />
              {phoneErr ? (
                <span style={{ color: "red" }}>Enter correct number</span>
              ) : (
                ""
              )}
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Department:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={emp_dept}
                onChange={(e) => setDept(e.target.value)}
              />
            </div>

            <button
              type="button"
              class="btn btn-warning"
              style={{ marginTop: "4%" }}
              onClick={() => {
                postData();
               
                props.toggleModal();
                
              }}
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserPopup;
