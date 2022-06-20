import { Component } from 'react';

class CompletedTask extends Component {
    render() {
        return <li>{this.props.name}</li>;
    }
}

export default CompletedTask;
