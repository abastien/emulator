import ChrRom from "./chr-rom";
import { ROM_BANK_SIZE } from "./rom-bank";
import { mockChrRomByte, mockChrRomStream } from "../__mocks__/mockRomStream";

describe("ChrRom", () => {
  it("shall create a CHR ROM", () => {
    /* given */
    /* when */
    const chrRom = new ChrRom(mockChrRomStream);
    /* then */
    expect(chrRom.read(0)).toBe(mockChrRomByte);
    expect(chrRom.read(ROM_BANK_SIZE.CHR_ROM - 1)).toBe(mockChrRomByte);
  });
});
