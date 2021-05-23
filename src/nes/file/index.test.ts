import File, { NES_FILE_FORMAT } from "./index";
import {
  mockArchaicInesRomStream,
  mockInesRomStream,
  mockInvalidRomStream,
  mockNes20RomStream,
  mockLargeNes20RomStream,
  mockLargePrgRomStream,
  mockTrainerRomStream,
  mockPrgRomStream,
  mockChrRomStream,
  mockLargeChrRomStream,
} from "../__mocks__/mockRomStream";
import { ROM_BANK_SIZE } from "../cartridge/rom-bank";
import { HEADER_SIZE } from "./header";

describe("File", () => {
  describe("Constructor", () => {
    it("shall create a file corresponding to the rom", () => {
      /** given */
      /** when */
      const file = new File(mockInesRomStream);
      /** then */
      expect(file.bytes).toStrictEqual(mockInesRomStream);
    });
  });

  describe("getFormat", () => {
    it("shall return the different rom formats", () => {
      /** given */
      /** when */
      const fileInvalid = new File(mockInvalidRomStream);
      const fileInes = new File(mockInesRomStream);
      const fileNes20 = new File(mockNes20RomStream);
      const fileArchaicInes = new File(mockArchaicInesRomStream);
      /** then */
      expect(fileInvalid.getFormat()).toBe(NES_FILE_FORMAT.INVALID);
      expect(fileInes.getFormat()).toBe(NES_FILE_FORMAT.INES);
      expect(fileNes20.getFormat()).toBe(NES_FILE_FORMAT.NES20);
      expect(fileArchaicInes.getFormat()).toBe(NES_FILE_FORMAT.ARCHAIC_INES);
    });
  });

  describe("getPrgRomSize", () => {
    it("shall return the PRG-ROM size", () => {
      /** given */
      /** when */
      const fileInes = new File(mockInesRomStream);
      const fileNes20 = new File(mockNes20RomStream);
      const fileLargeNes20 = new File(mockLargeNes20RomStream);
      /** then */
      expect(fileInes.getPrgRomSize()).toBe(ROM_BANK_SIZE.PRG_ROM);
      expect(fileNes20.getPrgRomSize()).toBe(ROM_BANK_SIZE.PRG_ROM);
      expect(fileLargeNes20.getPrgRomSize()).toBe(
        (((2 * mockLargeNes20RomStream[4]) & 0b11) + 1) *
          2 ** (mockLargeNes20RomStream[4] >> 2)
      );
    });
  });

  describe("getChrRomSize", () => {
    it("shall return the CHR-ROM size", () => {
      /** given */
      /** when */
      const fileInes = new File(mockInesRomStream);
      const fileNes20 = new File(mockNes20RomStream);
      const fileLargeNes20 = new File(mockLargeNes20RomStream);
      /** then */
      expect(fileInes.getChrRomSize()).toBe(ROM_BANK_SIZE.CHR_ROM);
      expect(fileNes20.getChrRomSize()).toBe(ROM_BANK_SIZE.CHR_ROM);
      expect(fileLargeNes20.getChrRomSize()).toBe(
        (((2 * mockLargeNes20RomStream[5]) & 0b11) + 1) *
          2 ** (mockLargeNes20RomStream[5] >> 2)
      );
    });
  });

  describe("getMapperId", () => {
    it("shall return the correct mapper id", () => {
      /** given */
      /** when */
      const fileInes = new File(mockInesRomStream);
      const fileNes20 = new File(mockNes20RomStream);
      /** then */
      expect(fileInes.getMapperId()).toBe(0x1f);
      expect(fileNes20.getMapperId()).toBe(0x11f);
    });
  });

  describe("getPrgRomOffset", () => {
    it("shall return the correct PRG ROM offset", () => {
      /** given */
      /** when */
      const fileInes = new File(mockInesRomStream);
      const fileNes20 = new File(mockLargeNes20RomStream);
      /** then */
      expect(fileInes.getPrgRomOffset()).toBe(HEADER_SIZE);
      expect(fileNes20.getPrgRomOffset()).toBe(
        HEADER_SIZE + ROM_BANK_SIZE.TRAINER
      );
    });
  });

  describe("getChrRomOffset", () => {
    it("shall return the correct CHR ROM offset", () => {
      /** given */
      /** when */
      const fileInes = new File(mockInesRomStream);
      const fileNes20 = new File(mockLargeNes20RomStream);
      /** then */
      expect(fileInes.getChrRomOffset()).toBe(
        HEADER_SIZE + mockPrgRomStream.length
      );
      expect(fileNes20.getChrRomOffset()).toBe(
        HEADER_SIZE + mockTrainerRomStream.length + mockLargePrgRomStream.length
      );
    });
  });

  describe("getPrgRomData", () => {
    it("shall return the correct PRG ROM data", () => {
      /** given */
      /** when */
      const fileInes = new File(mockInesRomStream);
      const fileNes20 = new File(mockLargeNes20RomStream);
      /** then */
      expect(fileInes.getPrgRomData()).toStrictEqual(mockPrgRomStream);
      expect(fileNes20.getPrgRomData()).toStrictEqual(mockLargePrgRomStream);
    });
  });

  describe("getChrRomData", () => {
    it("shall return the correct CHR ROM data", () => {
      /** given */
      /** when */
      const fileInes = new File(mockInesRomStream);
      const fileNes20 = new File(mockLargeNes20RomStream);
      /** then */
      expect(fileInes.getChrRomData()).toStrictEqual(mockChrRomStream);
      expect(fileNes20.getChrRomData()).toStrictEqual(mockLargeChrRomStream);
    });
  });
});
