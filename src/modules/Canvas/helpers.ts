const findCanvasElement = (id: string): HTMLCanvasElement | null => document.querySelector(id);

export default findCanvasElement;
export { findCanvasElement };
