import './ExportJSON.css';
import { Button } from 'antd';

import Canvas from '../../modules/Canvas';

interface IProps {
    canvas: Canvas
}

function ExportJSON(props: IProps) {
  const { canvas } = props;

  function download(content: string, fileName: string, contentType: string) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  const onClick = () => {
    const content = canvas.seats?.objects;
    if (!content) {
      return;
    }
    download(JSON.stringify(content), 'seat-map.txt', 'text/plain');
  };

  return (
    <Button onClick={onClick}>Export JSON</Button>
  );
}

export default ExportJSON;
