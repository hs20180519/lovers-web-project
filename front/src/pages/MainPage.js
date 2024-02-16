import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <Grid container spacing={3}>
      {/* 왼쪽 콘텐츠 */}
      <Grid item xs={8}>
        <Typography variant="h3" gutterBottom>
          콘텐츠 예시
        </Typography>
        {/* 콘텐츠 예시 내용을 추가하세요 */}
      </Grid>

      {/* 오른쪽 로그인/회원가입 버튼 */}
      <Grid item xs={4} container justifyContent="flex-end" alignItems="center">
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          로그인
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="primary"
        >
          회원가입
        </Button>
      </Grid>
    </Grid>
  );
}

export default MainPage;
