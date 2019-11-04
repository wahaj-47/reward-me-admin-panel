import React from "react";
import "./login.css";
import { Form, Button, Image } from "react-bootstrap";
import axios from "axios";
import Logo from "../logo2.png";

export default class ForgotPassword extends React.Component {
	state = { email: "" };

	handleEmailChange = event => {
		this.setState({ email: event.target.value });
		console.log(this.state);
	};

	handleSubmit = async event => {
		event.preventDefault();
		let response = await axios.post("/rewardMe/admin/reset", {
			email: this.state.email
		});
		console.log(response);
		if (response.data.emailSent) {
			this.props.history.push(`${process.env.PUBLIC_URL}/resetpassword`, {
				email: this.state.email
			});
		} else {
			this.setState({ incorrect: true });
			setTimeout(() => {
				this.setState({ incorrect: false });
			}, 1000);
		}
	};

	render() {
		return (
			<div className="container">
				<div className="form">
					<Image src={Logo} className="logo" />
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="formBasicEmail">
							{/* <Form.Label>Email address</Form.Label> */}
							<Form.Control
								onChange={this.handleEmailChange}
								value={this.state.email}
								type="email"
								placeholder="Enter email"
							/>
						</Form.Group>
						{this.state.incorrect && (
							<Form.Text style={{ color: "red", marginBottom: 20 }}>
								Incorrect Email
							</Form.Text>
						)}
						<Button
							className="resetpassword"
							variant="info"
							type="submit"
							size="lg"
							block
						>
							Reset Password
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}
