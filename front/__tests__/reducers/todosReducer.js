import deepFreeze from 'deep-freeze';

import todosReducer from '../../redux/reducers/todosReducer';
import * as types from '../../redux/actions/types';
import * as todoStubs from '../../stubs/todos';

describe('todosReducer', () => {
    it('should add a new todo to the sorted todo list without mutations', () => {
        const todosBefore = {
            data: todoStubs.currentTodos,
            error: null
        };

        const action = {
            type: types.ADD_TODO_SUCCESS,
            payload: todoStubs.todoToInsert
        };

        const todosAfter = {
            data: todoStubs.sortedTodos,
            error: null
        };

        expect(todosReducer(deepFreeze(todosBefore), deepFreeze(action))).toEqual(todosAfter);
    });

    it('should load todos without side effects', () => {
        const todosBefore = {
            data: [],
            error: null
        };

        const action = {
            type: types.LOAD_TODOS_SUCCESS,
            payload: todoStubs.sortedTodos
        };

        const todosAfter = {
            data: todoStubs.sortedTodos,
            error: null
        };

        expect(todosReducer(deepFreeze(todosBefore), deepFreeze(action))).toEqual(todosAfter);
    })
});