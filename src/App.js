import { Layout, Menu } from "antd";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./features/login/Login";
import HomePage from "./features/home/Home";
import QuizList from "./features/quizes/QuizList";
import QuestionsPage from "./features/questions/QuestionsPage";
import ProtectedRoute from "./common/Protected";
import CreateQuiz from "./features/quizes/CreateQuiz";
import ResultsPage from "./features/quizes/ResultsPage";
import QuestionsList from "./features/questions/QuestionsList";
import GamePage from "./features/quizes/GamePage";
import RewardTree from "./features/rewards/rewardTree";
import GameListPage from "./features/quizes/GameListPage";
import { authenticationStatusSelector } from "./store/authentication/authenticationSelectors";
import { USER_AUTH_TYPE } from "./store/authentication/authenticationSlice";

const { Header } = Layout;

function App() {
  const authStatus = useSelector(authenticationStatusSelector);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          {(authStatus === USER_AUTH_TYPE.teacher ||
            authStatus === USER_AUTH_TYPE.student) && (
              <Menu.Item key="home">
                <Link to="/home">home</Link>
              </Menu.Item>
            )}
          {authStatus === USER_AUTH_TYPE.teacher && (
            <Menu.Item key="quizzes/list">
              <Link to="/quizzes/list">quizes</Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
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
          <Route path="add" element={<CreateQuiz />} />
        </Route>
        {/* Questions page  */}
        <Route path="/questions">
          <Route path="add" element={<QuestionsPage />} />
          <Route path="list" element={<QuestionsList />} />
        </Route>
        {/* Games page  */}
        <Route path="/games">
          <Route path="play" element={<GamePage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="list" element={<GameListPage />} />
        </Route>
        {/* Reward Tree Oage */}
        <Route path="/rewards">
          <Route path="tree" element={<RewardTree />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;

// function App() {
//   async function testOnClick() {
//     const response = await api.get("/users", {
//       params: {
//         page: 2,
//       },
//     });
//     console.log(`data ${response.data}`);
//   }
//
//   return (
//     <>
//       <Header>Styled Component Test</Header>
//       <button onClick={testOnClick}>make API request</button>
//       <NavList>
//         <div>
//           <Link to="/quizzes/list">quizes</Link>
//         </div>
//         <div>
//           <Link to="/home">home</Link>
//         </div>
//         <div>
//           <Link to="/login">login</Link>
//         </div>
//         <div>
//           <Link to="/questions/add">questions</Link>
//         </div>
//         <div>
//           <Link to="/games/play">questions</Link>
//         </div>
//       </NavList>
// <Routes>
//   <Route path="/home" element={<HomePage />} />
//   <Route path="/login" element={<Login />} />
//   <Route path="/quizzes">
//     <Route
//       path="list"
//       element={
//         <ProtectedRoute>
//           <QuizList />
//         </ProtectedRoute>
//       }
//     />
//     <Route path="add" element={<CreateQuiz />} />
//   </Route>
//   {/* Questions page  */}
//   <Route path="/questions">
//     <Route path="add" element={<QuestionsPage />} />
//     <Route path="list" element={<QuestionsList />} />
//   </Route>
//   {/* Games page  */}
//   <Route path="/games">
//     <Route path="play" element={<GamePage />} />
//     <Route path="results" element={<ResultsPage />} />
//   </Route>
// </Routes>
//     </>
//   );
// }
//
// export default App;
