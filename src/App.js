import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Search from "./components/Search/Search";
import LoadList from "./components/LoadList/LoadList";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import RobotModal from "./components/RobotModal/RobotModal";

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
      <header className="header">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>
      <main>
        <h1>RoboFriends</h1>
        {isListLoaded ? (
          <div className="container">
            <LoadList
              error={error}
              Robots={filteredRobotList}
              onDelete={showDeleteConfirm}
              onShowInformation={showExtraInformation}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default App;
