import { Layout, Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./common/Protected";
import Dashboard from "./features/DataVis/Dashboard";
import HomePage from "./features/home/Home";
import Leaderboard from "./features/Leaderboard/Leaderboard";
import Login from "./features/login/Login";
import QuestionEditPage from "./features/questions/QuestionEdit";
import QuestionsList from "./features/questions/QuestionsList";
import QuestionsPage from "./features/questions/QuestionsPage";
import CreateQuiz from "./features/quizes/CreateQuiz";
import GameListPage from "./features/quizes/GameListPage";
import GamePage from "./features/quizes/GamePage";
import QuizList from "./features/quizes/QuizList";
import ResultsPage from "./features/quizes/ResultsPage";
import RewardTree from "./features/rewards/rewardTree";
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
              <Link to="/home">Home</Link>
            </Menu.Item>
          )}
          {authStatus === USER_AUTH_TYPE.teacher && (
            <>
              <Menu.Item key="quizzes/list">
                <Link to="/quizzes/list">Quizes</Link>
              </Menu.Item>
              <Menu.Item key="questions/list">
                <Link to="/quizzes/list">Questions</Link>
              </Menu.Item>
              <Menu.Item key="statistics">
                <Link to="/stats">Statistics</Link>
              </Menu.Item>
              <Menu.Item key="leaderboard">
                <Link to="/leaderboard">Leaderboard</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
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
          <Route
            path="add"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Questions page  */}
        <Route path="/questions">
          <Route
            path="add"
            element={
              <ProtectedRoute>
                <QuestionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="list"
            element={
              <ProtectedRoute>
                <QuestionsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit"
            element={
              <ProtectedRoute>
                <QuestionEditPage />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Games page  */}
        <Route path="/games">
          <Route
            path="play"
            element={
              <ProtectedRoute>
                <GamePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="results"
            element={
              <ProtectedRoute>
                <ResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="list"
            element={
              <ProtectedRoute>
                <GameListPage />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Reward Tree Page */}
        <Route path="/rewards">
          <Route
            path="tree"
            element={
              <ProtectedRoute>
                <RewardTree />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Leader board */}
        <Route path="/leaderboard">
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Dashboard */}
        <Route path="/stats">
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;