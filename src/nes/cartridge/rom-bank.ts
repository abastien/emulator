import { ReadonlyUint8Array } from "../utils/readonlyUint8Array";

export enum ROM_BANK_SIZE {
  TRAINER = 512,
  CHR_ROM = 8 * 1024,
  PRG_ROM = 16 * 1024,
}

abstract class RomBank {
  protected abstract readonly bankSize: ROM_BANK_SIZE;
  protected readonly bytes: ReadonlyUint8Array;

  constructor(data: Uint8Array) {
    this.bytes = data.slice(0, this.getBankSize());
  }

  protected getBankSize(): ROM_BANK_SIZE {
    return this.bankSize;
  }

  read(address: number): number {
    return this.bytes[address & ~this.getBankSize()];
  }
}

export default RomBank;
