import React from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

function Signup() {
  const [toggle, setToggle] = useState(false);

  const showPassword = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  let errorFields = {};
  console.log(errorFields);

  const submitForm = (e) => {
    e.preventDefault();

    const tmp_date = new Date().toISOString().split("T");
    const date = `${tmp_date[0]} ${tmp_date[1]}`;
    const initialValues = { username, email, password, date };

    const regexUsername = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>,;:[\]]{1,20}$/;
    //const regexEmail = /^[a-z0-9._-éèàùâôûîê]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!initialValues.username) {
      errorFields.username = "UserName is required";
      setError(true);
    } else if (!regexUsername.test(initialValues.username))
      errorFields.username = "regex non respectée";

    // fetch("http://localhost:5000/api/signup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(initialValues),
    // });

    console.log(initialValues.username, errorFields);
  };
  return (
    <div className="main">
      <form className="main__form" onSubmit={submitForm}>
        <h1>Create Account</h1>

        <div className="main__form__input">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {error ? errorFields.username : ""}
        <div className="main__form__input">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
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
          Create account
        </button>
        <div>
          Already registered ? <Link to={"/login"}>Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
