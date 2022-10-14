import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import HomePage from "./features/home/Home";
import Login from "./features/login/Login";
import QuizList from "./features/quizes/QuizList";

import { api } from "./api/Request";


/**
 * TOD: remove once done
 * We use a CSS in JS approach to maintain components via 'styeld components'
 * refer to https://styled-components.com/docs/basics#getting-started
 */
const Header = styled.h1`
  color: red;
`;

function App() {

  async function testOnClick(){
    const response = await api.get("/users",{params:{
      page:2
    }})
    console.log(`data ${response.data}`)
  } 

  return (
    <>
      <Header>Styled Component Test</Header>
      <button onClick={testOnClick}>make API request</button>
      <Routes>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/quizes">
                <Route path="list" element={<QuizList/>}/>
            </Route>
        </Routes>
    </>
  );
}

export default App;
