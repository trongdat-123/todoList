import { Routes, Route } from 'react-router-dom';
import Main from './modules/Main/Main';
import Recycle from './modules/Recycle/Recycle';
import Login from './modules/Login/Login';
import './css/todo1.css';

import 'antd/dist/antd.css';

function App() {
    return (
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route path="/todoList/:id" element={<Main />} />

            <Route path="/bin/:id" element={<Recycle />} />
        </Routes>
    );
}

export default App;
