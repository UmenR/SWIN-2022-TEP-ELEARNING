import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authenticationStatusSelector } from "../../store/authentication/authenticationSelectors";
import { USER_AUTH_TYPE } from "../../store/authentication/authenticationSlice";

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

const theme = createTheme();

// Home page
function HomePage() {
  const authStatus = useSelector(authenticationStatusSelector);
  const navigate = useNavigate();

  function handleNavigation(destination) {
    navigate(destination);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",

            marginTop: 8,
            marginBottom: 10,
          }}
        >
          <Grid container rowSpacing={5}>
            {authStatus === USER_AUTH_TYPE.student && (
              <>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={6}
                >
                  <Card sx={{ width: 345, height: 300 }}>
                    <CardActionArea
                      onClick={() => handleNavigation("/games/list")}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image="/game.jpg"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Games
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Play Games made available to you by your teacher
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={6}
                >
                  <Card sx={{ width: 345, height: 300 }}>
                    <CardActionArea
                      onClick={() => handleNavigation("/rewards/tree")}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image="/medal.jpg"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Rewards
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Check your stars and your current Reward level.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={6}
                >
                  <Card sx={{ width: 345, height: 300 }}>
                    <CardActionArea
                      onClick={() => handleNavigation("/leaderboard")}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image="/podium.png"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Leaderboard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Browse the current leaderboard
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </>
            )}
            {authStatus === USER_AUTH_TYPE.teacher && (
              <>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={6}
                >
                  <Card sx={{ width: 345, height: 300 }}>
                    <CardActionArea
                      onClick={() => handleNavigation("/quizzes/list")}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image="/quiz.jpg"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Quizzes
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Browse and create quizzes
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={6}
                >
                  <Card sx={{ width: 345, height: 300 }}>
                    <CardActionArea
                      onClick={() => handleNavigation("/questions/list")}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image="/questions.jpg"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Questions
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Browse and create questions
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={6}
                >
                  <Card sx={{ width: 345, height: 300 }}>
                    <CardActionArea
                      onClick={() => handleNavigation("/stats")}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image="/stat.webp"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Statistics
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Get an insight on how your students are performing
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={6}
                >
                  <Card sx={{ width: 345, height: 300 }}>
                    <CardActionArea
                      onClick={() => handleNavigation("/leaderboard")}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image="/podium.png"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Leaderboard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Browse the current leaderboard
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
