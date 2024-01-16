import { Button, Card, Form, Input, message, Row } from 'antd';
import { login } from 'api/authentication';
import logoLogin from 'assets/login/login-1.svg';
import logo from 'assets/logo/logoLogin.png';
import { handleErrorMessage } from 'helper';
import Cookies from 'js-cookie';
import _ from 'lodash';
import React from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { ILogin } from 'types/userType';
import styles from './style.module.scss';
export default function Login() {
  const history = useHistory();
  const isAuthenticated = !!Cookies.get('token');
  if (isAuthenticated) return <Redirect to="/" />;

  const handleSubmit = async (payload: any) => {
   
    try {
      const data = await login(payload);
      const { token, refreshToken } = data;
      Cookies.set('token', token, {
        expires: 10000,
      });
      Cookies.set('refreshToken', refreshToken, {
        expires: 10000,
      });
      history.push('/');
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.wrapperLogin}>
        <div className={styles.formContainer}>
          <Card bordered className={styles.loginForm}>
            <Row justify="center" className={styles.formTitle}>
              <h1>Login</h1>
            </Row>
            <Form onFinish={handleSubmit} className={styles.formContainerItem}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Username không được để trống',
                  },
                ]}
                wrapperCol={{ span: 24 }}
              >
                <Input className={styles.customInputLogin} placeholder="Tên tài khoản" maxLength={50} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Password không được để trống' }]}
                wrapperCol={{ span: 24 }}
              >
                <Input.Password className={styles.customInputLogin} placeholder="Mật khẩu" maxLength={50} />
              </Form.Item>
              <Form.Item labelCol={{ span: 24 }}>
                <Button block type="primary" htmlType="submit" className={styles.btnLogin}>
                  {'Đăng nhập'}
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card className={styles.signUp} bordered>
            <Row justify="center" className={styles.formTitle}>
              <h3>
                Nếu chưa có tài khoản vui lòng <NavLink to="/sign-up">đăng ký</NavLink>
              </h3>
            </Row>
          </Card>
        </div>

        <div className={styles.rightDriver}>
          <svg
            preserveAspectRatio="none"
            width="102px"
            height="1080px"
            viewBox="0 0 102 1080"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" strokeWidth="1" fillRule="evenodd">
              <g fillRule="nonzero">
                <g transform="translate(51.000000, 540.000000) rotate(90.000000) translate(-51.000000, -540.000000) translate(-489.000000, 489.000000)">
                  <g transform="translate(540.000000, 51.000000) rotate(180.000000) translate(-540.000000, -51.000000) ">
                    <path
                      d="M0,7.9621684 C164.947265,47.9621684 344.947265,54.6288351 540,27.9621684 C735.052736,1.2955018 915.052736,14.6288351 1080,67.9621684 L1080,102 L0,102 L0,7.9621684 Z"
                      fillOpacity="0.457"
                    ></path>
                    <path
                      d="M0,37.9621684 C169.028912,88.578393 349.028912,88.578393 540,37.9621684 C730.97109,-12.6540561 910.97109,-12.6540561 1080,37.9621684 L1080,102 L0,102 L0,37.9621684 Z"
                      transform="translate(540.000000, 51.000000) scale(-1, 1) translate(-540.000000, -51.000000) "
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className={styles.wrapperImage}>
        <img src={logoLogin} alt="" />
      </div>
    </div>
  );
}
