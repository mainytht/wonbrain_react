import React, { useState, useRef } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import styles from './index.less';
import { request } from 'umi';
import { history as router } from 'umi';

export default function Login(props) {
  // props 是约定的参数，可以解构出{history 。。。。} 等
  // console.log(props);
  const [message, setMessage] = useState(0);
  // onFinish 也就是 缺省的submit
  const onFinish = values => {
    console.log('Success and form data is:', values);
    request('/api/login', {
      method: 'post',
      data: {
        username: values.username,
        password: values.password,
      },
    })
      .then(data => {
        console.log(data);
        if (data.type === 1) {
          // 状态为1 说明 登录成功
          //react 的request解析后，去除了一级data，与 vue不同
          setMessage({
            message: data.text,
            type: 'success',
          });
          localStorage.setItem('token', data.token);
          router.push('todoList');
        } else {
          // 状态为0 说明出现了一些错误
          setMesage(data);
        }
      })
      .catch(err => {
        console.log('err occured');
        console.log(err);
      });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className={styles.form}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelAlign="left"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
        offset: 0,
      }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox align="center"> Remember me </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          align="center"
          type="primary"
          htmlType="submit"
          // loading={loading}
          // onClick={
          //   handleSubmit
          // }
          type="primary"
          style={{ width: '100%' }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
