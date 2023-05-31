import React from "react";
import styles from "./index.module.css";
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { CustomButton } from "../custom-button/CustomButton";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
const Header = () => {
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
    </Layout.Header>
  );
};

export default Header;
