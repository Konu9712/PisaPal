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
            var res = await response.json();
            group.groupArray = res.groups;
            setGroup({ ...group, ['groupArray']: res });
        } else if (response.status === 400) {
          response = await response.json();
          console.log(response.error);
        }
      }
    );
  }, []);

  const openGroupDetail = (e, val) => {
    e.preventDefault();
    navigate("/group-detail",{state: { groupDetail : val} });
  };

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
          {
              (() => {
                let container = [];
                group.groupArray.forEach((val, index) => {
                  container.push(
                      <div class="col-3 box-outer" onClick={(e) => openGroupDetail(e, val)}>
                        <a href="" className="removeLine">
                        < div className="box"><p>{val.groupName}</p></div>
                        </a>
                      </div>
                    )
                });
                return container;
              })()
            }
        </div>
      </div>
    </div>
  );
};