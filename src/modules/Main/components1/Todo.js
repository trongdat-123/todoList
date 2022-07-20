import { memo, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push, set, update } from 'firebase/database';
import { database } from '../../../api/firebase';

const Todo = memo((props) => {
    const [text, setText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    let navigate = useNavigate();
    const db = database;
    const { id, todo, removeTodo, changeStatus } = props;
    const todoListRef = ref(db, 'users/' + id + '/todo/' + todo.id);
    const onChangeStatus = (e) => {
        e.preventDefault();

        update(todoListRef, { isCompleted: !todo.isCompleted }).then(() => {
            changeStatus(todo.id);
        });
    };

    const { confirm } = Modal;
    const showConfirm = () => {
        confirm({
            title: 'Do you want to delete this item?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                update(todoListRef, { isDeleted: true }).then(() => {
                    removeTodo(todo.id);
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const showModal = () => {
        setIsModalVisible(true);
        setText(todo.text);
    };

    const handleOk = () => {
        if (text) {
            update(todoListRef, { text: text }).then(() => {
                console.log(text);
                setText(text);
                setIsModalVisible(false);
                navigate(`/todoList/${id}`);
            });
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleClick = () => {
        todo.isCompleted ? message.warning('Can not update') : showModal();
    };

    return (
        <>
            <li className={`${todo.isCompleted ? 'todo_item completed' : 'todo_item'}`}>
                <button className="but_confirm" onClick={onChangeStatus}>
                    {todo.isCompleted ? (
                        <i className="far fa-check-circle" aria-hidden="true" style={{ color: 'rgb(13, 189, 13)' }}></i>
                    ) : (
                        <i className="far fa-circle" aria-hidden="true" style={{ color: 'rgb(221 216 216)' }}></i>
                    )}
                </button>
                <span onClick={() => handleClick()}>{text === '' ? todo.text : text}</span>

                <button
                    className="but_remove"
                    onClick={() => {
                        confirm({
                            title: 'Do you want to delete this item?',
                            icon: <ExclamationCircleOutlined />,
                            onOk() {
                                // update(todoListRef, { isDeleted: true }).then(() => {
                                removeTodo(todo.id);
                                // });
                            },
                            onCancel() {
                                console.log('Cancel');
                            },
                        });
                    }}
                >
                    <i className="fa fa-times-circle" aria-hidden="true" style={{ color: 'red' }}></i>
                </button>
            </li>

            <Modal title="Update todo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="update_todo">
                    <icon>
                        <i className="fas fa-chevron-right"></i>
                    </icon>

                    <input
                        className="updateText"
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />

                    <p className="active">Todo is not completed</p>
                </div>
            </Modal>
        </>
    );
});

export default Todo;
