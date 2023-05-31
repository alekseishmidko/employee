import React from "react";
import Layout from "../../components/layout/Layout";
import { Card, Form, Input, Row, Space, Typography } from "antd";
import CustomInput from "../../components/custom-input/CustomInput";
import PasswordInput from "../../components/password-input/PasswordInput";
import { CustomButton } from "../../components/custom-button/CustomButton";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

const Login = () => {
  return (
    <Layout>
      <Row align={"middle"} justify={"center"}>
        <Card title={"enter"} style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />

            <CustomButton htmlType={"submit"} type="primary">
              {" "}
              to log in{" "}
            </CustomButton>
          </Form>
          <Space direction={"vertical"} size={"large"}></Space>
          <Typography.Text>
            {" "}
            Havent Acc? <Link to={Paths.register}> Create account</Link>
          </Typography.Text>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
