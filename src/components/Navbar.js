import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Redirect, NavLink } from "react-router-dom";
import logo from "../logo.png";
import "./Navbar.css";

export default class AdminNavbar extends React.Component {
	render() {
		if (!sessionStorage.getItem("token")) {
			return <Redirect to={`${process.env.PUBLIC_URL}/`}></Redirect>;
		}

		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand to={`${process.env.PUBLIC_URL}/slots`}>
					<img
						alt="Logo"
						src={logo}
						width="30px"
						height="30px"
						style={{ marginRight: 20 }}
						className="d-inline-block align-top"
					/>
					MH Admin Panel
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link className="navlinkCustom">
						<NavLink
							style={{ textDecoration: "none", color: "#c9c9c9" }}
							activeStyle={{
								textDecoration: "none",
								color: "#c9c9c9",
								borderBottom: "1px solid #c9c9c9"
							}}
							to={`${process.env.PUBLIC_URL}/slots`}
						>
							Slots
						</NavLink>
					</Nav.Link>
					<Nav.Link className="navlinkCustom">
						<NavLink
							activeStyle={{
								textDecoration: "none",
								color: "#c9c9c9",
								borderBottom: "1px solid #c9c9c9"
							}}
							style={{ textDecoration: "none", color: "#c9c9c9" }}
							to={`${process.env.PUBLIC_URL}/notices`}
						>
							Notice
						</NavLink>
					</Nav.Link>
					<Nav.Link className="navlinkCustom">
						<NavLink
							activeStyle={{
								textDecoration: "none",
								color: "#c9c9c9",
								borderBottom: "1px solid #c9c9c9"
							}}
							style={{ textDecoration: "none", color: "#c9c9c9" }}
							to={`${process.env.PUBLIC_URL}/users`}
						>
							Users
						</NavLink>
					</Nav.Link>
				</Nav>
				<Nav className="ml-auto">
					<Nav.Link
						className="navlink"
						onClick={() => {
							sessionStorage.removeItem("token");
						}}
					>
						<NavLink
							style={{
								textDecoration: "none",
								color: "#c9c9c9"
							}}
							to={`${process.env.PUBLIC_URL}/`}
						>
							Log Out
						</NavLink>
					</Nav.Link>
				</Nav>
			</Navbar>
		);
	}
}
