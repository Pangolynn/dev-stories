const RadioButton = ({ label, value, onClick }) => {
  return (
    <>
      <label>
        <input type="radio" value={value} onClick={onClick} />
        {label}
      </label>
    </>
  );
};

export default RadioButton;
