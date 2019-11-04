import React from "react";
import "./login.css";
import { Form, Button, Image } from "react-bootstrap";
import Logo from "../logo2.png";
import axios from "axios";

export default class ResetPassword extends React.Component {
	state = {
		email: this.props.history.location.state.email,
		verificationCode: "",
		password: ""
	};

	handleSubmit = async event => {
		event.preventDefault();

		let response = await axios.post("/rewardMe/admin/updatePassword", {
			email: this.state.email,
			password: this.state.password,
			verificationCode: this.state.verificationCode
		});

		console.log(response);

		if (response.data.passwordUpdated) {
			this.setState({ passwordUpdated: true });
			setTimeout(() => {
				this.setState({ passwordUpdated: false });
				this.props.history.push(`${process.env.PUBLIC_URL}/`);
			}, 700);
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
						<p style={{ color: "white" }}>
							A verification code was sent to your email
						</p>
						<Form.Group controlId="formBasicCode">
							{/* <Form.Label>Verification Code</Form.Label> */}
							<Form.Control
								value={this.state.verificationCode}
								onChange={event => {
									this.setState({ verificationCode: event.target.value });
								}}
								type="text"
								placeholder="Enter verification code"
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							{/* <Form.Label>Password</Form.Label> */}
							<Form.Control
								value={this.state.password}
								onChange={event => {
									this.setState({ password: event.target.value });
								}}
								type="password"
								placeholder="New Password"
							/>
						</Form.Group>
						{this.state.incorrect && (
							<Form.Text style={{ color: "red", marginBottom: 20 }}>
								Incorrect Code
							</Form.Text>
						)}
						<Button
							className="loginbutton"
							variant="info"
							type="submit"
							size="lg"
							block
						>
							Confirm New Password
						</Button>
						{this.state.passwordUpdated && (
							<p style={{ marginTop: 10, color: "green", fontWeight: "bold" }}>
								Password Updated Successfully
							</p>
						)}
					</Form>
				</div>
			</div>
		);
	}
}
