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
        <span style={{ width: "40%" }}>Title</span>
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
