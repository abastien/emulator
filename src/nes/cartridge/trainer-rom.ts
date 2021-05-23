import RomBank, { ROM_BANK_SIZE } from "./rom-bank";

class TrainerRom extends RomBank {
  protected readonly bankSize: ROM_BANK_SIZE = ROM_BANK_SIZE.TRAINER;
}

export default TrainerRom;
