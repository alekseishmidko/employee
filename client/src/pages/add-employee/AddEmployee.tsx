import React from "react";
import Layout from "../../components/layout/Layout";
import { Row } from "antd";
import EmployeeForm from "../../components/employee-form/EmployeeForm";
import {
  addEmployee,
  useAddEmployeeMutation,
} from "../../app/services/employees";
import { Employee } from "@prisma/client";
import { error } from "console";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-err-with-message";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

const AddEmployee = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = React.useState("");
  const [addEmployee] = useAddEmployeeMutation();
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();

      navigate(`${Paths.status}/created`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          onFinish={handleAddEmployee}
          title="Add Employee"
          btnText="Add"
          error={error}
        />
      </Row>
    </Layout>
  );
};

export default AddEmployee;
