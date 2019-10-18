import React from "react";
import "./Dashboard.css";
import { Navbar, Nav, Row, Col, Container } from "react-bootstrap";
import Slots from "./Slots";
import Notice from "./Notice";
import { Redirect } from "react-router-dom";

export default class Dashboard extends React.Component {
	state = { loggedIn: false, token: "", tab: "Slots" };

	UNSAFE_componentWillMount() {
		if (typeof this.props.location.state !== "undefined") {
			console.log(this.props.location.state.token);
			this.setState({ loggedIn: true, token: this.props.location.state.token });
		}
	}

	render() {
		const { loggedIn } = this.state;

		if (!loggedIn) {
			return <Redirect to="/"></Redirect>;
		}

		return (
			<div>
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
					<Nav className="ml-auto">
						<Nav.Link href="/" className="navlink">
							Log out
						</Nav.Link>
					</Nav>
				</Navbar>
				<Container fluid>
					<Row>
						<Col md={8} sm={12}>
							<div>
								<h1>Analytics goes here</h1>
							</div>
						</Col>
						<Col md={4} sm={12}>
							<Notice token={this.state.token}></Notice>
							<Slots token={this.state.token}></Slots>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
