import { Routes, Route } from 'react-router-dom';
import Main from './modules/Main/Main';
import Recycle from './modules/Recycle/Recycle';
import Welcome from './modules/Welcome/Welcome';
import './css/todo1.css';

import 'antd/dist/antd.css';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route path="/todoList/:id" element={<Main />} />

            <Route path="/bin/:id" element={<Recycle />} />
        </Routes>
    );
}

export default App;
