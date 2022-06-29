import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import Menu from 'antd/lib/menu';
import API from '../api/api';
const Header = memo((props) => {
    const [text, setText] = useState('');
    let navigate = useNavigate();
    // const [isModalVisible, setIsModalVisible] = useState(false);

    const { addTodo, listTodos, checkAll, clearSelectCompleted, active } = props;
    const onAddTodo = (e) => {
        if (e.key === 'Enter' && text) {
            e.preventDefault();

            API.post('', { text })
                .then((res) => {
                    const todo = { ...res.data };
                    addTodo(todo);
                    setText('');
                })
                .catch((error) => console.log(error));
        }
    };
    const onCheckAll = () => {
        if (listTodos.length === listTodos.filter((item) => item.isCompleted).length) {
            clearSelectCompleted();
            listTodos.map((item) => {
                API.put(`/${item.id}`, { isCompleted: false }).then((res) => {});
            });
        } else {
            checkAll();
            listTodos.map((item) => {
                API.put(`/${item.id}`, { isCompleted: true }).then((res) => {});
            });
        }
    };

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [getItem('', 'sub4', <UnorderedListOutlined />, [getItem('Recycle Bin', '', <DeleteOutlined />)])];
    const onClick = (e) => {
        navigate('/bin');
    };

    return (
        <header className="header">
            <h2>todoList</h2>

            <div className="header_content">
                {/* {console.log(active)}, */}
                {listTodos.length === 0 ? (
                    <button className="checkAll">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                ) : (
                    <button className="checkAll" onClick={onCheckAll}>
                        <i className="fas fa-chevron-down"></i>
                    </button>
                )}
                <input
                    className="new_to-do"
                    placeholder="what need you do?"
                    value={active === 'Completed' ? '' : text}
                    disabled={active === 'Completed' ? true : false}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    onKeyPress={onAddTodo}
                />
                <div className="action">
                    <Menu
                        onClick={onClick}
                        style={{
                            width: 70,
                            background: 'none',
                        }}
                        mode="horizontal"
                        items={items}
                    />
                </div>
            </div>
        </header>
    );
});

export default Header;
