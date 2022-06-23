import { memo, useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
const Todo = memo((props) => {
    let history = useNavigate();
    const { todo, removeTodo, changeStatus } = props;
    const onChangeStatus = (e) => {
        e.preventDefault();
        changeStatus(todo.id);
        API.put(`/${todo.id}`, { isCompleted: !todo.isCompleted }).then((res) => {});
    };
    const onRemoveTodo = (e) => {
        e.preventDefault();
        removeTodo(todo.id);
        API.delete(`/${todo.id}`).then((res) => {});
    };
    return (
        <li className={`${todo.isCompleted ? 'todo_item completed' : 'todo_item'}`}>
            <button className="but_confirm" onClick={onChangeStatus}>
                {todo.isCompleted ? (
                    <i class="far fa-check-circle" aria-hidden="true" style={{ color: 'rgb(13, 189, 13)' }}></i>
                ) : (
                    <i class="far fa-circle" aria-hidden="true" style={{ color: 'rgb(221 216 216)' }}></i>
                )}
            </button>
            <span onClick={() => history(`/todo/${todo.id}`)}>{todo.text}</span>

            <button className="but_remove" onClick={onRemoveTodo}>
                <i class="fa fa-times-circle" aria-hidden="true" style={{ color: 'red' }}></i>
            </button>
        </li>
    );
});

export default Todo;
