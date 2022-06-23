import { Component } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Main from './Main';
import TodoCard from './components1/TodoCard';
import 'antd/dist/antd.css';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/todo/:id" element={<TodoCard />} />
        </Routes>
    );
}

export default App;
