// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/main.less';
import App from './App';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // Turn off because of double render: https://github.com/vercel/next.js/issues/35822 🥲
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
