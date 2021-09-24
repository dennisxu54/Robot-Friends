import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Search from "./components/Search/Search";
import LoadList from "./components/LoadList/LoadList";
import NewModal from "./components/Modal/Modal";

const filterPosts = (posts, query) => {
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = filterPosts(items, searchQuery);
  const [show, setShow] = useState(false)
  const [deleteUser, setDeleteUser] = useState(0)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function showConfirm(user) {
    setDeleteUser(user)
    setShow(true)
  }

  function deleteItem() {
    setItems(items.filter((item, index) => index !== deleteUser));
    setShow(false)
  }

  return (
    <div>
    <NewModal 
    onDo={deleteItem}
    onClose={() => setShow(false)} 
    show={show}
    />
      <header className="header">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>
      <main>
        <h1>RoboFriends</h1>
        {isLoaded ? (
          <div className="container">
            <LoadList
              error={error}
              items={filteredPosts}
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
