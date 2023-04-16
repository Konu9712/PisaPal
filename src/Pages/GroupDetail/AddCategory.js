import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AddCategory = () => {

    const navigate = useNavigate();

    const [category, setCategory] = useState({
        categoryName: "",
        categoryArray : [],
    });

    const [errors, setErrors] = useState({});

    const location = useLocation();

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

      fetch('http://localhost:8000/getCatagory/' + location.state.groupDetail.groupId, requestOptions).then(
        async (response) => {
          if (response.status === 200) {
            response = await response.json();
            setCategory({ ...category, ["categoryArray"]: response.catagory });
          } else if (response.status === 400) {
            response = await response.json();
            console.log(response.error);
          }
        }
      ); 

    }, []);

    const handleSubmit = (e, type) => {
        e.preventDefault();
        setCategory({ ...category, [type]: e.target.value });
    };

    const btnCreateCategory = async (e) => {

        e.preventDefault();
    
        let formErrors = {};
    
        if (!category.categoryName) {
          formErrors.categoryName = "Category Name is required";
        }
    
        setErrors(formErrors);
    
        if (!Object.keys(formErrors).length) {

            console.log(localStorage.getItem('token'));
            console.log(category.categoryName);

          const requestOptions = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "authorization" : localStorage.getItem('token'),
            },
            body: JSON.stringify({
                "catagory" : [category.categoryName]
            }),
          };

          fetch('http://localhost:8000/createCatagory/' + location.state.groupDetail.groupId, requestOptions).then(
            async (response) => {
              if (response.status === 200) {
                console.log("success");
                window.location.reload(true);
              } else if (response.status === 400) {
                response = await response.json();
                console.log(response.error);
                formErrors.categoryName = response.error;
                setErrors(formErrors);
              }
            }
          );
    
          setErrors({});
    
        }
    
      };

    return(

        <div className="container section-p1">
            <div className="row mt-5">
                <h3 className="col-12">{location.state.groupDetail.groupName} - Add Category</h3>
                <label className="col mt-5">Category Name</label>
                <input
                    type="text"
                    className="form-control mt-2 groupName"
                    placeholder="Enter Category Name"
                    value={category.categoryName}
                    onChange={(e) => handleSubmit(e, "categoryName")}
                />
                <div>
                    {errors.categoryName && <div className="error">{errors.categoryName}</div>}
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4 mx-auto d-block" onClick={(e) => btnCreateCategory(e)}> Submit </button>
            <div className="mt-5">
                <h4 className="col-12 mb-4">Category</h4>
                <div>
                    {
                        (() => {
                        let container = [];
                        category.categoryArray.forEach((val, index) => {
                            container.push(
                            <div className="row" key={index}>
                                <label className="col">{val}</label>
                                <hr className="mt-2" />
                            </div>)
                        });
                        return container;
                        })()
                    }
                </div>
            </div>
        </div>

    );
    
}