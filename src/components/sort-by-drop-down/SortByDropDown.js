import React from "react";

const SortByDropDown = ({ setSortOptionType }) => {
  return (
    <select
      className="main-drop-down-box"
      onChange={(e) => setSortOptionType(e.target.value)}
    >
      <option value="id-up">ID Ascend</option>
      <option value="id-down">ID Descend</option>
      <option value="name-up">Name Ascend</option>
      <option value="name-down">Name Descend</option>
    </select>
  );
};

export default SortByDropDown;
