import { Form, Input } from "antd";
type Props = { name: string; placeholder: string; type?: string };
const CustomInput = ({ name, placeholder, type = "text" }: Props) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: "field is required" }]}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};

export default CustomInput;
