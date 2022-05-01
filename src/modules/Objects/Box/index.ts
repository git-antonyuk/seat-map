interface IBoxProps {
  x: number,
  y: number,
  size?: number,
  lineWidth?: number,
  strokeStyle?: string,
}

class Box {
  private ctx: CanvasRenderingContext2D;

  private lineWidth: number = 1;

  private strokeStyle: string = 'red';

  private positionX: number = 0;

  private positionY: number = 0;

  private size: number = 32;

  constructor(ctx: CanvasRenderingContext2D, {
    x, y, size, lineWidth, strokeStyle,
  }: IBoxProps) {
    this.ctx = ctx;
    this.positionX = x;
    this.positionY = y;
    if (size) {
      this.size = size;
    }

    if (lineWidth) {
      this.lineWidth = lineWidth;
    }

    if (strokeStyle) {
      this.strokeStyle = strokeStyle;
    }

    this.create();
  }

  private create() {
    if (!this.ctx) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.rect(
      this.positionX, // The x-coordinate of the upper-left corner of the rectangle
      this.positionY, // The y-coordinate of the upper-left corner of the rectangle
      this.size, // width
      this.size, // height
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export default Box;
