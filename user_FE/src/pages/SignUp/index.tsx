import { Button, Card, Form, Input, message, Row } from 'antd';
import { signUp } from 'api/authentication';
import logo from 'assets/logo/logoLogin.png';
import { handleErrorMessage } from 'helper';
import Cookies from 'js-cookie';
import _ from 'lodash';
import React from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { ISignUp } from 'types/userType';
import styles from './style.module.scss';

export default function SignUp() {
  const history = useHistory();

  const isAuthenticated = !!Cookies.get('token');
  if (isAuthenticated) return <Redirect to="/" />;

  const handleSubmit = async (payload: ISignUp) => {
    const params = _.pick(payload, ['username', 'password', 'confirm']);
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const testScript =
      SCRIPT_REGEX.test(params.username) || SCRIPT_REGEX.test(params.password) || SCRIPT_REGEX.test(params.confirm);
    if (testScript) {
      message.destroy();
      message.error('Đăng ký thất bại');
      return;
    }
    try {
      await signUp(params);
      message.destroy();
      message.success('Đăng ký thành công');
      history.push('/login');
    } catch (error) {
      console.log(error)
      handleErrorMessage(error);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.wrapperSignUp}>
        <Card bordered className={styles.signUpForm}>
          <Row justify="center" className={styles.formTitle}>
            <h1>Register</h1>
          </Row>
          <Form onFinish={handleSubmit} className={styles.formContainer}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tài khoản',
                  whitespace: true,
                },
              ]}
              labelAlign="left"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className={styles.customInputSignUp} placeholder={'Tên tài khoản'} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
              labelAlign="left"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.Password className={styles.customInputSignUp} placeholder={'Mật khẩu'} />
            </Form.Item>
            <Form.Item
              name="confirm"
              rules={[
                { required: true, message: 'password không được để trống' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('mật khẩu không trùng khớp'));
                  },
                }),
              ]}
              dependencies={['password']}
              labelAlign="left"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.Password className={styles.customInputSignUp} placeholder={'Xác nhận mật khẩu'} />
            </Form.Item>
            <Form.Item labelCol={{ span: 24 }}>
              <Button block type="primary" htmlType="submit" className={styles.btnSignUp}>
                Đăng ký
              </Button>
            </Form.Item>
            <Form.Item labelCol={{ span: 24 }}>
              <p>
                <NavLink to="/login">Đăng nhập</NavLink>
              </p>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
