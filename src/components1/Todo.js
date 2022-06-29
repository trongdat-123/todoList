import { memo, useState } from 'react';
import API from '../api/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
const Todo = memo((props) => {
    const [text, setText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    let navigate = useNavigate();

    const { todo, removeTodo, changeStatus } = props;
    const onChangeStatus = (e) => {
        e.preventDefault();
        changeStatus(todo.id);
        API.put(`/${todo.id}`, { isCompleted: !todo.isCompleted }).then((res) => {});
    };
    // const onRemoveTodo = (e) => {
    //     e.preventDefault();
    //     removeTodo(todo.id);
    //     API.put(`/${todo.id}`, { isDeleted: false }).then((res) => {});
    // };
    const { confirm } = Modal;
    const showConfirm = (e) => {
        e.preventDefault();
        confirm({
            title: 'Do you want to delete this item?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                API.put(`/${todo.id}`, { isDeleted: true }).then((res) => {
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
            API.put(`${todo.id}`, { text: text }).then(() => {
                console.log(text);
                setText(text);
                setIsModalVisible(false);
                navigate('/');
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

                <button className="but_remove" onClick={showConfirm}>
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
