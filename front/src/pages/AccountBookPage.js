import React, { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";

function AccountBookPage() {
  const [accountBook, setAccountBook] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccountBook((prevAccountBook) => [...prevAccountBook, formData]);
    setFormData({
      date: "",
      category: "",
      amount: "",
      description: "",
    });
  };

  const handleDelete = (index) => {
    setAccountBook((prevAccountBook) =>
      prevAccountBook.filter((_, i) => i !== index)
    );
  };

  const sortedAccountBook = accountBook.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const calculateTotalAmount = () => {
    return accountBook.reduce(
      (total, accountBook) => total + Number(accountBook.amount),
      0
    );
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: "800px" }}>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          가계부
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2.5}>
            <TextField
              type="date"
              id="date"
              name="date"
              label="날짜"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              type="text"
              id="category"
              name="category"
              label="분류"
              value={formData.category}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              type="text"
              id="amount"
              name="amount"
              label="금액"
              value={formData.amount}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              type="text"
              id="description"
              name="description"
              label="내용"
              value={formData.description}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" type="submit" fullWidth>
              추가
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              총 누적 금액: {calculateTotalAmount()}
            </Typography>
          </Grid>
        </Grid>
      </form>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color="primary">
                날짜
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" color="primary">
                분류
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" color="primary">
                금액
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" color="primary">
                내용
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" color="primary"></Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedAccountBook.map((expense, index) => (
            <TableRow key={index}>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(index)}
                  variant="contained"
                  color="error"
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AccountBookPage;
