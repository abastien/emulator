import { ROM_BANK_SIZE } from "../cartridge/rom-bank";

export const mockPrgRomByte = 1;
export const mockChrRomByte = 2;
export const mockTrainerRomByte = 3;
export const mockCustomByteOffset = 0xaa;
export const mockCustomByteValue = 0x8c;

export const mockPrgRomStream = new Uint8Array(ROM_BANK_SIZE.PRG_ROM)
  .fill(mockPrgRomByte)
  .fill(mockCustomByteValue, mockCustomByteOffset, mockCustomByteOffset + 1);

export const mockChrRomStream = new Uint8Array(ROM_BANK_SIZE.CHR_ROM).fill(
  mockChrRomByte
);

export const mockTrainerRomStream = new Uint8Array(ROM_BANK_SIZE.TRAINER).fill(
  mockTrainerRomByte
);

export const mockLargePrgRomStream = new Uint8Array(
  12 * ROM_BANK_SIZE.PRG_ROM
).fill(mockPrgRomByte);

export const mockLargeChrRomStream = new Uint8Array(
  12 * ROM_BANK_SIZE.CHR_ROM
).fill(mockChrRomByte);

export const mockInvalidRomStream = new Uint8Array(
  [0x4e, 0, 0x53, 0, 0x1, 0x1, 0, 0x8, 0, 0, 0, 0, 0, 0, 0, 0]
    .concat(Array.from(mockPrgRomStream))
    .concat(Array.from(mockChrRomStream))
);

export const mockArchaicInesRomStream = new Uint8Array(
  [0x4e, 0x45, 0x53, 0x1a, 0x1, 0x1, 0, 0, 0, 0, 0, 0, 0, 0x42, 0x41, 0x44]
    .concat(Array.from(mockPrgRomStream))
    .concat(Array.from(mockChrRomStream))
);

export const mockInesRomStream = new Uint8Array(
  [0x4e, 0x45, 0x53, 0x1a, 0x1, 0x1, 0xf0, 0x10, 0, 0, 0, 0, 0, 0, 0, 0]
    .concat(Array.from(mockPrgRomStream))
    .concat(Array.from(mockChrRomStream))
);

export const mockNes20RomStream = new Uint8Array(
  [0x4e, 0x45, 0x53, 0x1a, 0x1, 0x1, 0xf0, 0x18, 0x1, 0, 0, 0, 0, 0, 0, 0]
    .concat(Array.from(mockPrgRomStream))
    .concat(Array.from(mockChrRomStream))
);

export const mockLargeNes20RomStream = new Uint8Array(
  [0x4e, 0x45, 0x53, 0x1a, 0x41, 0x3d, 0x4, 0x18, 0, 0xff, 0, 0, 0, 0, 0, 0]
    .concat(Array.from(mockTrainerRomStream))
    .concat(Array.from(mockLargePrgRomStream))
    .concat(Array.from(mockLargeChrRomStream))
);
