import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import axios from "axios";
const WelcomeKitTable = ({ users }) => {
  const updateStatus = (value) => {
    const article = { status: "Delivery Initiated" };
    axios
      .post(` http://localhost:8089/welcomekit/${value.empId}`, article)
      .then((response) => console.log(response));
  };

  return (
    <>
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

            <th scope="col">NAME</th>
            <th scope="col">DESIGNATION</th>
            <th scope="col">JOINING DATE</th>
            <th scope="col">INITIATE</th>
            <th scope="col">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((value) => {
            return (
              <>
                <tr style={{
                    height: "70px",
                    backgroundColor: "#fff",
                    // backgroundColor:"#f8f8ff",
                    boxShadow:
                      "0 1px 6px rgb(0 0 0 / 12%), 0 1px 4px rgb(0 0 0 / 24%)",
                  }}>
   
                  <th scope="row">{value.empName}</th>
                  <td>{value.designation}</td>
                  <td>{value.joiningDate}</td>
                  <td>
                    <LocalShippingIcon
                      style={{ marginLeft: "15px" }}
                      onClick={() => updateStatus(value)}
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
    </>
  );
};

export default WelcomeKitTable;