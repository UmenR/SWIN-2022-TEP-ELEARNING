import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { styled as mStyled } from "@mui/material/styles";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import QuestionListView from "../questions/QuestionListView";
import { questionsSelector } from "../questions/questionsSelectors";
import { fetchQuestions } from "../questions/questionsSlice";
import { selectedQuizSelector } from "./quizSelectors";
import { setSelectedQuiz } from "./quizSlice";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CreateQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  min-width: 800px;
  flex: 1;
`;

const QuestionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  min-width: 800px;
  padding: 10px;
  flex: 1;
`;

const StyledButton = mStyled(Button)(({ theme }) => ({
  width: 100,
  height: 50,
  margin: 20,
}));

export default function CreateQuiz() {
  const currentQuestions = useSelector(questionsSelector);
  const currentQuiz = useSelector(selectedQuizSelector);

  const dispatch = useDispatch();

  function isSelected(question, quiz) {
    if (quiz.questions?.find((element) => element.id === question.id)) {
      console.log(question);
      console.log(quiz.questions);
      return true;
    }
    return false;
  }

  const initialFormValues = {
    title: currentQuiz ? currentQuiz.title : "",
    description: currentQuiz ? currentQuiz.description : "",
    questions: currentQuestions.map((question) => ({
      ...question,
      selected: currentQuiz ? isSelected(question, currentQuiz) : false,
    })),
  };

  function doSubmit(values) {
    // TODO: handle submit
    console.log(`--- values`);
    console.log(values);
  }

  // fetch list of questions on initial render.
  useEffect(() => {
    dispatch(fetchQuestions({}));

    return function cleanup() {
      dispatch(setSelectedQuiz({ selectedQuiz: null }));
    };
  }, []);

  return (
    <>
      {(!currentQuestions || currentQuestions.length <= 0) && (
        <Stack sx={{ marginTop: 10 }} spacing={5}>
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" height={60} />
        </Stack>
      )}

      {currentQuestions && currentQuestions.length > 0 && (
        <Formik
          initialValues={initialFormValues}
          onSubmit={(values) => doSubmit(values)}
        >
          {({ values, setValues, handleSubmit, handleChange }) => {
            return (
              <Container>
                <CreateQuizContainer>
                  <TextField
                    fullWidth
                    id="title"
                    label="title"
                    variant="outlined"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                    sx={{ marginBottom: 5, marginTop: 5 }}
                  />
                  <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                  />
                </CreateQuizContainer>
                <QuestionListContainer>
                  <QuestionListView
                    questions={values.questions}
                    setValues={setValues}
                    values={values}
                  />
                </QuestionListContainer>
                <StyledButton
                  onClick={handleSubmit}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </StyledButton>
              </Container>
            );
          }}
        </Formik>
      )}
    </>
  );
}
