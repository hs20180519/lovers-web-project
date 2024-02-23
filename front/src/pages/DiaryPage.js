// DiaryPage.js
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { format } from "date-fns";
import Calendar from "../components/Calendar";
import DialogComponent from "../components/DiaryPostDialog";
import NavBar from "../components/NavBar";

function DiaryPage() {
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

  return (
    <>
      <NavBar />
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
        <Box sx={{}}>
          <Calendar
            selectedDate={selectedDate}
            entries={entries}
            handleEditEntry={handleEditEntry}
            handleAddEntry={handleAddEntry}
          />
        </Box>
        <DialogComponent
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          image={image}
          setImage={setImage}
          handleSaveEntry={handleSaveEntry}
        />
      </Box>
    </>
  );
}

export default DiaryPage;
