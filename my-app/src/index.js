import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {createStore , applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import mainReducer from './store/reducers/mainReducer'
import App from './Components/App/App';
import './index.css';

const store = createStore(mainReducer , applyMiddleware(thunk))

ReactDOM.render(
<React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> 
        <App/>    
      </BrowserRouter>
    </Provider>
</React.StrictMode>,
  document.getElementById('root')
);
