import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { routes } from './pages/routes';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyle = createGlobalStyle`
  html, body, h1, h2, h3 {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    font-weight: normal;
  }
`


root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
