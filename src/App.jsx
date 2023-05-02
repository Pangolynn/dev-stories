// import * as React from "react";

import { useState } from "react";

const App = () => {
  const [searchTerm, setSearchterm] = useState("");

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

  const handleSearch = (event) => {
    setSearchterm(event.target.value);
  };

  const filteredStories = stories.filter((x) => {
    return x.title.includes(searchTerm);
  });

  return (
    <div>
      <h1>Dev Stories</h1>
      <Search onSearch={handleSearch}></Search>
      <hr />
      <List list={filteredStories} />
    </div>
  );
};

const List = (props) => (
  <ul>
    {console.log(props.list)}
    {props.list !== "" &&
      props.list.map((x) => <Item key={x.objectID} item={x} />)}
  </ul>
);

const Item = (props) => {
  return (
    <li>
      {props.item.title}
      <span>
        <a href={props.item.url}>{props.item.title}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
    </li>
  );
};

const Search = (props) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input onChange={props.onSearch} type="text" id="search" />
    </div>
  );
};

export default App;
