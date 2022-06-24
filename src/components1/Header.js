import { memo, useState } from 'react';
import API from '../api/api';
const Header = memo((props) => {
    const [text, setText] = useState('');
    const { addTodo, listTodos, checkAll } = props;
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
        checkAll();
        listTodos.map((item) => {
            item.isCompleted = true;
            API.put(`/${item.id}`, { ...item }).then((res) => {});
        });
    };
    return (
        <header className="header">
            <h2>todoList</h2>

            <div className="header_content">
                {listTodos.length === 0 ? (
                    <button>
                        <i class="fas fa-chevron-right"></i>
                    </button>
                ) : (
                    <button onClick={onCheckAll}>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                )}

                <input
                    className="new_to-do"
                    placeholder="what need you do?"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    onKeyPress={onAddTodo}
                />
            </div>
        </header>
    );
});

export default Header;
