import { memo } from "react";
import { Stories, Story } from "../App";
import Item from "./Item";

type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
};

const List: React.FC<ListProps> = memo(({ list, onRemoveItem }) => (
  <ul>
    {list !== "" &&
      list.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
  </ul>
));

List.displayName = "List";

export default List;
