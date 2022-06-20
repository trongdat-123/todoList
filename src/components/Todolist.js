import { Component } from 'react';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComplete: false,
            index: 0,
        };
    }
    linkList = () => {
        this.props.closeForm();
    };
    isTaskCompleted = () => {
        this.props.removeTask(this.props.index);
        this.linkList();
    };
    render() {
        return (
            <li>
                {this.props.name}
                <button type="button" className="but" value={this.props.index} onClick={this.isTaskCompleted}>
                    x
                </button>
            </li>
        );
    }
}
export default TodoList;
