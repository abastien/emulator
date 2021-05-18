export const HEADER_SIZE: number = 16;

// For convenience
type byte = number;
type flag = number;
type shift = number;

// Least Significant Bits
const LSB: number = 0b1;
const LS2B: number = 0b11;
const LS4B: number = 0b1111;
const LS6B: number = 0b111111;

export enum MIRRORING {
  HORIZONTAL,
  VERTICAL,
}

export enum TV_SYSTEM {
  NTSC,
  PAL,
}

export enum EXTENDED_TV_SYSTEM {
  NTSC,
  DUAL1,
  PAL,
  DUAL2,
}

export enum CONSOLE_TYPE {
  NINTENDO_ENTERTAINMENT_SYSTEM,
  NINTENDO_VS_SYSTEM,
  NINTENDO_PLAYCHOICE_10,
  EXTENDED_CONSOLE_TYPE,
}

export enum TIMING_MODE {
  NTSC_NES,
  PAL_NES,
  MULTIPLE_REGION,
  DENDY,
}

/**
 * NES file header
 * @see http://wiki.nesdev.com/w/index.php/INES
 * @see http://wiki.nesdev.com/w/index.php/NES_2.0
 */
export default class Header {
  readonly bytes: Uint8Array;

  constructor(data: Uint8Array = new Uint8Array(HEADER_SIZE)) {
    this.bytes = Uint8Array.from(
      Array.from(data).concat(new Array(HEADER_SIZE)).slice(0, HEADER_SIZE)
    );
  }

  protected getFlag(b: byte, s: shift): number {
    return (this.bytes[b] & (LSB << s)) >> s;
  }

  protected setFlag(b: byte, x: flag, s: shift): this {
    this.bytes[b] = (this.bytes[b] & (~0 ^ (LSB << s))) | ((x & LSB) << s);
    return this;
  }

  protected getDoubleFlag(b: byte, s: shift): number {
    return (this.bytes[b] & (LS2B << s)) >> s;
  }

  protected setDoubleFlag(b: byte, x: flag, s: shift): this {
    this.bytes[b] = (this.bytes[b] & (~0 ^ (LS2B << s))) | ((x & LS2B) << s);
    return this;
  }

  protected getQuadFlag(b: byte, s: shift): number {
    return (this.bytes[b] & (LS4B << s)) >> s;
  }

  protected setQuadFlag(b: byte, x: flag, s: shift): this {
    this.bytes[b] = (this.bytes[b] & (~0 ^ (LS4B << s))) | ((x & LS4B) << s);
    return this;
  }

  protected getSextFlag(b: byte, s: shift): number {
    return (this.bytes[b] & (LS6B << s)) >> s;
  }

  protected setSextFlag(b: byte, x: flag, s: shift): this {
    this.bytes[b] = (this.bytes[b] & (~0 ^ (LS6B << s))) | ((x & LS6B) << s);
    return this;
  }

  /**
   * Flags 4
   *
   * iNES: PRG-ROM size expressed in 16KB units
   * NES20: PRG-ROM size LSB
   *
   * 7654 3210
   * ---------
   * EEEE EEMM
   * |||| ||++- Multiplier, actual value is MM*2+1 (1,3,5,7)
   * ++++-++--- Exponent (2^E), 0-63
   *
   * With NES2.0, if the MSB nibble in byte 9 is $F,
   * an exponent-multiplier notation is used and the
   * PRG-ROM size is 2^E *(MM*2+1) bytes
   */

  getPrgRomSizeMultiplier(): number {
    return this.getDoubleFlag(4, 0);
  }

  setPrgRomSizeMultiplier(x: number): this {
    return this.setDoubleFlag(4, x, 0);
  }

  getPrgRomSizeExponent(): number {
    return this.getSextFlag(4, 2);
  }

  setPrgRomSizeExponent(x: number): this {
    return this.setSextFlag(4, x, 2);
  }

  /**
   * Flags 5
   *
   * iNES: CHR-ROM size expressed in 8KB units
   * NES20: CHR-ROM size LSB
   *
   * 7654 3210
   * ---------
   * EEEE EEMM
   * |||| ||++- Multiplier, actual value is MM*2+1 (1,3,5,7)
   * ++++-++--- Exponent (2^E), 0-63
   *
   * With NES2.0, if the MSB nibble in byte 9 is $F,
   * an exponent-multiplier notation is used and the
   * CHR-ROM size is 2^E *(MM*2+1) bytes
   */

  getChrRomSizeMultiplier(): number {
    return this.getDoubleFlag(5, 0);
  }

  setChrRomSizeMultiplier(x: number): this {
    return this.setDoubleFlag(5, x, 0);
  }

  getChrRomSizeExponent(): number {
    return this.getSextFlag(5, 2);
  }

  setChrRomSizeExponent(x: number): this {
    return this.setSextFlag(5, x, 2);
  }

  /**
   * Flags 6
   *
   * 7654 3210
   * ---------
   * NNNN FTBM
   * |||| |||+-- Hard-wired nametable mirroring type
   * |||| |||     0: Horizontal or mapper-controlled
   * |||| |||     1: Vertical
   * |||| ||+--- "Battery" and other non-volatile memory
   * |||| ||      0: Not present
   * |||| ||      1: Present
   * |||| |+---- 512-byte Trainer
   * |||| |       0: Not present
   * |||| |       1: Present between Header and PRG-ROM data
   * |||| +----- Hard-wired four-screen mode
   * ||||         0: No
   * ||||         1: Yes
   * ++++------- Mapper Number D0..D3

   */

  getMirroring(): MIRRORING {
    return this.getFlag(6, 0);
  }

  setMirroring(m: MIRRORING): this {
    return this.setFlag(6, m, 0);
  }

  getBatteryFlag(): number {
    return this.getFlag(6, 1);
  }

  setBatteryFlag(x: number): this {
    return this.setFlag(6, x, 1);
  }

  getTrainerFlag(): number {
    return this.getFlag(6, 2);
  }

  setTrainerFlag(x: number): this {
    return this.setFlag(6, x, 2);
  }

  getFourScreenVramFlag(): number {
    return this.getFlag(6, 3);
  }

  setFourScreenVramFlag(x: number): this {
    return this.setFlag(6, x, 3);
  }

  getLowerNybbleMapperNumber(): number {
    return this.getQuadFlag(6, 4);
  }

  setLowerNybbleMapperNumber(x: number): this {
    return this.setQuadFlag(6, x, 4);
  }

  /**
   * Flags 7
   *
   * 7654 3210
   * ---------
   * NNNN 10TT
   * |||| ||++- Console type
   * |||| ||     0: Nintendo Entertainment System/Family Computer
   * |||| ||     1: Nintendo Vs. System
   * |||| ||     2: Nintendo Playchoice 10
   * |||| ||     3: Extended Console Type
   * |||| ++--- NES 2.0 identifier
   * ++++------ Mapper Number D4..D7
   */

  getConsoleType(): CONSOLE_TYPE {
    return this.getDoubleFlag(7, 0);
  }

  setConsoleType(x: number): this {
    return this.setDoubleFlag(7, x, 0);
  }

  getNes20Identifier(): number {
    return this.getDoubleFlag(7, 2);
  }

  setNes20Identifier(x: number): this {
    return this.setDoubleFlag(7, x, 2);
  }

  getUpperNybbleMapperNumber(): number {
    return this.getQuadFlag(7, 4);
  }

  setUpperNybbleMapperNumber(x: number): this {
    return this.setQuadFlag(7, x, 4);
  }

  /**
   * Flags 8
   *
   * 7654 3210
   * ---------
   * SSSS NNNN
   * |||| ++++- Mapper number D8..D11
   * ++++------ Submapper number
   */
  getMsbMapperNumber(): number {
    return this.getQuadFlag(8, 0);
  }

  setMsbMapperNumber(x: number): this {
    return this.setQuadFlag(8, x, 0);
  }

  getSubmapperNumber(): number {
    return this.getQuadFlag(8, 4);
  }

  setSubmapperNumber(x: number): this {
    return this.setQuadFlag(8, x, 4);
  }

  /**
   * Flags 9
   *
   * 76543210  iNES file format
   * --------
   * ||||||||
   * |||||||+- TV system (0: NTSC; 1: PAL)
   * +++++++-- Reserved, set to zero
   *
   * 7654 3210
   * ---------  NES 2.0 file format
   * CCCC PPPP
   * |||| ++++- PRG-ROM size MSB
   * ++++------ CHR-ROM size MSB
   */

  getTvSystem(): TV_SYSTEM {
    return this.getFlag(9, 0);
  }

  setTvSystem(x: number): this {
    return this.setFlag(9, x, 0);
  }

  getPrgRomSizeMsb(): number {
    return this.getQuadFlag(9, 0);
  }

  setPrgRomSizeMsb(x: number): this {
    return this.setQuadFlag(9, x, 0);
  }

  getChrRomSizeMsb(): number {
    return this.getQuadFlag(9, 4);
  }

  setChrRomSizeMsb(x: number): this {
    return this.setQuadFlag(9, x, 4);
  }

  /**
   * Flags 10
   *
   * 7654 3210 NES 2.0 Specification
   * ---------
   * pppp PPPP
   * |||| ++++- PRG-RAM (volatile) shift count
   * ++++------ PRG-NVRAM/EEPROM (non-volatile) shift count
   *
   * 7654 3210 iNES Unofficial Extension
   * ---------
   * ..BP ..TT
   *   ||   ++- Extended TV system (0: NTSC; 2: PAL; 1/3: dual compatible)
   *   |+------ PRG RAM ($6000-$7FFF) (0: present; 1: not present)
   *   +------- 0: Board has no bus conflicts; 1: Board has bus conflicts
   */

  getPrgRamShift(): number {
    return this.getQuadFlag(10, 0);
  }

  setPrgRamShift(x: number): this {
    return this.setQuadFlag(10, x, 0);
  }

  getPrgNvramShift(): number {
    return this.getQuadFlag(10, 4);
  }

  setPrgNvramShift(x: number): this {
    return this.setQuadFlag(10, x, 4);
  }

  getExtendedTvSystem(): EXTENDED_TV_SYSTEM {
    return this.getDoubleFlag(10, 0);
  }

  setExtendedTvSystem(x: EXTENDED_TV_SYSTEM) {
    return this.setDoubleFlag(10, x, 0);
  }

  getPrgRamFlag(): number {
    return this.getFlag(10, 4);
  }

  setPrgRamFlag(x: number): this {
    return this.setFlag(10, x, 4);
  }

  getBoardBusConflictsFlag(): number {
    return this.getFlag(10, 5);
  }

  setBoardBusConflictsFlag(x: number): this {
    return this.setFlag(10, x, 5);
  }

  /**
   * Flags 11
   *
   * 7654 3210
   * ---------
   * cccc CCCC
   * |||| ++++- CHR-RAM size (volatile) shift count
   * ++++------ CHR-NVRAM size (non-volatile) shift count
   */

  getChrRamShift(): number {
    return this.getQuadFlag(11, 0);
  }

  setChrRamShift(x: number): this {
    return this.setQuadFlag(11, x, 0);
  }

  getChrNvramShift(): number {
    return this.getQuadFlag(11, 4);
  }

  setChrNvramShift(x: number): this {
    return this.setQuadFlag(11, x, 4);
  }

  /**
   * Flags 12
   *
   * 7654 3210
   * ---------
   * .... ..VV
   *        ++- CPU/PPU timing mode
   *             0: RP2C02 ("NTSC NES")
   *             1: RP2C07 ("Licensed PAL NES")
   *             2: Multiple-region
   *             3: UMC 6527P ("Dendy")
   */

  getCpuPpuTimingMode(): TIMING_MODE {
    return this.getDoubleFlag(12, 0);
  }

  setCpuPpuTimingMode(x: number): this {
    return this.setDoubleFlag(12, x, 0);
  }

  /**
   * Flags 13
   *
   * 7654 3210  When Byte 7 AND 3 = 1: Vs. System Type
   * ---------
   * MMMM PPPP
   * |||| ++++- Vs. PPU Type
   * ++++------ Vs. Hardware Type
   *
   * 7654 3210  When Byte 7 AND 3 = 3: Extended Console Type
   * ---------
   * .... CCCC
   *      ++++- Extended Console Type
   */

  getVsPpuType(): number {
    return this.getQuadFlag(13, 0);
  }

  setVsPpuType(x: number): this {
    return this.setQuadFlag(13, x, 0);
  }

  getVsHardwareType(): number {
    return this.getQuadFlag(13, 4);
  }

  setVsHardwareType(x: number): this {
    return this.setQuadFlag(13, x, 4);
  }

  getExtendedConsoleType(): number {
    return this.getQuadFlag(13, 0);
  }

  setExtendedConsoleType(x: number): this {
    return this.setQuadFlag(13, x, 0);
  }

  /**
   * Flags 14
   *
   * 7654 3210
   * ---------
   * .... ..RR
   *        ++- Number of miscellaneous ROMs present
   */

  getMiscellaneousRomsNumber(): TIMING_MODE {
    return this.getDoubleFlag(14, 0);
  }

  setMiscellaneousRomsNumber(x: number): this {
    return this.setDoubleFlag(14, x, 0);
  }

  /**
   * Flags 15
   *
   * 7654 3210
   * ---------
   * ..DD DDDD
   *   ++-++++- Default Expansion Device
   */

  getDefaultExpansionDevice(): number {
    return this.getSextFlag(15, 0);
  }

  setDefaultExpansionDevice(x: number): this {
    return this.setSextFlag(15, x, 0);
  }
}
