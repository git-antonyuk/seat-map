import './Canvas.css';
import { useEffect, useState } from 'react';
import Canvas from '../../modules/Canvas/index';
import { ICreateSeatsParams } from '../../modules/Seats/index';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormSeat from '../FormSeat/FormSeat';
import { ISeatObject } from '../../modules/Seats/createData';

function Map() {
  const [canvas, setCanvas] = useState<null | Canvas>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [singleSeatData, setSingleSeatData] = useState<any>(null);

  const callbackGetClickedObject = (item: ISeatObject) => {
    if (!item) {
      return;
    }
    setSingleSeatData(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const saveSeatData = (object: ISeatObject) => {
    console.log('%c 🌽 object: ', 'font-size:12px;background-color: #B03734;color:#fff;', object);
    canvas?.seats?.editObject(object);
    closeModal();
  };

  useEffect(() => {
    const canvasInstance = new Canvas({
      id: '#canvas',
      callbackGetClickedObject,
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
      <FormSeat visible={showModal} close={closeModal} save={saveSeatData} seatData={singleSeatData} />
      <FormWrapper canvas={canvas} createSeats={createSeats} />
      <canvas id="canvas" />
    </>
  );
}

export default Map;
