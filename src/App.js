import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Search from "./components/Search/Search";
import LoadList from "./components/LoadList/LoadList";
import NewModal from "./components/Modal/Modal";

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
  const [showModal, setShowModal] = useState(false);
  const [deleteUserIndex, setDeleteUserIndex] = useState(0);

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

  function showConfirm(index) {
    setDeleteUserIndex(index);
    setShowModal(true);
  }

  function deleteItem() {
    setRobotList(robotList.filter((item, index) => index !== deleteUserIndex));
    setShowModal(false);
  }

  return (
    <div>
      {
        /* Only render modal if items are loaded */
        // main takeaway for this PR is, name your variables more specifically, helps with debugging
        robotList.length > 0 && showModal && (
          <NewModal
            onDo={deleteItem}
            onClose={() => setShowModal(false)}
            user={robotList[deleteUserIndex].name}
          />
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
              items={filteredRobotList}
              onOpen={showConfirm}
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
