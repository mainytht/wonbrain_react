
import React from 'react';
import { history as router, connect } from 'umi';
import jwt_decode from 'jwt-decode';
import { Layout, Icon, Form, Input, Button, Message } from 'antd';
import styles from './index.less';

const { Content, Footer } = Layout;
const iconStyle = { color: 'rgba(0,0,0,.25)' };

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
    password: '${label} is not a validate password!',
    name: '${label} is not a validate name!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const index = ({ form, dispatch, loading }) => {
  const handleSubmit = () => {
    // form校验
    // form.validateFields((err, values) => {
    //   if (!err) {
    //     dispatch({
    //       type: 'login/login',
    //       payload: values,
    //     }).then(res => {
    //       if (res && res.state === 'suc') {
    //         const token = jwt_decode(res.token);
    //         const { id, nickname, username, type } = token;
    //         localStorage.setItem('username', username);
    //         localStorage.setItem('nickname', nickname);
    //         localStorage.setItem('userId', id);
    //         localStorage.setItem('authority', type === '0' ? 'admin' : 'user');
    //         router.push('/');
    //       } else {
    //         Message.error(res ? res.msg : '登录失败');
    //       }
    //     });
    //   }
    // });
  };
  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.form}>
          <h1>
            <img src={require('@/assets/logo2.png')} alt="logo2" />
            连线超脑
          </h1>
          {/* Form表单 */}
          <Form>
            <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
              
                <Input
                  prefix={<Icon type="user" style={iconStyle} />}
                  placeholder="请输入用户名"
                  autoFocus
                />,
           
            </Form.Item>
            <Form.Item name={['user', 'pass']} label="Password" rules={[{ required: true }]}>
             
                <Input
                  type="password"
                  prefix={<Icon type="lock" style={iconStyle} />}
                  placeholder="请输入密码"
                  autoFocus
                />,
         
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                onClick={handleSubmit}
                type="primary"
                style={{ width: '100%' }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer className={styles.footer}>
        Copyright <Icon type="copyright" /> 2020 米修在线
      </Footer>
    </Layout>
  );
};

// export default connect(({ loading }) => ({
//   loading: loading.effects['login/login'],
// }))(Form.create()(index));
export default connect(({ loading }) => ({
  loading: loading.effects['login/login'],
}))(index);