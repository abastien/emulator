export enum RAM_BANK_SIZE {
  PRG_RAM = 0x2000,
  PPU_REGISTERS = 0x2000,
  APU_REGISTERS = 16,
}

class RamBank {
  protected readonly bytes: Uint8Array;

  constructor(bankSize: number) {
    this.bytes = new Uint8Array(bankSize);
  }

  read(address: number): number {
    return this.bytes[address & ~this.bytes.length];
  }

  write(address: number, value: number): void {
    this.bytes[address & ~this.bytes.length] = value;
  }
}

export default RamBank;
