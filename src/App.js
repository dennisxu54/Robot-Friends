import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Search from "./components/Search/Search";
import LoadList from "./components/LoadList/LoadList";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import RobotModal from "./components/RobotModal/RobotModal";
import Pagination from "./components/Pagination/Pagination";

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
  const maxEntriesPerPage = 4;
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
  const [currentPage, setCurrentPage] = useState(1);
  const maxPages = Math.round(filteredRobotList.length / maxEntriesPerPage);

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

  function showDeleteConfirm(robotIndex) {
    setDeleteRobotIndex(robotIndex);
    setShowDeleteModal(true);
  }

  function deleteItem() {
    setRobotList(robotList.filter((item, index) => index !== deleteRobotIndex));
    setShowDeleteModal(false);
  }

  function showExtraInformation(robotInformationIndex) {
    setExtraRobotInformationIndex(robotInformationIndex);
    setShowRobotModal(true);
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
        <header className="header">
          <select
            className="drop-down-box"
            onChange={(e) => setSortOptionType(e.target.value)}
          >
            <option value="id-up">ID Ascend</option>
            <option value="id-down">ID Descend</option>
            <option value="name-up">Name Ascend</option>
            <option value="name-down">Name Descend</option>
          </select>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </header>
      </div>
      <main>
        <h1 style={{ textAlign: "center" }}>RoboFriends</h1>
        {isListLoaded ? (
          <div className="container">
            {error ? (
              <div>Error: {error.message}</div>
            ) : (
              <>
                <LoadList
                  Robots={getPaginatedData()}
                  onDelete={showDeleteConfirm}
                  onShowInformation={showExtraInformation}
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
