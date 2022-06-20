import { Component } from 'react';
import React, { useState } from 'react';
import App from '../App';
class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            name: '',
        };
    }
    linkList = () => {
        this.props.closeForm();
    };
    isChangedName = (e) => {
        this.setState({ name: e.target.value });
    };
    handleAddTask = () => {
        if (this.state.name !== '') {
            this.props.addTask(this.state.name);
            this.linkList();
        } else {
            document.querySelector('.inputAdd').style = 'border-color: red';
        }
    };
    render() {
        if (this.state.showList === true) {
            return <App></App>;
        } else {
            return (
                <>
                    <div className="container">
                        <h2>Add Task</h2>
                        <div className="form-group">
                            <label className="task">Name</label>
                            <input className="inputAdd" type="text" placehoder="Add" onChange={this.isChangedName} />
                        </div>

                        <button type="submit" style={{ marginRight: 5 + 'px' }} onClick={this.handleAddTask}>
                            AddTask
                        </button>
                        <button type="button" onClick={this.linkList}>
                            Back
                        </button>
                    </div>
                </>
            );
        }
    }
}
export default AddTask;
