import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { fetchQuestions } from "./questionsSlice";
import { questionsSelector } from "./questionsSelectors";

const CenteredFlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled(CenteredFlexDiv)`
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const QuestionCard = styled(CenteredFlexDiv)`
  flex-direction: column;
  height: 250px;
  width: 400px;
  background: green;
  margin-bottom: 20px;
`;

const AnswerCard = styled(CenteredFlexDiv)`
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const AnswerColumn = styled(CenteredFlexDiv)`
  flex-direction: column;
`;

const QuestionText = styled.h2`
  color: yellow;
`;

const AnswerText = styled.h4`
  color: black;
`;

function QuestionsList() {
  const currentQuestions = useSelector(questionsSelector);
  const dispatch = useDispatch();

  // fetch list of questions on initial render.
  useEffect(() => {
    dispatch(fetchQuestions({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(currentQuestions);
  return (
    <Container>
      <h1>Questions List</h1>
      {currentQuestions &&
        currentQuestions.length > 0 &&
        currentQuestions.map((question) => (
          <QuestionCard key={question.id}>
            <QuestionText>{question.text}</QuestionText>
            <AnswerCard>
              <AnswerColumn>
                {question.answers.map((answer, index) => (
                  <AnswerText key={answer.id}>
                    {`answer ${index + 1} : `} {answer.text}
                  </AnswerText>
                ))}
              </AnswerColumn>
            </AnswerCard>
          </QuestionCard>
        ))}
      {(!currentQuestions || currentQuestions.length <= 0) && (
        <h1>Loading...</h1>
      )}
    </Container>
  );
}

export default QuestionsList;
