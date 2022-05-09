import './Canvas.css';
import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Canvas from '../../modules/Canvas/index';
import { ICreateSeatsParams } from '../../modules/Seats/index';
// import FormWrapper from '../FormWrapper/FormWrapper';
// import FormSeat from '../FormSeat/FormSeat';
// import { ISeatObject } from '../../modules/Seats/createData';
import LeftSidebarContent from '../LeftSidebarContent/LeftSidebarContent';

const { Content, Sider } = Layout;

function Map() {
  const [canvas, setCanvas] = useState<null | Canvas>(null);
  // const [showModal, setShowModal] = useState<boolean>(false);
  // const [singleSeatData, setSingleSeatData] = useState<any>(null);

  // const callbackGetClickedObject = (item: ISeatObject) => {
  //   if (!item) {
  //     return;
  //   }
  //   setSingleSeatData(item);

  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  // const saveSeatData = (object: ISeatObject) => {
  //   canvas?.seats?.editObject(object);
  //   closeModal();
  // };

  useEffect(() => {
    const canvasInstance = new Canvas({
      id: '#canvas',
    });

    setCanvas(canvasInstance);
  }, []);

  const createSeats = (params: ICreateSeatsParams) => {
    if (!canvas) {
      return;
    }

    canvas.createSeats(params);
  };

  return (
    <>
      <Sider>
        <LeftSidebarContent
          // canvas={canvas}
          createSeats={createSeats}
        />
      </Sider>
      <Content>
        <div className="wrapper">
          <canvas id="canvas" />
        </div>
      </Content>
      {/* <FormSeat visible={showModal} close={closeModal} save={saveSeatData} seatData={singleSeatData} /> */}
      {/* <FormWrapper
        canvas={canvas}
        createSeats={createSeats}
      /> */}
    </>
  );
}

export default Map;
