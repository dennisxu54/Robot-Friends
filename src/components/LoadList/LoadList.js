import "./LoadList.css";
import React from "react";
import { useParams } from "react-router";

const LoadList = ({ Robots, onButton }) => {
  const deleteConfirm = "delete";
  const showInfo = "information";
  let { params } = useParams();

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
            onButton(index, deleteConfirm, params);
          }}
        >
          Delete
        </button>
      </div>
      <div className="show-info-button">
        <button
          className="information-button"
          onClick={() => {
            onButton(index, showInfo, params);
          }}
        >
          Information
        </button>
      </div>
    </div>
  ));
};

export default LoadList;
