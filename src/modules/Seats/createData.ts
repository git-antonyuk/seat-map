export interface ISeatObject {
  posX: number; // Position in seat map by x
  posY: number; // Position in seat map by y
  id: number | string;
  realX: number; // Real position in canvas with offset x
  realY: number; // Real position in canvas with offset y
  price: number | string;
  disabled: boolean;
}

interface IParams {
  row: number;
  column: number;
  price?: number | string;
  disabled?: boolean;
}

const createData = ({
  row,
  column,
  price,
}: IParams) => {
  const arr: ISeatObject[] = [];
  let index = 0;
  for (let y = 0; y < column; y += 1) {
    for (let x = 0; x < row; x += 1) {
      arr.push({
        posX: x,
        posY: y,
        id: index,
        realX: 0,
        realY: 0,
        price: price || 0,
        disabled: false,
      });
      index += 1;
    }
  }

  return arr;
};

export default createData;
