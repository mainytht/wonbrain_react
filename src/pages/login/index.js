import React, { useState, useRef } from 'react';
import { Form, Input, Button, Checkbox, Tabs } from 'antd';
import styles from './index.less';
import { request } from 'umi';
import { history as router } from 'umi';
const { TabPane } = Tabs;

export default function Login(props) {
  // props 是约定的参数，可以解构出{history 。。。。} 等
  // console.log(props);
  const [loginmessage, setLoginmessage] = useState('');
  // onFinish 也就是 缺省的submit

  const onLoginFinish = values => {
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
          setLoginmessage('登录成功');
          localStorage.setItem('token', data.token);
          router.push('first');
        } else {
          // 状态为0 说明出现了一些错误
          setLoginmessage('用户名或密码错误');
        }
      })
      .catch(err => {
        console.log('err occured');
        console.log(err);
        setLoginmessage('发送请求错误');
      });
  };

  const onLoginFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onRegistFinish = values => {
    console.log(values);
    request('/api/regist', {
      method: 'post',
      data: {
        username: values.username,
        password: values.password,
      },
    })
      .then(data => console.log(data))

      .catch(err => console.log(err));
  };

  const onRegistFinishFailed = errorInfo => {
    console.log(errorInfo);
  };

  return (
    <div className={styles.loginbox}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="账号登录" key="1">
          <h1>
            {/* <img src={require('@/assets/logo2.png')} alt="logo2" /> */}
            连线超脑
          </h1>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            className={styles.form}
            initialValues={{
              remember: true,
            }}
            onFinish={onLoginFinish}
            onFinishFailed={onLoginFinishFailed}
            labelAlign="left"
            // labelCol={{
            //   span: 6,
            // }}
            // wrapperCol={{
            //   span: 18,
            //   offset: 0,
            // }}
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
              <Button align="center" type="primary" htmlType="submit">
                登录
              </Button>
              <span>{loginmessage}</span>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="账号注册" key="2">
          <h1>
            {/* <img src={require('@/assets/logo2.png')} alt="logo2" /> */}
            注册超脑
          </h1>
          {/* Form表单 */}
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            /*
            教程内用法不同
            */
            className={styles.form}
            initialValues={{
              remember: true,
            }}
            onFinish={onRegistFinish}
            onFinishFailed={onRegistFinishFailed}
            labelAlign="left"
            // labelCol={{
            //   span: 6,
            // }}
            // wrapperCol={{
            //   span: 18,
            //   offset: 0,
            // }}
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

            <Form.Item>
              <Button align="center" type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
}
