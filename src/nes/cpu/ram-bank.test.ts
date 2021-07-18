import RamBank from "./ram-bank";
import {
  mockCustomByteOffset,
  mockCustomByteValue,
} from "../__mocks__/mockRomStream";

describe("RamBank", () => {
  it("shall create, read and write a RAM Bank", () => {
    /* given */
    const ramBank = new RamBank(0x2000);
    /* when */
    ramBank.write(mockCustomByteOffset, mockCustomByteValue);
    /* then */
    expect(ramBank.read(mockCustomByteOffset)).toBe(mockCustomByteValue);
  });
});
