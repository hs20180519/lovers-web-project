// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  DialogContent,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setDialogOpen(true); // 로그아웃 다이얼로그 열기
    handleClose(); // 메뉴 닫기
  };

  const handleLogoutConfirm = () => {
    sessionStorage.removeItem("userToken"); // 세션에 담긴 사용자 토큰 삭제
    setDialogOpen(false); // 다이얼로그 닫기
    navigate("/");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Button component={Link} to="/diary/posts" color="inherit">
            공유일기
          </Button>
          <Button component={Link} to="/gallery" color="inherit">
            갤러리
          </Button>
          <Button component={Link} to="/ledger" color="inherit">
            가계부
          </Button>
          <Button color="inherit" onClick={handleClick}>
            <AccountCircle />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              component={Link}
              to="/account/users"
              onClick={handleClose}
            >
              마이페이지
            </MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
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

export default NavBar;
