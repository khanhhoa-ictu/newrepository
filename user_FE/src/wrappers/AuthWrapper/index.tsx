import PageHeader from 'components/PageHeader';
import Cookies from 'js-cookie';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './styles.module.scss';
import Home from 'pages/Home';

export default function PageWrapper() {
  const isAuthenticated = !!Cookies.get('token');
  console.log(isAuthenticated)

  if (!isAuthenticated) return <Redirect to="/login" />;
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainWrapper}>
        <PageHeader />
        <div className={styles.pageContent}>
          <Suspense fallback={null}>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
