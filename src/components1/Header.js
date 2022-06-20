import { memo, useState } from 'react';
const Header = memo((props) => {
    const [text, setText] = useState('');
    const { addTodo, listTodos, checkAll } = props;
    const onAddTodo = (e) => {
        if (e.key === 'Enter' && text) {
            addTodo({ id: new Date().valueOf(), text, isCompleted: false });
            setText('');
        }
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
                    <button onClick={checkAll}>
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
