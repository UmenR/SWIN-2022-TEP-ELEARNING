import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import 'antd/dist/antd.css';

import App from "./App";
import {store} from "./store/store";

// Router and navigation providers are configured here
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
