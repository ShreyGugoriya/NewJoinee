import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import "./SessionPopup.css";
const SessionPopup = (props) => {
  return props.trigger ? (
    <>
      <div className="popup rounded">
        <div className="popup-inner rounded" >
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            <CancelIcon/>
          </button>
          {props.children}
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default SessionPopup;
