import "./RobotList.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Search from "../../components/search/Search";
import LoadList from "../../components/load-list/LoadList";
import DeleteModal from "../../components/delete-modal/DeleteModal";
import RobotModal from "../../components/robot-modal/RobotModal";
import Pagination from "../../components/pagination/Pagination";
import { useResizeWindow } from "../../hooks/resize-window";
import SortByDropDown from "../../components/sort-by-drop-down/SortByDropDown";
import { Switch, Route, useParams, Link } from "react-router-dom";

const filterRobots = (posts, query) => {
  if (!query) {
    return posts;
  }

  return posts.filter((post) => {
    const newQuery = query.toLowerCase();
    const postName = post.name.toLowerCase();
    return postName.includes(newQuery);
  });
};

const ShowRobotList = () => {
  const smallWindow = useResizeWindow();
  const [maxEntriesPerPage, setMaxEntriesPerPage] = useState();
  const pagesToShow = 1;
  const [error, setError] = useState(null);
  const [isListLoaded, setIsListLoaded] = useState(false);
  const [robotList, setRobotList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRobotList = filterRobots(robotList, searchQuery);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRobotModal, setShowRobotModal] = useState(false);
  const [deleteRobotIndex, setDeleteRobotIndex] = useState(0);
  const [extraRobotInformationIndex, setExtraRobotInformationIndex] =
    useState();
  const [sortOptionType, setSortOptionType] = useState("id-up");
  const maxPages = Math.ceil(filteredRobotList.length / maxEntriesPerPage);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsListLoaded(true);
          setRobotList(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsListLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    if (smallWindow) {
      setMaxEntriesPerPage(1);
      // setCurrentPage(1);
    } else {
      setMaxEntriesPerPage(4);
      // setCurrentPage(1);
    }
  }, [smallWindow]);

  useEffect(() => {
    const orderArrayBy = (orderType) => {
      const typeOrder = orderType.split("-");
      const filterType = typeOrder[0];
      const isAscending = typeOrder[1] === "up" ? 1 : -1;

      const sortedArray = [...filteredRobotList].sort((a, b) =>
        a[filterType] > b[filterType] ? isAscending : -isAscending
      );

      setRobotList(sortedArray);
    };
    orderArrayBy(sortOptionType);
  }, [sortOptionType]);

  function buttonOptions(robotIndex, option, pageNumber) {
    const correctedIndex = robotIndex + (pageNumber - 1) * maxEntriesPerPage;
    setDeleteRobotIndex(correctedIndex);
    setExtraRobotInformationIndex(correctedIndex);
    if (option === "delete") {
      setShowDeleteModal(true);
    } else if (option === "information") {
      setShowRobotModal(true);
    }
  }

  function deleteItem() {
    setRobotList(robotList.filter((item, index) => index !== deleteRobotIndex));
    setShowDeleteModal(false);
  }

  const getPaginatedData = (pageNumber) => {
    const startIndex = pageNumber * maxEntriesPerPage - maxEntriesPerPage;
    const endIndex = startIndex + maxEntriesPerPage;
    return filteredRobotList.slice(startIndex, endIndex);
  };

  function RobotLoadList() {
    let { pageNumber } = useParams();

    return [
      <LoadList
        Robots={getPaginatedData(pageNumber)}
        onButton={buttonOptions}
      />,
      <Pagination maxPage={maxPages} pageLimit={pagesToShow} />,
    ];
  }

  return (
    <div>
      {
        /* Only render modal if items are loaded */
        // main takeaway for this PR is, name your variables more specifically, helps with debugging
        robotList.length > 0 ? (
          [
            showDeleteModal && (
              <DeleteModal
                onDo={deleteItem}
                onClose={() => setShowDeleteModal(false)}
                RobotNameToBeDeleted={robotList[deleteRobotIndex].name}
              />
            ),
            showRobotModal && (
              <RobotModal
                onClose={() => setShowRobotModal(false)}
                currentRobot={robotList[extraRobotInformationIndex]}
              />
            ),
          ]
        ) : (
          <p>Loading ...</p>
        )
      }
      <div>
        <header className="robot-list-main-header">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </header>
      </div>
      <Switch>
        <main>
          <h1 style={{ textAlign: "center" }}>RoboFriends</h1>
          
          <div className="robot-list-main-center">
          <Link to="/">
            <button className="robot-list-center-link">Home</button>
          </Link>
            <SortByDropDown setSortOptionType={setSortOptionType} />
          </div>
          {isListLoaded ? (
            <div className="robot-list-main-container">
              {error ? (
                <div>Error: {error.message}</div>
              ) : (
                <>
                  <Route
                    exact
                    path="/page/:pageNumber"
                    children={<RobotLoadList />}
                  />
                </>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      </Switch>
    </div>
  );
};

export default ShowRobotList;
