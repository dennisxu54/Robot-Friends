import "./LoadList.css";
import React from "react";

const LoadList = ({ Robots, onButton }) => {
  const deleteConfirm = "delete";
  const showInfo = "information";

  return Robots.map((item, index) => (
    <div key={item.id} className="special-box">
      <img alt="robots" src={`https://robohash.org/${item.id}&200x200`} />
      <h2>{item.name}</h2>
      <h3>{item.username}</h3>
      <h3>{item.email}</h3>
      <div className="show-delete-button">
        <button
          className="delete-button"
          onClick={() => {
            onButton(index, deleteConfirm);
          }}
        >
          Delete
        </button>
      </div>
      <div className="show-info-button">
        <button
          className="information-button"
          onClick={() => {
            onButton(index, showInfo);
          }}
        >
          Information
        </button>
      </div>
    </div>
  ));
};

export default LoadList;
