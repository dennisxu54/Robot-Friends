import "./LoadList.css";
import React from "react";
import { useParams } from "react-router";

const LoadList = ({
  filteredRobotList,
  entriesPerPage,
  setDeleteRobotIndex,
  setExtraRobotInformationIndex,
}) => {
  const { pageNumber } = useParams();

  const getPaginatedData = () => {
    const startIndex = pageNumber * entriesPerPage - entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return filteredRobotList.slice(startIndex, endIndex);
  };

  const getCorrectedIndex = (index) => {
    const correctedIndex = index + (parseInt(pageNumber) - 1) * entriesPerPage;
    return correctedIndex;
  };

  const onDelete = (index) => {
    setDeleteRobotIndex(getCorrectedIndex(index));
  };

  const onShowModal = (index) => {
    setExtraRobotInformationIndex(getCorrectedIndex(index));
  };

  return getPaginatedData().map((item, index) => (
    <div key={item.id} className="special-box">
      <img alt="robots" src={`https://robohash.org/${item.id}&200x200`} />
      <h2>{item.name}</h2>
      <h3>{item.username}</h3>
      <h3>{item.email}</h3>
      <div className="show-delete-button">
        <button
          className="delete-button"
          onClick={() => {
            onDelete(index);
          }}
        >
          Delete
        </button>
      </div>
      <div className="show-info-button">
        <button
          className="information-button"
          onClick={() => {
            onShowModal(index);
          }}
        >
          Information
        </button>
      </div>
    </div>
  ));
};

export default LoadList;
