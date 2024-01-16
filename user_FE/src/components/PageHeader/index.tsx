import React from 'react';
import styles from './styles.module.scss';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PageHeader() {
  const isAuthenticated = !!Cookies.get('token');
  const history = useHistory()
  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    history.push('/login')
  };

  return (
    <div className={styles.headerWrapper}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>{isAuthenticated ? <div className={styles.logout} onClick={logout}>Logout</div> : <Link to="/login">Login</Link>}</div>
    </div>
  );
}
