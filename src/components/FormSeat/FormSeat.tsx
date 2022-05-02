import './FormSeat.css';
import { Modal, Form, Button, InputNumber, Switch } from 'antd';
import { getTitle } from '../../utils/componentGetters/index';
import { ISeatObject } from '../../modules/Seats/createData';

interface IProps {
    visible: boolean;
    save: Function;
    close: Function;
    seatData: ISeatObject;
}

function FormSeat(props: IProps) {
  const { visible, save, close, seatData } = props;

  const onFinish = (value: any) => {
    save({
      ...seatData,
      ...value,
    });
  };

  const handleCancel = () => {
    close();
  };

  return (
    <Modal title={getTitle(seatData)} visible={visible} onCancel={handleCancel} footer={null}>
      <Form
        key={seatData?.id || 0}
        name="basic"
        initialValues={{ price: seatData?.price || 0, disabled: !!seatData?.disabled }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please add price!' }]}
        >
          <InputNumber min={1} max={1000000} />
        </Form.Item>
        <Form.Item
          label="Disabled"
          name="disabled"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormSeat;
