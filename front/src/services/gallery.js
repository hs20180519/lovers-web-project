import axios from "axios";

const serverUrl = `http://localhost:3000`;

export const createGalleryPhoto = async (loverId, image) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    const response = await axios.post(
      `${serverUrl}/gallery/posts`,
      { loverId, image },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    console.log("res", response);
    return response.data.photo;
  } catch (error) {
    console.error("Error creating gallery photo:", error);
    throw error;
  }
};

export const getAllGalleryPhotos = async (lover_id) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    const response = await axios.get(`${serverUrl}/gallery/posts/${lover_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response);
    return response.data.photos;
  } catch (error) {
    console.error("Error getting all gallery photos", error);
    throw error;
  }
};

export const deleteGalleryPhoto = async (galleryPhotoId) => {
  try {
    const userToken = sessionStorage.getItem("userToken");
    await axios.delete(`${serverUrl}/gallery/posts/${galleryPhotoId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
  } catch (error) {
    console.error("Error getting all gallery photos", error);
    throw error;
  }
};
