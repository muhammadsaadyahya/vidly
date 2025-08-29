const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group ">
      <label className="text-white" htmlFor={name}>
        {label}
      </label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />

        {options.map((option) => (
          <option value={option._id} key={option._id}>
            {option.name || option.title}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
