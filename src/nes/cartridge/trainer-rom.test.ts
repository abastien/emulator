import TrainerRom from "./trainer-rom";
import { ROM_BANK_SIZE } from "./rom-bank";

describe("TrainerRom", () => {
  const byte = 1;

  it("shall create a Trainer ROM filled with 1s", () => {
    /* given */
    const data = new Uint8Array(ROM_BANK_SIZE.TRAINER).fill(
      byte,
      0,
      ROM_BANK_SIZE.TRAINER
    );
    /* when */
    const trainerRom = new TrainerRom(data);
    /* then */
    expect(trainerRom.read(0)).toBe(byte);
    expect(trainerRom.read(ROM_BANK_SIZE.TRAINER - 1)).toBe(byte);
  });
});
