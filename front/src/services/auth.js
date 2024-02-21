import axios from "axios";

const serverUrl = `http://localhost:3000`;


// 이메일 보내기 API 호출
export const sendVerificationEmail = async (email) => {
  try {
    const response = await axios.post(`${serverUrl}/auth/send-email`, {
      email,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error sending email verification:", error);
    throw error;
  }
};

// 이메일 인증 코드 확인 API 호출
export const confirmEmailCode = async (email, verificationCode) => {
  try {
    const response = await axios.post(`${serverUrl}/auth/verify-code`, {
      email,
      verificationCode,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error verifying email code:", error);
    throw error;
  }
};

export async function createUser(email, password, nickname) {
  try {
    const response = await axios.post(`${serverUrl}/auth/register`, {
      email,
      nickname,
      password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
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
