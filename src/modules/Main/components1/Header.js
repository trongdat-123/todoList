import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UnorderedListOutlined, DeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import Menu from 'antd/lib/menu';
import { getDatabase, ref, push, set, update } from 'firebase/database';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { database, auth } from '../../../api/firebase';
import { uid } from 'uid';
const Header = memo((props) => {
    const [text, setText] = useState('');
    let navigate = useNavigate();
    const db = database;
    const { id, addTodo, listTodos, checkAll, clearSelectCompleted, active } = props;
    const onAddTodo = (e) => {
        if (e.key === 'Enter' && text) {
            e.preventDefault();
            const uidd = uid();
            const todoListRef = ref(db, 'users/' + id + '/todo/' + uidd);
            var newTodo = {
                id: uidd,
                text: text.trim(),
                isCompleted: false,
                isDeleted: false,
            };
            set(todoListRef, newTodo)
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
                    const todoListRef = ref(db, 'users/' + id + '/todo/' + item.id);

                    update(todoListRef, { isCompleted: false }).then(() => {
                        clearSelectCompleted();
                    });
                });
            } else {
                listTodos.map((item) => {
                    const todoListRef = ref(db, 'users/' + id + '/todo/' + item.id);

                    update(todoListRef, { isCompleted: true }).then(() => {
                        checkAll();
                    });
                });
            }
        }
    };
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const onBin = (e) => {
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
                    <Menu mode="horizontal">
                        <Menu.SubMenu key="SubMenu" title="" icon={<UnorderedListOutlined />}>
                            <Menu.Item key="two" icon={<DeleteOutlined />} onClick={onBin}>
                                Recycle Bin
                            </Menu.Item>
                            <Menu.Item key="three" icon={<LogoutOutlined />} onClick={handleSignOut}>
                                Logout
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            </div>
        </header>
    );
});

export default Header;
