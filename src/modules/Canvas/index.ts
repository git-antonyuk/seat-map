import logger from '../../utils/logger';
import { ISize } from '../../types';
import Seats, { ICreateSeatsParams } from '../Seats';
import { findCanvasElement } from './helpers';

interface ICanvasConstructorParams {
  id: string;
  sizes?: ISize;
  callbackGetClickedObject: Function
}

const ERROR_CANT_FIND_ELEMENT = 'Can\'t find canvas element';

class Canvas {
  private canvas: HTMLCanvasElement | null = null;

  private ctx: CanvasRenderingContext2D | null = null;

  private params: ICreateSeatsParams | null = null;

  public currentClickedObject: any = null;

  public seats: Seats | null = null;

  private sizes: ISize = {
    width: 0,
    height: 0,
  };

  private callbackGetClickedObject: Function;

  constructor({ id, sizes, callbackGetClickedObject } : ICanvasConstructorParams) {
    this.createContext(id);
    this.setSizes(sizes);
    this.callbackGetClickedObject = callbackGetClickedObject;

    this.addResizeEvent(sizes);
    this.addClickEvent();

    this.createSeats({
      row: 18,
      column: 8,
      size: 32,
      price: 100,
    });
  }

  private findAnElement = (x: number, y: number) => {
    const scaledSize = this.seats?.scaledSize;
    const objects = this.seats?.objects;

    if (!scaledSize || !objects) {
      return null;
    }

    return objects.find(({ realX, realY }) => x >= realX && x <= realX + scaledSize
    && y >= realY && y <= realY + scaledSize);
  };

  private onClick({ offsetX, offsetY }: { offsetX: number, offsetY: number }) {
    // console.log(this.findAnElement(offsetX, offsetY));
    // this.currentClickedObject = this.findAnElement(offsetX, offsetY);
    this.callbackGetClickedObject(this.findAnElement(offsetX, offsetY));
    // this.findAnElement(offsetX, offsetY);
  }

  private addClickEvent() {
    this.canvas?.addEventListener('click', this.onClick.bind(this));
  }

  private addResizeEvent(sizes?: ISize) {
    window.addEventListener('resize', this.setSizes.bind(this, sizes));
  }

  private createContext(id: string): void {
    const canvas = findCanvasElement(id);

    logger.log(canvas);

    if (!canvas) {
      console.error(ERROR_CANT_FIND_ELEMENT);
      return;
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  private initRetinaDisplay() {
    if (!this.canvas || !this.ctx) {
      return;
    }

    this.canvas.width = this.sizes.width * 2;
    this.canvas.height = this.sizes.height * 2;
    this.canvas.style.width = `${this.sizes.width}px`;
    this.canvas.style.height = `${this.sizes.height}px`;
    this.ctx.scale(2, 2);
  }

  private initDefaultDisplay() {
    if (!this.canvas) {
      return;
    }
    this.canvas.width = this.sizes.width;
    this.canvas.height = this.sizes.height;
  }

  private setSizes(sizes?: ISize): void {
    if (!this.canvas) {
      return;
    }
    this.sizes.width = sizes?.width || window.innerWidth;
    this.sizes.height = sizes?.height || window.innerHeight;

    const { devicePixelRatio } = window;
    if (devicePixelRatio > 1) {
      this.initRetinaDisplay();
    } else {
      this.initDefaultDisplay();
    }

    if (this.params) {
      this.createSeats();
    }
  }

  public createSeats(params?: ICreateSeatsParams) {
    if (!this.ctx) {
      return;
    }
    if (params) {
      this.params = params;
    }
    if (!this.params) {
      return;
    }
    this.seats = new Seats(this.ctx, this.sizes, params || this.params);
  }

  private removeResizeEvent(): void {
    window.removeEventListener('resize', this.setSizes.bind(this, undefined));
  }

  public destroy() {
    this.canvas = null;
    this.ctx = null;
    this.seats = null;
    this.params = null;

    this.removeResizeEvent();
  }
}

export default Canvas;
