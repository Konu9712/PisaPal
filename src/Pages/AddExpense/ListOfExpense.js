import { ButtonBase, Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./AddExpense.css";
import React from "react";

export const ListOfExpense = (list) => {
  const deleteFromList = (index) => {
    console.log(index);
    list?.list.splice(index, 1);
  };
  console.log(list?.list);
  return (
    <div className="listWrapper">
      {list?.list?.length > 0 &&
        list?.list?.map((item, index) => {
          return (
            <Card className="mainCard">
              <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Expense on: {item.title}
                  <ButtonBase onClick={() => deleteFromList(index)}>
                    {" "}
                    <DeleteIcon />
                  </ButtonBase>
                </Typography>
                <h5>$ {item.amount}</h5>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};
