import { ISeatObject } from '../Seats/createData';
import { ISize } from '../../types';
import Seats, { ICreateSeatsParams } from '../Seats';
import { findCanvasElement, findObject } from './helpers';
import CreateSeatsBlock from '../Seats/CreateSeatsBlock';

interface ICanvasConstructorParams {
  id: string;
  sizes?: ISize;
  callbackGetClickedObject: Function,
  params?: ICreateSeatsParams,
  isPublic: boolean,
  objects?: ISeatObject[]
}

const ERROR_CANT_FIND_ELEMENT = 'Can\'t find canvas element';

class Canvas {
  private canvas: HTMLCanvasElement | null = null;

  private ctx: CanvasRenderingContext2D | null = null;

  public params: ICreateSeatsParams | null = null;

  public currentClickedObject: any = null;

  public seats: Seats | null = null;

  private isPublic: boolean = false;

  private sizes: ISize = {
    width: 0,
    height: 0,
  };

  private callbackGetClickedObject: Function | undefined;

  private seatsBlocksInstance: CreateSeatsBlock | undefined;

  constructor({ id, sizes, callbackGetClickedObject, params, objects, isPublic } : ICanvasConstructorParams) {
    this.createContext(id);
    this.setSizes(sizes);
    if (!this.ctx) {
      return;
    }
    this.isPublic = isPublic;
    this.callbackGetClickedObject = callbackGetClickedObject;

    this.seatsBlocksInstance = new CreateSeatsBlock(this.ctx, this.sizes);

    this.addResizeEvent(sizes);
    // this.addClickEvent();
    // this.addMouseMoveEvent();

    if (params) {
      this.createSeats({ ...params, isPublic: this.isPublic, objects });
    } else { // TODO Remove this item
      this.createSeats({
        row: 8,
        column: 18,
        size: 32,
        price: 100,
        isPublic: false,
      });
    }
  }

  private createContext(id: string): void {
    const canvas = findCanvasElement(id);

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
    console.log(
      '%c 🍬 seatsBlocksInstance: ',
      'font-size:12px;background-color: #FFDD4D;color:#fff;',
      this.seatsBlocksInstance,
    );
  }

  // Events
  // TODO: add debounce
  // eslint-disable-next-line class-methods-use-this
  private getObject = ({ offsetX, offsetY }: { offsetX: number, offsetY: number }) => {
    const scaledSize = this.seats?.scaledSize;
    const objects = this.seats?.objects;

    if (!scaledSize || !objects) {
      return null;
    }

    return findObject(offsetX, offsetY, scaledSize, objects);
  };

  private onMouseMove({ offsetX, offsetY }: { offsetX: number, offsetY: number }) {
    const object = this.getObject({ offsetX, offsetY });

    this.seats?.onHoverObject(object?.id);
  }

  // TODO: add debounce
  private addMouseMoveEvent() {
    this.canvas?.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private removeMouseMoveEvent() {
    this.canvas?.removeEventListener('click', this.onMouseMove.bind(this));
  }

  private onClick({ offsetX, offsetY }: { offsetX: number, offsetY: number }) {
    const object = this.getObject({ offsetX, offsetY });

    if (!object || !this.callbackGetClickedObject) {
      return;
    }

    this.callbackGetClickedObject(object, this.isPublic);
  }

  private addClickEvent() {
    this.canvas?.addEventListener('click', this.onClick.bind(this));
  }

  private removeClickEvent() {
    this.canvas?.removeEventListener('click', this.onClick.bind(this));
  }

  private addResizeEvent(sizes?: ISize) {
    window.addEventListener('resize', this.setSizes.bind(this, sizes));
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
    this.removeClickEvent();
    this.removeMouseMoveEvent();
  }
}

export default Canvas;
