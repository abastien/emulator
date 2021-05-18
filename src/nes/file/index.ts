import Header from "./header";

const NES_IDENTIFIER = 0b10;

export enum NES_FILE_FORMAT {
  INVALID,
  ARCHAIC_INES,
  INES,
  NES20,
}

export default class File {
  public bytes: Uint8Array;
  public readonly header: Header;

  constructor(rom: Uint8Array) {
    this.bytes = new Uint8Array(rom);
    this.header = new Header(rom);
  }

  protected computeNes20PrgRomSize(): number {
    const MSB = this.header.getPrgRomSizeMsb();
    return MSB < 0xf
      ? (this.header.bytes[4] | (MSB << 8)) * 16 * 1024
      : 2 ** this.header.getPrgRomSizeExponent() *
          (this.header.getPrgRomSizeMultiplier() * 2 + 1);
  }

  protected computeNes20ChrRomSize() {
    const MSB = this.header.getChrRomSizeMsb();
    return MSB < 0xf
      ? (this.header.bytes[5] | (MSB << 8)) * 8 * 1024
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

  getPrgRomSize() {
    return this.getFormat() === NES_FILE_FORMAT.NES20
      ? this.computeNes20PrgRomSize()
      : this.header.bytes[4] * 16 * 1024;
  }

  getChrRomSize() {
    return this.getFormat() === NES_FILE_FORMAT.NES20
      ? this.computeNes20ChrRomSize()
      : this.header.bytes[5] * 8 * 1024;
  }
}
