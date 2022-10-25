import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { styled as mStyled } from "@mui/material/styles";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import QuestionListView from "../questions/QuestionListView";
import { questionsSelector } from "../questions/questionsSelectors";
import { fetchQuestions } from "../questions/questionsSlice";



const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid red;
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
  min-width: 8s00px;
  padding: 10px;
  flex: 1;
`;

const StyledButton = mStyled(Button)(({ theme }) => ({
    width:100,
    height: 50,
    margin: 20,
  }));

export default function CreateQuiz() {
  const currentQuestions = useSelector(questionsSelector);
  const dispatch = useDispatch();

  const initialFormValues = {
    title: "",
    questions: currentQuestions.map((question) => ({
      ...question,
      selected: false,
    })),
  };

  function doSubmit(values){
    console.log('---')
    console.log(values)
  }

  // fetch list of questions on initial render.
  useEffect(() => {
    dispatch(fetchQuestions({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(currentQuestions);
  return (
    <>
      {(!currentQuestions || currentQuestions.length <= 0) && (
        <h1>Loading...</h1>
      )}
      {currentQuestions && currentQuestions.length > 0 && (
        <Formik initialValues={initialFormValues} onSubmit={values=>doSubmit(values)}>
          {({ values, setValues, handleSubmit, handleChange }) => {
            return (
              <Container>
                <CreateQuizContainer>
                  <TextField
                    fullWidth
                    id="title"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                  />
                </CreateQuizContainer>
                <QuestionListContainer>
                  <QuestionListView
                    questions={values.questions}
                    setValues={setValues}
                    values={values}
                  />
                </QuestionListContainer>
                <StyledButton onClick={handleSubmit} variant="contained" type="submit">
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
