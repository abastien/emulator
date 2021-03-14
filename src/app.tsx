import React from "react";
import ReactDOM from "react-dom";
import Emulator from "./components/emulator";
import {ipcRenderer} from 'electron';

ipcRenderer.on('rom-loaded', (event, data) => {
    ReactDOM.render(<Emulator rom={data} />, document.getElementById('root'));
})
