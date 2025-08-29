const CheckBox = ({ name, label, checked, onChange }) => {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id={name}
        name={name}
        checked={checked || false}
        onChange={onChange}
      />
      <label className="form-check-label text-white" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
