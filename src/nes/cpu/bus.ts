import Cartridge from "../cartridge";
import RamBank from "./ram-bank";

export const PRG_MIRROR_SIZE = 0x800;
export const PPU_MIRROR_SIZE = 8;

class Bus {
  protected prgRam: RamBank;
  protected ppuRegisters: RamBank;
  protected apuRegisters: RamBank;
  protected cartridge: Cartridge;

  constructor() {
    this.prgRam = new RamBank(0x2000);
    this.ppuRegisters = new RamBank(0x2000);
    this.apuRegisters = new RamBank(16);
  }

  read(address: number): number {
    if (address < 0x2000) {
      return this.prgRam.read(address % PRG_MIRROR_SIZE);
    }
    if (address < 0x4000) {
      return this.ppuRegisters.read((address - 0x2000) % PPU_MIRROR_SIZE);
    }
    if (address < 0x4018) {
      return this.ppuRegisters.read(address - 0x4000);
    }
    if (address < 0x4020) {
      return undefined;
    }
    if (address < 0x10000) {
      return this.cartridge.read(address - 0x4020);
    }
    return undefined;
  }

  write(address: number, value: number): void {
    if (address < 0x2000) {
      this.prgRam.write(address % PRG_MIRROR_SIZE, value);
    } else if (address < 0x4000) {
      this.ppuRegisters.write((address - 0x2000) % PPU_MIRROR_SIZE, value);
    } else if (address < 0x4018) {
      this.ppuRegisters.write(address - 0x4000, value);
    }
  }
}

export default Bus;
