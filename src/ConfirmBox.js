import React from 'react'
import "./App.css";

const ConfirmBox = (props) =>{
    return(
        <>
        <div className="container">
            <div className="confirmation-text">
            Do you really want to delete this task?
            </div>
            <div className="button-container">
            <button 
                className="cancel-button" 
                onClick={() => props.handleConfirmationBox()}>
                Cancel
            </button>
            <button 
                className="confirmation-button"
                onClick={props.handleDeleteTask}>
                Delete
                </button>
            </div>
        </div>
        <div 
            className="confirm-bg">
            onClick={() => props.handleConfirmationBox()}
        </div>
        </>
    )
}

export default ConfirmBox;