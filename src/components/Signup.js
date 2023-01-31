import React from "react";

export const Signup = () => {
  return (
    <div>
      <form>
        <h3>Register</h3>

        <div className="mt-3 mb-3">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Name" />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-5">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Confirm password"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
