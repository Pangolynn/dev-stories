const Checkbox = ({ label, onChange, checked, id, name, value }) => {
  return (
    <>
      <label htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          onChange={onChange}
          checked={checked}
          name={name}
          value={value}
        />
        {label}
      </label>
    </>
  );
};

export default Checkbox;
