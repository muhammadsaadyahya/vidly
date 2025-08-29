import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import CheckBox from "./checkBox";

export function useForm(
  data,
  schema,
  errors,
  setErrors,
  doSubmit,
  handleChange
) {
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaItem = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaItem);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;
    const errorsCopy = {};
    for (let item of error.details) {
      errorsCopy[item.path[0]] = item.message;
    }
    return errorsCopy;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //Call the server
    let err = validate() || null;
    const x = err;
    if (err === null) err = {};
    setErrors(err);

    if (x) return;
    doSubmit();
  };

  const renderInput = (
    name,
    label,
    type = "text",
    focus = false,
    value = ""
  ) => {
    return (
      <Input
        focus={focus}
        type={type}
        name={name}
        value={data[name] || ""}
        label={label}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderCheckBox = (name, label, isChecked) => {
    return (
      <CheckBox
        name={name}
        label={label}
        checked={isChecked || false}
        onChange={handleChange}
      />
    );
  };

  const renderSelect = (name, label, options, value = "") => {
    return (
      <Select
        name={name}
        value={value}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderButton = (label) => {
    return (
      <button disabled={validate()} className="btn btn-danger submitBtn">
        {label}
      </button>
    );
  };

  return {
    validate,
    validateProperty,
    handleSubmit,
    renderButton,
    renderInput,
    renderSelect,
    renderCheckBox,
  };
}
