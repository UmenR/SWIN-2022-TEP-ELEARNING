import {Link, Route, Routes} from "react-router-dom";
import styled from "styled-components";

import HomePage from "./features/home/Home";
import Login from "./features/login/Login";
import QuizList from "./features/quizes/QuizList";
import QuestionsPage from "./features/questions/QuestionsPage";
import ProtectedRoute from "./common/Protected";

import {api} from "./api/Request";
import QuestionsList from "./features/questions/QuestionsList";
import GamePage from "./features/quizes/GamePage";
import CreateQuiz from "./features/quizes/CreateQuiz";
import ResultsPage from "./features/quizes/ResultsPage";
import {PageHeader} from "antd";

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
  flex-direction: row;
  padding: 10px;
  justify-items: center;
`;

// const PageHeaderStyled = styled.PageHeader  `
//     border: 1px solid rgb(235, 237, 240);
// `

const routes = [];

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
            <PageHeader
                title="Title"
                subTitle="This is a subtitle"
                avatar={{src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'}}
                breadcrumb={{routes}}
            />
            {/*<button onClick={testOnClick}>make API request</button>*/}
            <NavList>
                <div>
                    <Link to="/quizzes/list">Quizzes</Link>
                </div>
                <div>
                    <Link to="/home">Home</Link>
                </div>
                <div>
                    <Link to="/login">Login</Link>
                </div>
                <div>
                    <Link to="/questions/add">Questions</Link>
                </div>
                <div>
                    <Link to="/games/play">Play Game</Link>
                </div>
            </NavList>
            <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/quizzes">
                    <Route
                        path="list"
                        element={
                            <ProtectedRoute>
                                <QuizList/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="add" element={<CreateQuiz/>}/>
                </Route>
                {/* Questions page  */}
                <Route path="/questions">
                    <Route path="add" element={<QuestionsPage/>}/>
                    <Route path="list" element={<QuestionsList/>}/>
                </Route>
                {/* Games page  */}
                <Route path="/games">
                    <Route path="play" element={<GamePage/>}/>
                    <Route path="results" element={<ResultsPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;