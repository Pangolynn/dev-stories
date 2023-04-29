import * as React from "react";

const list = [
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

const App = () => (
  <div>
    <h1>Dev Stories</h1>
    <Search></Search>
    <hr />
    <List></List>
  </div>
);

const List = () => (
  <ul>
    {list.map((x) => (
      <li key={x.objectID}>
        {x.title}
        <span>
          <a href={x.url}>{x.title}</a>
        </span>
        <span>{x.author}</span>
        <span>{x.num_comments}</span>
        <span>{x.points}</span>
      </li>
    ))}
  </ul>
);

const Search = () => {
  const changeHandler = (event) => {
    console.log(event.target.value);
  };
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input onChange={changeHandler} type="text" id="search" />
    </div>
  );
};

export default App;
