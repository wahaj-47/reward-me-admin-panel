import React from "react";
import "./admin.css";
import { Form, Button, Image } from "react-bootstrap";
import Logo from "../logo.png";

export default class ResetPassword extends React.Component {
	state = {};

	render() {
		return (
			<div className="container">
				<div className="form">
					<Image src={Logo} className="logo" />
					<Form>
						<Form.Group controlId="formBasicCode">
							{/* <Form.Label>Verification Code</Form.Label> */}
							<Form.Control type="text" placeholder="Enter verification code" />
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							{/* <Form.Label>Password</Form.Label> */}
							<Form.Control type="password" placeholder="New Password" />
						</Form.Group>

						
						<Button href="/" className="loginbutton" variant="info" type="submit" size="lg" block>
							Confirm New Password
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}
