import uniqueId from 'lodash/uniqueId';
import Seats, { ICreateSeatsParams } from './index';
import { ISize } from '../../types';

interface ISeatsBox {
  id: number | string,
  name: string,
  instance: Seats
}

class CreateSeatsBlock {
  public seatBlocks: ISeatsBox[] = [];

  private ctx: CanvasRenderingContext2D;

  private canvasSizes: ISize;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvasSizes: ISize,
  ) {
    this.ctx = ctx;
    this.canvasSizes = canvasSizes;
  }

  create(params: ICreateSeatsParams) {
    const name = `Block_${this.seatBlocks.length + 1}`;
    this.seatBlocks.push({
      id: uniqueId('_block'),
      name,
      instance: new Seats(this.ctx, this.canvasSizes, params),
    });
  }

  // edit() {
  //   console.log('edit');
  // }

  // delete() {
  //   console.log('delete');
  // }
}

export default CreateSeatsBlock;
