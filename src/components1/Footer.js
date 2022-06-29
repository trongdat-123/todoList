import { memo, useEffect, useState } from 'react';
import API from '../api/api';
const Footer = memo((props) => {
    const { listTodos, numOfTodoLeft, numOfTodoCompleted, setStatusFilter, active, removeItem } = props;
    const [list, setlist] = useState([]);

    const onRemoveAll = async () => {
        listTodos.map(async (item) => {
            if (item.isCompleted === true) {
                await API.delete(`/${item.id}`).then(() => {
                    removeItem(item);
                });
            }
        });
        // while (listTodos.length >= 1) {
        // console.log(listTodos.shift());
        // setlist(listTodos)
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
                    <a className="handle" onClick={() => onRemoveAll()}>
                        <i className="fas fa-trash-alt"></i>
                    </a>
                </li>
            </ul>
        </footer>
    );
});

export default Footer;
