import React from 'react';
import { ipcRenderer } from 'electron';
import { act, cleanup, render } from '@testing-library/react';
import Emulator from './Emulator';

const mockRomData = [78, 69, 83, 26];
const mockCallback = jest.fn();

jest.mock('electron', () => ({
  ipcRenderer: {
    on: jest.fn().mockImplementation((event, callback) => {
      mockCallback.mockImplementation(() => callback('event', mockRomData));
    }),
  },
}));

describe('Emulator', () => {
  const mockConsole = console;
  const mockLog = jest.fn();
  mockConsole.log = mockLog;

  test('should render a canvas', () => {
    /** given */
    /** when */
    const { asFragment } = render(<Emulator />);
    /** then */
    expect(asFragment()).toMatchSnapshot();
    expect(ipcRenderer.on).toHaveBeenCalled();
  });

  test('should log the rom', () => {
    /** given */
    /** when */
    render(<Emulator />);
    act(() => {
      mockCallback();
    });
    /** then */
    expect(mockCallback).toHaveBeenCalled();
    expect(mockLog).toHaveBeenCalledWith('ROM loaded', mockRomData);
  });

  afterAll(cleanup);
});
