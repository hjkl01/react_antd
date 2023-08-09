import React from "react";
import axios from "axios";
import { Form, Input, Button, Checkbox, message } from "antd";

import config from "./config.tsx";

async function getToken(username: string, password: string) {
  try {
    const response = await axios.post(config.baseUrl + "/api/jwtauth/token/", {
      username,
      password,
    });

    if (response.data.access) {
      const token = response.data.access;
      // 将 token 保存到本地存储中，例如使用 localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("access", "user");
      return token;
    } else {
      console.error(response.data.detail);
      // sleep(2000);
      throw new Error(response.data.detail);
    }
  } catch (error) {
    console.error("Error while fetching token:", error);
    throw error;
  }
}

// const LoginForm = () => {
function LoginForm() {
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    message.success("提交成功");
    // message.success(values.username);
    // message.success(values.password);

    try {
      const token = await getToken(values.username, values.password);
      console.log("Token", token);
      // sleep(2000);
      // window.location.reload();
      window.location.href = "/itt/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Form name="loginForm" onFinish={onFinish}>
          <Form.Item
            label="用户"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox checked={true}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
