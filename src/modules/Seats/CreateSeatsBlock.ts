import uniqueId from 'lodash/uniqueId';
import ClickAndHold, { IClickAndHoldCallBackParams } from '../Events/ClickAndHold';
import Seats, { ICreateSeatsParams } from './index';
import { ISize } from '../../types';

export interface ISeatsBlock {
  id: number | string,
  name: string,
  instance: Seats
}

class CreateSeatsBlock {
  private canvas: HTMLCanvasElement | null = null;

  private activeSeatBlockIndex: number | null = null;

  private seatBlocks: ISeatsBlock[] = [];

  private ctx: CanvasRenderingContext2D;

  private canvasSizes: ISize;

  private clickAndHoldInstance: ClickAndHold | null = null;

  constructor(
    canvas: HTMLCanvasElement | null,
    ctx: CanvasRenderingContext2D,
    canvasSizes: ISize,
  ) {
    this.ctx = ctx;
    this.canvasSizes = canvasSizes;
    this.canvas = canvas;

    this.clickAndHoldInstance = new ClickAndHold({
      canvas: this.canvas,
      callBack: (params: IClickAndHoldCallBackParams) => this.move(params),
      onClickAndHoldEnd: () => this.onClickAndHoldEnd(),
    });
  }

  public create(params: ICreateSeatsParams | null) {
    if (!params) {
      return;
    }
    const name = `Block_${this.seatBlocks.length + 1}`;
    this.seatBlocks.push({
      id: uniqueId('_block'),
      name,
      instance: new Seats(this.ctx, this.canvasSizes, params),
    });
  }

  public getSeatBlocks(): ISeatsBlock[] {
    return this.seatBlocks;
  }

  public setActiveSeatBlockIndex(index: number | null) {
    this.activeSeatBlockIndex = index;
  }

  public getActiveSeatBlockIndex(): number | null {
    return this.activeSeatBlockIndex;
  }

  private getActiveBlockInstance(): Seats | null {
    const index = this.getActiveSeatBlockIndex();
    if (typeof index !== 'number') {
      return null;
    }
    return this.seatBlocks[index].instance;
  }

  public move({ moves, offsetX, offsetY }: IClickAndHoldCallBackParams) {
    this.findClickedBlock(offsetX, offsetY);
    const activeBlock = this.getActiveBlockInstance();

    if (!activeBlock) {
      return;
    }
    if (moves.right) {
      activeBlock.moveRight(moves.right);
    }
    if (moves.left) {
      activeBlock.moveLeft(moves.left);
    }
    if (moves.up) {
      activeBlock.moveUp(moves.up);
    }
    if (moves.down) {
      activeBlock.moveDown(moves.down);
    }
  }

  private onClickAndHoldEnd() {
    this.setActiveSeatBlockIndex(null);
  }

  private findClickedBlock(x: number, y: number): void {
    const activeBlock = this.seatBlocks.find(
      (
        { instance:
          {
            blockParams:
              {
                realX, realY, height, width,
              },
          },
        },
      ) => x >= realX && x <= realX + width && y >= realY && y <= realY + height,
    );

    if (!activeBlock) {
      this.setActiveSeatBlockIndex(null);
      return;
    }

    const activeIndex = this.seatBlocks.findIndex((block: ISeatsBlock) => block.id === activeBlock.id);

    if (typeof activeIndex === 'undefined') {
      this.setActiveSeatBlockIndex(null);
      return;
    }

    if (this.getActiveSeatBlockIndex() !== null) {
      return;
    }

    this.setActiveSeatBlockIndex(activeIndex);
  }
}

export default CreateSeatsBlock;
