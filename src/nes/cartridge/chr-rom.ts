import RomBank, { ROM_BANK_SIZE } from "./rom-bank";

class ChrRom extends RomBank {
  protected readonly bankSize: ROM_BANK_SIZE = ROM_BANK_SIZE.CHR_ROM;
}

export default ChrRom;
