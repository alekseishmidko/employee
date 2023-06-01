import React from "react";
import Layout from "../../components/layout/Layout";
import { Card, Form, Input, Row, Space, Typography } from "antd";
import CustomInput from "../../components/custom-input/CustomInput";
import PasswordInput from "../../components/password-input/PasswordInput";
import { CustomButton } from "../../components/custom-button/CustomButton";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-err-with-message";
import ErrorMessage from "../../components/error-message/ErrorMessage";

const Login = () => {
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = React.useState("");
  const onClickLogin = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("unknown error");
      }
    }
  };
  return (
    <Layout>
      <Row align={"middle"} justify={"center"}>
        <Card title={"enter"} style={{ width: "30rem" }}>
          <Form onFinish={onClickLogin}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />

            <CustomButton htmlType={"submit"} type="primary">
              to log in
            </CustomButton>
          </Form>
          <Space direction={"vertical"} size={"large"}></Space>
          <Typography.Text>
            Havent Acc? <Link to={Paths.register}> Create account</Link>
          </Typography.Text>
          <ErrorMessage message={error} />
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
