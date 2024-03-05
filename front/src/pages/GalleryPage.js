import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Card,
  CardMedia,
  CardActions,
  Input,
} from "@mui/material";
import {
  createGalleryPhoto,
  getAllGalleryPhotos,
  deleteGalleryPhoto,
} from "../services/gallery";
import { getUserProfile } from "../services/user";

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // 페이지가 로드될 때 모든 갤러리 사진을 가져옴
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const user = await getUserProfile();
      const fetchedPhotos = await getAllGalleryPhotos(user.loverId);
      setPhotos(fetchedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleAddPhoto = async () => {
    try {
      const user = await getUserProfile(); // 연인의 ID를 설정해야 함
      console.log(imageFile);
      const photo = await createGalleryPhoto(user.loverId, imageFile);
      console.log(photo);
      await fetchPhotos(); // 사진 추가 후 갤러리를 다시 가져옴
      setImageFile(null); // 이미지 파일 초기화
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await deleteGalleryPhoto(photoId);
      fetchPhotos(); // 사진 삭제 후 갤러리를 다시 가져옴
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    console.log("이미지", file.name);
  };

  return (
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid item key={photo.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              src={`/back/${photo.image_path}`}
              alt="Photo"
            />
            <CardActions>
              <Button
                size="small"
                color="secondary"
                onClick={() => handleDeletePhoto(photo.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Input type="file" onChange={handleImageChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPhoto}
          disabled={!imageFile}
        >
          Add Photo
        </Button>
      </Grid>
    </Grid>
  );
};

export default GalleryPage;
