// DiaryPage.js
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import { format } from "date-fns";
import Calendar from "../components/Calendar";
import DialogComponent from "../components/DiaryPostDialog";
import NavBar from "../components/NavBar";
import {
  createDiaryPost,
  deleteDiaryPost,
  getDailyDiaryPosts,
  updateDiaryPost,
} from "../services/diary";
import { getUserProfile } from "../services/user";

function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [diaryPostId, setDiaryPostId] = useState();

  useEffect(() => {
    const fetchDailyDiaryPosts = async () => {
      try {
        const user = await getUserProfile();
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const diaryPosts = await getDailyDiaryPosts(user.loverId, year, month);
        setEntries(diaryPosts);
      } catch (error) {
        console.error("Error fetching daily diary posts:", error);
      }
    };
    fetchDailyDiaryPosts();
  }, [selectedDate]);

  useEffect(() => {}, [entries]);

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleAddEntry = () => {
    setSelectedDate(new Date());
    setTitle("");
    setContent("");
    setImage("");
    setDialogOpen(true);
    setDiaryPostId(null);
  };

  const handleSaveEntry = async () => {
    try {
      const user = await getUserProfile();
      const postDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

      if (!title || !content) {
        // 필수 필드를 확인
        console.error("Title and content are required");
        return;
      }
      let newEntry;
      console.log(diaryPostId);
      if (diaryPostId) {
        // diaryPostId가 존재하면 기존 항목을 업데이트
        newEntry = await updateDiaryPost(diaryPostId, title, content, postDate);
      } else {
        // diaryPostId가 없으면 새 항목을 생성
        newEntry = await createDiaryPost(
          title,
          content,
          postDate,
          user.loverId,
        );
      }

      if (newEntry) {
        const updatedEntries = [...entries];
        if (diaryPostId) {
          // diaryPostId가 존재하는 경우, 해당 항목을 찾아 업데이트
          const index = updatedEntries.findIndex(
            (entry) => entry.diary_post_id === diaryPostId,
          );
          if (index !== -1) {
            updatedEntries[index] = newEntry;
          }
        } else {
          // diaryPostId가 존재하지 않는 경우, 새 항목 추가
          updatedEntries.push(newEntry);
        }
        setEntries(updatedEntries);
      }

      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving diary entry:", error);
    }
  };

  const handleEditEntry = async (entryIndex) => {
    const { diary_post_id, post_date, title, content, image } =
      entries[entryIndex];
    try {
      setSelectedDate(new Date(post_date));
      setTitle(title);
      setContent(content);
      setImage(image);
      setDialogOpen(true);
      setDiaryPostId(diary_post_id);
    } catch (error) {
      console.error("Error editing diary entry:", error);
    }
  };
  const handleDeleteEntry = async () => {
    try {
      await deleteDiaryPost(diaryPostId);
      const updatedEntries = entries.filter(
        (entry) => entry.diary_post_id !== diaryPostId,
      );
      setEntries(updatedEntries);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error deleting diary entry:", error);
    }
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddEntry}
            sx={{ marginBottom: 2, marginTop: 2 }}
          >
            일기 쓰기
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Button onClick={handlePrevMonth}>
            <ArrowBackSharpIcon />
          </Button>
          <Typography variant="h6">
            {format(selectedDate, "MMMM yyyy")}
          </Typography>
          <Button onClick={handleNextMonth}>
            <ArrowForwardSharpIcon />
          </Button>
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
          handleDeleteEntry={handleDeleteEntry}
        />
      </Box>
    </>
  );
}

export default DiaryPage;
