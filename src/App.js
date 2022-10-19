import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import HomePage from "./features/home/Home";
import Login from "./features/login/Login";
import QuizList from "./features/quizes/QuizList";
import QuestionsPage from "./features/questions/QuestionsPage";
import ProtectedRoute from "./common/Protected";

import { api } from "./api/Request";
import QuestionsList from "./features/questions/QuestionsList";

/**
 * TOD: remove once done
 * We use a CSS in JS approach to maintain components via 'styeld components'
 * refer to https://styled-components.com/docs/basics#getting-started
 */
const Header = styled.h1`
  color: red;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  async function testOnClick() {
    const response = await api.get("/users", {
      params: {
        page: 2,
      },
    });
    console.log(`data ${response.data}`);
  }

  return (
    <>
      <Header>Styled Component Test</Header>
      <button onClick={testOnClick}>make API request</button>
      <NavList>
        <div>
          <Link to="/quizzes/list">quizes</Link>
        </div>
        <div>
          <Link to="/home">home</Link>
        </div>
        <div>
          <Link to="/login">login</Link>
        </div>
        <div>
          <Link to="/questions/add">questions</Link>
        </div>
      </NavList>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quizzes">
          <Route
            path="list"
            element={
              <ProtectedRoute>
                <QuizList />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Questions page  */}
        <Route path="/questions">
          <Route path="add" element={<QuestionsPage />} />
          <Route path="list" element={<QuestionsList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
