import React from "react";
import "./RobotModal.css";

const RobotModal = ({
  onClose,
  currentRobot
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{currentRobot.name}</h4>
        </div>
        <div className="modal-body">
          <p>
            Address: {currentRobot.address.street} {currentRobot.address.suite}{" "}
            {currentRobot.address.city} {currentRobot.address.zipcode}
          </p>
          <p>Phone: {currentRobot.phone}</p>
          <p>Website: {currentRobot.website}</p>
          <p>Company Name: {currentRobot.company.name}</p>
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
