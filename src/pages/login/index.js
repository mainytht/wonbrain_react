import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import styles from './index.less';
import {connect} from 'umi';


const Login = props => {
  // props 是约定的参数，可以解构{history 。。。。}
  console.log(props);
  
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const handleSubmit=()=>{
    console.log("handlesubmit")

  };


  return (
    <Form
      className={styles.form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18, offset: 0 }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
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
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox align="center">Remember me</Checkbox>
      </Form.Item>

      <Form.Item >
        <Button
          align="center"
          type="primary"
          htmlType="submit"
          // loading={loading}
          onClick={handleSubmit}
          type="primary"
          style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['login/login'],
}))(Login);
