import "./Pagination.css";
import React from "react";
import { Link, useParams } from "react-router-dom";

const PAGES_TO_SHOW = 1;

const Pagination = ({ maxPage }) => {
  let { pageNumber } = useParams();
  if (isNaN(pageNumber)) pageNumber = 1;
  pageNumber = parseInt(pageNumber);

  const getPaginationGroup = () => {
    let start = Math.floor((pageNumber - 1) / PAGES_TO_SHOW) * PAGES_TO_SHOW;
    return new Array(PAGES_TO_SHOW).fill().map((_, idx) => start + idx + 1);
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
        <Link to={`/page/` + (pageNumber - 1)} className={`link-prev ${pageNumber === 1 ? "disabled" : ""}`}>
          <button className={`prev ${pageNumber === 1 ? "disabled" : ""}`}>
            prev
          </button>
        </Link>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            className={`paginationItem ${pageNumber === item ? "active" : null}`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <Link to={`/page/` + (pageNumber + 1)} className={`link-next ${pageNumber === maxPage ? "disabled" : ""}`}>
          <button className={`next ${pageNumber === maxPage ? "disabled" : ""}`}>
            next
          </button>
        </Link>
      </div>
    </>
  );
};

export default Pagination;
