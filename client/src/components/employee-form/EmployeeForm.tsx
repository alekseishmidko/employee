import { Employee } from "@prisma/client";
import { CustomButton } from "../custom-button/CustomButton";
import CustomInput from "../custom-input/CustomInput";
import { Space, Form, Card } from "antd";
import ErrorMessage from "../error-message/ErrorMessage";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};
const EmployeeForm = ({
  onFinish,
  btnText,
  title,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <div>
      <Card title={title} style={{ width: "30rem" }}>
        <Form name="add-employee" onFinish={onFinish} initialValues={employee}>
          <CustomInput type="text" name="firstName" placeholder="Имя" />
          <CustomInput name="lastName" placeholder="Фамилия" />
          <CustomInput type="number" name="age" placeholder="Возраст" />
          <CustomInput name="address" placeholder="Адрес" />
          <Space direction="vertical" size="large">
            <ErrorMessage message={error} />
            <CustomButton htmlType="submit">{btnText}</CustomButton>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default EmployeeForm;
