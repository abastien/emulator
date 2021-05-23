import Mapper from "./index";
import {
  mockInesRomStream,
  mockPrgRomStream,
} from "../../__mocks__/mockRomStream";
import File from "../../file";
import Nrom from "./nrom";

describe("Mapper", () => {
  describe("fromFile", () => {
    it("shall return the relevant cartridge mapper", () => {
      /* given */
      const file = new File(mockPrgRomStream);
      /* when */
      const mapper = Mapper.fromFile(file);
      /* then */
      expect(mapper).toBeInstanceOf(Nrom);
    });

    it("shall throw an error when mapper does not exists", () => {
      /* given */
      let errorDetected = false;
      const file = new File(mockInesRomStream);
      /* when */
      try {
        Mapper.fromFile(file);
      } catch (e) {
        errorDetected = true;
        expect(e.message).toBe("Unknown Mapper");
      }
      /* then */
      expect(errorDetected).toBe(true);
    });
  });
});
