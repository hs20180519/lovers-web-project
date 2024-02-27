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
  TextField,
} from "@mui/material";
import { getUserProfile } from "../services/user";
import { applyLoverByEmail } from "../services/lover";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  // const [loverData, setLoverData] = useState(null);
  // const [applyUserData, setApplyUserData] = useState(null);
  // const [accpetUserData, setAcceptUserData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [applyLoverDialogOpen, setApplyLoverDialogOpen] = useState(false);
  const [acceptUserEmail, setAcceptUserEmail] = useState("");
  const [isAcceptUserEmailValid, setIsAcceptUserEmailValid] = useState(true);
  const [loverNickname, setLoverNickname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile();
        setUserData(userProfile);
        // const applyUserProfile = await getApplyUserProfile(userData.user_id);
        // setApplyUserData(applyUserProfile);
        // const acceptUserProfile = await getAcceptUserProfile(userData.user_id);
        // setAcceptUserData(acceptUserProfile);
        // const loverInformation = await getLoverInformation();
        // setLoverData(loverInformation);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  const validateAcceptUserEmail = (acceptUserEmail) => {
    const acceptUserEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return acceptUserEmailRegex.test(acceptUserEmail);
  };

  const handleLogout = () => {
    // 로그아웃 로직 작성
    sessionStorage.removeItem("userToken"); // 세션에 담긴 사용자 토큰 삭제
    setDialogOpen(true); // 로그아웃 다이얼로그 열기
  };

  const handleLogoutConfirm = () => {
    // 로그아웃 로직 작성
    setDialogOpen(false); // 다이얼로그 닫기
    navigate("/");
  };

  const handleCoupleAction = () => {
    setApplyLoverDialogOpen(true);
  };

  const handleAcceptUserEmailChange = (e) => {
    const acceptUserEmailValue = e.target.value;
    setIsAcceptUserEmailValid(validateAcceptUserEmail(acceptUserEmail));
    setAcceptUserEmail(acceptUserEmailValue);
  };

  const handleLoverNicknameChange = (e) => {
    const nicknameValue = e.target.value;
    setLoverNickname(nicknameValue);
  };

  const handleApplyLoverConfirm = async () => {
    try {
      if (!isAcceptUserEmailValid) {
        alert("정확한 이메일을 입력해주세요.");
        return;
      }
      await setApplyLoverDialogOpen(false);
      await applyLoverByEmail(acceptUserEmail);
    } catch (error) {
      console.error("짝꿍 신청 실패: ", error.message);
      alert("짝꿍 신청에 실패했습니다. 다시 시도해주세요.");
    }
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
            <Typography variant="body2">
              {userData.lover_nickname || "짝꿍을 신청하세요"}
              {userData && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCoupleAction}
                  sx={{ marginLeft: "10px" }}
                >
                  {userData.lover_nickname ? "커플끊기" : "커플신청하기"}
                </Button>
              )}
            </Typography>
            <Dialog
              open={applyLoverDialogOpen}
              onClose={() => setApplyLoverDialogOpen(false)}
            >
              <DialogTitle style={{ textAlign: "center" }}>
                짝꿍 신청
              </DialogTitle>
              <DialogContent style={{ width: "300px" }}>
                <Typography variant="h7">
                  상대방의 이메일을 입력해주세요
                </Typography>
                <TextField
                  type="email"
                  id="acceptUserEmail"
                  name="acceptUserEmail"
                  fullWidth
                  value={acceptUserEmail}
                  onChange={handleAcceptUserEmailChange}
                ></TextField>
                <Typography variant="h7">
                  상대방의 애칭을 입력해주세요
                </Typography>
                <TextField
                  type="text"
                  id="loverNickname"
                  name="loverNickname"
                  fullWidth
                  value={loverNickname}
                  onChange={handleLoverNicknameChange}
                ></TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleApplyLoverConfirm} color="primary">
                  신청
                </Button>
                <Button
                  onClick={() => setApplyLoverDialogOpen(false)}
                  color="primary"
                >
                  취소
                </Button>
              </DialogActions>
            </Dialog>
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
