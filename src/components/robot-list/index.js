import "./LoadList.css";
import React from "react";
import { useParams } from "react-router";
import RobotCard from "./robot-card/index";

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
    <RobotCard
      key={index}
      item={item}
      index={index}
      onDelete={onDelete}
      onShowModal={onShowModal}
    />
  ));
};

export default LoadList;
