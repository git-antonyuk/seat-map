import { Table } from 'antd';
import { ISeatObject } from '../../modules/Seats/createData';
import getTitle from '../../utils/componentGetters';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Disabled',
    dataIndex: 'disabled',
    key: 'disabled',
  },
];
  interface ITableSeatsProps {
    dataSource: ISeatObject[]
  }

function TableSeats(props: ITableSeatsProps) {
  const { dataSource } = props;
  const list = dataSource.map((item, i) => ({
    ...item,
    name: getTitle(item),
    disabled: item.disabled.toString(),
    key: i,
  }));
  return <Table dataSource={list} columns={columns} />;
}

export default TableSeats;
