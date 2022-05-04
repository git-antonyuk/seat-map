import { ISeatObject } from './Seats/createData';

interface ISeatBlock {
  name: string,
  description?: string,
  color?: string,
  items: ISeatObject[]
}

const objects: ISeatBlock[] = [
  {
    name: 'Block_0',
    description: '',
    color: '',
    items: [
      {
        posX: 0, // Position in seat map by x
        posY: 0, // Position in seat map by y
        id: 0,
        realX: 0, // Real position in canvas with offset x
        realY: 0, // Real position in canvas with offset y
        price: 0,
        disabled: true,
      },
    ],
  },
  {
    name: 'Block_1',
    description: '',
    color: '',
    items: [
      {
        posX: 0, // Position in seat map by x
        posY: 0, // Position in seat map by y
        id: 0,
        realX: 0, // Real position in canvas with offset x
        realY: 0, // Real position in canvas with offset y
        price: 0,
        disabled: true,
      },
    ],
  },
];

console.log(objects);
