import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ListOfExpense } from "./ListOfExpense.js";
import "./AddExpense.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddExpense = () => {
  const [open, setOpen] = useState(false);
  const [expense, setExpense] = useState({
    title: "",
    amount: 0,
  });
  const [expenseList, setExpenseList] = useState([]);

  const changeInput = (name, e) => {
    const obj = {
      ...expense,
      [name]: e.target.value,
    };
    setExpense(obj);
  };

  const addExpense = async () => {
    setOpen(false);
    await setExpenseList([...expenseList, expense]);
    setExpense({ title: "", amount: 0 });
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Expense</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <FormControl className="inputText" margin="normal">
              <TextField
                error
                id="outlined-text"
                placeholder="Enter Expense Name"
                onChange={(e) => changeInput("title", e)}
              />
            </FormControl>
            <FormControl className="inputText" margin="normal">
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment>$</InputAdornment>}
                label="Amount"
                onChange={(e) => changeInput("amount", e)}
              />
            </FormControl>
            <br />
            <Button
              variant="contained"
              onClick={() => addExpense()}
              margin="normal"
            >
              Add
            </Button>
          </form>
        </Box>
      </Modal>

      <ListOfExpense list={expenseList} />
    </div>
  );
};
