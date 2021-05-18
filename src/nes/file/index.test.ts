import File, { NES_FILE_FORMAT } from "./index";

describe("File", () => {
  const mockDonkeyKongRomHeader = [
    78, 69, 83, 26, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  const mockInvalidRom = new Uint8Array(1);
  const mockInesRom = new Uint8Array(
    mockDonkeyKongRomHeader.concat(new Array(24576))
  );
  const mockArchaicInes = Uint8Array.from(mockInesRom).fill(12, 13, 15);
  const mockNes20Rom = Uint8Array.from(mockInesRom).fill(8, 7, 8);

  describe("Constructor", () => {
    it("shall create a file corresponding to the rom", () => {
      /** given */
      /** when */
      const file = new File(mockInesRom);
      /** then */
      expect(file.bytes).toStrictEqual(mockInesRom);
      expect(file.header.bytes).toStrictEqual(
        Uint8Array.from(mockDonkeyKongRomHeader)
      );
    });
  });

  describe("getFormat", () => {
    it("shall return the different rom formats", () => {
      /** given */
      /** when */
      const fileInvalid = new File(mockInvalidRom);
      const fileInes = new File(mockInesRom);
      const fileNes20 = new File(mockNes20Rom);
      const fileArchaicInes = new File(mockArchaicInes);
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
      const fileInes = new File(mockInesRom);
      const fileNes20 = new File(mockNes20Rom);
      fileNes20.header.bytes[4] = 0b1101;
      fileNes20.header.bytes[9] = 0b1111;
      /** then */
      expect(fileInes.getPrgRomSize()).toBe(16 * 1024);
      expect(fileNes20.getPrgRomSize()).toBe(3 * 2 ** 3);
    });
  });

  describe("getChrRomSize", () => {
    it("shall return the CHR-ROM size", () => {
      /** given */
      /** when */
      const fileInes = new File(mockInesRom);
      const fileNes20 = new File(mockNes20Rom);
      fileNes20.header.bytes[5] = 0b1101;
      fileNes20.header.bytes[9] = 0b1111 << 4;
      /** then */
      expect(fileInes.getChrRomSize()).toBe(8 * 1024);
      expect(fileNes20.getChrRomSize()).toBe(3 * 2 ** 3);
    });
  });
});
