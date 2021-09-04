import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Login />
    <Cadastro />
  </React.StrictMode>,
  document.getElementById('root')
);
