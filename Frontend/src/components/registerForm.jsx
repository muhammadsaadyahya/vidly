import { useState } from "react";
import { useForm } from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import Joi from "joi-browser";

function Register() {
  const [data, setData] = useState({ username: "", password: "", name: "" });
  const [errors, setErrors] = useState({});
  const schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

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
      const response = await userService.register(data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";

      console.log(response);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
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
    <div className="form Register">
      <form onSubmit={handleSubmit}>
        <h3 className="text-white text-center">Register to your account</h3>
        {renderInput("username", "Username", "text", true)}
        {renderInput("password", "Password", "password")}
        {renderInput("name", "Name")}
        {renderButton("Register")}
      </form>
    </div>
  );
}

export default Register;
