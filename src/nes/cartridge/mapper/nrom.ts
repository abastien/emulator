import { MapperInterface } from "./index";
import PrgRom from "../prg-rom";
import ChrRom from "../chr-rom";
import File from "../../file";

class Nrom implements MapperInterface {
  protected prgRom: PrgRom;
  protected chrRom: ChrRom;

  constructor(rom: File) {
    this.prgRom = new PrgRom(rom.getPrgRomData());
    this.chrRom = new ChrRom(rom.getChrRomData());
  }

  read(address: number): number {
    return this.prgRom.read(address);
  }
}

export default Nrom;
