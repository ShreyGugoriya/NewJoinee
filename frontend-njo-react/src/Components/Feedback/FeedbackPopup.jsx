import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import "./FeedbackPopup.css";
const FeedbackPopup = (props) => {
  return props.trigger ? (
    <>
      <div className="popup1 rounded">
        <div className="popup-inner1 rounded">
          {props.children}
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default FeedbackPopup;
