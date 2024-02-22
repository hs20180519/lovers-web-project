import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Paper,
} from "@mui/material";
import { getUserProfile } from "../services/user";
import { Logout } from "@mui/icons-material";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile();
        setUserData(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // 로그아웃 로직 작성
    setDialogOpen(true); // 로그아웃 다이얼로그 열기
  };

  const handleLogoutConfirm = () => {
    // 로그아웃 로직 작성
    setDialogOpen(false); // 다이얼로그 닫기
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4">사용자 프로필</Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        {userData && (
          <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
            <Avatar
              src={userData.profileImage}
              sx={{
                width: 100,
                height: 100,
                margin: "0 auto",
                marginBottom: "20px",
              }}
            />
            <Typography variant="h6">{userData.nickname}</Typography>
            <Typography variant="body1">이메일: {userData.email}</Typography>
            {/* 기타 사용자 정보 표시 */}
          </Paper>
        )}
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </Grid>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>로그아웃 확인</DialogTitle>
        <DialogContent>
          <Typography>로그아웃 하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutConfirm} color="primary">
            예
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            아니요
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default UserProfile;
