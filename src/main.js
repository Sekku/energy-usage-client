import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import style from './reset.css';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(App), document.getElementById('mount'));
});
