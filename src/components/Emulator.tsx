import React, {useEffect, useState} from "react";
import Scene from "./Scene";
import {ipcRenderer} from "electron";

const Emulator = (): JSX.Element => {
    const [rom, setRom] = useState();

    useEffect(() => console.log('ROM loaded', rom), [rom]);

    useEffect(() => {
        ipcRenderer.on('rom-loaded', (event, data) => setRom(data))
    }, []);

    return <Scene />;
}

export default Emulator;
