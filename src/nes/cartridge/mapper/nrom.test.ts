import Nrom from "./nrom";
import {
  mockCustomByteOffset,
  mockCustomByteValue,
  mockInesRomStream,
} from "../../__mocks__/mockRomStream";
import File from "../../file";

describe("Nrom", () => {
  describe("read", () => {
    it("shall read the relevants PRG ROM bytes", () => {
      /* given */
      const mapper = new Nrom(new File(mockInesRomStream));
      /* when */
      const result = mapper.read(mockCustomByteOffset);
      /* then */
      expect(result).toBe(mockCustomByteValue);
    });
  });
});
