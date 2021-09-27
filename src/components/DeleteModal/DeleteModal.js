import React from 'react'
import "./DeleteModal.css";

const DeleteModal = ({ onDo, onClose, RobotNameToBeDeleted }) =>{
    return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Deleting {RobotNameToBeDeleted}</h4>
                </div>
                <div className="modal-body">
                    Are you sure you want to delete this user?
                </div>
                <div className="modal-footer">
                    <div className="left-button">
                    <button className="confirm-button" onClick={onDo}>Yes</button>
                    </div>
                    <div className="right-button">
                    <button className="cancel-button" onClick={onClose} >No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;
