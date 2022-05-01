import './CreateSeats.css';
import { Form, Button, InputNumber, Typography } from 'antd';
import { ICreateSeatsParams } from '../../modules/Seats/index';

const { Title } = Typography;

interface IProps {
  createSeats: Function;
  closeSeatForm: Function
}

function CreateSeats(props: IProps) {
  const { createSeats, closeSeatForm } = props;

  const onFinish = (values: ICreateSeatsParams) => {
    createSeats(values);
    closeSeatForm();
  };

  const onFinishFailed = (errorInfo: any) => {
    alert(`Failed: ${JSON.stringify(errorInfo)}`);
  };

  return (
    <>
      <Title level={3}>Create seat map</Title>
      <Form
        name="basic"
        initialValues={{ row: 10, column: 10, size: 32, price: 50 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Row"
          name="row"
          rules={[{ required: true, message: 'Please add row!' }]}
        >
          <InputNumber min={2} max={10000} />
        </Form.Item>

        <Form.Item
          label="Column"
          name="column"
          rules={[{ required: true, message: 'Please add column!' }]}
        >
          <InputNumber min={2} max={10000} />
        </Form.Item>

        <Form.Item
          label="Size of box"
          name="size"
          rules={[{ required: true, message: 'Please add size!' }]}
        >
          <InputNumber min={16} max={100} />
        </Form.Item>

        <Form.Item
          label="Default price"
          name="price"
        >
          <InputNumber min={1} max={100000} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateSeats;
