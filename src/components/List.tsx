import { memo, useState } from "react";
import { Stories, Story } from "../App";
import Item from "./Item";

type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
};

const List: React.FC<ListProps> = memo(({ list, onRemoveItem }) => {
  const [sort, setSort] = useState("NONE");

  const handleSort = (sortKey) => {
    setSort(sortKey);
  };

  return (
    <ul>
      <li style={{ display: "flex" }}>
        <span style={{ width: "40%" }}>
          <button type="button" onClick={() => handleSort("TITLE")}>
            Title
          </button>
        </span>
        <span style={{ width: "30%" }}>
          <button type="button" onClick={() => handleSort("AUTHOR")}>
            Author
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            onClick={() => {
              handleSort("COMMENT");
            }}
          >
            Comments
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            onClick={() => {
              handleSort("POINT");
            }}
          >
            Points
          </button>
        </span>
        <span style={{ width: "10%" }}>Actions</span>
      </li>

      {list.length &&
        list.map((item) => (
          <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
        ))}
    </ul>
  );
});

List.displayName = "List";

export default List;
