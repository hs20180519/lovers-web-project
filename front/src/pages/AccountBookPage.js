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
// import { createAccountBook } from "../services/accountBook";

function AccountBookPage() {
  const [accountBook, setAccountBook] = useState([]);
  const [formData, setFormData] = useState({
    useDate: "",
    category: "",
    amount: "",
    content: "",
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleCreateAccountBook();
    setAccountBook((prevAccountBook) => [...prevAccountBook, formData]);
    setFormData({
      useDate: "",
      category: "",
      amount: "",
      content: "",
    });
  };

  const handleDelete = (index) => {
    setAccountBook((prevAccountBook) =>
      prevAccountBook.filter((_, i) => i !== index)
    );
  };

  const sortedAccountBook = accountBook.sort(
    (a, b) => new Date(a.useDate) - new Date(b.useDate)
  );

  const calculateTotalAmount = () => {
    // 현재 월의 데이터만 필터링
    const currentMonthData = accountBook.filter((item) => {
      const itemDate = new Date(item.useDate);
      return (
        itemDate.getFullYear() === currentMonth.getFullYear() &&
        itemDate.getMonth() === currentMonth.getMonth()
      );
    });

    // 필터링된 데이터의 금액을 누적
    return currentMonthData.reduce(
      (total, item) => total + Number(item.amount),
      0
    );
  };

  // const handleCreateAccountBook = async () => {
  //   try {
  //     await createAccountBook(formData);
  //     alert("가계부 추가에 성공했습니다.");
  //   } catch (error) {
  //     console.error("가계부 추가 실패: ", error.message);
  //     alert("가계부 추가에 실패했습니다. 다시 시도해주세요.");
  //   }
  // };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
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
              id="useDate"
              name="useDate"
              label="날짜"
              value={formData.useDate}
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
              id="content"
              name="content"
              label="내용"
              value={formData.content}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              // onClick={handleCreateAccountBook}
            >
              추가
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container justifyContent="space-between">
        <Button onClick={handlePrevMonth}>{"<"}</Button>
        <Typography variant="h6">
          {currentMonth.toLocaleDateString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </Typography>
        <Button onClick={handleNextMonth}>{">"}</Button>
      </Grid>
      <Typography variant="h6" align="center">
        총 금액: {calculateTotalAmount()}원
      </Typography>
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
          {sortedAccountBook.map((accountBook, index) => {
            const itemDate = new Date(accountBook.useDate);
            if (
              itemDate.getFullYear() === currentMonth.getFullYear() &&
              itemDate.getMonth() === currentMonth.getMonth()
            ) {
              return (
                <TableRow key={index}>
                  <TableCell>{accountBook.useDate}</TableCell>
                  <TableCell>{accountBook.category}</TableCell>
                  <TableCell>{accountBook.amount}</TableCell>
                  <TableCell>{accountBook.content}</TableCell>
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
              );
            } else {
              return null;
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default AccountBookPage;
