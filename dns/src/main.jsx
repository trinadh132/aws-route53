import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './routing.jsx'
import './index.css';
import { Provider } from 'react-redux'
import rootReducer from './rootReducer.jsx'
import {thunk} from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux';

const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <Routing />
    </Provider>
  </React.StrictMode>,
)
