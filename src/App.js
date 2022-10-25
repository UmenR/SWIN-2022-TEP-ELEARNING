import {Breadcrumb, Layout, Menu} from 'antd';
import React from 'react';
import Login from "./features/login/Login";

import {api} from "./api/Request";
import GamePage from "./features/quizes/GamePage";

const {Header, Content, Footer} = Layout;

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
        <Layout className="layout">
            <Header>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(15).fill(null).map((_, index) => {
                        const key = index + 1;
                        return {
                            key,
                            label: `nav ${key}`,
                        };
                    })}
                />
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">Content</div>

                <GamePage/>

                <Login/>

            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
};

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
//       <Routes>
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/quizzes">
//           <Route
//             path="list"
//             element={
//               <ProtectedRoute>
//                 <QuizList />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="add" element={<CreateQuiz />} />
//         </Route>
//         {/* Questions page  */}
//         <Route path="/questions">
//           <Route path="add" element={<QuestionsPage />} />
//           <Route path="list" element={<QuestionsList />} />
//         </Route>
//         {/* Games page  */}
//         <Route path="/games">
//           <Route path="play" element={<GamePage />} />
//           <Route path="results" element={<ResultsPage />} />
//         </Route>
//       </Routes>
//     </>
//   );
// }
//
// export default App;
