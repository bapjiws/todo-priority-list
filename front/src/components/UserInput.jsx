import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel, Radio, Button } from 'react-bootstrap';

import { addTodo } from '../../redux/actions/todos';

const priorityScale = [1,2,3,4,5,6,7,8,9,10];

export class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priority: 1,
            name: '',
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCLick = this.handleCLick.bind(this);
    }

    componentDidMount() {
        document.querySelectorAll('input[type="radio"]')[0].checked = true;
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState({
            [id]: id === 'priority' ? +value : value // this.state.priority is now handled by this.handleCLick
        });
    }

    handleSubmit(event) {
        if (this.getNameValidationState() === 'error' || this.getDescriptionValidationState() === 'error') {
            event.preventDefault();
            return;
        }

        event.preventDefault();

        this.props.addTodo(this.state);
        document.querySelectorAll('input[type="radio"]')[0].checked = true;
        this.setState({
            priority: 1,
            name: '',
            description: ''
        });
    }

    handleCLick(event) {
        this.setState({
           priority: +event.target.value
        });
    }

    getNameValidationState() {
        const length = this.state.name.length;
        return length === 0 ? 'error' : 'success';
    }

    getDescriptionValidationState() {
        const length = this.state.description.length;
        return length === 0 ? 'error' : 'success';
    }

    render() {
        return <form className="form-container">
            <FormGroup
                className="form-space-between"
                controlId="priority"
            >
                <ControlLabel>Priority</ControlLabel>
                {' '}
                <span>
                    {
                        priorityScale.map((priority, idx) =>
                            <Radio
                                inline key={idx}
                                name="radioGroup"
                                value={priority}
                                // inputRef={ref => { this.priorities[priority] = ref; }}
                                onClick={this.handleCLick}
                            >
                                {priority}
                            </Radio>)
                    }
                </span>
            </FormGroup>

            <FormGroup
                controlId="name"
                validationState={this.getNameValidationState()}
            >
                <ControlLabel>Name</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.name}
                    placeholder="Name your task"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback />
            </FormGroup>

            <FormGroup
                controlId="description"
                validationState={this.getDescriptionValidationState()}
            >
                <ControlLabel>Description</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.description}
                    placeholder="Describe your task"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback />
            </FormGroup>

            <Button type="submit" onClick={this.handleSubmit}>
                Submit
            </Button>
        </form>
    }
}

export default connect(
    null,
    { addTodo }
)(UserInput);