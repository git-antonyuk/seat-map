interface IBoxProps {
  x: number;
  y: number;
  size?: number;
  lineWidth?: number;
  strokeStyle?: string;
  disabled: boolean;
  padding?: number;
  hovered?: boolean;
  reserved?: boolean;
}

class Box {
  private ctx: CanvasRenderingContext2D;

  private lineWidth: number = 1;

  private strokeStyle: string = 'red';

  private positionX: number = 0;

  private positionY: number = 0;

  private size: number = 32;

  private disabled: boolean = false;

  private padding?: number;

  private hovered?: boolean;

  private reserved?: boolean;

  constructor(ctx: CanvasRenderingContext2D, {
    x, y, size, lineWidth, strokeStyle,
    disabled, padding, hovered, reserved,
  }: IBoxProps) {
    this.ctx = ctx;
    this.positionX = x;
    this.positionY = y;
    this.disabled = disabled;
    this.padding = padding;
    this.hovered = hovered;
    this.reserved = reserved;

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
    if (this.padding) {
      this.ctx.rect(
        this.positionX + this.padding, // The x-coordinate of the upper-left corner of the rectangle
        this.positionY + this.padding, // The y-coordinate of the upper-left corner of the rectangle
        this.size - this.padding * 2, // width
        this.size - this.padding * 2, // height
      );
    } else {
      this.ctx.rect(
        this.positionX, // The x-coordinate of the upper-left corner of the rectangle
        this.positionY, // The y-coordinate of the upper-left corner of the rectangle
        this.size, // width
        this.size, // height
      );
    }

    if (this.hovered) {
      this.ctx.fillStyle = this.strokeStyle;
      this.ctx.fill();
    }

    if (this.disabled) {
      this.ctx.fillStyle = '#333';
      this.ctx.fill();
    }

    if (this.reserved) {
      this.ctx.fillStyle = 'red';
      this.ctx.fill();
    }

    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export default Box;
