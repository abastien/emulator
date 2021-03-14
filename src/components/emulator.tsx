import React, {useEffect, useState} from "react";
import Scene from "./scene";

type props = { rom: ArrayBuffer };

const Emulator = ({ rom }: props): JSX.Element => {
  const [ram, setRam] = useState(new ArrayBuffer(64*1024));

  useEffect(() => {
    setRam(rom.slice(16));
  }, [rom]);

  return <Scene />;
}

export default Emulator;
