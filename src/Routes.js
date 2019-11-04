import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import Notices from "./containers/Notice";
import Slots from "./containers/Slots";
import Users from "./containers/User";

export default function Routes() {
	return (
		<Switch>
			<Route path={`${process.env.PUBLIC_URL}/`} exact component={Login} />
			<Route
				path={`${process.env.PUBLIC_URL}/forgotpassword`}
				component={ForgotPassword}
			/>
			<Route
				path={`${process.env.PUBLIC_URL}/resetpassword`}
				component={ResetPassword}
			/>
			<Route path={`${process.env.PUBLIC_URL}/notices`} component={Notices} />
			<Route path={`${process.env.PUBLIC_URL}/slots`} component={Slots} />
			<Route path={`${process.env.PUBLIC_URL}/users`} component={Users} />
		</Switch>
	);
}
