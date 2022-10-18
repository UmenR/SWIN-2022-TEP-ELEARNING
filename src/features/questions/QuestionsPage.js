import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";

import { PRE_DEFINED_QUESTION_NUMBER, ANSWER_INDEXES } from "../../constatns";

function QuestionsPage() {
  const initialFormValues = {
    numberOfQuestions: 0,
    questions: [],
  };

  function onSubmit(fields) {
    console.log(JSON.stringify(fields));
  }

  function onChangeNumberOfQuestions(e, field, values, setValues) {
    // Merge previous questions
    const questions = [...values.questions];
    const noOfQuestions = e.target.value || 0;
    const previousNumber = parseInt(field.value || "0");

    // Push a new question per each new entry
    if (previousNumber < noOfQuestions) {
      for (let i = previousNumber; i < noOfQuestions; i++) {
        questions.push({ name: "", email: "" });
      }
    } else {
      // Keep removing each extra question from the end of questions
      // array.
      for (let i = previousNumber; i >= noOfQuestions; i--) {
        questions.splice(i, 1);
      }
    }
    setValues({ ...values, questions });
  }

  function addQuestion(values,setValues){
    const questions = [...values.questions];
    questions.push({ name: "", email: "" });
    setValues({ ...values, questions });
  }

  function removeQuestions(index,values,setValues){
    const questions = [...values.questions];
    questions.splice(index, 1);
    setValues({ ...values, questions });
  }

  return (
    <>
      <h1>Questions Page</h1>
      <div>
        <h2>Add questions</h2>

        <Formik initialValues={initialFormValues} onSubmit={onSubmit}>
          {({ values, setValues }) => {
            return (
              <Form>
                <Field name="numberOfQuestions" className="form-control">
                  {({ field }) => (
                    <select
                      {...field}
                      onChange={(e) =>
                        onChangeNumberOfQuestions(e, field, values, setValues)
                      }
                    >
                      <option value=""></option>
                      {PRE_DEFINED_QUESTION_NUMBER.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <FieldArray name="questions">
                  {() =>
                    values.questions.map((_, i) => {
                      return (
                        <div key={i}>
                          <h5 className="card-title">question {i + 1}</h5>
                          <div className="row">
                            <div className="col-6">
                              <label>question</label>
                              <Field
                                name={`questions.${i}.name`}
                                type="text"
                                className="form-control"
                              />
                            </div>
                          </div>
                          {ANSWER_INDEXES.map((answerIndex) => (
                            <div key={answerIndex} className="row">
                              <div className="col-2 ">
                                <label>Answer {answerIndex}</label>
                                <Field
                                  name={`questions.${i}.answers.${answerIndex}.text`}
                                  type="text"
                                  className="form-control"
                                />
                              </div>
                              <div className="col-1">
                                <Field
                                  name={`questions.${i}.answers.${answerIndex}.isAnswer`}
                                  type="checkbox"
                                />
                              </div>
                            </div>
                          ))}
                          <button type="button" onClick={()=>removeQuestions(i,values,setValues)}>Remove Question</button>
                        </div>
                      );
                    })
                  }
                </FieldArray>
                <button type="button" onClick={()=>addQuestion(values,setValues)}>Add New Question</button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default QuestionsPage;
