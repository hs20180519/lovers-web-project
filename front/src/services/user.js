import axios from "axios";

const serverUrl = `http://localhost:3000`;

export const getUserProfile = async () => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    const response = await axios.get(`${serverUrl}/account/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};
