import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { CreateGroup } from "./Pages/CreateGroup/CreateGroup";
import { GroupDetail } from "./Pages/GroupDetail/GroupDetail";
import { AddCategory } from "./Pages/GroupDetail/AddCategory";
import { AddExpense } from "./Pages/GroupDetail/AddExpense";
import { ExpenseDetail } from "./Pages/GroupDetail/ExpenseDetail";

function App() {

  var token = false;

  if (localStorage.getItem('token')) {
    token = true;
  } else {
    token = false;
  }

  //const navigate = useNavigate();

  const btnLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    window.location.reload(true);
    //navigate("/sign-in");
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <div className="row w-100">
              <div className="col">
                <div className="navbar-brand collapse navbar-collapse">
                  PaisaPal
                </div>
              </div>
              <div className="col-md-auto">

                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo02"
                >   
                    { token ?
                      (
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item">
                            <Link className="nav-link" to={"/dashboard"}>
                              Dashboard
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" onClick={(e) => btnLogout(e)}  to={"/sign-in"}>
                              Logout
                            </Link>
                          </li>
                        </ul>
                      )
                    :
                      (
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item">
                            <Link className="nav-link" to={"/sign-in"}>
                              Login
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to={"/sign-up"}>
                              Register
                            </Link>
                          </li>
                        </ul>
                      )
                    }
                </div>
              </div>
            </div>
          </div>
        </nav>


            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-group" element={<CreateGroup />} />
              <Route path="/group-detail" element={<GroupDetail />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/expense-detail" element={<ExpenseDetail />} />
            </Routes>

      </div>
    </Router>
  );
}

export default App;
