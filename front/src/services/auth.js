import axios from "axios";

const serverUrl = `http://localhost:3000`;

export async function loginUser(nickname, password) {
  try {
    const response = await axios.post(`${serverUrl}/auth/login`, {
      nickname,
      password,
    });
    // 로그인 성공 시 받은 토큰을 세션 스토리지에 저장
    sessionStorage.setItem("userToken", response.data.token);
    // 성공적인 응답 반환
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function sendEmailVerification(email) {
  try {
    const response = await axios.post(`${serverUrl}/auth/send-email`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending email verification:", error);
    throw error;
  }
}

export async function verifyEmailCode(code) {
  try {
    const response = await axios.post(`${serverUrl}/auth/verify-code`, {
      code: code,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying email code:", error);
    throw error;
  }
}

export async function registerUser(username, password, email) {
  try {
    const response = await axios.post(`${serverUrl}/auth/register`, {
      nickname: username,
      password: password,
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
