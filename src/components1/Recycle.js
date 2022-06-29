import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined, RollbackOutlined } from '@ant-design/icons';

import API from '../api/api';
const Recycle = memo(() => {
    const navigate = useNavigate();
    const [listTodos, setListTodos] = useState([]);
    const { confirm } = Modal;
    useEffect(() => {
        API.get('')
            .then((res) => {
                const listTodos = res.data;
                setListTodos(listTodos);
            })
            .catch((error) => console.log(error));
    }, []);

    const onRemoveTodoTrue = (id) => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                API.delete(`${id}`).then(() => {
                    const newListTodos = listTodos.filter((item) => item.id !== id);
                    setListTodos(newListTodos);
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const onRestoreTodo = (id) => {
        API.put(`${id}`, { isDeleted: false }).then(() => {
            const newListTodos = listTodos.filter((item) => item.isDeleted === true);
            setListTodos(newListTodos);
            navigate('/');
            // navigate('/bin');
        });
    };
    return (
        <div className="header_content recycle">
            <Link to="/">
                <RollbackOutlined /> Back
            </Link>

            {listTodos
                .filter((item) => item.isDeleted)
                .map((todo, index) => (
                    <li className={`${todo.isCompleted ? 'todo_item completed' : 'todo_item'}`} key={index}>
                        <span className="but_confirm">
                            {todo.isCompleted ? (
                                <i className="fa fa-check" aria-hidden="true" style={{ color: 'rgb(13, 189, 13)' }}></i>
                            ) : (
                                <i className="fa fa-check" aria-hidden="true" style={{ color: 'rgb(221 216 216)' }}></i>
                            )}
                        </span>
                        <span>{todo.text}</span>
                        <button className="but_remove" onClick={() => onRemoveTodoTrue(todo.id)}>
                            <i className="fa fa-times-circle" aria-hidden="true" style={{ color: 'red' }}></i>
                        </button>
                        <button className="but_restore" onClick={() => onRestoreTodo(todo.id)}>
                            <i
                                className="fas fa-sync-alt fa-spin"
                                aria-hidden="true"
                                style={{ color: 'rgb(13, 189, 13)', fontSize: 21 + 'px' }}
                            ></i>
                        </button>
                    </li>
                ))}
            <div className="recycle_footer">
                <span className="todo_count">
                    <div>
                        <strong>{listTodos.filter((item) => item.isDeleted).length}</strong>
                        <span>deleted</span>
                        <span>{listTodos.filter((item) => item.isDeleted).length > 1 ? 'items' : 'item'}</span>
                    </div>
                </span>
            </div>
        </div>
    );
});

export default Recycle;
