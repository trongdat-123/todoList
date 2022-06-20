import { memo, useState } from 'react';

const Todo = memo((props) => {
    const { todo, removeTodo, changeStatus } = props;

    return (
        <li className={`${todo.isCompleted ? 'todo_item completed' : 'todo_item'}`}>
            <button className="but_confirm" onClick={() => changeStatus(todo.id)}>
                {todo.isCompleted ? (
                    <i class="far fa-check-circle" aria-hidden="true" style={{ color: 'rgb(13, 189, 13)' }}></i>
                ) : (
                    <i class="far fa-circle" aria-hidden="true" style={{ color: 'rgb(221 216 216)' }}></i>
                )}
            </button>
            <span>{todo.text}</span>

            <button className="but_remove" onClick={() => removeTodo(todo.id)}>
                <i class="fa fa-times-circle" aria-hidden="true" style={{ color: 'red' }}></i>
            </button>
        </li>
    );
});

export default Todo;
