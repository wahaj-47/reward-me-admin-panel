import React from "react";
import "./admin.css";

import { Form, Navbar, Nav,  Button, Image } from "react-bootstrap";
import Logo from "../logo.png";
import {Link } from "react-router-dom";

export default class Admin extends React.Component {
	state = {};

	render() {
		return (
			<div>
				<Navbar bg="dark" variant="dark">
						<Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
						<Nav className="mr-auto">
						<Nav.Link href="#home">Slots</Nav.Link>
						<Nav.Link href="#features">Notices</Nav.Link>
						</Nav>
						<Nav>
							<Nav.Link href="/">Log out</Nav.Link>
							</Nav>
				</Navbar>
				<div className="container">	

				</div>
				
			</div>
		);
	}
}
