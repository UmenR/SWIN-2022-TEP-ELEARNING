import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectedGameQuizSelector } from "./quizSelectors";
import ModalOverlay from "../../common/ModalOverlay";
import { getStars, hasStar } from "../rewards/rewardUtils";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  height: 100%;
  padding: 10px;
`;

const TitleRow = styled(Row)`
    height: 100px;
    width: 100%
    background: black;
`;

const StyledButton = styled.button`
  height: 50px;
  width: 200px;
  background: red;
  margin-top: 20px;
`;

const AnswerButton = styled.div`
  height: 200px;
  width: 200px;
  background: ${(props) => (props.isSelected ? `yellow` : `green`)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnswerRow = styled(Row)`
  padding-left: 20%;
  padding-right: 20%;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const AnswerText = styled.h1`
  color: red;
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
    console.log(answerIndex);
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
      let isValid = false;
      for (const solution of currentQuestion.solutions) {
        if (solution.id === answer) {
          isValid = true;
        }
      }
      if (!isValid) {
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
      setModalBodyContent("Correct answer is 5");
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
      <Container>
        <TitleRow>
          {currentQuestion ? (
            <h1>{currentQuestion.text}</h1>
          ) : (
            <h1>Click Start to Begin</h1>
          )}
        </TitleRow>
        {currentQuestion && (
          <>
            <AnswerRow>
              <Col>
                <AnswerButton
                  isSelected={isSelected(currentQuestion.answers[0].id)}
                  onClick={() => clickAnswer(currentQuestion.answers[0].id)}
                >
                  <AnswerText>{currentQuestion.answers[0].text}</AnswerText>
                </AnswerButton>
              </Col>
              <Col>
                <AnswerButton
                  isSelected={isSelected(currentQuestion.answers[1].id)}
                  onClick={() => clickAnswer(currentQuestion.answers[1].id)}
                >
                  <AnswerText>{currentQuestion.answers[1].text}</AnswerText>
                </AnswerButton>
              </Col>
            </AnswerRow>
            <AnswerRow>
              <Col>
                <AnswerButton
                  isSelected={isSelected(currentQuestion.answers[2].id)}
                  onClick={() => clickAnswer(currentQuestion.answers[2].id)}
                >
                  <AnswerText>{currentQuestion.answers[2].text}</AnswerText>
                </AnswerButton>
              </Col>
              <Col>
                <AnswerButton
                  isSelected={isSelected(currentQuestion.answers[3].id)}
                  onClick={() => clickAnswer(currentQuestion.answers[3].id)}
                >
                  <AnswerText>{currentQuestion.answers[3].text}</AnswerText>
                </AnswerButton>
              </Col>
            </AnswerRow>
            <Row>
              <StyledButton
                onClick={clickCheckValidity}
                disabled={!isValid}
                type="button"
              >
                {getButtonText()}
              </StyledButton>
            </Row>
          </>
        )}
        {!currentQuestion && (
          <Row>
            <StyledButton type="button" onClick={startQuiz}>
              Start Quiz
            </StyledButton>
          </Row>
        )}
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
