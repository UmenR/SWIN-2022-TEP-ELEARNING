import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectedGameQuizSelector } from "./quizSelectors";
import ModalOverlay from "../../common/ModalOverlay";
import { getStars, hasStar } from "../rewards/rewardUtils";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TitleRow = styled(Row)`
    height: 100px;
    width: 100%
    background: black;
`;

const ANSWER_STATES = {
  NO_ANSWER: 1,
  CORRECT: 2,
  WRONG: 3,
};

function GamePage() {
  const currentQuiz = useSelector(selectedGameQuizSelector);
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const currentQuizIndexRef = useRef(0);
  const [answers, setAnswers] = useState([]);

  const [isValid, setIsValid] = useState(false);
  const [answerState, setAnswerState] = useState(ANSWER_STATES.NO_ANSWER);

  const [showModal, setShowModal] = useState(false);
  const [modalHeaderContent, setModalHeaderContent] = useState("");
  const [modalBodyContent, setModalBodyContent] = useState("");

  const [correctCount, setCorrectCount] = useState(0);
  const [starScore, setStarScore] = useState(0);
  const [shouldShowStar, setShouldShowStar] = useState(false);

  function getButtonText() {
    if (answerState === ANSWER_STATES.NO_ANSWER) return "Check Answer";
    return "Next";
  }

  function clearAnswerState() {
    setIsValid(false);
    setAnswers([]);
    setAnswerState(ANSWER_STATES.NO_ANSWER);
    setModalBodyContent("");
    setModalHeaderContent("");
    setShowModal(false);
    setShouldShowStar(false);
  }

  function proceed() {
    if (currentQuizIndexRef.current < currentQuiz.questions.length - 1) {
      currentQuizIndexRef.current = currentQuizIndexRef.current + 1;
      setCurrentQuestion(currentQuiz.questions[currentQuizIndexRef.current]);
    } else {
      navigate("/games/results", {
        state: {
          score: correctCount,
          quiz: currentQuiz,
          stars: getStars(currentQuiz.questions.length, correctCount),
          correctCount,
        },
      });
    }
  }

  function startQuiz() {
    setCurrentQuestion(currentQuiz.questions[currentQuizIndexRef.current]);
    clearAnswerState();
  }

  function setValidity() {
    if (answers.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  function clickAnswer(id) {
    // Answer already exists
    const answerIndex = answers.findIndex((element) => id === element);
    if (answerIndex > -1) {
      answers.splice(answerIndex, 1);
      setAnswers([...answers]);
    } else {
      setAnswers([...answers, id]);
    }
  }

  function isSelected(index) {
    // console.log(` ${index} ${!!answers.find((element) => 0 === element)}`);
    return answers.findIndex((element) => index === element) > -1;
  }

  function checkAnswerValidity() {
    let isCorrect = false;
    for (const answer of answers) {
      // for (const solution of currentQuestion.solutions) {
      //   if (solution.id === answer) {
      //     isValid = true;
      //   }
      // }
      if(answer !== currentQuestion.solutions.id){
        isCorrect = false;
        break;
      }
      isCorrect = true;
    }
    return isCorrect;
  }

  function clickCheckValidity() {
    const result = checkAnswerValidity();
    if (result) {
      setCorrectCount(correctCount + 1);
      if (hasStar(currentQuiz.questions.length, starScore, correctCount + 1)) {
        setShouldShowStar(true);
        setStarScore(correctCount + 1);
      }
      // TODO handle this accordingly
      setModalHeaderContent("Your answer is correct!");
    } else {
      setModalHeaderContent("Your answer is Incorrect");
      setModalBodyContent(`Correct Answer is ${currentQuestion.solutions.text}`);
    }
    setShowModal(true);
  }

  function onCloseModal() {
    clearAnswerState();
    proceed();
  }

  useEffect(() => {
    setValidity();
  });

  return (
    <>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            minHeight: 600,
          }}
        >
          <TitleRow>
            {currentQuestion ? (
              <Typography
                textAlign="center"
                gutterBottom
                variant="h2"
                component="h2"
                marginBottom={10}
              >
                {currentQuestion.text}
              </Typography>
            ) : (
              <h1>Click Start to Begin : {currentQuiz?.title}</h1>
            )}
          </TitleRow>
          {currentQuestion && (
            <>
              <Grid container rowSpacing={5}>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  item
                  md={6}
                >
                  <Card
                    sx={{
                      width: 200,
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: isSelected(currentQuestion.answers[0].id)
                        ? "1px solid #1890ff;"
                        : "none",
                    }}
                  >
                    <CardActionArea
                      onClick={() => clickAnswer(currentQuestion.answers[0].id)}
                    >
                      <CardContent>
                        <Typography
                          textAlign="center"
                          gutterBottom
                          variant="h2"
                          component="h2"
                        >
                          {currentQuestion.answers[0].text}
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
                  md={6}
                >
                  <Card
                    sx={{
                      width: 200,
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: isSelected(currentQuestion.answers[1].id)
                        ? "1px solid #1890ff;"
                        : "none",
                    }}
                  >
                    <CardActionArea
                      onClick={() => clickAnswer(currentQuestion.answers[1].id)}
                    >
                      <CardContent>
                        <Typography
                          textAlign="center"
                          gutterBottom
                          variant="h2"
                          component="h2"
                        >
                          {currentQuestion.answers[1].text}
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
                  md={6}
                >
                  <Card
                    sx={{
                      width: 200,
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: isSelected(currentQuestion.answers[2].id)
                        ? "1px solid #1890ff;"
                        : "none",
                    }}
                  >
                    <CardActionArea
                      onClick={() => clickAnswer(currentQuestion.answers[2].id)}
                    >
                      <CardContent>
                        <Typography
                          textAlign="center"
                          gutterBottom
                          variant="h2"
                          component="h2"
                        >
                          {currentQuestion.answers[2].text}
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
                  md={6}
                >
                  <Card
                    sx={{
                      width: 200,
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: isSelected(currentQuestion.answers[3].id)
                        ? "1px solid #1890ff;"
                        : "none",
                    }}
                  >
                    <CardActionArea
                      onClick={() => clickAnswer(currentQuestion.answers[3].id)}
                    >
                      <CardContent>
                        <Typography
                          textAlign="center"
                          gutterBottom
                          variant="h2"
                          component="h2"
                        >
                          {currentQuestion.answers[3].text}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
              <Button
                sx={{
                  height: 50,
                  width: 200,
                  marginTop: 10,
                }}
                onClick={clickCheckValidity}
                disabled={!isValid}
                type="button"
                variant="contained"
              >
                {getButtonText()}
              </Button>
            </>
          )}
          {!currentQuestion && (
            <Row>
              <Button
                sx={{
                  height: 50,
                  width: 200,
                }}
                type="button"
                variant="contained"
                onClick={startQuiz}
              >
                Start Game
              </Button>
            </Row>
          )}
        </Box>
      </Container>
      <ModalOverlay
        isOpen={showModal}
        handleClose={onCloseModal}
        header={modalHeaderContent}
        body={modalBodyContent}
        showReward={shouldShowStar}
      />
    </>
  );
}

export default GamePage;
