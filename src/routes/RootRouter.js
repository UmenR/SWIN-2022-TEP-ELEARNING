// TODO: remove if not required..

import {Routes, Route } from "react-router-dom";
import HomePage from "../features/home/Home";
import Login from "../features/login/Login";
import QuizList from "../features/quizes/QuizList";

function RootRouter(){
    return(
        <Routes>
            <Route path="/home" element={HomePage}/>
            <Route path="/login" element={Login}/>
            <Routes path="/quizes">
                <Route path="/list" element={QuizList}/>
            </Routes>
        </Routes>
    )
}

export default RootRouter;