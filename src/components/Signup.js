import React, { useState } from "react";

export const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e, type) => {
    e.preventDefault();
    console.log(type);
    setUser({ ...user, [type]: e.target.value });
  };

  const onSubmitBtn = (e) => {
    e.preventDefault();
    if (user.password !== user.cpassword) {
      setError("Password and Confirm Password must be same");
    } else {
      console.log("Success");
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
