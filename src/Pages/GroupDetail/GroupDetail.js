import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export const GroupDetail = () => {
  
  const navigate = useNavigate();

  const { state } = useLocation(); 
  const { groupDetail } = state;

  const [expense, setExpense] = useState({
    expenseArray: [],
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
            <h4 className="col-12 mb-5">Expenses</h4>
            <div>
                {
                    (() => {
                    let container = [];
                    expense.expenseArray.forEach((val, index) => {
                        const amount = val.expenseAmount / val.dividedPeople.length;
                        console.log(amount);
                        container.push(
                        <div className="row" key={index}>
                            <div className="row">
                                <h4 className="col">{val.expenseName}</h4>
                                <h4 className="col-auto">$ {amount.toFixed(2)}</h4>
                            </div>
                            <div className="row">
                                <label className="col-auto">Paid By : {val.expenseBy}</label>
                                <label className="col">Category : {val.expenseCatagory}</label>
                                <label className="col-auto">{val.expenseDate}</label>
                            </div>
                            <hr className="mt-2" />
                        </div>)
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
