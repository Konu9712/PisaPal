import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';



export const CreateGroup = () => {

    const navigate = useNavigate();

    const [group, setGroup] = useState({
        groupName: "",
        groupArray: [],
        userArray : [],
        selectedUserArray : []
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/sign-in");
      }

      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" ,
                    "authorization" : localStorage.getItem('token'),
                },
      };

      fetch('http://localhost:8000/getUsers', requestOptions).then(
        async (response) => {
          if (response.status === 200) {
            response = await response.json();
            for (let i = 0; i < response.length; i++) {
              if(group.userArray.length > 0) {
                for (let j = 0; j < group.userArray.length; j++) {
                  if(group.userArray[j].label != response[i].name + " (" + response[i].email + ")") {
                    group.userArray.push( { label: response[i].name + " (" + response[i].email + ")" });
                    break;
                  }
                }
              } else {
                group.userArray.push( { label: response[i].name + " (" + response[i].email + ")" });
                break;
              }
             }
             console.log(group.userArray);
          } else if (response.status === 400) {
            response = await response.json();
            console.log(response.error);
          }
        }
      );

    }, []);

    const handleSubmit = (e, type) => {
        e.preventDefault();
        setGroup({ ...group, [type]: e.target.value });
    };

    const handleAutoComplete = (e, type) => {
      e.preventDefault();
      if(group.selectedUserArray > 0) {
        for (let j = 0; j < group.selectedUserArray.length; j++) {
          console.log(group.selectedUserArray[j]);
          if(group.selectedUserArray[j] != e.target.innerText) {
            group.selectedUserArray.push(e.target.innerText);
            setGroup({ ...group, [type]: e.target.value });
            break;
          } else {
            alert('This user alreay selected');
            break;
          }
        }
      } else {
        group.selectedUserArray.push(e.target.innerText);
        setGroup({ ...group, [type]: e.target.value });
      }
    }

    const btnCreateGroup = async (e) => {
        e.preventDefault();
    
        let formErrors = {};
    
        if (!group.groupName) {
          formErrors.groupName = "Group Name is required";
        }
    
        if (group.selectedUserArray.length == 0) {
          formErrors.groupArray = "You have to select user";
        } else if (group.selectedUserArray.length < 2) {
          formErrors.groupArray = "You have to select atleat 2 users";
        }
    
        setErrors(formErrors);
    
        if (!Object.keys(formErrors).length) {
    
          //post request

          const finalSelectedUserArray = [];
          for (let i = 0; i < group.selectedUserArray.length; i++) {
              let str = group.selectedUserArray[i].split('(');
              finalSelectedUserArray.push(str[1].replace(')', ''));
          }
          
          console.log(finalSelectedUserArray);

          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                groupName: group.groupName,
                groupArray: finalSelectedUserArray,
            }),
          };
    
          fetch('http://localhost:8000/group/create/' + localStorage.getItem("userId"), requestOptions).then(
            async (response) => {
              if (response.status === 200) {
                console.log("success");
                navigate("/dashboard");
                window.location.reload(true);
              } else if (response.status === 400) {
                response = await response.json();
                console.log(response.error);
              }
            }
          );
    
          setErrors({});
    
        }
    
      };
      

      const deleteUser = (type, index, val) => {
        const newArray = group.selectedUserArray.filter((value) => value !== val);
        group.selectedUserArray = newArray;
        console.log(group.selectedUserArray);
        setGroup({ ...group, [type]: index });
      };

    return(

        <div className="container section-p1">
            <div className="row mt-5">
                <h3 className="col-12">Create Group</h3>
                <label className="col mt-5">Group Name</label>
                <input
                    type="text"
                    className="form-control mt-2 groupName"
                    placeholder="Enter Group Name"
                    value={group.groupName}
                    onChange={(e) => handleSubmit(e, "groupName")}
                />
                <div>
                    {errors.groupName && <div className="error">{errors.groupName}</div>}
                </div>
                <label className="col-12 mt-5">Select User</label>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={group.userArray}
                    className="mt-2"
                    renderInput={(params) => <TextField {...params} label="Select User" />}
                    onChange={(e) => handleAutoComplete(e, "groupArray")}
                />
                {errors.groupArray && <div className="error mt-1">{errors.groupArray}</div>}
                <div className="mt-5">
                    <h4 className="col-12 mb-3">Selected Users</h4>
                    <div>
                      {
                          (() => {
                            let container = [];
                            group.selectedUserArray.forEach((val, index) => {
                              container.push(
                                <div className="row" key={index}>
                                  <label className="col">{val}</label>
                                  <label className="col-auto" onClick={() => deleteUser( "groupArray", index, val)} ><FontAwesomeIcon icon={faRemove} /></label>
                                  <hr className="mt-2" />
                                </div>)
                            });
                            return container;
                          })()
                        }
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4 mx-auto d-block" onClick={(e) => btnCreateGroup(e)}> Create Group </button>
        </div>

    );
    
}