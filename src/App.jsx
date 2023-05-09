// import * as React from "react";
import Button from "./UI/Button";

import React, { useEffect, useRef, useState } from "react";
import RadioButton from "./UI/RadioButton";
import Checkbox from "./UI/Checkbox";

const initStories = [
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
  const [radioValue, setRadioValue] = useState("false");
  const [stories, setStories] = useState(initStories);

  const onRadioChange = (e) => {
    setRadioValue((val) => {
      if (!val) {
        e.target.checked = false;
      }
      return !val;
    });
  };



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
        value={searchTerm}
        onInputChange={handleSearch}
        type="text"
        isFocused
      >
        Search:
      </InputWithLabel>
      <hr />
      <List list={filteredStories} />
      <Button classes="one two">Click Me</Button>
      <RadioButton
        value={radioValue}
        label="Test radio"
        onClick={onRadioChange}
      />
      <Checkbox name="testCheck" label="Test Check" />
    </div>
  );
};

const List = ({ list }) => (
  <ul>
    {list !== "" &&
      list.map(({ objectID, ...item }) => <><Item key={objectID} {...item} /><Button>Delete</Button></>)}
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

const InputWithLabel = ({
  id,
  children,
  value,
  onInputChange,
  type = "text",
  isFocused,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused, inputRef]);

  return (
    <div>
      <label htmlFor={id}>{children} </label>
      &nbsp;
      <input
        ref={inputRef}
        onChange={onInputChange}
        type={type}
        id={id}
        value={value}
      />
    </div>
  );
};

export default App;
