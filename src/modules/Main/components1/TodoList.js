import { memo } from 'react';

import Todo from './Todo';
const TodoList = memo((props) => {
    const { listTodos } = props;

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
