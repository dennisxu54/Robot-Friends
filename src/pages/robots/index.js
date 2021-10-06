import "./RobotList.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Search from "../../components/search/Search";
import RobotList from "../../components/robot-list/index";
import DeleteModal from "../../components/delete-modal/DeleteModal";
import RobotModal from "../../components/robot-modal/RobotModal";
import Pagination from "../../components/pagination/Pagination";
import { useResizeWindow } from "../../hooks/resize-window";
import { Switch, Link } from "react-router-dom";
import { useFetchRobots } from "../../hooks/use-fetch-robots";

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

const RobotsPage = () => {
  const { isLoading, error, list: initialRobotList } = useFetchRobots();
  const [robotList, setRobotList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredRobotList = filterRobots(robotList, searchQuery);

  const smallWindow = useResizeWindow();

  const [deleteRobotIndex, setDeleteRobotIndex] = useState(-1);
  const [extraRobotInformationIndex, setExtraRobotInformationIndex] =
    useState(-1);

  const [maxEntriesPerPage, setMaxEntriesPerPage] = useState();
  const maxPages = Math.ceil(filteredRobotList.length / maxEntriesPerPage);

  useEffect(() => {
    if (initialRobotList && initialRobotList.length > 0) {
      setRobotList(initialRobotList);
    }
  }, [initialRobotList, error]);

  function deleteRobot() {
    setRobotList(robotList.filter((item, index) => index !== deleteRobotIndex));
    setDeleteRobotIndex(-1);
  }

  useEffect(() => {
    if (smallWindow) {
      setMaxEntriesPerPage(1);
    } else {
      setMaxEntriesPerPage(4);
    }
  }, [smallWindow]);

  return (
    <div>
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
          </div>
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <div className="robot-list-main-container">
              {error ? (
                <div>Error: {error.message}</div>
              ) : (
                <>
                  {
                    <>
                      <RobotList
                        filteredRobotList={filteredRobotList}
                        setExtraRobotInformationIndex={
                          setExtraRobotInformationIndex
                        }
                        setDeleteRobotIndex={setDeleteRobotIndex}
                        entriesPerPage={maxEntriesPerPage}
                      />
                      <Pagination maxPage={maxPages} />
                    </>
                  }
                  {deleteRobotIndex !== -1 && (
                    <DeleteModal
                      deleteRobot={deleteRobot}
                      onCloseModal={() => setDeleteRobotIndex(-1)}
                      robotToDelete={robotList[deleteRobotIndex].name}
                    />
                  )}
                  {extraRobotInformationIndex !== -1 && (
                    <RobotModal
                      onClose={() => setExtraRobotInformationIndex(-1)}
                      currentRobot={robotList[extraRobotInformationIndex]}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </main>
      </Switch>
    </div>
  );
};

export default RobotsPage;
