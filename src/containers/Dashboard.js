import React from "react";
import { Navbar, Nav } from "react-bootstrap";
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
					<Nav
						activeKey="/Slots"
						className="mr-auto"
						onSelect={selectedKey => {
							this.setState({ tab: selectedKey });
						}}
					>
						<Nav.Link eventKey="Slots" className="navlink" selected>
							Slots
						</Nav.Link>
						<Nav.Link eventKey="Notice" className="navlink">
							Notice
						</Nav.Link>
					</Nav>
					<Nav className="ml-auto">
						<Nav.Link href="/" className="navlink">
							Log out
						</Nav.Link>
					</Nav>
				</Navbar>
				{this.state.tab === "Slots" && <Slots token={this.state.token}></Slots>}
				{this.state.tab === "Notice" && (
					<Notice token={this.state.token}></Notice>
				)}
			</div>
		);
	}
}
