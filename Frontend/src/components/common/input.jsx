const Input = ({ name, label, error, focus, ...rest }) => {
  console.log(rest);
  return (
    <div className="form-group">
      <label className="text-white" htmlFor={name}>
        {label}
      </label>
      <input
        autoFocus={focus}
        // ref={username}
        {...rest}
        id={name}
        name={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
