import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

import { PRE_DEFINED_QUESTION_NUMBER } from "../../constatns";

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

    // call formik onChange method
    field.onChange(e);
  }

  return (
    <>
      <h1>Questions Page</h1>
      <div>
        <h2>Add questions</h2>
        <Formik initialValues={initialFormValues} onSubmit={onSubmit}>
          {({ values, setValues }) => {
            <>
              <Field name="numberOfQuestions">
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
                      <div key={i} className="list-group list-group-flush">
                        <div className="list-group-item">
                          <h5 className="card-title">question {i + 1}</h5>
                          <div className="form-row">
                            <div className="form-group col-6">
                              <label>Name</label>
                              <Field
                                name={`questions.${i}.name`}
                                type="text"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </FieldArray>
            </>;
          }}
        </Formik>
      </div>
    </>
  );
}
