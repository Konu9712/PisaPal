import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email : "",
    password : "",
    serverError : ""
  });

  const handleSubmit = (e, type) => {
    e.preventDefault();
    setUser({ ...user, [type]: e.target.value });
  };

  const onSubmitBtn = async (e) => {
    e.preventDefault();

    if (!user.email) {
      errors.email = "Email is required";
      setErrors({ ...errors, ["email"]: "Email is required" });
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email address is invalid";
      setErrors({ ...errors, ["email"]: "Email address is invalid" });
    } else {
      errors.email = ""
      setErrors({ ...errors, ["email"]: "" });
    }

    if (!user.password) {
      errors.password = "Password is required";
      setErrors({ ...errors, ["password"]: "Password is required" });
    } else {
      errors.password = "";
      setErrors({ ...errors, ["password"]: "" });
    }

    if (errors.email == "" && errors.password == "") {
      await axios
        .post("http://localhost:8000/auth/login", user)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("email", user.email);
          navigate("/dashboard");
          window.location.reload(true);
          setErrors({ ...errors, ["email"]: "" });
          setErrors({ ...errors, ["password"]: "" });
          setErrors({ ...errors, ["serverError"]: "" });
        })
        .catch((err) => {
          console.log("err", err.response.status);
          if (err.response.status === 400) {
            errors.serverError = "Email or Password is incorrect";
            setErrors({ ...errors, ["serverError"]: "Email or Password is incorrect" });
          }
        });
    }
  };

  return (
    <div className="wrapper">
      <div className="auth-inner">
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
            {errors.serverError && (
              <div className="error">{errors.serverError}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
