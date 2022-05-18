import Model from './pages/Model';
import {Canvas} from 'react-three-fiber';
import Button from "./components/Button";
import {useState} from "react";

function App() {

    return (
        <>
            <Button image="../menu-button.svg" position={{top:2,left:2}}/>
            <div className="app_canvas">
                <Canvas camera={{position: [0, 5, 10], fov: 60}}>
                    <Model/>
                </Canvas>
            </div>
        </>
    );
}

export default App;
