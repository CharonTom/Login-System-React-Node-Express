import React, { useContext } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };

  const [toggle, setToggle] = useState(false);
  const [formValues, setFormvalues] = useState(initialValues);

  const showPassword = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const { successfullyLogin, currentUser, login, formError, setFormError } =
    useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
    setFormError(false);
  };

  const verifyinput = (formValues) => {};

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await login(formValues);
      setFormError(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <form className="main__form" onSubmit={handleForm}>
        <h1>Login</h1>

        <div className="main__form__input">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formValues.username}
          />
        </div>

        <div className="main__form__input">
          <div className="main__form__input__eye" onClick={showPassword}>
            {toggle ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
          <input
            type={toggle ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formValues.password}
          />
        </div>
        {formError && (
          <p className="main__form__error">Incorrect username or password</p>
        )}
        <button className="button" type="submit">
          Login
        </button>
        <div className="main__form__nav">
          Not registered yet ? <Link to={"/signup"}>Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
