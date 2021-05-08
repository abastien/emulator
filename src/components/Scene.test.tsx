import React from 'react';
import Scene from './Scene';
import {cleanup, render, fireEvent, act} from '@testing-library/react'

interface CustomWindow extends Window {
  innerWidth: number
  innerHeight: number
}

describe('Scene', function () {
  const defaultWidth = 1024;
  const defaultHeight = 768;
  const mockWindow: CustomWindow = window;

  beforeEach(() => {
    mockWindow.innerWidth = defaultWidth;
    mockWindow.innerHeight = defaultHeight;
  })

  test('should render a canvas', () => {
    /** given */
    /** when */
    const { asFragment } = render(<Scene />);
    /** then */
    expect(asFragment()).toMatchSnapshot();
  });

  test('should adapt the canvas to window size', () => {
    /** given */
    /** when */
    const { baseElement } = render(<Scene />);
    /** then */
    const elements = baseElement.getElementsByTagName('canvas');
    expect(elements.length).toEqual(1);
    expect(elements[0].width).toEqual(defaultWidth);
    expect(elements[0].height).toEqual(defaultHeight);
  });

  test('should resize the canvas on window resize', () => {
    /** given */
    const customWidth = 1600;
    const customHeight = 1200;
    /** when */
    const { baseElement } = render(<Scene />);
    act(() => {
      mockWindow.innerWidth = customWidth;
      mockWindow.innerHeight = customHeight;
      fireEvent(mockWindow, new Event("resize"))
    })
    /** then */
    const elements = baseElement.getElementsByTagName('canvas');
    expect(elements.length).toEqual(1);
    expect(elements[0].width).toEqual(customWidth);
    expect(elements[0].height).toEqual(customHeight);
  });

  afterAll(cleanup);
});