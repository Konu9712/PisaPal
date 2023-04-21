import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export const ExpenseDetail = () => {
  
  const navigate = useNavigate();

  const { state } = useLocation(); 
  const { groupDetail, expenseDetail } = state;

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
          <h3>{groupDetail.groupName}</h3>
        </div>
        <div className="mt-5">
            <div className="row">
                <h3 className="text-center">{expenseDetail.expenseName}</h3>
                <h4 className="text-center">{expenseDetail.expenseCatagory}</h4>
                <h4 className="text-center mb-5">$ {parseFloat(expenseDetail.expenseAmount).toFixed(2)}</h4>
                <h5 className="col">Paid By : {expenseDetail.expenseBy}</h5>
                <h5 className="col-auto mb-5">{expenseDetail.expenseDate}</h5>
                <label className="col-12 mb-4">For {expenseDetail.dividedPeople.length} participants,</label>
            </div>
            <div>
                {
                    (() => {
                    let container = [];
                    expenseDetail.dividedPeople.forEach((val, index) => {
                        const amount = expenseDetail.expenseAmount / expenseDetail.dividedPeople.length;
                        console.log(amount);
                        container.push(
                        <div className="row" key={index}>
                            <div className="row">
                                <h5 className="col">{val}</h5>
                                <h5 className="col-auto">$ {amount.toFixed(2)}</h5>
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
      <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-5">
        <button type="submit" className="btn btn-primary" > Edit Transaction </button>
        <button type="submit" className="btn btn-danger" > Delete Transaction </button>
      </div>
    </div>
  );

};
