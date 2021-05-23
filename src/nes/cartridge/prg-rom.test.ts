import PrgRom from "./prg-rom";
import {
  mockCustomByteOffset,
  mockCustomByteValue,
  mockPrgRomStream,
} from "../__mocks__/mockRomStream";

describe("PrgRom", () => {
  it("shall create a PRG ROM", () => {
    /* given */
    /* when */
    const prgRom = new PrgRom(mockPrgRomStream);
    /* then */
    expect(prgRom.read(mockCustomByteOffset)).toBe(mockCustomByteValue);
  });
});
