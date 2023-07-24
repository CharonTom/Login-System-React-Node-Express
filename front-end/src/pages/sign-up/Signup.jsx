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
  return (
    <div className="main">
      <form className="main__form">
        <h1>Create Account</h1>

        <div className="main__form__input">
          <input type="text" name="userId" placeholder="User ID" />
        </div>

        <div className="main__form__input">
          <input type="email" name="email" placeholder="Email" />
        </div>

        <div className="main__form__input">
          <div className="main__form__input__eye" onClick={showPassword}>
            {toggle ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
          <input
            type={toggle ? "text" : "password"}
            name="password"
            placeholder="Password"
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
