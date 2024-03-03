import axios from "axios";

const serverUrl = `http://localhost:3000`;

export const getAcceptUserProfile = async () => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    const response = await axios.get(`${serverUrl}/lover/accept`, {
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

export const applyLoverByEmail = async (acceptUserEmail) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    const response = await axios.post(
      `${serverUrl}/lover/apply`,
      { acceptUserEmail },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error applying lover:", error);
    throw error;
  }
};

export const acceptLoverByEmail = async (applyUserEmail) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    await axios.patch(
      `${serverUrl}/lover/accept`,
      { applyUserEmail },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  } catch (error) {
    console.error("Error accepting lover: ", error);
    throw error;
  }
};

export const makeLoverNickname = async (loverNickname) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    await axios.patch(
      `${serverUrl}/lover/alias`,
      { loverNickname },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  } catch (error) {
    console.error("Error accepting lover: ", error);
    throw error;
  }
};

export const deleteLoverByUserId = async () => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    await axios.delete(`${serverUrl}/lover`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
  } catch (error) {
    console.error("Error accepting lover: ", error);
    throw error;
  }
};
