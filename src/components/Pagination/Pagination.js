import "./Pagination.css";
import React from "react";
import { Link, useParams } from "react-router-dom";

const Pagination = ({ maxPage, pageLimit }) => {
  let { params } = useParams();
  if (isNaN(params)) params = 1;
  params = parseInt(params);

  const getPaginationGroup = () => {
    let start = Math.floor((params - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>
      <div className="ender"></div>

      {/* show the pagiantion
            it consists of next and previous buttons
            along with page numbers, in our case, 5 page
            numbers at a time
        */}
      <div className="pagination">
        {/* previous button */}
        <Link to={`/page/` + (params - 1)} className={`link-prev ${params === 1 ? "disabled" : ""}`}>
          <button className={`prev ${params === 1 ? "disabled" : ""}`}>
            prev
          </button>
        </Link>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            className={`paginationItem ${params === item ? "active" : null}`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <Link to={`/page/` + (params + 1)} className={`link-next ${params === maxPage ? "disabled" : ""}`}>
          <button className={`next ${params === maxPage ? "disabled" : ""}`}>
            next
          </button>
        </Link>
      </div>
    </>
  );
};

export default Pagination;
