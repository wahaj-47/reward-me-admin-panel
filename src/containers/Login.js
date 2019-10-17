import React from "react";
import axios from "axios";
import "./login.css";
import { Form, Button, Image } from "react-bootstrap";
import Logo from "../logo.png";
import { Redirect, Link } from "react-router-dom";

export default class Login extends React.Component {
	state = { email: "", password: "", redirect: false };

	handleEmailChange = value => {
		console.log(this.state.email);
		this.setState({ email: value });
	};

	handlePasswordChange = value => {
		console.log(this.state.password);
		this.setState({ password: value });
	};

	login = () => {
		axios
			.post("/admin/login", {
				email: this.state.email,
				password: this.state.password
			})
			.then(response => {
				if (response.data.loginSuccess)
					this.setState({ redirect: true, token: response.data.token });
				else console.log(response.data);
			});
	};

	render() {
		const { redirect, token } = this.state;

		return (
			<div className="container">
				<div className="form">
					<Image src={Logo} className="logo" />
					<Form onSubmit={this.login}>
						<Form.Group controlId="formBasicEmail">
							{/* <Form.Label>Email address</Form.Label> */}
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={e => this.handleEmailChange(e.target.value)}
								value={this.state.email}
								required
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							{/* <Form.Label>Password</Form.Label> */}
							<Form.Control
								required
								type="password"
								placeholder="Password"
								onChange={e => this.handlePasswordChange(e.target.value)}
								value={this.state.password}
							/>
						</Form.Group>
						<Button
							// href="/slots"
							className="loginbutton"
							variant="info"
							type="submit"
							size="lg"
							block
						>
							Log In
						</Button>
						<Link to="/forgotpassword">Forgot Password?</Link>
					</Form>
				</div>
			</div>
		);
	}
}
