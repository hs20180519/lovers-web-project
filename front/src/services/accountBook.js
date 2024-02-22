import axios from "axios";

const serverUrl = `http://localhost:3000`;

export const createAccountBook = async (formData) => {
  try {
    const { useDate, category, amount, content } = formData;
    const response = await axios.post(`${serverUrl}/accountbook/posts`, {
      useDate,
      category,
      amount,
      content,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error createing account book: ", error);
    throw error;
  }
};
