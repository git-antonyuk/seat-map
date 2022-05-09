import throttle from 'lodash/throttle';
import { IEventParams } from '../../types';

export interface IClickAndHoldMoves {
  right: number;
  left: number;
  up: number;
  down: number;
}

interface IClickAndHoldParams {
  canvas: HTMLCanvasElement | null;
  callBack: Function;
  onClickAndHoldEnd?: Function;
}

export interface IClickAndHoldCallBackParams {
  moves: IClickAndHoldMoves,
  offsetX: number,
  offsetY: number
}

class ClickAndHold {
  private canvas: HTMLCanvasElement | null;

  private callBack: Function;

  private onClickAndHoldEnd: Function | null = null;

  private activeClickAndHold: boolean = false;

  private prevX: number | null = null;

  private prevY: number | null = null;

  constructor({
    canvas,
    callBack,
    onClickAndHoldEnd,
  }: IClickAndHoldParams) {
    this.canvas = canvas;
    this.callBack = callBack;
    if (onClickAndHoldEnd) {
      this.onClickAndHoldEnd = onClickAndHoldEnd;
    }
    this.addEvents();
  }

  private DELAY: number = 20;

  private setDefaultPrevPosition() {
    this.prevX = null;
    this.prevY = null;
  }

  private throttled = throttle(
    ({ offsetX, offsetY }: IEventParams) => {
      if (!this.activeClickAndHold) {
        return;
      }
      const moves: IClickAndHoldMoves = {
        right: 0,
        left: 0,
        up: 0,
        down: 0,
      };

      if (!this.prevX) {
        this.prevX = offsetX;
      }

      if (!this.prevY) {
        this.prevY = offsetY;
      }

      if (this.prevX < offsetX) {
        moves.right = offsetX - this.prevX;
      }
      if (this.prevX > offsetX) {
        moves.left = this.prevX - offsetX;
      }
      if (this.prevY > offsetY) {
        moves.up = this.prevY - offsetY;
      }
      if (this.prevY < offsetY) {
        moves.down = offsetY - this.prevY;
      }

      this.prevX = offsetX;
      this.prevY = offsetY;

      this.callBack({ moves, offsetX, offsetY });
    },
    this.DELAY,
  );

  private setActiveClickAndHold(payload: boolean): void {
    this.activeClickAndHold = payload;

    if (!payload) {
      this.setDefaultPrevPosition();
    }

    if (this.onClickAndHoldEnd) {
      this.onClickAndHoldEnd();
    }
  }

  private addEvents(): void {
    this.canvas?.addEventListener('mousedown', this.setActiveClickAndHold.bind(this, true));
    this.canvas?.addEventListener('mousemove', this.throttled);
    this.canvas?.addEventListener('mouseup', this.setActiveClickAndHold.bind(this, false));
  }

  public removeEvents(): void {
    this.canvas?.removeEventListener('mousedown', this.setActiveClickAndHold.bind(this, false));
    this.canvas?.removeEventListener('mousemove', this.throttled);
    this.canvas?.removeEventListener('mouseup', this.setActiveClickAndHold.bind(this, false));
  }
}

export default ClickAndHold;
