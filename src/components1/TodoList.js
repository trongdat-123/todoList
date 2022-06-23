import { memo, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import API from '../api/api';
import App from '../App';
import Todo from './Todo';
const TodoList = memo((props) => {
    const { listTodos } = props;
    // const filterByStatus = (listTodos = [], status = '', id) => {
    //     switch (status) {
    //         case 'Active':
    //             return listTodos.filter((item) => !item.isCompleted);
    //         case 'Completed':
    //             return listTodos.filter((item) => item.isCompleted);
    //         case 'Remove':
    //             return listTodos.filter((item) => item.id !== id);
    //         default:
    //             return listTodos;
    //     }
    // };
    // removeTodo = (id = '') => {
    //     setListTodos((prevTodos) => ({
    //         listTodos: filterByStatus(prevTodos.listTodos, 'Remove', id),
    //     }));
    // };

    // changeStatus = (id = '') => {
    //     const updatedListTodos = listTodos.map((item) => {
    //         if (item.id === id) {
    //             return { ...item, isCompleted: !item.isCompleted };
    //         } else {
    //             return item;
    //         }
    //     });
    //     setListTodos(updatedListTodos);
    // };
    return (
        <div className="todoList">
            <ul className="list_todo">
                {listTodos.map((todo, index) => (
                    <Todo todo={todo} key={index} {...props} />
                ))}
            </ul>
        </div>
    );
});

export default TodoList;
