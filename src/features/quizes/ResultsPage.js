import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useLocation } from "react-router-dom";

import { postScore } from "../rewards/rewardResultSlice";
import { Typography } from "antd";

const style = {
  bgcolor: "#cfe8fc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function ResultsPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      postScore({
        params: {
          game: {
            score: location.state.score,
            questions: location.state.quiz.questions.length,
            correct: location.state.correctCount,
            stars: location.state.stars,
          },
          quizId: location.state.quiz.id,
        },
      })
    );
    console.log(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getStars() {
    let stars = " ";
    for (let i = 0; i < location.state.stars; i++) {
      stars += "🌟";
    }
    return stars;
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box style={style}>
          <Link to="/games/play">play again</Link>
          <Typography variant="h4" component="h4">
            Your score
          </Typography>
          <Typography variant="h4" component="h2">
            {location.state.score}
          </Typography>
          <Typography variant="h4" component="h4">
            Your stars
          </Typography>
          {location.state.stars > 0 && (
            <Typography variant="h1" component="h1">
              {getStars()}
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}
