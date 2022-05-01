import './SeatsList.css';
import { Modal, Button } from 'antd';
import { useState } from 'react';

import Canvas from '../../modules/Canvas';
import TableSeats from '../TableSeats/TableSeats';

interface IProps {
    canvas: Canvas
}

function SeatsList(props: IProps) {
  const { canvas } = props;
  const [visible, setVisible] = useState<boolean>(false);

  const listData = canvas.seats?.objects || [];

  return (
    <>
      <Button type="default" onClick={() => setVisible(true)}>Seats table</Button>
      <Modal
        title="Seats list"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width="100%"
      >
        <TableSeats dataSource={listData} />
      </Modal>
    </>

  );
}

export default SeatsList;
