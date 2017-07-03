import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../../redux/configureStore';

import '../../styles/main';

import UserInput from './UserInput';
import TodoList from './TodoList';

const App = () => {
    return <Provider store={configureStore()}>
        <div id="app-container">
            <UserInput/>
            <TodoList/>
        </div>
    </Provider>
};

export default App;