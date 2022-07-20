import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { getDatabase, ref, child, get, remove, push, set, update } from 'firebase/database';
import { database, auth } from '../../api/firebase';
const Recycle = memo(() => {
    const db = database;
    const dbRef = ref(database);
    const navigate = useNavigate();
    const [listTodos, setListTodos] = useState([]);
    const id = auth.currentUser ? auth.currentUser.uid : null;

    const { confirm } = Modal;
    useEffect(() => {
        if (id) {
            get(child(dbRef, 'users/' + id + '/todo/'))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const arr = Object.values(snapshot.val()).filter((item) => item.isDeleted);

                        setListTodos(arr);
                        // console.log(listTodos);
                    } else {
                        console.log('No data available');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            navigate('/');
            console.log('Bạn chưa đăng nhập ');
            // return null;
        }
    }, []);

    const onRemoveTodoTrue = (idTodo) => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                const todoListRef = ref(db, 'users/' + id + '/todo/' + idTodo);
                remove(todoListRef).then(() => {
                    const newListTodos = listTodos.filter((item) => item.id !== idTodo);
                    setListTodos(newListTodos);
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const onRestoreTodo = (idTodo) => {
        const todoListRef = ref(db, 'users/' + id + '/todo/' + idTodo);
        update(todoListRef, { isDeleted: false }).then(() => {
            const newListTodos = listTodos.filter((item) => item.id !== idTodo);
            setListTodos(newListTodos);
        });
    };
    return (
        <div className="header_content recycle">
            <Link to={`/todoList/${id}`}>
                <RollbackOutlined /> Back
            </Link>

            {listTodos.map((todo, index) => (
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
