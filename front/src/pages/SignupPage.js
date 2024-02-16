import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handleSignup = () => {
    // 회원가입 로직 구현
    // 이메일 인증 및 회원가입 처리
  };

  const handleSendVerificationCode = () => {
    // 이메일로 인증코드 전송하는 로직
  };

  const handleConfirmPassword = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">회원가입</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="이메일"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <TextField
          label="비밀번호 확인"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleConfirmPassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendVerificationCode}
        >
          이메일 인증
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="인증코드"
          fullWidth
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSignup}>
          회원가입
        </Button>
      </Grid>
    </Grid>
  );
}

export default SignupPage;
