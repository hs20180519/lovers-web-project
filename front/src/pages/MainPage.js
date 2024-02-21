import React from "react";
import { Grid, Typography, Button } from "@mui/material"; // @material-ui/core에서 @mui/material로 변경
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
          to="/auth/login"
          variant="outlined"
          color="primary"
          sx={{ marginRight: "10px" }} // style prop을 sx prop으로 변경
        >
          로그인
        </Button>
        <Button
          component={Link}
          to="/auth/register"
          variant="contained"
          color="primary"
          sx={{ marginRight: "10px" }}
        >
          회원가입
        </Button>
        <Button
          component={Link}
          to="/accountbook/posts"
          variant="outlined"
          color="secondary"
        >
          가계부
        </Button>

      </Grid>
    </Grid>
  );
}

export default MainPage;
