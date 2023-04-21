import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export const GroupDetail = () => {
  
  const navigate = useNavigate();

  const { state } = useLocation(); 
  const { groupDetail } = state;

  const [expense, setExpense] = useState({
    totalAmount: 0,
    expenseArray: []
  });

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

      fetch('http://localhost:8000/getExpense/' + groupDetail.groupId, requestOptions).then(
        async (response) => {
          if (response.status === 200) {
            response = await response.json();
            console.log(response.expense);
            expense.expenseArray = response.expense;
            setExpense({ ...expense, ["expenseArray"]: response.expense });
            var amount = 0;
            for (let i = 0; i < response.expense.length; i++) {
              if(response.expense[i].dividedPeople.indexOf(localStorage.getItem("email")) > -1){
                const tempAmt = response.expense[i].expenseAmount / response.expense[i].dividedPeople.length;
                amount = amount + tempAmt;
              }
            }
            expense.totalAmount = amount;
            console.log(amount);
            console.log(expense.totalAmount);
            setExpense({ ...expense, ["totalAmount"]: amount });
          } else if (response.status === 400) {
            response = await response.json();
            console.log(response.error);
          }
        }
      );

  }, []);

  const openExpenseDetail = (e, val) => {
    e.preventDefault();
    navigate("/expense-detail",{state: { groupDetail : groupDetail, expenseDetail: val} });
  };

  return (
    <div className="container section-p1">
      <div className="row mt-5">
        <div className="col">
          <h3>{groupDetail.groupName}</h3>
        </div>
        <div className="col-auto">
            <Link className="nav-link" to={"/add-category"} state={{groupDetail:groupDetail}}>
            <h5 className="child"><FontAwesomeIcon icon={faPlusCircle} /></h5>
            <h5 className="child">Add Category</h5>
            </Link>
            <Link className="nav-link" to={"/add-expense"} state={{groupDetail:groupDetail}}>
            <h5 className="child"><FontAwesomeIcon icon={faPlusCircle} /></h5>
            <h5 className="child">Add Expense</h5>
            </Link>
        </div>
        <div className="mt-5">
          <div className="row mb-5">
              <h4 className="col">Expenses</h4>
              <h5 className="col-auto">Total Expense : $ {expense.totalAmount.toFixed(2)}</h5>
          </div>
            <div>
                {
                    (() => {
                    let container = [];
                    expense.expenseArray.forEach((val, index) => {
                        var amount = "";
                        if(val.dividedPeople.indexOf(localStorage.getItem("email")) > -1){
                          amount = "$ " + parseFloat(val.expenseAmount / val.dividedPeople.length).toFixed(2);
                        } else {
                          amount = "You are not involved"
                        }
                        container.push(
                        <a href="#" className="removeLine">
                          <div className="row" key={index} onClick={(e) => openExpenseDetail(e, val)}>
                              <div className="row">
                                  <h4 className="col">{val.expenseName}</h4>
                                  <h4 className="col-auto">{amount}</h4>
                              </div>
                              <div className="row">
                                  <label className="col-auto">Paid By : {val.expenseBy}</label>
                                  <label className="col">Category : {val.expenseCatagory}</label>
                                  <label className="col-auto">{val.expenseDate}</label>
                              </div>
                              <hr className="mt-2" />
                          </div>
                        </a>
                        )
                    });
                    return container;
                    })()
                }
            </div>
        </div>
      </div>
    </div>
  );

};
