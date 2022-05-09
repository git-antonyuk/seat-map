import './LeftSidebarContent.css';
import { Button } from 'antd';
import { useState } from 'react';
// import MoveForm from '../MoveForm/MoveForm';

// import Canvas from '../../modules/Canvas/index';
import CreateSeats from '../CreateSeats/CreateSeats';
// import SeatsList from '../SeatsList/SeatsList';
// import ExportJSON from '../ExportJSON/ExportJSON';

interface IProps {
    // canvas: Canvas | null;
    createSeats: Function;
}

function LeftSidebarContent(props: IProps) {
  const { createSeats } = props;
  // const [showMove, setShowMove] = useState<boolean>(false);
  const [showSeatForm, setSeatForm] = useState<boolean>(false);

  // STEP 1
  const openSeatForm = () => {
    setSeatForm(true);
  };

  // STEP 3
  // const openMoveForm = () => {
  //   setShowMove(true);
  // };

  const closeSeatForm = () => {
    // STEP 2
    setSeatForm(false);
    // openMoveForm();
  };

  // const moveComponent = () => !showSeatForm && (canvas || showMove) && <MoveForm canvas={canvas} />;
  const seatFormComponent = () => showSeatForm
    && <CreateSeats createSeats={createSeats} closeSeatForm={closeSeatForm} />;
  // const seatsListComponent = () => !showSeatForm && canvas && <SeatsList canvas={canvas} />;
  // const exportJSONComponent = () => canvas && <ExportJSON canvas={canvas} />;

  return (
    <div className="form-wrapper">
      <Button type="primary" className="btn-create" onClick={openSeatForm}>Create new seats</Button>
      {/* {moveComponent()} */}
      {seatFormComponent()}
      {/* {seatsListComponent()} */}
      {/* {exportJSONComponent()} */}
    </div>
  );
}

export default LeftSidebarContent;
