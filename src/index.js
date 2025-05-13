import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let reactChatElement = document.getElementById('react-chat');
if (!reactChatElement) {
    reactChatElement = document.createElement('div');
    reactChatElement.id = 'react-chat';
    document.body.appendChild(reactChatElement);
}
console.log('Chat app is initializing...');
const root = ReactDOM.createRoot(reactChatElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
