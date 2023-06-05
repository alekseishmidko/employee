import Layout from "../../components/layout/Layout";
import { Card, Form, Input, Row, Space, Typography } from "antd";
import CustomInput from "../../components/custom-input/CustomInput";
import PasswordInput from "../../components/password-input/PasswordInput";
import { CustomButton } from "../../components/custom-button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useEffect, useState } from "react";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useRegisterMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-err-with-message";
import { User } from "@prisma/client";
type RegisterData = Omit<User, "id"> & { confirmPassword: string };

const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const onClickRegister = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align={"middle"} justify={"center"}>
        <Card title={"enter"} style={{ width: "30rem" }}>
          <Form onFinish={onClickRegister}>
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
