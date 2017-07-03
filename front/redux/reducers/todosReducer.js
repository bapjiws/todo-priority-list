import * as types from '../actions/types';

import * as utils from '../../utils/sortTodos';

const initialState = {
    data: [],
    error: null
};

const todosReducer = (todos = initialState, action) => {
    const { type, payload, error } = action;

    switch (type) {

        case types.ADD_TODO_SUCCESS:
            const insertionIdx = utils.findInsertionPoint(todos.data, payload, utils.todoComparator);
            const newData = todos.data.slice();
            newData.splice(insertionIdx, 0, payload);
            return {
                data: newData,
                error: null
            };

        case types.ADD_TODO_FAILURE:
            return {
                ...todos,
                error
            };

        case types.LOAD_TODOS_SUCCESS:
            return {
                data: payload,
                error: null
            };

        case types.LOAD_TODOS_FAILURE:
            return {
                ...todos,
                error
            };

        default:
            return todos;
    }
};

export default todosReducer;