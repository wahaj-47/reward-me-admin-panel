import React from "react";
import "./login.css";
import { Form, Button, Image } from "react-bootstrap";
import Logo from "../logo.png";

export default class ForgotPassword extends React.Component {
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

						
						<Button href="/resetpassword" className="resetpassword" variant="info" type="submit" size="lg" block>
							Send Verification Code
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}
