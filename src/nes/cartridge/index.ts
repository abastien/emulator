import File from "../file";
import Mapper, { MapperInterface } from "./mapper";

class Cartridge {
  protected readonly mapper: MapperInterface;

  constructor(rom: File) {
    this.mapper = Mapper.fromFile(rom);
  }

  read(address: number): number {
    return this.mapper.read(address);
  }
}

export default Cartridge;
