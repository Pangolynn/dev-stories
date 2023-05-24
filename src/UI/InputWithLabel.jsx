import { useEffect, useRef } from "react";

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
      <label className="label" htmlFor={id}>
        {children}{" "}
      </label>
      &nbsp;
      <input
        ref={inputRef}
        onChange={onInputChange}
        type={type}
        id={id}
        value={value}
        className="input"
      />
    </div>
  );
};

export default InputWithLabel;
