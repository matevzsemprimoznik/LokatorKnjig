import Grid from './components/Grid';
import Model from './pages/Model';
import { Controls, useControl } from 'react-three-gui';
import { Canvas } from 'react-three-fiber';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Library from './pages/Library';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:selected" element={
                    <Library />
                }>
                </Route>
                <Route path="/" element={<Library />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
