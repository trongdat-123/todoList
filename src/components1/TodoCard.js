import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { Spin } from 'antd';
const TodoCard = () => {
    let history = useNavigate();

    const { id } = useParams();
    const [text, setText] = useState('');
    const [todoDetails, setTodoDetails] = useState();

    useEffect(() => {
        API.get(`${id}`).then((res) => {
            const responseTodo = res.data;
            setTodoDetails(responseTodo);
            setText(responseTodo.text);
        });
    }, []);
    const updateTodos = () => {
        if (text) {
            API.put(`${id}`, { text }).then(() => {
                history('/');
            });
        }
    };
    return (
        <>
            {todoDetails ? (
                <div className="update_todo">
                    <icon>
                        <i class="fas fa-chevron-right"></i>
                    </icon>

                    <input
                        className="updateText"
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                    <p>{todoDetails.isCompleted ? 'Todo is completed' : 'Todo is active'}</p>
                    <div className="handleUpdate">
                        <button className="update" onClick={updateTodos} style={{ marginRight: 10 + 'px' }}>
                            Update
                        </button>
                        <button>
                            <Link to="/">Cancel</Link>
                        </button>
                    </div>
                </div>
            ) : (
                <Spin />
            )}
        </>
    );
};

export default TodoCard;
