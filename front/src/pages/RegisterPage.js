import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material"; // @material-ui/core에서 @mui/material로 변경

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const handleSignup = () => {};

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSendVerificationCode = () => {};

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setIsEmailValid(validateEmail(emailValue));
    setEmail(emailValue);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setIsPasswordValid(validatePassword(passwordValue));
    setPassword(passwordValue);
    // 비밀번호를 변경할 때 확인 비밀번호를 초기화
    setConfirmPassword("");
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    setIsConfirmPasswordValid(password === confirmPasswordValue);
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
          onChange={handleEmailChange}
          error={!isEmailValid}
          helperText={!isEmailValid ? "유효한 이메일을 입력해주세요" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          error={!isPasswordValid}
          helperText={
            !isPasswordValid
              ? "비밀번호는 8글자 이상, 영어와 숫자, 특수문자가 반드시 하나 이상 포함되어야 합니다."
              : ""
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="비밀번호 확인"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={!isConfirmPasswordValid}
          helperText={
            !isConfirmPasswordValid ? "비밀번호가 일치하지 않습니다." : ""
          }
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

export default RegisterPage;
