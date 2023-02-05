import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e, type) => {
    e.preventDefault();
    setUser({ ...user, [type]: e.target.value });
  };
  const onSubmitBtn = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/auth/login", user).then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      navigate("/dashboard");
    });
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
