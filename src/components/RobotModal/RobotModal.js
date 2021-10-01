import React from "react";
import "./RobotModal.css";

const RobotModal = ({ onClose, currentRobot }) => {
  return (
    <div className="robot-modal">
      <div className="robot-modal-content">
        <div className="robot-modal-header">
          <h4 className="robot-modal-title">{currentRobot.name}</h4>
        </div>
        <div className="robot-modal-body">
          <p>
            Address: {currentRobot.address.street} {currentRobot.address.suite}{" "}
            {currentRobot.address.city} {currentRobot.address.zipcode}
          </p>
          <p>Phone: {currentRobot.phone}</p>
          <p>Website: <a href={`https://${currentRobot.website}`} target="_blank" rel="noreferrer noopener">{currentRobot.website}</a></p>
          <p>Company Name: {currentRobot.company.name}</p> 
        </div>
        <div className="robot-modal-footer">
          <button className="robot-return-button" onClick={onClose}>
            return
          </button>
        </div>
      </div>
    </div>
  );
};

export default RobotModal;
