import "./LoadList.css";
import React from "react";

const LoadList = ({ Robots, error, onDelete, onShowInformation }) => {

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return Robots.map((item, index) => (
      
      <div key={item.id} className="special-box">
        <img alt="robots" src={`https://robohash.org/${item.id}&200x200`} />
        <h1>{item.name}</h1>
        <h2>{item.username}</h2>
        <h3>{item.email}</h3>
        <div className="left-button">
        <button className="delete-button" onClick={() => {
          onDelete(index) 
        }} >Delete</button>
        </div>
        <div className="right-button">
        <button className="information-button" onClick={() => {
          onShowInformation(index) 
        }} >More Information</button>
        </div>
      </div>
    ));
  }
};

export default LoadList;
