import React from "react";
import "./RobotModal.css";

const RobotModal = ({
  onClose,
  currentRobotName,
  currentRobotAddress,
  currentRobotPhone,
  currentRobotWebsite,
  currentRobotCompanyName,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{currentRobotName}</h4>
        </div>
        <div className="modal-body">
          <p>
            Address: {currentRobotAddress.street} {currentRobotAddress.suite}{" "}
            {currentRobotAddress.city} {currentRobotAddress.zipcode}
          </p>
          <p>Phone: {currentRobotPhone}</p>
          <p>Website: {currentRobotWebsite}</p>
          <p>Company Name: {currentRobotCompanyName}</p>
        </div>
        <div className="modal-footer">
            <button className="return-button" onClick={onClose}>
              return
            </button>
        </div>
      </div>
    </div>
  );
};

export default RobotModal;
