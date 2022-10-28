import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button } from "@mui/material";

import { fetchQuestions, setSelectedQuestion } from "./questionsSlice";
import { questionsSelector } from "./questionsSelectors";

const theme = createTheme();

function QuestionsList() {

  const currentQuestions = useSelector(questionsSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchQuestions({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClickQuestion(question) {
    dispatch(setSelectedQuestion({question:question}))
    navigate('/questions/edit')
  }

  function handleNew(){
    navigate('/questions/add')
  }

  console.log(currentQuestions);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 2,
          }}
        >
          <Button onClick={()=>handleNew()} variant="contained">
            + Add New Question
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Grid container rowSpacing={5}>
            {currentQuestions &&
              currentQuestions.length > 0 &&
              currentQuestions.map((question) => (
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={4}
                  key={question.id}
                >
                  <Card sx={{ minWidth: 300 }}>
                    <CardActionArea
                      onClick={() => handleClickQuestion(question)}
                    >
                      <CardContent>
                        <Typography
                          textAlign="center"
                          variant="h5"
                          component="div"
                        >
                          {question.text}
                        </Typography>
                        <Grid container rowSpacing={1}>
                          {question.answers.map((answer) => (
                            <Grid
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              item
                              xs={6}
                              key={answer.id}
                            >
                              <FormControlLabel
                                control={
                                  <Radio
                                    checked={
                                      question.solutions[0].id === answer.id
                                    }
                                  />
                                }
                                label={answer.text}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            {(!currentQuestions || currentQuestions.length <= 0) && (
              <>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={6}
                >
                  <Stack spacing={1}>
                    <Skeleton variant="rectangular" width={345} height={240} />
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
                    <Skeleton variant="rectangular" width={345} height={240} />
                    <Skeleton variant="rectangular" width={345} height={60} />
                    <Skeleton variant="rounded" width={345} height={60} />
                  </Stack>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default QuestionsList;
