import { useState } from "react";
import { useForm } from "./common/form";
import auth from "../services/authService";
import Joi from "joi-browser";
import { Navigate, useLocation } from "react-router-dom";

function LoginForm(props) {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const { state } = useLocation();
  let navigated = null;
  if (state) {
    navigated = state.from.pathname;
  }
  // const username = useRef();

  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];

    const dataCopy = { ...data };
    dataCopy[input.name] = input.value;

    setData(dataCopy);
    setErrors(err);
  };

  const doSubmit = async () => {
    //Call the server
    try {
      await auth.login(data.username, data.password);

      window.location = navigated ? navigated : "/";
    } catch (ex) {
      if (ex.response && ex.response.status == 400) {
        const errCopy = { ...errors };
        errCopy.username = ex.response.data;
        setErrors(errCopy);
      }
    }
  };
  const { validateProperty, handleSubmit, renderButton, renderInput } = useForm(
    data,
    schema,
    errors,
    setErrors,
    doSubmit,
    handleChange
  );

  return (
    <div className="form Login">
      {auth.getCurrentUser() && <Navigate to="/" />}

      <h3 className="text-white">Login to your account</h3>
      <form onSubmit={handleSubmit}>
        {renderInput("username", "Username", "text", true)}
        {renderInput("password", "Password", "password")}
        {renderButton("Login")}
      </form>
    </div>
  );
}

export default LoginForm;
