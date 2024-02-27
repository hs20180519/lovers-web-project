import axios from "axios";

const serverUrl = `http://localhost:3000`;

export const createDiaryPost = async (title, content, postDate, loverId) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    const response = await axios.post(
      `${serverUrl}/diary/posts`,
      {
        title,
        content,
        postDate,
        loverId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return response.data.post;
  } catch (error) {
    console.error("Error creating diary post:", error);
    throw error;
  }
};
export const getDailyDiaryPosts = async (loverId, year, month, day) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    const response = await axios.get(`${serverUrl}/diary/posts/${loverId}`, {
      params: { year, month, day },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data.posts;
  } catch (error) {
    console.error("Error creating diary post:", error);
    throw error;
  }
};
export const updateDiaryPost = async (
  diaryPostId,
  title,
  content,
  postDate,
) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    const response = await axios.patch(
      `${serverUrl}/diary/posts`,
      {
        title,
        content,
        diaryPostId,
        postDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return response.data.updatedPost;
  } catch (error) {
    console.error("Error creating diary post:", error);
    throw error;
  }
};

export const deleteDiaryPost = async (diaryPostId) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    await axios.delete(`${serverUrl}/diary/posts/${diaryPostId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
  } catch (error) {
    console.error("Error creating diary post:", error);
    throw error;
  }
};
