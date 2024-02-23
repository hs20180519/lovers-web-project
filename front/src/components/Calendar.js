import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { getDaysInMonth, isSameMonth } from "date-fns";

const Calendar = ({ selectedDate, entries, handleEditEntry }) => {
  const daysInMonth = getDaysInMonth(selectedDate);

  const renderCalendar = () => {
    const calendar = [];
    let day = 1;

    while (day <= daysInMonth) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if (day <= daysInMonth) {
          week.push(
            <Box
              key={j}
              sx={{
                border: "1px solid #ccc",
                p: 1,
                minHeight: 100,
                minWidth: 96,
                backgroundColor: day <= daysInMonth ? "#fff" : "#f0f0f0",
                position: "relative",
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
        <Box
          key={calendar.length}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          {week}
        </Box>,
      );
    }

    return calendar;
  };

  return <>{renderCalendar()}</>;
};

export default Calendar;
