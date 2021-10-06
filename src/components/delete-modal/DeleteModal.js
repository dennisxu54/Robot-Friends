import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ deleteRobot, onCloseModal, robotToDelete }) => {
  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <div className="delete-modal-header">
          <h4 className="delete-modal-title">Deleting {robotToDelete}</h4>
        </div>
        <div className="delete-modal-body">
          Are you sure you want to delete this user?
        </div>
        <div className="delete-modal-footer">
          <div className="delete-left-button">
            <button className="delete-confirm-button" onClick={deleteRobot}>
              Yes
            </button>
          </div>
          <div className="delete-right-button">
            <button className="delete-cancel-button" onClick={onCloseModal}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
