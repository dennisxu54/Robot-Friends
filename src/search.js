import "./App.css";

const Search = ({ searchQuery, setSearchQuery }) => (
  <form>
    <label htmlFor="header-search">
      <span className="visually-hidden">Search robots</span>
    </label>
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search robots"
      name="Search"
    />
  </form>
);

export default Search;
