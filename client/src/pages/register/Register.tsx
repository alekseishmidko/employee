import Layout from "../../components/layout/Layout";
import { Card, Form, Input, Row, Space, Typography } from "antd";
import CustomInput from "../../components/custom-input/CustomInput";
import PasswordInput from "../../components/password-input/PasswordInput";
import { CustomButton } from "../../components/custom-button/CustomButton";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
const Register = () => {
  return (
    <Layout>
      <Row align={"middle"} justify={"center"}>
        <Card title={"enter"} style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput type="text" name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Repeat password"
            />
            <CustomButton htmlType={"submit"} type="primary">
              Create account
            </CustomButton>
          </Form>
          <Space direction={"vertical"} size={"large"}></Space>
          <Typography.Text>
            {" "}
            Do you have Account? <Link to={Paths.login}> Log in</Link>
          </Typography.Text>
        </Card>
      </Row>
    </Layout>
  );
};

export default Register;
