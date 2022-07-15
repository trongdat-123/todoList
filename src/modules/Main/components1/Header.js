import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import Menu from 'antd/lib/menu';
import { getDatabase, ref, push, set, update } from 'firebase/database';
import database from '../../../api/firebase';

const Header = memo((props) => {
    const [text, setText] = useState('');
    let navigate = useNavigate();
    const db = database;
    const { id, addTodo, listTodos, checkAll, clearSelectCompleted, active } = props;
    const onAddTodo = (e) => {
        if (e.key === 'Enter' && text) {
            e.preventDefault();

            var idTodo = Math.floor(Math.random() * 101);
            const postListRef = ref(db, 'users/' + id + '/todo/' + idTodo);
            var newTodo = {
                id: idTodo,
                text: text,
                isCompleted: false,
                isDeleted: false,
            };
            set(postListRef, newTodo)
                .then((res) => {
                    console.log(newTodo);
                    addTodo(newTodo);
                    setText('');
                })
                .catch((error) => console.log(error));
        }
    };
    const onCheckAll = () => {
        if (active !== 'Completed') {
            if (listTodos.length === listTodos.filter((item) => item.isCompleted).length) {
                listTodos.map((item) => {
                    const postListRef = ref(db, 'users/' + id + '/todo/' + item.id);

                    update(postListRef, { isCompleted: false }).then(() => {
                        clearSelectCompleted();
                    });
                });
            } else {
                listTodos.map((item) => {
                    const postListRef = ref(db, 'users/' + id + '/todo/' + item.id);

                    update(postListRef, { isCompleted: true }).then(() => {
                        checkAll();
                    });
                });
            }
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
        navigate(`/bin/${id}`);
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
                    <button className="checkAll" onClick={() => onCheckAll()}>
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
                        onClick={() => onClick()}
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
