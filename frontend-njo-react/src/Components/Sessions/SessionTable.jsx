import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const SessionTable = ({ users }) => {
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
            <th scope="col">SESSION NAME</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">DEPARTMENT</th>
            <th scope="col">DURATION</th>
            <th scope="col">DATE</th>
            <th scope="col">LINK</th>
          </tr>
        </thead>
        <tbody>
          {users.map((value) => {
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
                  <th scope="row">{value.sesName}</th>
                  <td>{value.ses_desc}</td>
                  <td>{value.dept_name}</td>
                  <td>{value.ses_duration}</td>
                  <td>{value.sesDate}</td>
                  <td>
                    <a
                      href={value.ses_link}
                       target="_blank"
                    >
                      Click here to join session
                    </a>
                  </td>
                </tr>
       
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SessionTable;
