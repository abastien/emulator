import RomBank, { ROM_BANK_SIZE } from "./rom-bank";

class PrgRom extends RomBank {
  protected readonly bankSize: ROM_BANK_SIZE = ROM_BANK_SIZE.PRG_ROM;
}

export default PrgRom;
