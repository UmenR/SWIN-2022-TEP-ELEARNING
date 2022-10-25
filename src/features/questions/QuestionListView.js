import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Checkbox } from "@mui/material";

import { FieldArray } from "formik";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 100,
  justifyContent: "flex-start",
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  width: 800,
}));


export default function QuestionListView({ setValues, values }) {
 
function onCheck(id){
    setValues({...values,questions:values.questions.map(item => {
        if(item.id === id){
            return {...item,selected:!item.selected}
        }
        return {...item}
    })})
    console.log(values)
}
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <FieldArray name="questions">
          {() =>
            values.questions.map((question,i) => {
              return (
                <Item key={question.id}>
                  <Checkbox value={question.selected}  onChange={()=>onCheck(question.id)}/>
                  {question.text}
                </Item>
              );
            })
          }
        </FieldArray>
      </Stack>
    </Box>
  );
}
