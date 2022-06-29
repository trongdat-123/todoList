import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Recycle from './components1/Recycle';
import './css/todo1.css';

import 'antd/dist/antd.css';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/bin" element={<Recycle />} />
        </Routes>
    );
}

export default App;
