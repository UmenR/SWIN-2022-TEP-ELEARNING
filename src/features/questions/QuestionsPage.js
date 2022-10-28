/**
 * This page is for rendering the create questions page
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Button, Radio } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createQuestion } from "./questionsSlice";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme();

function QuestionsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading,setisLoading] = useState(false);

  function handleRadioClick(answer) {
    if (selectedAnswer && selectedAnswer.id === answer.id) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(answer);
    }
  }

  const initialFormValues = {
    text: "",
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

  async function onSubmit(fields) {
    const answers = fields.values.options.map((option, index) => ({
      id: index + 1,
      text: option.text,
    }));
    const questionObj = {
      text: fields.values.text,
      answers,
      solutions: {
        id: answers.find((option) => option.id === selectedAnswer.id)?.id,
        text: answers.find((option) => option.id === selectedAnswer.id)?.text,
      },
      id: uniqid(),
    };
    setisLoading(true)
    await dispatch(createQuestion({ question: questionObj })).unwrap();
    navigate("/questions/list");
  }

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
                        name="values.text"
                        onChange={handleChange}
                        multiline
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
        </Box>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}

export default QuestionsPage;
