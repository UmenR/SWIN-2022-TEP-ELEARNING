import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./features/home/Home";
import Login from "./features/login/Login";
import QuizList from "./features/quizes/QuizList";

/**
 * TOD: remove once done
 * We use a CSS in JS approach to maintain components via 'styeld components'
 * refer to https://styled-components.com/docs/basics#getting-started
 */
const Header = styled.h1`
  color: red;
`;

function App() {
  return (
    <>
      <Header>Styled Component Test</Header>
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
