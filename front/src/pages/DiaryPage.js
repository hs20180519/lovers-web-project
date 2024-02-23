import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  format,
  getDaysInMonth,
  getDay,
  isSameMonth,
  startOfMonth,
} from "date-fns";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleAddEntry = () => {
    setSelectedDate(new Date());
    setTitle("");
    setContent("");
    setImage("");
    setDialogOpen(true);
  };

  const handleSaveEntry = () => {
    const newEntry = { date: selectedDate, title, content, image };
    setEntries([...entries, newEntry]);
    setDialogOpen(false);
  };

  const handleEditEntry = (entryIndex) => {
    const { date, title, content, image } = entries[entryIndex];
    setSelectedDate(date);
    setTitle(title);
    setContent(content);
    setImage(image);
    setDialogOpen(true);
  };

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(selectedDate);
  const firstDayOfMonth = getDay(startOfMonth(selectedDate));

  const renderCalendar = () => {
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<Box key={j}></Box>);
        } else if (day <= daysInMonth) {
          const date = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            day,
          );
          week.push(
            <Box
              key={j}
              sx={{
                border: "1px solid #ccc",
                p: 1,
                minHeight: 100,
                minWidth: 50,
                backgroundColor: day <= daysInMonth ? "#fff" : "#f0f0f0", // 일정이 있는 날짜와 없는 날짜를 시각적으로 구분
              }}
            >
              <Typography variant="subtitle1">{day}</Typography>
              {entries
                .filter(
                  (entry) =>
                    isSameMonth(entry.date, selectedDate) &&
                    entry.date.getDate() === day,
                )
                .map((entry, index) => (
                  <Box key={index}>
                    <Typography variant="h6">{entry.title}</Typography>
                    {entry.image && (
                      <img
                        src={entry.image}
                        alt="diary"
                        style={{ maxWidth: "100%", marginTop: 2 }}
                      />
                    )}
                    <Button
                      onClick={() => handleEditEntry(index)}
                      sx={{ marginTop: 1 }}
                    >
                      Edit
                    </Button>
                  </Box>
                ))}
            </Box>,
          );
          day++;
        } else {
          week.push(<Box key={j}></Box>);
        }
      }

      calendar.push(
        <Grid container spacing={1} key={i}>
          {week}
        </Grid>,
      );
    }

    return calendar;
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Diary
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddEntry}
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        Add Entry
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Button onClick={handlePrevMonth}>Prev Month</Button>
        <Typography variant="h6">
          {format(selectedDate, "MMMM yyyy")}
        </Typography>
        <Button onClick={handleNextMonth}>Next Month</Button>
      </Box>
      <Box sx={{ marginLeft: "200px" }}>{renderCalendar()}</Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Entry</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            label="Date"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={handleDateChange}
            sx={{ marginBottom: 2 }}
            fullWidth
          />
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Image URL"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEntry} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
