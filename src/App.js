import logo from './logo.svg';
import './css/todo1.css';
import { Component } from 'react';
import Header from './components1/Header';
import Footer from './components1/Footer';
import TodoList from './components1/TodoList';

const filterByStatus = (listTodos = [], status = '', id) => {
    switch (status) {
        case 'Active':
            return listTodos.filter((item) => !item.isCompleted);
        case 'Completed':
            return listTodos.filter((item) => item.isCompleted);
        case 'Remove':
            return listTodos.filter((item) => item.id !== id);
        default:
            return listTodos;
    }
};
const filterTodosLeft = (listTodos = []) => {
    return listTodos.filter((item) => !item.isCompleted);
};
class App extends Component {
    state = {
        listTodos: [],
        isCheckedAll: false,
        status: 'All',
    };

    addTodos = (todo = {}) => {
        this.setState((prevTodos) => ({
            listTodos: [...prevTodos.listTodos, todo],
        }));
        console.log(todo.id);
    };
    removeTodo = (id = '') => {
        this.setState((prevTodos) => ({
            listTodos: filterByStatus(prevTodos.listTodos, 'Remove', id),
        }));
    };

    changeStatus = (id = '') => {
        const { listTodos } = this.state;

        const updatedListTodos = listTodos.map((item) => {
            if (item.id === id) {
                return { ...item, isCompleted: !item.isCompleted };
            } else {
                return item;
            }
        });
        this.setState({
            listTodos: updatedListTodos,
        });
    };
    checkAll = () => {
        const { listTodos } = this.state;
        const updatedListTodos = listTodos.map((item) => {
            if (item.isCompleted === false) {
                return { ...item, isCompleted: !item.isCompleted };
            } else {
                return item;
            }
        });

        this.setState({
            listTodos: updatedListTodos,
        });
    };
    clearSelectCompleted = () => {
        const { listTodos } = this.state;
        const updatedListTodos = listTodos.map((item) => {
            if (item.isCompleted === true) {
                return { ...item, isCompleted: !item.isCompleted };
            } else {
                return item;
            }
        });

        this.setState({
            listTodos: updatedListTodos,
        });
    };
    removeAll = () => {
        this.setState({
            listTodos: [],
        });
    };
    render() {
        const { listTodos, isCheckedAll, status } = this.state;

        return (
            <div className="todoapp">
                <Header addTodo={this.addTodos} listTodos={listTodos} checkAll={this.checkAll} />
                <TodoList
                    listTodos={filterByStatus(listTodos, status)}
                    removeTodo={this.removeTodo}
                    changeStatus={this.changeStatus}
                />
                <Footer
                    active={status}
                    numOfTodoLeft={filterTodosLeft(listTodos).length}
                    numOfTodoCompleted={filterByStatus(listTodos, status).length}
                    setStatusFilter={(status) => {
                        this.setState({ status });
                    }}
                    clearSelectCompleted={this.clearSelectCompleted}
                    removeAll={this.removeAll}
                />
            </div>
        );
    }
}

export default App;
