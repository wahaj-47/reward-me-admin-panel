import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import Admin from "./containers/Admin";

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<Route path="/forgotpassword"  component={ForgotPassword} />
			<Route path="/resetpassword"  component={ResetPassword} />
			<Route path="/admin"  component={Admin} />
		</Switch>
	);
}
