export interface ISeatObject {
  posX: number; // Position in seat map by x
  posY: number; // Position in seat map by y
  id: number;
  realX: number; // Real position in canvas with offset x
  realY: number; // Real position in canvas with offset y
  price: number;
  disabled: boolean;
  hovered?: boolean;
  reserved?: boolean;
}

interface IParams {
  row: number;
  column: number;
  price?: number;
  disabled?: boolean;
}

const createData = ({
  row,
  column,
  price,
}: IParams) => {
  const arr: ISeatObject[] = [];
  let index = 0;
  for (let y = 0; y < row; y += 1) {
    for (let x = 0; x < column; x += 1) {
      arr.push({
        posX: x,
        posY: y,
        id: index,
        realX: 0,
        realY: 0,
        price: price || 0,
        disabled: false,
        reserved: false,
      });
      index += 1;
    }
  }

  return arr;
};

export default createData;
