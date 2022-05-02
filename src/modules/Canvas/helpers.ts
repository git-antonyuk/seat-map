import { ISeatObject } from '../Seats/createData';

const findCanvasElement = (id: string): HTMLCanvasElement | null => document.querySelector(id);

const findObject = (
  x: number,
  y: number,
  size: number,
  objects: ISeatObject[],
) => objects.find(({ realX, realY }) => x >= realX && x <= realX + size
&& y >= realY && y <= realY + size);

export default findCanvasElement;
export { findCanvasElement, findObject };
