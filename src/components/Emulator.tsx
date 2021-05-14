import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import Scene from "./Scene";

const Emulator = (): JSX.Element => {
  const [rom, setRom] = useState();

  useEffect(() => {
    if (rom) {
      // eslint-disable-next-line no-console
      console.log("ROM loaded", rom);
    }
  }, [rom]);

  useEffect(() => {
    ipcRenderer.on("rom-loaded", (event, data) => setRom(data));
  }, []);

  return <Scene />;
};

export default Emulator;
