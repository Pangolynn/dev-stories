import { memo } from "react";
import Item from "./Item";

const List = memo(
  ({ list, onRemoveItem }) =>
    console.log("B:list") || (
      <ul>
        {list !== "" &&
          list.map((item) => (
            <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
          ))}
      </ul>
    )
);

List.displayName = "List";

export default List;
