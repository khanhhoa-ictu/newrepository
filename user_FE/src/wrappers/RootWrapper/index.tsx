import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthWrapper from 'wrappers/AuthWrapper';

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/" component={AuthWrapper} />
      </Switch>
    </div>
  );
}
