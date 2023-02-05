import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e, type) => {
    e.preventDefault();
    setUser({ ...user, [type]: e.target.value });
  };

  const onSubmitBtn = (e) => {
    
    e.preventDefault();

    let formErrors = {};

    if (!user.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      formErrors.email = "Email address is invalid";
    }

    if (!user.password) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);

    if (!Object.keys(formErrors).length) {

      axios.post("http://localhost:8000/auth/login", user).then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/dashboard");
        setErrors({});
      });

    }

  };

  return (
    <div>
      <form>
        <h3>Login</h3>

        <div className="mt-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => handleSubmit(e, "email")}
          />
        </div>
        {errors.email && <div className="error">{errors.email}</div>}

        <div className="mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => handleSubmit(e, "password")}
          />
        </div>
        {errors.password && <div className="error">{errors.password}</div>}

        <div className="d-grid mt-4">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => onSubmitBtn(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
