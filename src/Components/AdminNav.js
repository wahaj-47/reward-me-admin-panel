import React from "react";

import { Navbar, Nav } from "react-bootstrap";

export default class AdminNav extends React.Component {
	state = {};

	render() {
		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/slots">Slots</Nav.Link>
					<Nav.Link href="/notice">Notices</Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link href="/">Log out</Nav.Link>
				</Nav>
			</Navbar>
		);
	}
}
