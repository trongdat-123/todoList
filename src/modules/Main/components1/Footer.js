import { memo, useEffect, useState } from 'react';
import { getDatabase, ref, push, set, update } from 'firebase/database';
import { database } from '../../../api/firebase';

const Footer = memo((props) => {
    const { id, listTodos, numOfTodoLeft, numOfTodoCompleted, setStatusFilter, active, removeManyTodo } = props;
    const [list, setlist] = useState([]);
    const db = database;

    const onRemoveAll = () => {
        listTodos.map((item) => {
            if (item.isCompleted === true) {
                const todoListRef = ref(db, 'users/' + id + '/todo/' + item.id);

                update(todoListRef, { isDeleted: true }).then(() => {
                    removeManyTodo();
                });
            }
        });
    };
    return (
        <footer className="footer">
            <span className="todo_count">
                {active === 'Completed' ? (
                    <div>
                        <strong>{numOfTodoCompleted}</strong>
                        <span>{numOfTodoCompleted > 1 ? 'items' : 'item'}</span>
                        <span>completed</span>
                    </div>
                ) : (
                    <div>
                        <strong>{numOfTodoLeft}</strong>
                        <span>{numOfTodoLeft > 1 ? 'items' : 'item'}</span>
                        <span>left</span>
                    </div>
                )}
            </span>

            <ul className="filters">
                <li>
                    <a
                        href="#/"
                        className={`${active === 'All' ? 'selected' : ''}`}
                        onClick={() => setStatusFilter('All')}
                    >
                        All
                    </a>
                </li>
                <li>
                    <a
                        href="#/active"
                        className={`${active === 'Active' ? 'selected' : ''}`}
                        onClick={() => setStatusFilter('Active')}
                    >
                        Active
                    </a>
                </li>
                <li>
                    <a
                        href="#/completed"
                        className={`${active === 'Completed' ? 'selected' : ''}`}
                        onClick={() => setStatusFilter('Completed')}
                    >
                        Completed
                    </a>
                </li>

                <li>
                    <a className="handle" onClick={onRemoveAll}>
                        <i className="fas fa-trash-alt"></i>
                    </a>
                </li>
            </ul>
        </footer>
    );
});

export default Footer;
