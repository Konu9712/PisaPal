import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [group, setGroup] = useState({
    groupArray: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };

    fetch("http://localhost:8000/getgroups", requestOptions).then(
      async (response) => {
        if (response.status === 200) {
          response = await response.json();
          group.groupArray = response;
          const filteredGroups = response?.groups?.filter(
            (group) => group !== null
          );
          console.log("filteredGroups", filteredGroups);
          setGroup({ ...group, ["groupArray"]: filteredGroups });
        } else if (response.status === 400) {
          response = await response.json();
          console.log(response.error);
        }
      }
    );
  }, []);

  return (
    <div className="container section-p1">
      <div className="row mt-5">
        <div className="col">
          <h3>Dashboard</h3>
        </div>
        <Link className="col-auto nav-link" to={"/create-group"}>
          <h5 className="child">
            <FontAwesomeIcon icon={faPlusCircle} />
          </h5>
          <h5 className="child">Create Group</h5>
        </Link>
      </div>
      <div>
        <div class="row mt-3">
          {group?.groupArray?.length > 0 &&
            group.groupArray.map((val, index) => {
              console.log(group.groupArray);
              return (
                <div className="col-3 box-outer">
                  <div className="box">
                    <p>{val.groupName}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};