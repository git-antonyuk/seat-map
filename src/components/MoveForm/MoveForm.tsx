import './MoveForm.css';
import { Slider } from 'antd';
// import { UpCircleOutlined, LeftCircleOutlined, RightCircleOutlined, DownCircleOutlined } from '@ant-design/icons';

import Canvas from '../../modules/Canvas/index';

interface IProps {
  canvas: Canvas | null
}

function MoveForm(props: IProps) {
  const { canvas } = props;

  const onChange = (zoomValue: number) => {
    canvas?.seats?.setZoom(zoomValue);
  };

  return (
    <>
      {/* <p>Move seats object</p>
      <div className="move-form">
        <Button type="primary" icon={<UpCircleOutlined />} onClick={() => canvas?.seats?.moveUp()} />
        <div className="row">
          <Button type="primary" icon={<LeftCircleOutlined />} onClick={() => canvas?.seats?.moveLeft()} />
          <Button type="primary" icon={<RightCircleOutlined />} onClick={() => canvas?.seats?.moveRight()} />
        </div>
        <Button type="primary" icon={<DownCircleOutlined />} onClick={() => canvas?.seats?.moveDown()} />
      </div> */}
      <p>Zoom</p>
      <Slider
        min={0}
        max={3}
        onChange={onChange}
        defaultValue={1}
        step={0.01}
      />
    </>
  );
}

export default MoveForm;
