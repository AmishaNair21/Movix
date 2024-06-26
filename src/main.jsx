import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss';
import {store}  from "./store/store"
import { Provider } from 'react-redux'
import Home from './pages/home/Home.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
  
  </Provider>,
)
