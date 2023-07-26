import React from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

function Login() {
  const [toggle, setToggle] = useState(false);

  const showPassword = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const initialValues = { username, password };

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initialValues),
    });

    console.log(initialValues);
  };

  return (
    <div className="main">
      <form className="main__form" onSubmit={submitForm}>
        <h1>Login</h1>

        <div className="main__form__input">
          <input
            type="text"
            name="UserName"
            placeholder="UserName"
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="button" type="submit">
          Login
        </button>
        <div>
          You don't have an accound yet ? <Link to={"/signup"}>Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
