/* eslint-disable no-new */
import { ISize } from '../../types';
import createData, { ISeatObject } from './createData';
import Box from '../Objects/Box';
import Pointers from '../Pointers';
import objectDeepClone from '../../utils/objectDeepClone';

const MOVE_SPEED = 50;

export interface ICreateSeatsParams {
  row: number,
  column: number,
  size: number,
  price: number,
  isPublic: boolean,
  objects?: ISeatObject[]
}

class Seats {
  /**
   * Data structure
   * [{ '0-0': {}, '0-1': {} }]
   * key is first part is position by x coordinate ans second by y
   */
  public objects: ISeatObject[] = [];

  private ctx: CanvasRenderingContext2D;

  private canvasSizes: ISize;

  private offsetX: number = 0;

  private offsetY: number = 0;

  private size: number = 0;

  public scaledSize: number = 0; // Zoom size * 1 -> 100%

  private row: number = 0;

  private column: number = 0;

  private price: number = 0;

  private isPublic: boolean = false;

  constructor(
    ctx: CanvasRenderingContext2D,
    sizes: ISize,
    { row, column, size, price, isPublic, objects }: ICreateSeatsParams,
  ) {
    this.ctx = ctx;
    this.canvasSizes = sizes;
    this.row = row;
    this.column = column;
    this.size = size;
    this.price = price;
    this.isPublic = isPublic;
    if (objects) {
      this.objects = objects;
    }
    this.create();
  }

  private getCenterOffsets(): { x: number, y: number } {
    return {
      x: (this.canvasSizes.width / 2) - (this.column * this.scaledSize) / 2,
      y: (this.canvasSizes.height / 2) - (this.row * this.scaledSize) / 2,
    };
  }

  private getFullOffsets(): { x: number, y: number } {
    const centerPosition = this.getCenterOffsets();
    return {
      x: this.offsetX + centerPosition.x,
      y: this.offsetY + centerPosition.y,
    };
  }

  private getPositionX(posX: number): number {
    return (this.scaledSize * posX) + this.getFullOffsets().x;
  }

  private getPositionY(posY: number): number {
    return (this.scaledSize * posY) + this.getFullOffsets().y;
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasSizes.width, this.canvasSizes.height);
  }

  private drawBoxes(list: ISeatObject[]) {
    if (!this.ctx) {
      return;
    }
    // this.clearCanvas();

    for (let i = 0; i < list.length; i += 1) {
      const { posX, posY, disabled, hovered } = list[i];
      const x = this.getPositionX(posX);
      const y = this.getPositionY(posY);

      new Box(this.ctx, {
        size: this.scaledSize,
        x,
        y,
        strokeStyle: 'blue',
        disabled,
        padding: 5 * (this.scaledSize / this.size),
        hovered,
      });

      this.objects[i].realX = x;
      this.objects[i].realY = y;
    }

    const pointers = new Pointers({
      ctx: this.ctx,
      objects: this.objects,
      scaleCoefficient: this.scaledSize / this.size,
      scaledSize: this.scaledSize,
      row: this.row,
      column: this.column,
    });

    pointers.drawVerticalPointers('left');
    pointers.drawVerticalPointers('right');
  }

  hoveredObjectId?: number;

  public onHoverObject(id?: number) {
    if (this.hoveredObjectId === id) {
      return;
    }
    this.hoveredObjectId = id;

    if (typeof this.hoveredObjectId === 'undefined') {
      this.drawBoxes(this.objects);
      return;
    }

    const localObjects = objectDeepClone(this.objects);
    const index = localObjects.findIndex((item: { id: number }) => item.id === id);
    localObjects[index].hovered = true;
    this.drawBoxes(localObjects);
  }

  private reDraw() {
    this.drawBoxes(this.objects);
  }

  private create() {
    this.setZoom(1);
    if (!this.isPublic || !this.objects) {
      this.objects = createData({
        row: this.row,
        column: this.column,
        price: this.price,
      });
    }

    this.drawBoxes(this.objects);
  }

  public editObject(object: ISeatObject) {
    const index = this.objects.findIndex((item: ISeatObject) => item.id === object.id);

    if (typeof index !== 'number' || !this.objects?.[index]) {
      return;
    }
    this.objects[index] = object;
    this.reDraw();
  }

  public moveRight() {
    this.offsetX += MOVE_SPEED;
    this.reDraw();
  }

  public moveLeft() {
    this.offsetX -= MOVE_SPEED;
    this.reDraw();
  }

  public moveTop() {
    this.offsetY -= MOVE_SPEED;
    this.reDraw();
  }

  public moveBottom() {
    this.offsetY += MOVE_SPEED;
    this.reDraw();
  }

  public setZoom(payload: number) {
    if (payload < 0 || payload > 3) {
      return;
    }
    this.scaledSize = payload * this.size;
    this.reDraw();
  }
}

export default Seats;
