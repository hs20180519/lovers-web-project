import React, { useState } from "react";

import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import {
  confirmEmailCode,
  createUser,
  sendVerificationEmail,
} from "../services/auth";

function RegisterPage() {
  const [nickname, setNickname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const validateNickname = (nickname) => {
    const nicknameRegex = /^[A-Za-z0-9]{5,}$/;
    return nicknameRegex.test(nickname);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  //이메일 보내기
  const handleSendVerificationCode = async () => {
    try {
      await sendVerificationEmail(email); // 이메일 보내기 API 호출
      alert("인증 이메일이 성공적으로 전송되었습니다.");
    } catch (error) {
      console.error("이메일 보내기 실패:", error.message);
      alert("인증 이메일 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };
  // 이메일 인증 확인 함수
  const handleConfirmVerificationCode = async () => {
    try {
      await confirmEmailCode(email, verificationCode); // 이메일 인증 확인 API 호출
      alert("이메일 인증이 성공적으로 완료되었습니다.");
    } catch (error) {
      console.error("이메일 인증 실패:", error.message);
      alert("이메일 인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleNicknameChange = (e) => {
    const nicknameValue = e.target.value;
    setIsNicknameValid(validateNickname(nicknameValue));
    setNickname(nicknameValue);
  };

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
  const handleSignup = async () => {
    try {
      if (
        !isNicknameValid ||
        !isEmailValid ||
        !isPasswordValid ||
        !isConfirmPasswordValid
      ) {
        alert("입력한 정보를 다시 확인해주세요.");
        return;
      }
      await createUser(email, password, nickname); // 이메일 보내기 API 호출
      alert("성공적으로 회원가입을 완료했습니다..");
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={10}>
        <Box p={3}>
          <Typography variant="h4" align="center" gutterBottom>
            회원가입
          </Typography>
          <TextField
            label="아이디"
            fullWidth
            value={nickname}
            onChange={handleNicknameChange}
            error={!isNicknameValid}
            helperText={
              !isNicknameValid
                ? "아이디는 5글자 이상, 영어와 숫자만 허용됩니다."
                : ""
            }
          />
          <Box mt={2}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={10}>
                <TextField
                  label="이메일"
                  fullWidth
                  value={email}
                  onChange={handleEmailChange}
                  error={!isEmailValid}
                  helperText={
                    !isEmailValid ? "유효한 이메일을 입력해주세요" : ""
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSendVerificationCode}
                  size="large"
                  style={{ width: "100%" }}
                >
                  메일 보내기
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={10}>
                <TextField
                  label="인증번호"
                  fullWidth
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleConfirmVerificationCode}
                  size="large"
                  style={{ width: "100%" }}
                >
                  확인
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
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
          </Box>
          <Box mt={2}>
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
          </Box>
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignup}
              disabled={
                !isNicknameValid ||
                !isEmailValid ||
                !isPasswordValid ||
                !isConfirmPasswordValid
              }
              size="large"
              style={{ width: "30%" }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
