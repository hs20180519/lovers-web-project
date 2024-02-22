import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { loginUser } from "../services/auth";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      // 로그인 성공 시 처리
      console.log("로그인 성공:", response);
      navigate("/account/users");
      // 페이지 이동 등 필요한 작업 수행
    } catch (error) {
      // 로그인 실패 시 처리
      console.error("로그인 실패:", error);
      // 알림 메시지 표시 등 필요한 작업 수행
    }
  };

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", maxWidth: "600px", margin: "0 auto" }}
    >
      <Grid item xs={10}>
        <Box p={3} border={1} borderRadius={4} borderColor="lightgray">
          <Typography variant="h4" align="center" gutterBottom>
            로그인
          </Typography>
          <TextField
            label="아이디"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Box mt={2}>
            <TextField
              label="비밀번호"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              size="large"
              style={{ width: "100%" }}
            >
              로그인
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Button
              component={Link}
              to="/auth/register"
              variant="outlined"
              color="primary"
              size="large"
              style={{ width: "100%" }}
            >
              회원가입
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ width: "100%" }}
            >
              구글 로그인
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              <Link to="#">아이디 찾기</Link> |{" "}
              <Link to="#">비밀번호 찾기</Link> |{" "}
              <Link to={"/auth/register"}>회원가입</Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
