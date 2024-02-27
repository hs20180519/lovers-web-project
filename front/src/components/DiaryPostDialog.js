// DialogComponent.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { format } from "date-fns";

function DiaryPostDialog({
  dialogOpen,
  setDialogOpen,
  selectedDate,
  handleDateChange,
  title,
  setTitle,
  content,
  setContent,
  image,
  setImage,
  handleSaveEntry,
  handleDeleteEntry,
}) {
  return (
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
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={content || ""}
          onChange={(e) => setContent(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Image URL"
          fullWidth
          value={image | ""}
          onChange={(e) => setImage(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteEntry} color="error">
          Delete
        </Button>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleSaveEntry} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DiaryPostDialog;
