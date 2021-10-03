import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Search from "./components/Search/Search";
import LoadList from "./components/LoadList/LoadList";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import RobotModal from "./components/RobotModal/RobotModal";
import Pagination from "./components/Pagination/Pagination";
import { useResizeWindow } from "./Hooks/ResizeWindow";
import SortByDropDown from "./components/SortByDropDown/SortByDropDown";

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

const App = () => {
  const smallWindow = useResizeWindow();
  const [maxEntriesPerPage, setMaxEntriesPerPage] = useState();
  const pagesToShow = 1;
  const [currentPage, setCurrentPage] = useState();
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
      setCurrentPage(1);
    } else {
      setMaxEntriesPerPage(4);
      setCurrentPage(1);
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

  function buttonOptions(robotIndex, option) {
    const correctedIndex = robotIndex + (currentPage - 1) * maxEntriesPerPage;
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

  const getPaginatedData = () => {
    const startIndex = currentPage * maxEntriesPerPage - maxEntriesPerPage;
    const endIndex = startIndex + maxEntriesPerPage;
    return filteredRobotList.slice(startIndex, endIndex);
  };

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
        <header className="main-header">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </header>
      </div>
      <main>
        <h1 style={{ textAlign: "center" }}>RoboFriends</h1>
        <div className="main-center">
          <SortByDropDown setSortOptionType={setSortOptionType} />
        </div>
        {isListLoaded ? (
          <div className="main-container">
            {error ? (
              <div>Error: {error.message}</div>
            ) : (
              <>
                <LoadList
                  Robots={getPaginatedData()}
                  onButton={buttonOptions}
                />
                <Pagination
                  maxPage={maxPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageLimit={pagesToShow}
                />
              </>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default App;
