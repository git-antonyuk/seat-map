import { ISeatObject } from '../../modules/Seats/createData';

export const getTitle = (seatData: ISeatObject): string => (seatData
  ? `Place - row: ${seatData.posY + 1} and column: ${seatData.posX + 1}`
  : '');

export default getTitle;
