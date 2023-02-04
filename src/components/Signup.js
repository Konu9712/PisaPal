import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e, type) => {
    e.preventDefault();
    setUser({ ...user, [type]: e.target.value });
  };

  const onSubmitBtn = async (e) => {
    e.preventDefault();
    if (user.password !== user.cpassword) {
      setError("Password and Confirm Password must be same");
    } else {
      //post request
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          name: user.name,
        }),
      };
      fetch("http://localhost:8000/auth/signup", requestOptions).then(
        async (response) => {
          if (response.status === 200) {
            console.log("success");
            navigate("/sign-in");
          } else if (response.status === 400) {
            response = await response.json();
            setError(response.error);
          }
        }
      );
      setError("");
    }
  };

  return (
    <div>
      <form>
        <h3>Register</h3>

        <div className="mt-3 mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={user.name}
            onChange={(e) => handleSubmit(e, "name")}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => handleSubmit(e, "email")}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => handleSubmit(e, "password")}
          />
        </div>

        <div className="mb-5">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Confirm password"
            value={user.cpassword}
            onChange={(e) => handleSubmit(e, "cpassword")}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => onSubmitBtn(e)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
