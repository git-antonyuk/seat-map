import ClickAndHold, { IClickAndHoldMoves } from '../Events/ClickAndHold';
import { ISize } from '../../types';
import Seats, { ICreateSeatsParams } from '../Seats';
import { findCanvasElement } from './helpers';
import CreateSeatsBlock, { ISeatsBlock } from '../Seats/CreateSeatsBlock';

interface ICanvasConstructorParams {
  id: string;
  sizes?: ISize;
  callbackGetClickedObject: Function;
}

const ERROR_CANT_FIND_ELEMENT = "Can't find canvas element";

class Canvas {
  private canvas: HTMLCanvasElement | null = null;

  private ctx: CanvasRenderingContext2D | null = null;

  public params: ICreateSeatsParams | null = null;

  public currentClickedObject: any = null;

  public seats: Seats | null = null;

  private sizes: ISize = {
    width: 0,
    height: 0,
  };

  private callbackGetClickedObject: Function | undefined;

  private seatsBlocksInstance: CreateSeatsBlock | undefined;

  private clickAndHoldInstance: ClickAndHold | null = null;

  constructor({
    id,
    sizes,
    callbackGetClickedObject,
  }: ICanvasConstructorParams) {
    this.createContext(id);
    this.setSizes(sizes);
    if (!this.ctx) {
      return;
    }
    this.callbackGetClickedObject = callbackGetClickedObject;

    this.seatsBlocksInstance = new CreateSeatsBlock(this.canvas, this.ctx, this.sizes);

    this.addResizeEvent(sizes);
    // this.addClickEvent();
    // this.addMouseMoveEvent();
    // this.addClickAddHold();
    this.clickAndHoldInstance = new ClickAndHold({
      canvas: this.canvas,
      callBack: (moves: IClickAndHoldMoves) => this.seatsBlocksInstance?.move(moves),
    });

    this.tick();

    this.seatsBlocksInstance?.create({
      row: 8,
      column: 18,
      size: 32,
      price: 100,
      isPublic: false,
    });
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
    this.seatsBlocksInstance?.create(params || this.params);
  }

  // private getObject = ({
  //   offsetX,
  //   offsetY,
  // }: {
  //   offsetX: number;
  //   offsetY: number;
  // }) => {
  //   const scaledSize = this.seats?.scaledSize;
  //   const objects = this.seats?.objects;

  //   if (!scaledSize || !objects) {
  //     return null;
  //   }

  //   return findObject(offsetX, offsetY, scaledSize, objects);
  // };

  // private onMouseMove({
  //   offsetX,
  //   offsetY,
  // }: {
  //   offsetX: number;
  //   offsetY: number;
  // }) {
  //   const object = this.getObject({ offsetX, offsetY });

  //   this.seats?.onHoverObject(object?.id);
  // }

  // TODO: add debounce
  // private addMouseMoveEvent() {
  //   this.canvas?.addEventListener('mousemove', this.onMouseMove.bind(this));
  // }

  // private removeMouseMoveEvent() {
  //   this.canvas?.removeEventListener('click', this.onMouseMove.bind(this));
  // }

  // private onClick({ offsetX, offsetY }: { offsetX: number; offsetY: number }) {
  //   const object = this.getObject({ offsetX, offsetY });

  //   if (!object || !this.callbackGetClickedObject) {
  //     return;
  //   }

  //   this.callbackGetClickedObject(object);
  // }

  // private addClickEvent() {
  //   this.canvas?.addEventListener('click', this.onClick.bind(this));
  // }

  // private removeClickEvent() {
  //   this.canvas?.removeEventListener('click', this.onClick.bind(this));
  // }

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

    this.clickAndHoldInstance?.removeEvents();

    this.removeResizeEvent();
    // this.removeClickEvent();
    // this.removeMouseMoveEvent();
  }

  private clearCanvas() {
    this.ctx?.clearRect(0, 0, this.sizes.width, this.sizes.height);
  }

  private tick() {
    // Update draw
    this.clearCanvas();
    if (this.seatsBlocksInstance) {
      this.seatsBlocksInstance.getSeatBlocks().forEach((block: ISeatsBlock) => {
        block.instance.reDraw();
      });
    }

    // Call tick again on the next frame
    window.requestAnimationFrame(() => this.tick());
  }
}

export default Canvas;
