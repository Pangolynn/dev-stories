// import * as React from "react";

import { useEffect, useState } from "react";

const App = () => {
  const [searchTerm, setSearchterm] = useState(
    localStorage.getItem("search") || "React"
  );

  const stories = [
    {
      title: "React",
      url: "someUrl",
      author: "author1",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "url2",
      author: "author2",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchterm(event.target.value);
  };

  const filteredStories = stories.filter((x) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Dev Stories</h1>
      <Search onSearch={handleSearch} search={searchTerm}></Search>
      <hr />
      <List list={filteredStories} />
    </div>
  );
};

const List = ({ list }) => (
  <ul>
    {list !== "" &&
      list.map(({ objectID, ...item }) => <Item key={objectID} {...item} />)}
  </ul>
);

const Item = ({ title, url, author, num_comments, points }) => {
  return (
    <li>
      {title}
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </li>
  );
};

const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input onChange={onSearch} type="text" id="search" value={search} />
    </div>
  );
};

export default App;
