import * as utils from '../../utils/sortTodos';
import * as todoStubs from '../../stubs/todos';

describe('findInsertionPoint', () => {
    it('should find the correct spot for inserting into an already sorted todo list', () => {
        expect(utils.findInsertionPoint(todoStubs.currentTodos, todoStubs.todoToInsert, utils.todoComparator)).toBe(2);
    })
});