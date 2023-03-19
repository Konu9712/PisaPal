
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export const Dashboard = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    }
  }, []);

  return (
    <div className="container section-p1">
      <div className="row mt-5">
        <div className="col">
          <h3>Dashboard</h3>
        </div>
        <Link className="col-auto nav-link" to={"/create-group"}>
          <h5 className="child"><FontAwesomeIcon icon={faPlusCircle} /></h5>
          <h5 className="child">Create Group</h5>
        </Link>
      </div>
      <div class="row mt-3">
        <div class="col-3 box-outer">
          <div className="box"><p>1</p></div>
        </div>
        <div class="col-3 box-outer">
          <div className="box"><p>1</p></div>
        </div>
        <div class="col-3 box-outer">
          <div className="box"><p>1</p></div>
        </div>
        <div class="col-3 box-outer">
          <div className="box"><p>1</p></div>
        </div>
        <div class="col-3 box-outer">
          <div className="box"><p>1</p></div>
        </div>
      </div>
    </div>
  );

};
