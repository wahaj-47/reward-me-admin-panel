import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import Dashboard from "./containers/Dashboard";

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<Route path="/forgotpassword" component={ForgotPassword} />
			<Route path="/resetpassword" component={ResetPassword} />
			<Route path="/dashboard" component={Dashboard} />
		</Switch>
	);
}
