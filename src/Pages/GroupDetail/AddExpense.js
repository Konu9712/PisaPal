import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const AddExpense  = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [expense, setExpense] = useState({
        expenseName: "",
        category: "",
        amount : "",
        categoryArray : [],
        userArray : [],
        screenTitle : ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/sign-in");
      }

      const requestOptions = {
        method: "GET",
        headers: { 
            "Content-Type": "application/json" ,
            "authorization" : localStorage.getItem('token'),
        },
      };

      fetch('http://localhost:8000/getCatagory/' + location.state.groupDetail.groupId, requestOptions).then(
        async (response) => {
          if (response.status === 200) {
            response = await response.json();
            setExpense({ ...expense, ["categoryArray"]: response.catagory });
          } else if (response.status === 400) {
            response = await response.json();
            console.log(response.error);
          }
        }
      );

        const users = location.state.groupDetail.groupMembers;
        var tempArray = [];
        for (let i = 0; i < users.length; i++) {
            const user = {
                email : users[i],
                amount : 0.00,
                isChecked : location.state.isFrom === "Edit" ? false : true
            }
            tempArray.push(user);  
        }

        if(location.state.isFrom === "Edit") {

             expense.screenTitle = "Edit Expense";
             var amt = location.state.expense.expenseAmount / location.state.expense.dividedPeople.length;

             tempArray.forEach((user, index) => {
                location.state.expense.dividedPeople.forEach((involveUser, index) => {
                    if(user.email === involveUser) {
                        user.isChecked = true;
                        user.amount = amt;
                    }
                });
             });

            expense.expenseName = location.state.expense.expenseName;
            expense.category = location.state.expense.expenseCatagory;
            expense.amount = location.state.expense.expenseAmount;
    
          } else {
            expense.screenTitle = "Add Expense";
          }

        expense.userArray = tempArray;
        setExpense({ ...expense, ["userArray"]: tempArray});

    }, []);

    const handleSubmit = (e, type) => {
        e.preventDefault();
        setExpense({ ...expense, [type]: e.target.value });
    };

    const handleAmountEvent = (e, type) => {
        e.preventDefault();
        setExpense({ ...expense, [type]: e.target.value });
        calculateUserPrice(e.target.value);
    };

    const calculateUserPrice = (val) => {

        var count = 0;
        for (let i = 0; i < expense.userArray.length; i++) {
            if(expense.userArray[i].isChecked){
            count++;
            }  
        }

        const amt = val / count;
        const newArray = expense.userArray;

        for (let i = 0; i < newArray.length; i++) {
            if(newArray[i].isChecked){
                newArray[i].amount = amt.toFixed(2);
            } else {
                newArray[i].amount = 0.00;
            }  
            }

        expense.userArray = newArray;
        //setExpense({ ...expense, ["userArray"]: newArray });

    }

    const handleAutoComplete = (e, type) => {
        e.preventDefault();
        expense.category = e.target.innerText;
        setExpense({ ...expense, [type]: e.target.innerText });
        console.log(expense.category);
    }

    const btnAddExpense = async (e) => {
        e.preventDefault();
    
        let formErrors = {};
    
        if (!expense.expenseName) {
            formErrors.expenseName = "Expense Name is required";
        }

        if (!expense.amount) {
            formErrors.amount = "Expense Amount is required";
        }

        if (!expense.category) {
            formErrors.catagory = "Expense Category is required";
        }
    
        setErrors(formErrors);
    
        if (!Object.keys(formErrors).length) {

            const arr = [];

            expense.userArray.forEach((val, index) => {
                if(val.isChecked) {
                    arr.push(val.email);
                }
              });

          const requestOptions = {
            method: location.state.isFrom === "Edit" ? "PUT" : "POST",
            headers: { 
                "Content-Type": "application/json", 
                "authorization" : localStorage.getItem('token'),
            },
            body: JSON.stringify({
                expenseName: expense.expenseName,
                expenseAmount: expense.amount,
                expenseCatagory: expense.category,
                dividedPeople : arr
            }),

          };

          var url = "";
          if(location.state.isFrom === "Edit") {
            url = "http://localhost:8000/updateExpense/" + location.state.groupDetail.groupId + "/" + location.state.expense.expenseId;
          } else {
            url = "http://localhost:8000/createExpense/" + location.state.groupDetail.groupId;
          }
    
          fetch(url, requestOptions).then(
            async (response) => {
              if (response.status === 200) {
                console.log("success");
                if(location.state.isFrom === "Edit") {
                    alert("Expense successfully edited");
                } else {
                    alert("Expense successfully added");
                }
              } else if (response.status === 400) {
                response = await response.json();
                console.log(response.error);
              }
            }
          );
    
          setErrors({});
    
        }
    
      };

    const checkedUser = (userArray, index, val, e) => {
        e.preventDefault();
        const newArray = expense.userArray;
        newArray[index].isChecked = e.target.checked;
        expense.userArray = newArray;
        setExpense({ ...expense, [userArray]: newArray });
    };

    return(

        <div className="container section-p1">
            <div className="row mt-5">
                <h3 className="col-12">{location.state.groupDetail.groupName} - {expense.screenTitle}</h3>
                <label className="col mt-5">Expense Name</label>
                <input
                    type="text"
                    className="form-control mt-2 groupName"
                    placeholder="Enter Expense Name"
                    value={expense.expenseName}
                    onChange={(e) => handleSubmit(e, "expenseName")}
                />
                <div>
                    {errors.expenseName && <div className="error">{errors.expenseName}</div>}
                </div>
                <label className="col mt-5">Expense Amount</label>
                <input
                    type="text"
                    className="form-control mt-2 groupName"
                    placeholder="Enter Expense Amount"
                    value={expense.amount}
                    onChange={(e) => handleAmountEvent(e, "amount")}
                />
                <div>
                    {errors.amount && <div className="error">{errors.amount}</div>}
                </div>
                <label className="col-12 mt-5">Expense Category</label>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={expense.categoryArray}
                    className="mt-2"
                    inputValue={expense.category}
                    renderInput={(params) => <TextField {...params} label="Select Category" />}
                    onChange={(e) => handleAutoComplete(e, "category")}
                />
                {errors.catagory && <div className="error mt-1">{errors.catagory}</div>}
                <div className="mt-5">
                    <h4 className="col-12 mb-3">Users</h4>
                    <div>
                      {
                          (() => {
                            let container = [];
                            expense.userArray.forEach((val, index) => {
                              container.push(
                                <div className="row" key={index}>
                                    <div class="form-check checkbox-xl col">
                                        <input 
                                            class="form-check-input" 
                                            type="checkbox" 
                                            checked={val.isChecked} 
                                            id={index}
                                            onChange={(e) => checkedUser( "userArray", index, val, e)}
                                        />
                                        <label class="form-check-label" for={index}>{val.email}</label>
                                    </div>
                                    <label className="col-auto">$ {val.amount}</label>
                                    <hr className="mt-2" />
                                </div>)
                            });
                            return container;
                          })()
                        }
                    </div>
                </div>
            </div>
            {errors.userArray && <div className="error mt-1">{errors.userArray}</div>}
            <button type="submit" className="btn btn-primary mt-4 mx-auto d-block" onClick={(e) => btnAddExpense(e)}> Submit </button>
        </div>

    );
    
}