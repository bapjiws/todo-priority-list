import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'; // Documentation: https://github.com/adriantoine/enzyme-to-json

import { TodoList } from '../../src/components/TodoList';
import * as todoStubs from '../../stubs/todos';

describe('TodoList', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<TodoList todos={todoStubs.sortedTodos}/>)
    });

    it('renders correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});