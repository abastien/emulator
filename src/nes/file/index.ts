import Header, { HEADER_SIZE } from "./header";
import { ROM_BANK_SIZE } from "../cartridge/rom-bank";
import { ReadonlyUint8Array } from "../utils/readonlyUint8Array";

const NES_IDENTIFIER = 0b10;

export enum NES_FILE_FORMAT {
  INVALID,
  ARCHAIC_INES,
  INES,
  NES20,
}

export default class File {
  public readonly bytes: ReadonlyUint8Array;
  protected readonly header: Header;

  constructor(rom: Uint8Array) {
    this.bytes = new Uint8Array(rom);
    this.header = new Header(rom);
  }

  public computeNes20PrgRomSize(): number {
    const MSB = this.header.getPrgRomSizeMsb();
    return MSB < 0xf
      ? (this.header.bytes[4] | (MSB << 8)) * ROM_BANK_SIZE.PRG_ROM
      : 2 ** this.header.getPrgRomSizeExponent() *
          (this.header.getPrgRomSizeMultiplier() * 2 + 1);
  }

  public computeNes20ChrRomSize(): number {
    const MSB = this.header.getChrRomSizeMsb();
    return MSB < 0xf
      ? (this.header.bytes[5] | (MSB << 8)) * ROM_BANK_SIZE.CHR_ROM
      : 2 ** this.header.getChrRomSizeExponent() *
          (this.header.getChrRomSizeMultiplier() * 2 + 1);
  }

  getFormat(): NES_FILE_FORMAT {
    if (
      this.header.bytes[0] === 0x4e &&
      this.header.bytes[1] === 0x45 &&
      this.header.bytes[2] === 0x53 &&
      this.header.bytes[3] === 0x1a
    ) {
      if (
        this.header.getNes20Identifier() === NES_IDENTIFIER &&
        this.bytes.length >
          this.computeNes20PrgRomSize() + this.computeNes20ChrRomSize()
      )
        return NES_FILE_FORMAT.NES20;

      return this.header.bytes[12] === 0 &&
        this.header.bytes[13] === 0 &&
        this.header.bytes[14] === 0 &&
        this.header.bytes[15] === 0
        ? NES_FILE_FORMAT.INES
        : NES_FILE_FORMAT.ARCHAIC_INES;
    }

    return NES_FILE_FORMAT.INVALID;
  }

  getMapperId(): number {
    return (
      this.header.getLowerNybbleMapperNumber() |
      (this.header.getUpperNybbleMapperNumber() << 4) |
      (this.getFormat() === NES_FILE_FORMAT.NES20
        ? this.header.getMsbMapperNumber() << 8
        : 0)
    );
  }

  getPrgRomSize(): number {
    return this.getFormat() === NES_FILE_FORMAT.NES20
      ? this.computeNes20PrgRomSize()
      : this.header.bytes[4] * ROM_BANK_SIZE.PRG_ROM;
  }

  getPrgRomOffset(): number {
    return (
      HEADER_SIZE + (this.header.getTrainerFlag() ? ROM_BANK_SIZE.TRAINER : 0)
    );
  }

  getPrgRomData(): Uint8Array {
    const prgRomOffset = this.getPrgRomOffset();
    return this.bytes.slice(prgRomOffset, prgRomOffset + this.getPrgRomSize());
  }

  getChrRomSize(): number {
    return this.getFormat() === NES_FILE_FORMAT.NES20
      ? this.computeNes20ChrRomSize()
      : this.header.bytes[5] * ROM_BANK_SIZE.CHR_ROM;
  }

  getChrRomOffset(): number {
    return this.getPrgRomOffset() + this.getPrgRomSize();
  }

  getChrRomData(): Uint8Array {
    const chrRomOffset = this.getChrRomOffset();
    return this.bytes.slice(chrRomOffset, chrRomOffset + this.getChrRomSize());
  }
}
