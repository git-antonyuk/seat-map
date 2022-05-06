import uniqueId from 'lodash/uniqueId';
import Seats, { ICreateSeatsParams } from './index';
import { ISize } from '../../types';

export interface ISeatsBlock {
  id: number | string,
  name: string,
  instance: Seats
}

class CreateSeatsBlock {
  public seatBlocks: ISeatsBlock[] = [];

  private ctx: CanvasRenderingContext2D;

  private canvasSizes: ISize;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvasSizes: ISize,
  ) {
    this.ctx = ctx;
    this.canvasSizes = canvasSizes;
  }

  create(params: ICreateSeatsParams | null) {
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

  public move(moves: any) {
    for (let i = 0; i < this.seatBlocks.length; i += 1) {
      const block = this.seatBlocks[i].instance;

      if (moves.right) {
        block.moveRight(moves.right);
      }

      if (moves.left) {
        block.moveLeft(moves.left);
      }

      if (moves.up) {
        block.moveUp(moves.up);
      }

      if (moves.down) {
        block.moveDown(moves.down);
      }
    }
  }
}

export default CreateSeatsBlock;
