import File from "../file";
import Cartridge from "./index";
import {
  mockArchaicInesRomStream,
  mockCustomByteOffset,
  mockCustomByteValue,
} from "../__mocks__/mockRomStream";

describe("Cartridge", () => {
  describe("read", () => {
    it("shall read the relevants PRG ROM byte", () => {
      /* given */
      const cartridge = new Cartridge(new File(mockArchaicInesRomStream));
      /* when */
      const result = cartridge.read(mockCustomByteOffset);
      /* then */
      expect(result).toBe(mockCustomByteValue);
    });
  });
});
