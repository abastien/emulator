import Header, {
  CONSOLE_TYPE,
  EXTENDED_TV_SYSTEM,
  HEADER_SIZE,
  MIRRORING,
  TIMING_MODE,
  TV_SYSTEM,
} from "./header";

describe("Header", () => {
  const getNewHeader = (data?: Uint8Array): Header => new Header(data);
  const buildHeader = (byte: number, value: number) =>
    getNewHeader(new Uint8Array(byte + 1).fill(value, byte));

  // Least 4 Significant Bits Numbers
  const l4SbNumber1 = 0b1001;
  const l4SbNumber2 = 0b0110;
  const l4SbNumber3 = 0b1111;
  const l4SbNumber4 = 0b0000;

  // Least 2 Significant Bits Numbers
  const l2SbNumber1 = 0b01;
  const l2SbNumber2 = 0b10;
  const l2SbNumber3 = 0b11;

  describe("Constructor", () => {
    it("shall create a 16 bytes header with no argument", () => {
      /** given */
      /** when */
      const header = getNewHeader();
      /** then */
      expect(header.bytes.length).toBe(HEADER_SIZE);
    });

    it("shall create a 16 bytes header with an argument < 16 bytes", () => {
      /** given */
      /** when */
      const header = getNewHeader(new Uint8Array(10));
      /** then */
      expect(header.bytes.length).toBe(HEADER_SIZE);
    });

    it("shall create a 16 bytes header with an argument > 16 bytes", () => {
      /** given */
      /** when */
      const header = getNewHeader(new Uint8Array(20));
      /** then */
      expect(header.bytes.length).toBe(HEADER_SIZE);
    });
  });

  describe("Byte 4", () => {
    const byte = 4;

    describe("PRG-ROM Size Multiplier", () => {
      it("getPrgRomSizeMultiplier shall return relevant PRG-ROM Size Multiplier", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, l2SbNumber1);
        const header2 = buildHeader(byte, l2SbNumber2);
        /** then */
        expect(header1.getPrgRomSizeMultiplier()).toBe(l2SbNumber1);
        expect(header2.getPrgRomSizeMultiplier()).toBe(l2SbNumber2);
      });

      it("setPrgRomSizeMultiplier shall set the PRG-ROM Size Multiplier", () => {
        /** given */
        const header1 = buildHeader(byte, 0);
        const header2 = buildHeader(byte, l2SbNumber1);
        const header3 = buildHeader(byte, l2SbNumber2);
        const header4 = buildHeader(byte, l2SbNumber3);
        /** when */
        header1.setPrgRomSizeMultiplier(l2SbNumber3);
        header2.setPrgRomSizeMultiplier(l2SbNumber2);
        header3.setPrgRomSizeMultiplier(l2SbNumber1);
        header4.setPrgRomSizeMultiplier(0);
        /** then */
        expect(header1.bytes[byte]).toBe(l2SbNumber3);
        expect(header2.bytes[byte]).toBe(l2SbNumber2);
        expect(header3.bytes[byte]).toBe(l2SbNumber1);
        expect(header4.bytes[byte]).toBe(0);
      });
    });

    describe("PRG-ROM Size Exponent", () => {
      it("getPrgRomSizeExponent shall return relevant PRG-ROM Size Exponent", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, l4SbNumber1 << 2);
        const header2 = getNewHeader();
        /** then */
        expect(header1.getPrgRomSizeExponent()).toBe(l4SbNumber1);
        expect(header2.getPrgRomSizeExponent()).toBe(0);
      });

      it("setPrgRomSizeExponent shall set the PRG-ROM Size Exponent", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1 << 2);
        const header2 = buildHeader(byte, l4SbNumber2 << 2);
        const header3 = getNewHeader();
        /** when */
        header1.setPrgRomSizeExponent(0);
        header2.setPrgRomSizeExponent(l2SbNumber3);
        header3.setPrgRomSizeExponent(l2SbNumber1);
        /** then */
        expect(header1.bytes[byte]).toBe(0);
        expect(header2.bytes[byte]).toBe(l2SbNumber3 << 2);
        expect(header3.bytes[byte]).toBe(l2SbNumber1 << 2);
      });
    });
  });

  describe("Byte 5", () => {
    const byte = 5;

    describe("CHR-ROM Size Multiplier", () => {
      it("getChrRomSizeMultiplier shall return relevant CHR-ROM Size Multiplier", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, l2SbNumber1);
        const header2 = buildHeader(byte, l2SbNumber2);
        /** then */
        expect(header1.getChrRomSizeMultiplier()).toBe(l2SbNumber1);
        expect(header2.getChrRomSizeMultiplier()).toBe(l2SbNumber2);
      });

      it("setChrRomSizeMultiplier shall set the CHR-ROM Size Multiplier", () => {
        /** given */
        const header1 = buildHeader(byte, 0);
        const header2 = buildHeader(byte, l2SbNumber1);
        const header3 = buildHeader(byte, l2SbNumber2);
        const header4 = buildHeader(byte, l2SbNumber3);
        /** when */
        header1.setChrRomSizeMultiplier(l2SbNumber3);
        header2.setChrRomSizeMultiplier(l2SbNumber2);
        header3.setChrRomSizeMultiplier(l2SbNumber1);
        header4.setChrRomSizeMultiplier(0);
        /** then */
        expect(header1.bytes[byte]).toBe(l2SbNumber3);
        expect(header2.bytes[byte]).toBe(l2SbNumber2);
        expect(header3.bytes[byte]).toBe(l2SbNumber1);
        expect(header4.bytes[byte]).toBe(0);
      });
    });

    describe("CHR-ROM Size Exponent", () => {
      it("getChrRomSizeExponent shall return relevant CHR-ROM Size Exponent", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, l4SbNumber1 << 2);
        const header2 = getNewHeader();
        /** then */
        expect(header1.getChrRomSizeExponent()).toBe(l4SbNumber1);
        expect(header2.getChrRomSizeExponent()).toBe(0);
      });

      it("setChrRomSizeExponent shall set the CHR-ROM Size Exponent", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1 << 2);
        const header2 = buildHeader(byte, l4SbNumber2 << 2);
        const header3 = buildHeader(byte, l2SbNumber3 << 2);
        /** when */
        header1.setChrRomSizeExponent(0);
        header2.setChrRomSizeExponent(l2SbNumber3);
        header3.setChrRomSizeExponent(l2SbNumber2);
        /** then */
        expect(header1.bytes[byte]).toBe(0);
        expect(header2.bytes[byte]).toBe(l2SbNumber3 << 2);
        expect(header3.bytes[byte]).toBe(l2SbNumber2 << 2);
      });
    });
  });

  describe("Byte 6", () => {
    const byte = 6;

    describe("Mirroring Mode", () => {
      const { HORIZONTAL, VERTICAL } = MIRRORING;

      it("getMirroring shall return relevant mirroring mode", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, HORIZONTAL);
        const header2 = buildHeader(byte, VERTICAL);
        /** then */
        expect(header.getMirroring()).toBe(HORIZONTAL);
        expect(header2.getMirroring()).toBe(VERTICAL);
      });

      it("setMirroring shall set the mirroring mode", () => {
        /** given */
        const header1 = buildHeader(byte, HORIZONTAL);
        const header2 = buildHeader(byte, VERTICAL);
        const header3 = buildHeader(byte, HORIZONTAL);
        const header4 = buildHeader(byte, VERTICAL);
        /** when */
        header1.setMirroring(HORIZONTAL);
        header2.setMirroring(HORIZONTAL);
        header3.setMirroring(VERTICAL);
        header4.setMirroring(VERTICAL);
        /** then */
        expect(header1.bytes[byte]).toBe(HORIZONTAL);
        expect(header2.bytes[byte]).toBe(HORIZONTAL);
        expect(header3.bytes[byte]).toBe(VERTICAL);
        expect(header4.bytes[byte]).toBe(VERTICAL);
      });
    });

    describe("Battery Flag", () => {
      const batteryOn = 0b10;

      it("getBatteryFlag shall return relevant battery flag", () => {
        /** given */
        /** when */
        const header1 = getNewHeader();
        const header2 = buildHeader(byte, batteryOn);
        /** then */
        expect(header1.getBatteryFlag()).toBe(0);
        expect(header2.getBatteryFlag()).toBe(1);
      });

      it("setBatteryFlag shall set the battery flag", () => {
        /** given */
        const header1 = buildHeader(byte, batteryOn);
        const header2 = getNewHeader();
        const header3 = buildHeader(byte, batteryOn);
        const header4 = getNewHeader();
        /** when */
        header1.setBatteryFlag(1);
        header2.setBatteryFlag(1);
        header3.setBatteryFlag(0);
        header4.setBatteryFlag(0);
        /** then */
        expect(header1.bytes[byte]).toBe(batteryOn);
        expect(header2.bytes[byte]).toBe(batteryOn);
        expect(header3.bytes[byte]).toBe(0);
        expect(header4.bytes[byte]).toBe(0);
      });
    });

    describe("Trainer Flag", () => {
      const trainerOn = 0b100;

      it("getTrainerFlag shall return relevant trainer flag", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, trainerOn);
        const header2 = getNewHeader();
        /** then */
        expect(header1.getTrainerFlag()).toBe(1);
        expect(header2.getTrainerFlag()).toBe(0);
      });

      it("setTrainerFlag shall set the trainer flag", () => {
        /** given */
        const header1 = buildHeader(byte, trainerOn);
        const header2 = getNewHeader();
        const header3 = buildHeader(byte, trainerOn);
        const header4 = getNewHeader();
        /** when */
        header1.setTrainerFlag(1);
        header2.setTrainerFlag(1);
        header3.setTrainerFlag(0);
        header4.setTrainerFlag(0);
        /** then */
        expect(header1.bytes[byte]).toBe(trainerOn);
        expect(header2.bytes[byte]).toBe(trainerOn);
        expect(header3.bytes[byte]).toBe(0);
        expect(header4.bytes[byte]).toBe(0);
      });
    });

    describe("Four Screen VRAM Flag", () => {
      const fourScreenVramOn = 0b1000;

      it("getFourScreenVramFlag shall return relevant four-screen VRAM flag", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, fourScreenVramOn);
        const header2 = getNewHeader();
        /** then */
        expect(header1.getFourScreenVramFlag()).toBe(1);
        expect(header2.getFourScreenVramFlag()).toBe(0);
      });

      it("setFourScreenVramFlag shall set the four-screen VRAM flag", () => {
        /** given */
        const header1 = buildHeader(byte, fourScreenVramOn);
        const header2 = getNewHeader();
        const header3 = buildHeader(byte, fourScreenVramOn);
        const header4 = getNewHeader();
        /** when */
        header1.setFourScreenVramFlag(1);
        header2.setFourScreenVramFlag(1);
        header3.setFourScreenVramFlag(0);
        header4.setFourScreenVramFlag(0);
        /** then */
        expect(header1.bytes[byte]).toBe(fourScreenVramOn);
        expect(header2.bytes[byte]).toBe(fourScreenVramOn);
        expect(header3.bytes[byte]).toBe(0);
        expect(header4.bytes[byte]).toBe(0);
      });
    });

    describe("Lower Nybble Mapper Number", () => {
      it("getLowerNybbleMapperNumber shall return relevant lower nybble mapper number", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1 << 4);
        /** then */
        expect(header.getLowerNybbleMapperNumber()).toBe(l4SbNumber1);
      });

      it("setLowerNybbleMapperNumber shall set the lower nybble mapper number", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1 << 4);
        const header2 = buildHeader(byte, l4SbNumber4 << 4);
        /** when */
        header1.setLowerNybbleMapperNumber(l4SbNumber2);
        header2.setLowerNybbleMapperNumber(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2 << 4);
        expect(header2.bytes[byte]).toBe(l4SbNumber3 << 4);
      });
    });
  });

  describe("Byte 7", () => {
    const byte = 7;

    describe("Console Type", () => {
      const {
        NINTENDO_ENTERTAINMENT_SYSTEM,
        NINTENDO_VS_SYSTEM,
        NINTENDO_PLAYCHOICE_10,
        EXTENDED_CONSOLE_TYPE,
      } = CONSOLE_TYPE;

      it("getConsoleType shall return relevant Console Type", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, NINTENDO_ENTERTAINMENT_SYSTEM);
        const header2 = buildHeader(byte, NINTENDO_VS_SYSTEM);
        const header3 = buildHeader(byte, NINTENDO_PLAYCHOICE_10);
        const header4 = buildHeader(byte, EXTENDED_CONSOLE_TYPE);
        /** then */
        expect(header1.getConsoleType()).toBe(NINTENDO_ENTERTAINMENT_SYSTEM);
        expect(header2.getConsoleType()).toBe(NINTENDO_VS_SYSTEM);
        expect(header3.getConsoleType()).toBe(NINTENDO_PLAYCHOICE_10);
        expect(header4.getConsoleType()).toBe(EXTENDED_CONSOLE_TYPE);
      });

      it("setConsoleType shall set the Console Type", () => {
        /** given */
        const header1 = buildHeader(byte, NINTENDO_ENTERTAINMENT_SYSTEM);
        const header2 = buildHeader(byte, NINTENDO_VS_SYSTEM);
        const header3 = buildHeader(byte, NINTENDO_PLAYCHOICE_10);
        const header4 = buildHeader(byte, EXTENDED_CONSOLE_TYPE);
        /** when */
        header1.setConsoleType(EXTENDED_CONSOLE_TYPE);
        header2.setConsoleType(NINTENDO_PLAYCHOICE_10);
        header3.setConsoleType(NINTENDO_VS_SYSTEM);
        header4.setConsoleType(NINTENDO_ENTERTAINMENT_SYSTEM);
        /** then */
        expect(header1.bytes[byte]).toBe(EXTENDED_CONSOLE_TYPE);
        expect(header2.bytes[byte]).toBe(NINTENDO_PLAYCHOICE_10);
        expect(header3.bytes[byte]).toBe(NINTENDO_VS_SYSTEM);
        expect(header4.bytes[byte]).toBe(NINTENDO_ENTERTAINMENT_SYSTEM);
      });
    });

    describe("NES2.0 Identifier", () => {
      it("getNes20Identifier shall return relevant NES2.0 Identifier", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, l2SbNumber2 << 2);
        const header2 = buildHeader(byte, l2SbNumber3 << 2);
        /** then */
        expect(header1.getNes20Identifier()).toBe(l2SbNumber2);
        expect(header2.getNes20Identifier()).toBe(l2SbNumber3);
      });

      it("setNes20Identifier shall set the NES2.0 Identifier", () => {
        /** given */
        const header1 = getNewHeader();
        const header2 = buildHeader(byte, l2SbNumber1 << 2);
        const header3 = buildHeader(byte, l2SbNumber2 << 2);
        const header4 = buildHeader(byte, l2SbNumber3 << 2);
        /** when */
        header1.setNes20Identifier(l2SbNumber3);
        header2.setNes20Identifier(l2SbNumber2);
        header3.setNes20Identifier(l2SbNumber1);
        header4.setNes20Identifier(0);
        /** then */
        expect(header1.bytes[byte]).toBe(l2SbNumber3 << 2);
        expect(header2.bytes[byte]).toBe(l2SbNumber2 << 2);
        expect(header3.bytes[byte]).toBe(l2SbNumber1 << 2);
        expect(header4.bytes[byte]).toBe(0);
      });
    });

    describe("Upper Nybble Mapper Number", () => {
      it("getUpperNybbleMapperNumber shall return relevant upper nybble mapper number", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1 << 4);
        /** then */
        expect(header.getUpperNybbleMapperNumber()).toBe(l4SbNumber1);
      });

      it("setUpperNybbleMapperNumber shall set the upper nybble mapper number", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1 << 4);
        const header2 = buildHeader(byte, l4SbNumber4 << 4);
        /** when */
        header1.setUpperNybbleMapperNumber(l4SbNumber2);
        header2.setUpperNybbleMapperNumber(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2 << 4);
        expect(header2.bytes[byte]).toBe(l4SbNumber3 << 4);
      });
    });
  });

  describe("Byte 8", () => {
    const byte = 8;

    describe("MSB Mapper Number", () => {
      it("getMsbMapperNumber shall return relevant MSB mapper number", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1);
        /** then */
        expect(header.getMsbMapperNumber()).toBe(l4SbNumber1);
      });

      it("setMsbMapperNumber shall set the MSB mapper number", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1);
        const header2 = buildHeader(byte, l4SbNumber4);
        /** when */
        header1.setMsbMapperNumber(l4SbNumber2);
        header2.setMsbMapperNumber(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2);
        expect(header2.bytes[byte]).toBe(l4SbNumber3);
      });
    });

    describe("Submapper Number", () => {
      it("getSubmapperNumber shall return relevant Submapper Number", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1 << 4);
        /** then */
        expect(header.getSubmapperNumber()).toBe(l4SbNumber1);
      });

      it("setSubmapperNumber shall set the Submapper Number", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1 << 4);
        const header2 = buildHeader(byte, l4SbNumber4 << 4);
        /** when */
        header1.setSubmapperNumber(l4SbNumber2);
        header2.setSubmapperNumber(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2 << 4);
        expect(header2.bytes[byte]).toBe(l4SbNumber3 << 4);
      });
    });
  });

  describe("Byte 9", () => {
    const byte = 9;
    const { NTSC, PAL } = TV_SYSTEM;

    describe("TV System", () => {
      it("getTvSystem shall return relevant TV System", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, NTSC);
        const header2 = buildHeader(byte, PAL);
        /** then */
        expect(header.getTvSystem()).toBe(NTSC);
        expect(header2.getTvSystem()).toBe(PAL);
      });

      it("setTvSystem shall set the TV System", () => {
        /** given */
        const header1 = buildHeader(byte, NTSC);
        const header2 = buildHeader(byte, PAL);
        const header3 = buildHeader(byte, NTSC);
        const header4 = buildHeader(byte, PAL);
        /** when */
        header1.setTvSystem(NTSC);
        header2.setTvSystem(PAL);
        header3.setTvSystem(NTSC);
        header4.setTvSystem(PAL);
        /** then */
        expect(header1.bytes[byte]).toBe(NTSC);
        expect(header2.bytes[byte]).toBe(PAL);
        expect(header3.bytes[byte]).toBe(NTSC);
        expect(header4.bytes[byte]).toBe(PAL);
      });
    });

    describe("PRG ROM size MSB", () => {
      it("getPrgRomSizeMsb shall return relevant PRG ROM size MSB", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1);
        /** then */
        expect(header.getPrgRomSizeMsb()).toBe(l4SbNumber1);
      });

      it("setPrgRomSizeMsb shall set the PRG ROM size MSB", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1);
        const header2 = buildHeader(byte, l4SbNumber4);
        /** when */
        header1.setPrgRomSizeMsb(l4SbNumber2);
        header2.setPrgRomSizeMsb(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2);
        expect(header2.bytes[byte]).toBe(l4SbNumber3);
      });
    });

    describe("CHR ROM size MSB", () => {
      it("getChrRomSizeMsb shall return relevant CHR ROM size MSB", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1 << 4);
        /** then */
        expect(header.getChrRomSizeMsb()).toBe(l4SbNumber1);
      });

      it("setChrRomSizeMsb shall set the CHR ROM size MSB", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1 << 4);
        const header2 = buildHeader(byte, l4SbNumber4 << 4);
        /** when */
        header1.setChrRomSizeMsb(l4SbNumber2);
        header2.setChrRomSizeMsb(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2 << 4);
        expect(header2.bytes[byte]).toBe(l4SbNumber3 << 4);
      });
    });
  });

  describe("Byte 10", () => {
    const byte = 10;

    describe("PRG RAM shift", () => {
      it("getPrgRamShift shall return relevant PRG RAM shift", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1);
        /** then */
        expect(header.getPrgRamShift()).toBe(l4SbNumber1);
      });

      it("setPrgRamShift shall set the PRG RAM shift", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1);
        const header2 = buildHeader(byte, l4SbNumber4);
        /** when */
        header1.setPrgRamShift(l4SbNumber2);
        header2.setPrgRamShift(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2);
        expect(header2.bytes[byte]).toBe(l4SbNumber3);
      });
    });

    describe("PRG NVRAM shift", () => {
      it("getPrgNvramShift shall return relevant PRG NVRAM shift", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1 << 4);
        /** then */
        expect(header.getPrgNvramShift()).toBe(l4SbNumber1);
      });

      it("setPrgNvramShift shall set the PRG NVRAM shift", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1 << 4);
        const header2 = buildHeader(byte, l4SbNumber4 << 4);
        /** when */
        header1.setPrgNvramShift(l4SbNumber2);
        header2.setPrgNvramShift(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2 << 4);
        expect(header2.bytes[byte]).toBe(l4SbNumber3 << 4);
      });
    });

    describe("Extended TV System", () => {
      const { NTSC, DUAL1, PAL, DUAL2 } = EXTENDED_TV_SYSTEM;

      it("getExtendedTvSystem shall return relevant Extended TV System", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, NTSC);
        const header2 = buildHeader(byte, DUAL1);
        const header3 = buildHeader(byte, PAL);
        const header4 = buildHeader(byte, DUAL2);
        /** then */
        expect(header1.getExtendedTvSystem()).toBe(NTSC);
        expect(header2.getExtendedTvSystem()).toBe(DUAL1);
        expect(header3.getExtendedTvSystem()).toBe(PAL);
        expect(header4.getExtendedTvSystem()).toBe(DUAL2);
      });

      it("setExtendedTvSystem shall set the Extended TV System", () => {
        /** given */
        const header1 = buildHeader(byte, NTSC);
        const header2 = buildHeader(byte, DUAL1);
        const header3 = buildHeader(byte, PAL);
        const header4 = buildHeader(byte, DUAL2);
        /** when */
        header1.setExtendedTvSystem(DUAL2);
        header2.setExtendedTvSystem(PAL);
        header3.setExtendedTvSystem(DUAL1);
        header4.setExtendedTvSystem(NTSC);
        /** then */
        expect(header1.bytes[byte]).toBe(DUAL2);
        expect(header2.bytes[byte]).toBe(PAL);
        expect(header3.bytes[byte]).toBe(DUAL1);
        expect(header4.bytes[byte]).toBe(NTSC);
      });
    });

    describe("PRG RAM Flag", () => {
      const prgRamOn = 0b10000;

      it("getPrgRamFlag shall return relevant PRG RAM Flag", () => {
        /** given */
        /** when */
        const header1 = getNewHeader();
        const header2 = buildHeader(byte, prgRamOn);
        /** then */
        expect(header1.getPrgRamFlag()).toBe(0);
        expect(header2.getPrgRamFlag()).toBe(1);
      });

      it("setPrgRamFlag shall set the PRG RAM Flag", () => {
        /** given */
        const header1 = buildHeader(byte, prgRamOn);
        const header2 = getNewHeader();
        const header3 = buildHeader(byte, prgRamOn);
        const header4 = getNewHeader();
        /** when */
        header1.setPrgRamFlag(1);
        header2.setPrgRamFlag(1);
        header3.setPrgRamFlag(0);
        header4.setPrgRamFlag(0);
        /** then */
        expect(header1.bytes[byte]).toBe(prgRamOn);
        expect(header2.bytes[byte]).toBe(prgRamOn);
        expect(header3.bytes[byte]).toBe(0);
        expect(header4.bytes[byte]).toBe(0);
      });
    });

    describe("Board Bus Conflicts Flag", () => {
      const boardBusConflictsOn = 0b100000;

      it("getBoardBusConflictsFlag shall return relevant Board Bus Conflicts Flag", () => {
        /** given */
        /** when */
        const header1 = getNewHeader();
        const header2 = buildHeader(byte, boardBusConflictsOn);
        /** then */
        expect(header1.getBoardBusConflictsFlag()).toBe(0);
        expect(header2.getBoardBusConflictsFlag()).toBe(1);
      });

      it("setBoardBusConflictsFlag shall set the Board Bus Conflicts Flag", () => {
        /** given */
        const header1 = buildHeader(byte, boardBusConflictsOn);
        const header2 = getNewHeader();
        const header3 = buildHeader(byte, boardBusConflictsOn);
        const header4 = getNewHeader();
        /** when */
        header1.setBoardBusConflictsFlag(1);
        header2.setBoardBusConflictsFlag(1);
        header3.setBoardBusConflictsFlag(0);
        header4.setBoardBusConflictsFlag(0);
        /** then */
        expect(header1.bytes[byte]).toBe(boardBusConflictsOn);
        expect(header2.bytes[byte]).toBe(boardBusConflictsOn);
        expect(header3.bytes[byte]).toBe(0);
        expect(header4.bytes[byte]).toBe(0);
      });
    });
  });

  describe("Byte 11", () => {
    const byte = 11;

    describe("CHR RAM shift", () => {
      it("getChrRamShift shall return relevant CHR RAM shift", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1);
        /** then */
        expect(header.getChrRamShift()).toBe(l4SbNumber1);
      });

      it("setChrRamShift shall set the CHR RAM shift", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1);
        const header2 = buildHeader(byte, l4SbNumber4);
        /** when */
        header1.setChrRamShift(l4SbNumber2);
        header2.setChrRamShift(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2);
        expect(header2.bytes[byte]).toBe(l4SbNumber3);
      });
    });

    describe("CHR NVRAM shift", () => {
      it("getChrNvramShift shall return relevant CHR NVRAM shift", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1 << 4);
        /** then */
        expect(header.getChrNvramShift()).toBe(l4SbNumber1);
      });

      it("setChrNvramShift shall set the CHR NVRAM shift", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1 << 4);
        const header2 = buildHeader(byte, l4SbNumber4 << 4);
        /** when */
        header1.setChrNvramShift(l4SbNumber2);
        header2.setChrNvramShift(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2 << 4);
        expect(header2.bytes[byte]).toBe(l4SbNumber3 << 4);
      });
    });
  });

  describe("Byte 12", () => {
    const byte = 12;

    describe("CPU / PPU Timing Mode", () => {
      const { NTSC_NES, PAL_NES, MULTIPLE_REGION, DENDY } = TIMING_MODE;

      it("getCpuPpuTimingMode shall return relevant CPU / PPU Timing Mode", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, NTSC_NES);
        const header2 = buildHeader(byte, PAL_NES);
        const header3 = buildHeader(byte, MULTIPLE_REGION);
        const header4 = buildHeader(byte, DENDY);
        /** then */
        expect(header1.getCpuPpuTimingMode()).toBe(NTSC_NES);
        expect(header2.getCpuPpuTimingMode()).toBe(PAL_NES);
        expect(header3.getCpuPpuTimingMode()).toBe(MULTIPLE_REGION);
        expect(header4.getCpuPpuTimingMode()).toBe(DENDY);
      });

      it("setCpuPpuTimingMode shall set the CPU / PPU Timing Mode", () => {
        /** given */
        const header1 = buildHeader(byte, NTSC_NES);
        const header2 = buildHeader(byte, PAL_NES);
        const header3 = buildHeader(byte, MULTIPLE_REGION);
        const header4 = buildHeader(byte, DENDY);
        /** when */
        header1.setCpuPpuTimingMode(DENDY);
        header2.setCpuPpuTimingMode(MULTIPLE_REGION);
        header3.setCpuPpuTimingMode(PAL_NES);
        header4.setCpuPpuTimingMode(NTSC_NES);
        /** then */
        expect(header1.bytes[byte]).toBe(DENDY);
        expect(header2.bytes[byte]).toBe(MULTIPLE_REGION);
        expect(header3.bytes[byte]).toBe(PAL_NES);
        expect(header4.bytes[byte]).toBe(NTSC_NES);
      });
    });
  });

  describe("Byte 13", () => {
    const byte = 13;

    describe("VS PPU Type", () => {
      it("getVsPpuType shall return relevant VS PPU Type", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1);
        /** then */
        expect(header.getVsPpuType()).toBe(l4SbNumber1);
      });

      it("setVsPpuType shall set the VS PPU Type", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1);
        const header2 = buildHeader(byte, l4SbNumber4);
        /** when */
        header1.setVsPpuType(l4SbNumber2);
        header2.setVsPpuType(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2);
        expect(header2.bytes[byte]).toBe(l4SbNumber3);
      });
    });

    describe("VS Hardware Type", () => {
      it("getVsHardwareType shall return relevant VS Hardware Type", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1 << 4);
        /** then */
        expect(header.getVsHardwareType()).toBe(l4SbNumber1);
      });

      it("setVsHardwareType shall set the VS Hardware Type", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1 << 4);
        const header2 = buildHeader(byte, l4SbNumber4 << 4);
        /** when */
        header1.setVsHardwareType(l4SbNumber2);
        header2.setVsHardwareType(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2 << 4);
        expect(header2.bytes[byte]).toBe(l4SbNumber3 << 4);
      });
    });

    describe("Extended Console Type", () => {
      it("getExtendedConsoleType shall return relevant Extended Console Type", () => {
        /** given */
        /** when */
        const header = buildHeader(byte, l4SbNumber1);
        /** then */
        expect(header.getExtendedConsoleType()).toBe(l4SbNumber1);
      });

      it("setExtendedConsoleType shall set the Extended Console Type", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1);
        const header2 = buildHeader(byte, l4SbNumber4);
        /** when */
        header1.setExtendedConsoleType(l4SbNumber2);
        header2.setExtendedConsoleType(l4SbNumber3);
        /** then */
        expect(header1.bytes[byte]).toBe(l4SbNumber2);
        expect(header2.bytes[byte]).toBe(l4SbNumber3);
      });
    });
  });

  describe("Byte 14", () => {
    const byte = 14;

    describe("Miscellaneous Roms Number", () => {
      it("getMiscellaneousRomsNumber shall return relevant Miscellaneous Roms Number", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, l2SbNumber1);
        const header2 = getNewHeader();
        /** then */
        expect(header1.getMiscellaneousRomsNumber()).toBe(l2SbNumber1);
        expect(header2.getMiscellaneousRomsNumber()).toBe(0);
      });

      it("setMiscellaneousRomsNumber shall set the Miscellaneous Roms Number", () => {
        /** given */
        const header1 = buildHeader(byte, l2SbNumber1);
        const header2 = getNewHeader();
        const header3 = buildHeader(byte, l2SbNumber2);
        const header4 = getNewHeader();
        /** when */
        header1.setMiscellaneousRomsNumber(0);
        header2.setMiscellaneousRomsNumber(l2SbNumber1);
        header3.setMiscellaneousRomsNumber(0);
        header4.setMiscellaneousRomsNumber(l2SbNumber2);
        /** then */
        expect(header1.bytes[byte]).toBe(0);
        expect(header2.bytes[byte]).toBe(l2SbNumber1);
        expect(header3.bytes[byte]).toBe(0);
        expect(header4.bytes[byte]).toBe(l2SbNumber2);
      });
    });
  });

  describe("Byte 15", () => {
    const byte = 15;

    describe("Default Expansion Device", () => {
      it("getDefaultExpansionDevice shall return relevant Default Expansion Device", () => {
        /** given */
        /** when */
        const header1 = buildHeader(byte, l4SbNumber1);
        const header2 = getNewHeader();
        /** then */
        expect(header1.getDefaultExpansionDevice()).toBe(l4SbNumber1);
        expect(header2.getDefaultExpansionDevice()).toBe(0);
      });

      it("setDefaultExpansionDevice shall set the Default Expansion Device", () => {
        /** given */
        const header1 = buildHeader(byte, l4SbNumber1);
        const header2 = buildHeader(byte, l4SbNumber2);
        const header3 = buildHeader(byte, l2SbNumber3);
        const header4 = getNewHeader();
        /** when */
        header1.setDefaultExpansionDevice(0);
        header2.setDefaultExpansionDevice(l2SbNumber3);
        header3.setDefaultExpansionDevice(l2SbNumber2);
        header4.setDefaultExpansionDevice(l2SbNumber1);
        /** then */
        expect(header1.bytes[byte]).toBe(0);
        expect(header2.bytes[byte]).toBe(l2SbNumber3);
        expect(header3.bytes[byte]).toBe(l2SbNumber2);
        expect(header4.bytes[byte]).toBe(l2SbNumber1);
      });
    });
  });
});
