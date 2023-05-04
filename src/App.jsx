// import * as React from "react";

import { useEffect, useState } from "react";

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);
  // set the initial state by accessing local Storage or initial state which is passed in

  useEffect(() => {
    // everytime the searchterm is updated (user types in search input) useffect
    // will run, and update the localStorage to match React's internal state.
    localStorage.setItem(key, value);
  }, [key, value]);

  // return an array to match the same way you could use useState hook
  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

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

  // useEffect(() => {
  //   localStorage.setItem("search", searchTerm);
  // }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter((x) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Dev Stories</h1>
      <InputWithLabel
        id="search"
        label="Search:"
        value={searchTerm}
        onInputChange={handleSearch}
        type="text"
      />
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

const InputWithLabel = ({ id, label, value, onInputChange, type = "text" }) => {
  return (
    <div>
      <label htmlFor={id}>{label} </label>
      &nbsp;
      <input onChange={onInputChange} type={type} id={id} value={value} />
    </div>
  );
};

export default App;
