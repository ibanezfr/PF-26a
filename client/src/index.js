import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/index.js";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import dotenv from "dotenv";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './i18n.js';
import { BASE_URL } from "./api_url/api_url";
dotenv.config();

axios.defaults.baseURL = `${BASE_URL}`;



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <React.Suspense fallback="loading">
            <App />
          </React.Suspense>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
