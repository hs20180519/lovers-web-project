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
import {
  applyLoverByEmail,
  getAcceptUserProfile,
  acceptLoverByEmail,
  makeLoverNickname,
  deleteLoverByUserId,
} from "../services/lover";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function UserProfile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [applyLoverDialogOpen, setApplyLoverDialogOpen] = useState(false);
  const [acceptUserData, setAcceptUserData] = useState(null);
  const [acceptLoverDialogOpen, setAcceptLoverDialogOpen] = useState(false);
  const [acceptUserEmail, setAcceptUserEmail] = useState("");
  const [isAcceptUserEmailValid, setIsAcceptUserEmailValid] = useState(true);
  const [loverNicknameDialogOpen, setLoverNicknameDialogOpen] = useState(false);
  const [loverNickname, setLoverNickname] = useState("");
  const [deleteLoverDialogOpen, setDeleteloverDialogOpen] = useState(false);

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

  const handleApplyLoverAction = () => {
    setApplyLoverDialogOpen(true);
  };

  const handleApplyLoverConfirm = async () => {
    try {
      if (!isAcceptUserEmailValid) {
        alert("정확한 이메일을 입력해주세요.");
        return;
      }
      setApplyLoverDialogOpen(false);
      await applyLoverByEmail(acceptUserEmail);
    } catch (error) {
      console.error("짝꿍 신청 실패: ", error.message);
      alert("짝꿍 신청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleAcceptLoverAction = async () => {
    setAcceptLoverDialogOpen(true);
    const acceptUserProfile = await getAcceptUserProfile();
    setAcceptUserData(acceptUserProfile);
  };

  const handleAcceptUserEmail = (e) => {
    const acceptUserEmailValue = e.target.value;
    setIsAcceptUserEmailValid(validateAcceptUserEmail(acceptUserEmail));
    setAcceptUserEmail(acceptUserEmailValue);
  };

  const handleAccepLoverByEmail = async (applyUserEmail) => {
    await acceptLoverByEmail(applyUserEmail);
    setAcceptLoverDialogOpen(false);
  };

  const handleMakeLoverNicknameAction = () => {
    setLoverNicknameDialogOpen(true);
  };

  const handleMakeLoverNickname = (e) => {
    const loverNicknameValue = e.target.value;
    setLoverNickname(loverNicknameValue);
  };

  const handleMakeLoverNicknameConfirm = async () => {
    await makeLoverNickname(loverNickname);
    setLoverNicknameDialogOpen(false);
  };

  const handleDeleteLoverAction = () => {
    setDeleteloverDialogOpen(true);
  };

  const handleDeleteLoverConfirm = async () => {
    await deleteLoverByUserId();
    setDeleteloverDialogOpen(false);
  };

  return (
    <>
      <NavBar />
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
                  <div>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleApplyLoverAction}
                      sx={{ marginLeft: "10px" }}
                    >
                      짝꿍 신청
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleAcceptLoverAction}
                      sx={{ marginLeft: "10px" }}
                    >
                      신청 목록
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleMakeLoverNicknameAction}
                      sx={{ marginLeft: "10px" }}
                    >
                      애칭 지정
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDeleteLoverAction}
                      sx={{ marginLeft: "10px" }}
                    >
                      짝꿍 끊기
                    </Button>
                  </div>
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
                    onChange={handleAcceptUserEmail}
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
              <Dialog
                open={acceptLoverDialogOpen}
                onClose={() => setAcceptLoverDialogOpen(false)}
              >
                <DialogTitle style={{ textAlign: "center" }}>
                  신청 목록
                </DialogTitle>
                <DialogContent>
                  {acceptUserData !== null && acceptUserData !== undefined
                    ? acceptUserData.map((acceptUser, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          신청자: {acceptUser.apply_user_email}
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              handleAccepLoverByEmail(
                                acceptUser.apply_user_email
                              )
                            }
                          >
                            수락
                          </Button>
                        </div>
                      ))
                    : "없음"}
                </DialogContent>
              </Dialog>
              <Dialog
                open={loverNicknameDialogOpen}
                onClose={() => setLoverNicknameDialogOpen(false)}
              >
                <DialogTitle style={{ textAlign: "center" }}>
                  애칭 지정하기
                </DialogTitle>
                <DialogContent style={{ width: "300px" }}>
                  <Typography variant="h7">
                    상대방의 애칭을 입력해주세요
                  </Typography>
                  <TextField
                    type="text"
                    id="loverNickname"
                    name="loverNickname"
                    fullWidth
                    value={loverNickname}
                    onChange={handleMakeLoverNickname}
                  ></TextField>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleMakeLoverNicknameConfirm}
                    color="primary"
                  >
                    저장
                  </Button>
                  <Button
                    onClick={() => setLoverNicknameDialogOpen(false)}
                    color="primary"
                  >
                    취소
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={deleteLoverDialogOpen}
                onClose={() => setDeleteloverDialogOpen(false)}
              >
                <DialogTitle
                  style={{
                    textAlign: "center",
                  }}
                >
                  짝꿍 끊기
                </DialogTitle>
                <DialogContent style={{ textAlign: "center", width: "300px" }}>
                  <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
                    짝꿍을 끊으시겠습니까?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteLoverConfirm} color="primary">
                    예
                  </Button>
                  <Button
                    onClick={() => setDeleteloverDialogOpen(false)}
                    color="primary"
                  >
                    아니요
                  </Button>
                </DialogActions>
              </Dialog>
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
    </>
  );
}

export default UserProfile;
