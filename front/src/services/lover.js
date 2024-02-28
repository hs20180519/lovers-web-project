import axios from "axios";

const serverUrl = `http://localhost:3000`;

// export const getLoverInformation = async (userId) => {
//   try {
//     const userToken = sessionStorage.getItem("userToken");
//     const response = await axios.get(`${serverUrl}/account/users`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userToken}`,
//       },
//     });
//     console.log(response);
//     return response.data.user;
//   } catch (error) {
//     console.error("Error getting user profile:", error);
//     throw error;
//   }
// };

export const getApplyUserProfile = async () => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    const response = await axios.get(`${serverUrl}/account/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
    return response.data.user;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

export const applyLoverByEmail = async (acceptUserEmail) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    console.log(userToken);
    console.log(acceptUserEmail);
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
