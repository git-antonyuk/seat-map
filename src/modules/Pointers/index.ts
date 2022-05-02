import { ISeatObject } from '../Seats/createData';

interface IPointersProps {
  ctx: CanvasRenderingContext2D,
  objects: ISeatObject[],
  scaleCoefficient: number,
  scaledSize: number,
  row: number,
  column: number,
}

const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
const FONT_WEIGHT = 'bold';
const FONT_COLOR = '#333';

class Pointers {
  private ctx: CanvasRenderingContext2D;

  private objects: ISeatObject[] = [];

  private scaleCoefficient: number = 1;

  public scaledSize: number = 0;

  private row: number = 0;

  private column: number = 0;

  constructor({
    ctx, objects, scaleCoefficient, scaledSize, row, column,
  }: IPointersProps) {
    this.ctx = ctx;
    this.objects = objects;
    this.scaleCoefficient = scaleCoefficient;
    this.scaledSize = scaledSize;
    this.row = row;
    this.column = column;
  }

  private getFontSize() {
    return 12 * this.scaleCoefficient;
  }

  private drawText(x: number, y: number, index: number) {
    const font = `${this.getFontSize()}px ${FONT_WEIGHT} ${FONT_FAMILY}`;

    this.ctx.beginPath();
    this.ctx.font = font;
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = FONT_COLOR;
    this.ctx.fillText(`${index + 1}`, x, y);
    this.ctx.closePath();
  }

  public drawVerticalPointers(side: 'left' | 'right' = 'left') {
    if (!this.ctx || !this.objects[0]) {
      return;
    }
    let yPosCenter = this.objects[0].realY + this.scaledSize / 2;
    let x = 0;
    if (side === 'left') {
      x = this.objects[0].realX - this.scaledSize / 2;
    } else {
      x = this.objects[this.column - 1].realX + this.scaledSize * 2 * 0.75;
    }

    for (let i = 0; i < this.row; i += 1) {
      const y = yPosCenter + this.getFontSize() / 2;

      this.drawText(x, y, i);

      yPosCenter += this.scaledSize;
    }
  }
}

export default Pointers;
