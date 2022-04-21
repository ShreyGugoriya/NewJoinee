import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./FeedbackTable.css";
import FeedbackPopup from "./FeedbackPopup";
import axios from "axios";

const FeedbackTable = ({ users }) => {
  const [modal, setModal] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [popupcontent, setPopupContent] = useState([]);
  const [rp, setReply] = useState("");
  const [repliesList, setRepliesList] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const showReplies = (pop) => {
    console.log(pop.fdbkId);
    axios
      .get(` http://localhost:8089/feedback/${pop.fdbkId}/`)
      .then((response) => {
        console.log(response.data);
        // setRepliesList(response.data.replies);
        let replyArr = [];
        let rData = response.data.replies;
        for (let r in rData) {
          replyArr.push(rData[r]);
        }
        console.log("hsjabhs", replyArr);
        setRepliesList(replyArr);
      });
  };
  
  
  const changeContent = (value) => {
    setPopupContent([value]);
    toggleModal();
  };
  //console.log(users);
  //Logic to post a reply by admin
  const postReply = (pop) => {
    console.log({ rp });
    console.log(pop.fdbkId);
    const article = { reply: rp, replyBy: "admin" };
    axios
      .post(` http://localhost:8089/reply/${pop.fdbkId}/`, article)
      .then((response) => {
        console.log(response);
      });
  };
  //Logic ends
  return (
    <div>
      <table className="table" style={{ width: "88%", marginLeft: "5px", marginTop: "1.5%", borderCollapse: "separate",

borderSpacing:" 0 15px"}}>
        <thead className="thead-dark" style={{ backgroundColor: "black" }}>
          <tr style={{ color: "white" }}>
            <th scope="col">NAME</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">FEEDBACK TYPE</th>
            <th scope="col">JOINING DATE</th>
            <th scope="col">REVIEW FEEDBACK</th>
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
                    // marginBottom:"5px"
                  }}
                >
                  <th scope="row">{value.empName}</th>
                  <td>{value.description}</td>
                  {(() => {
                    if (value.type) {
                      return <td>{value.type}</td>;
                    } else {
                      return <td>Not urgent</td>;
                    }
                  })()}
                  <td>{value.joiningDate}</td>
                  <td>
                    <Button
                    class="btn btn-info"
                      // style={{ backgroundColor: "black", color: "white" }}
                      onClick={() => {
                        setButtonPopup(true);
                        changeContent(value);
                        showReplies(value);
                      }}
                    >
                      REVIEW
                    </Button>
                  </td>
                </tr>
              </>
            );
          })}

          {modal &&
            popupcontent.map((pop) => {
              return (
                <>
                  <FeedbackPopup trigger={buttonPopup}>
                    <form style={{ marginTop: "10px" }}>
                      <br />
                      <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">
                          Issue Description:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput2"
                          value={pop.description}
                          readOnly
                        />
                      </div>
                      <br />
                      <div className="form-group">
                        <label htmlFor="formGroupExampleInput3">Reply:</label>
                        <input
                          type="text"
                          className="form-control replyform"
                          id="formGroupExampleInput3"
                          placeholder="Send reply"
                          value={rp}
                          onChange={(e) => setReply(e.target.value)}
                        />
                      </div>
                      <br />
                      <label htmlFor="formGroupExampleInput3">
                        All Replies:
                      </label>

                      {/* <button onClick={() => showReplies(pop)}>HISTORY</button> */}
                      <div class="outer-display">
                        <div>
                          <ul>
                            {repliesList.map((r) => {
                              return (
                                <>
                                  <li>{r.reply}</li>
                                </>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <button
                        type="button"
                        class="btn btn-success"
                        style={{ marginTop: "2%" }}
                        onClick={() => {
                          postReply(pop);
                          setReply("");
                          setButtonPopup(false);
                          alert("Reply sent");
                        }}
                      >
                        SUBMIT
                      </button>
                    </form>
                  </FeedbackPopup>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default FeedbackTable;
