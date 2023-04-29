import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider as AlertProvider, transitions, positions } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './Redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));


const option = {

  transitions: transitions.SCALE,
  timeout: 2000,
  positions: positions.MIDDLE,
}
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...option}>
          <App />
        </AlertProvider>
      </Provider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
