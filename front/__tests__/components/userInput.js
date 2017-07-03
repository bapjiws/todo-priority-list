import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json'; // Documentation: https://github.com/adriantoine/enzyme-to-json

import { UserInput } from '../../src/components/UserInput';
import * as todoStubs from '../../stubs/todos';

describe('UserInput', () => {
    let wrapper;
    beforeEach(() => {
        // TODO: find a way to set the first radio button's value to 1
        UserInput.prototype.componentDidMount = jest.fn();
        wrapper = mount(<UserInput />)
    });

    it('renders correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should update pieces of its own state', () => {
        expect(wrapper.find('input[type="radio"]').length).toBe(10);

        wrapper.find('input[type="radio"]').at(2).simulate('click');
        expect(wrapper.state('priority')).toBe(3);

        wrapper.find('input[id="name"]').simulate('change', { target: { id: 'name', value: 'do laundry' } });
        expect(wrapper.state('name')).toBe('do laundry');

        wrapper.find('input[id="description"]').simulate('change', { target: { id: 'description', value: 'quickly!' } });
        expect(wrapper.state('description')).toBe('quickly!');
    });

    it('should call addTodo upon form submission and clear the state', () => {
        const addTodo = jest.fn();
        const wrapper = mount(<UserInput addTodo={addTodo}/>);

        document.querySelectorAll = jest.fn().mockImplementation(selector => {
            return [{
                checked: false
            }, {
                checked: false
            }]
        });

        wrapper.setState(todoStubs.todoToInsert);
        wrapper.find('button').simulate('click');
        expect(addTodo).toHaveBeenCalledWith(todoStubs.todoToInsert);

        expect(wrapper.state('priority')).toBe(1);
        expect(wrapper.state('name')).toBe('');
        expect(wrapper.state('description')).toBe('');
    });
});