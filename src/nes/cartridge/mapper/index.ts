import File from "../../file";
import Nrom from "./nrom";

type CartridgeMapper = typeof Nrom;

const mappers: Array<CartridgeMapper> = [Nrom];

export interface MapperInterface {
  read(address: number): number;
}

abstract class Mapper {
  static fromFile(rom: File): MapperInterface {
    const mapperId = rom.getMapperId();
    if (!mappers[mapperId]) throw new Error("Unknown Mapper");
    return new mappers[mapperId](rom);
  }
}

export default Mapper;
