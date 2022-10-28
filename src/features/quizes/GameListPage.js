/**
 * Renders the list of Games visible to a student
 */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { fetchQuizzes, setSelectedGameQuiz } from "./quizSlice";
import { quizzesSelector } from "./quizSelectors";

const theme = createTheme();

function GameListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allQuizzes = useSelector(quizzesSelector);

  function handleNavigation(quiz) {
    dispatch(setSelectedGameQuiz({ selectedGameQuiz: quiz }));
    navigate("/games/play");
  }

  useEffect(() => {
    dispatch(fetchQuizzes({}));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Grid
            container
            rowSpacing={5}
          >
            {!allQuizzes ||
              (allQuizzes.length <= 0 && (
                <>
                  <Grid
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    item
                    xs={6}
                  >
                    <Stack spacing={1}>
                      <Skeleton
                        variant="rectangular"
                        width={345}
                        height={240}
                      />
                      <Skeleton variant="rectangular" width={345} height={60} />
                      <Skeleton variant="rounded" width={345} height={60} />
                    </Stack>
                  </Grid>
                  <Grid
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    item
                    xs={6}
                  >
                    <Stack spacing={1}>
                      <Skeleton
                        variant="rectangular"
                        width={345}
                        height={240}
                      />
                      <Skeleton variant="rectangular" width={345} height={60} />
                      <Skeleton variant="rounded" width={345} height={60} />
                    </Stack>
                  </Grid>
                </>
              ))}
            {allQuizzes &&
              allQuizzes.length > 0 &&
              allQuizzes.map((quiz) => (
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={6}
                  key={quiz.quizID}
                >
                  <Card sx={{ width: 345, height: 300 }}>
                    <CardActionArea onClick={() => handleNavigation(quiz)}>
                      <CardMedia
                        component="img"
                        height="200"
                        image="/logo192.png"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {quiz.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {quiz.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default GameListPage;
