import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

import * as types from '../../redux/actions/types';
import { addTodo } from '../../redux/actions/todos';
import * as todoStubs from '../../stubs/todos';

const host = 'http://localhost';

const axiosInstance = axios.create();
axiosInstance.defaults.host = host;
axiosInstance.defaults.adapter = httpAdapter;

const middlewares = [ thunk.withExtraArgument({ axiosInstance }) ];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
    todos: {
        data: [],
        error: null
    }
});

describe('addTodo', () => {
    it('should create ADD_TODO_SUCCESS w/ payload on success', async () => {
        expect.assertions(1);

        nock(host)
            .post('/addTodo', {
                todo: todoStubs.todoToInsert
            })
            .reply(200, todoStubs.todoToInsert);

        const expectedActions = [
            {
                type: types.ADD_TODO_SUCCESS,
                payload: todoStubs.todoToInsert
            }
        ];

        await store.dispatch(addTodo(todoStubs.todoToInsert));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
