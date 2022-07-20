import { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';
import Header from './components1/Header';
import Footer from './components1/Footer';
import TodoList from './components1/TodoList';
import { ref, child, get } from 'firebase/database';
import { auth, database } from '../../api/firebase';
const filterByStatus = (listTodos = [], status = '', id) => {
    switch (status) {
        case 'Active':
            return listTodos.filter((item) => !item.isCompleted && !item.isDeleted);
        case 'Completed':
            return listTodos.filter((item) => item.isCompleted && !item.isDeleted);
        case 'Remove':
            return listTodos.filter((item) => item.id !== id);
        default:
            return listTodos;
    }
};
const filterTodosLeft = (listTodos = []) => {
    return listTodos.filter((item) => !item.isCompleted && !item.isDeleted);
};

function Main() {
    const dbRef = ref(database);
    const [listTodos, setListTodos] = useState([]);
    const [status, setStatus] = useState('All');
    const navigate = useNavigate();
    const id = auth.currentUser ? auth.currentUser.uid : null;
    useEffect(() => {
        if (id) {
            get(child(dbRef, `users/${id}/todo/`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const arr = Object.values(snapshot.val()).filter((item) => !item.isDeleted);
                        console.log(arr);
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

    const addTodos = (todo = {}) => {
        // setListTodos
        setListTodos([...listTodos, todo]);
    };
    const removeTodo = (id = '') => {
        const updatedListTodos = listTodos.map((item) => {
            if (item.id === id) {
                return { ...item, isDeleted: true };
            } else {
                return item;
            }
        });
        setListTodos(updatedListTodos);
    };
    const restoreTodo = (id = '') => {
        const updatedListTodos = listTodos.map((item) => {
            if (item.id === id) {
                return { ...item, isDeleted: false };
            } else {
                return item;
            }
        });
        setListTodos(updatedListTodos);
    };
    const removeTodoTrue = (id = '') => {
        const updatedListTodos = (prevTodos) => ({
            listTodos: filterByStatus(prevTodos.listTodos, 'Remove', id),
        });

        setListTodos(updatedListTodos);
    };
    const changeStatus = (id = '') => {
        const updatedListTodos = listTodos.map((item) => {
            if (item.id === id) {
                return { ...item, isCompleted: !item.isCompleted };
            } else {
                return item;
            }
        });
        setListTodos(updatedListTodos);
    };
    const checkAll = () => {
        const updatedListTodos = listTodos.map((item) => {
            if (item.isCompleted === false) {
                return { ...item, isCompleted: !item.isCompleted };
            } else {
                return item;
            }
        });

        setListTodos(updatedListTodos);
    };
    const clearSelectCompleted = () => {
        const updatedListTodos = listTodos.map((item) => {
            if (item.isCompleted === true) {
                return { ...item, isCompleted: !item.isCompleted };
            } else {
                return item;
            }
        });

        setListTodos(updatedListTodos);
    };
    const removeManyTodo = () => {
        // this.state.listTodos.map((item) => {
        // API.delete(`${listTodos[1].id}`).then(() => {});
        // const { listTodos } = this.state;
        // });
        // const { listTodos } = this.state;
        const updatedListTodos = listTodos.filter((item) => !item.isCompleted && !item.isDeleted);

        setListTodos(updatedListTodos);

        // console.log(list);
    };

    return (
        <div className="todoapp">
            <Header
                id={id}
                addTodo={addTodos}
                checkAll={checkAll}
                listTodos={listTodos}
                active={status}
                clearSelectCompleted={clearSelectCompleted}
                restoreTodo={restoreTodo}
                removeTodoTrue={removeTodoTrue}
            />
            <TodoList
                id={id}
                listTodos={filterByStatus(listTodos, status)}
                removeTodo={removeTodo}
                changeStatus={changeStatus}
            />
            <Footer
                id={id}
                listTodos={listTodos}
                active={status}
                numOfTodoLeft={filterTodosLeft(listTodos).length}
                numOfTodoCompleted={filterByStatus(listTodos, status).length}
                setStatusFilter={(status) => setStatus(status)}
                removeManyTodo={removeManyTodo}
            />
        </div>
    );
}

export default Main;
