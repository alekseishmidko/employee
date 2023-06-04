import React from "react";
import styles from "./index.module.css";
import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { CustomButton } from "../custom-button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";
const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickExit = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type={"ghost"}>
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="ghost"
          icon={<LogoutOutlined />}
          onClick={onClickExit}
        >
          {" "}
          Exit
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton type={"ghost"} icon={<UserOutlined />}>
              to register
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton type={"ghost"} icon={<LoginOutlined />}>
              enter
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};

export default Header;
