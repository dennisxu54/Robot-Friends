import "./HomePage.css";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
    <div className="home-page-main">
    <h2>Welcome to Robofriends</h2>
    </div>
    <div className="home-page-center">
    <Link to="/page/1">
    <button>
    Please click here for Robot list
    </button>
    </Link>
    </div>
    </>
  );
};

export default HomePage;
