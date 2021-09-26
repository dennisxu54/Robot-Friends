import "./LoadList.css";
import React from "react";

const LoadList = ({ items, error, onOpen }) => {

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return items.map((item, index) => (
      
      <div key={item.id} className="special-box">
        <img alt="robots" src={`https://robohash.org/${item.id}&200x200`} />
        <h1>{item.name}</h1>
        <h2>{item.username}</h2>
        <h3>{item.email}</h3>
        <button className="delete-button" onClick={() => {
          onOpen(item.name) 
        }} >Delete</button>
      </div>
    ));
  }
};

export default LoadList;
