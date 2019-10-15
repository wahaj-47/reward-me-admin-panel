import React from "react";
import "./login.css";
import { Form, Button, Image } from "react-bootstrap";
import Logo from "../logo.png";
import {Link } from "react-router-dom";

export default class Login extends React.Component {
	state = {};

	render() {
		return (
			<div className="container">
				<div className="form">
					<Image src={Logo} className="logo" />
					<Form>
						<Form.Group controlId="formBasicEmail">
							{/* <Form.Label>Email address</Form.Label> */}
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							{/* <Form.Label>Password</Form.Label> */}
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
						<Button href="/admin" className="loginbutton" variant="info" type="submit" size="lg" block>
							Log In
						</Button>
						<Link to="/forgotpassword">Forgot Password?</Link>
					</Form>
				</div>
			</div>
		);
	}
}
