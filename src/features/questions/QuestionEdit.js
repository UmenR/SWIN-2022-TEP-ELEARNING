import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";

import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Button, Radio } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createQuestion, setSelectedQuestion } from "./questionsSlice";
import { selectedQuestionSelector } from "./questionsSelectors";

const theme = createTheme();

function QuestionEditPage() {

  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const selectedQuestion = useSelector(selectedQuestionSelector)

  function handleRadioClick(answer) {
    if (selectedAnswer && selectedAnswer.id === answer.id) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(answer);
    }
  }

  const initialFormValues = {
    text: "asdsads",
    options: [
      {
        id: 1,
        text: "",
      },
      {
        id: 2,
        text: "",
      },
      {
        id: 3,
        text: "",
      },
      {
        id: 4,
        text: "",
      },
    ],
    answers: [],
  };

  function onSubmit(fields) {
    const answers = fields.values.options.map((option, index) => ({
      id: index + 1,
      text: option.text,
    }))
    console.log(fields.values.options)
    const questionObj = {
      text: fields.values.text,
      answers,
      solutions: [
        {
          id: answers.find(
            (option) => option.id === selectedAnswer.id
          )?.id,
          text: answers.find(
            (option) => option.id === selectedAnswer.id
          )?.text,
        },
      ],
    };
    dispatch(createQuestion({ question: questionObj }));
  }

  useEffect(()=>{
    return ()=>dispatch(setSelectedQuestion({question:null}))
  })

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
        {!selectedQuestion && (
            <h1>...Loading</h1>
        )}
        {selectedQuestion && (
            <Formik
            initialValues={initialFormValues}
            onSubmit={(values) => onSubmit(values)}
          >
            {({ values, setValues, handleChange }) => {
              return (
                <Form>
                  <Grid container rowSpacing={5}>
                    <Grid
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      item
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        id="title"
                        label="Question"
                        variant="outlined"
                        name="text"
                        onChange={handleChange}
                        multiline
                        value={values.text}
                        rows={4}
                        sx={{ width: 500, marginBottom: 5, marginTop: 5 }}
                      />
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      item
                      xs={6}
                    >
                      <TextField
                        fullWidth
                        id="a1"
                        label="Answer : 1"
                        variant="outlined"
                        name="values.options[0].text"
                        onChange={handleChange}
                        sx={{ width: 200 }}
                      />
                      <Radio
                        checked={selectedAnswer?.id === values?.options[0]?.id}
                        onClick={() => handleRadioClick(values.options[0])}
                      />
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      item
                      xs={6}
                    >
                      <TextField
                        fullWidth
                        id="a2"
                        label="Answer : 2"
                        variant="outlined"
                        name="values.options[1].text"
                        onChange={handleChange}
                        sx={{ width: 200 }}
                      />
                      <Radio
                        checked={selectedAnswer?.id === values.options[1].id}
                        onClick={() => handleRadioClick(values.options[1])}
                      />
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      item
                      xs={6}
                    >
                      <TextField
                        fullWidth
                        id="a3"
                        label="Answer : 3"
                        variant="outlined"
                        name="values.options[2].text"
                        onChange={handleChange}
                        sx={{ width: 200 }}
                      />
                      <Radio
                        checked={selectedAnswer?.id === values.options[2].id}
                        onClick={() => handleRadioClick(values.options[2])}
                      />
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      item
                      xs={6}
                    >
                      <TextField
                        fullWidth
                        id="a4"
                        label="Answer : 4"
                        variant="outlined"
                        name="values.options[3].text"
                        onChange={handleChange}
                        sx={{ width: 200 }}
                      />
                      <Radio
                        checked={selectedAnswer?.id === values.options[3].id}
                        onClick={() => handleRadioClick(values.options[3])}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      item
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button variant="contained" type="submit">
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        )}
          
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default QuestionEditPage;
