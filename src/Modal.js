import React from 'react'
import "./App.css";

const NewModal = (props) =>{
    if (!props.show) {
      return null
    }

    return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Deleting this user</h4>
                </div>
                <div className="modal-body">
                    Are you sure?
                </div>
                <div className="modal-footer">
                    <button className="confirm-button" onClick={props.onDo}>Yes</button>
                    <button className="cancel-button" onClick={props.onClose} >No</button>
                </div>
            </div>
        </div>
    )
}

export default NewModal;
