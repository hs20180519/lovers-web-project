import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Link } from "@material-ui/core";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 로직 구현
    // 로그인 성공 시 페이지 이동
    // 로그인 실패 시 알림 메시지
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">로그인</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="아이디"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          로그인
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          component={Link}
          to="/signup"
          variant="outlined"
          color="primary"
        >
          회원가입
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          구글 로그인
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          <Link href="#">아이디 찾기</Link> |{" "}
          <Link href="#">비밀번호 찾기</Link> | <Link href="#">회원가입</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
