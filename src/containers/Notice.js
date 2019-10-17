import React from "react";

import {
	Badge,
	Jumbotron,
	Container,
	Dropdown,
	DropdownButton,
	Button,
	ButtonGroup,
	InputGroup,
	FormControl
} from "react-bootstrap";
import AdminNav from "../Components/AdminNav";

export default class Notice extends React.Component {
	state = { noticeType: "Notice Type" };

	handleNoticeType = eventKey => {
		this.setState({ noticeType: eventKey });
	};

	render() {
		return (
			<div>
				<AdminNav></AdminNav>
				<div className="container">
					<div className="mt-5">
						<h1>
							<Badge variant="dark">Send a Notice</Badge>
						</h1>
						<Jumbotron fluid>
							<Container>
								<Dropdown as={ButtonGroup}>
									{/* <Button variant="secondary">{this.state.noticeType}</Button> */}

									{/* <Dropdown.Toggle
										variant="secondary"
										id="dropdown-split-basic"
									>
										{this.state.noticeType}
									</Dropdown.Toggle> */}

									<DropdownButton
										title={this.state.noticeType}
										variant="secondary"
									>
										<Dropdown.Item
											eventKey="General Notice"
											onSelect={this.handleNoticeType}
										>
											General Notice
										</Dropdown.Item>
										<Dropdown.Item
											eventKey="Personal Notice"
											onSelect={this.handleNoticeType}
										>
											Personal Notice
										</Dropdown.Item>
									</DropdownButton>
								</Dropdown>
								{this.state.noticeType === "Personal Notice" && (
									<InputGroup className="mt-3">
										<InputGroup.Prepend>
											<InputGroup.Text>Select Users</InputGroup.Text>
										</InputGroup.Prepend>
										<FormControl as="select" multiple>
											<option>User 1</option>
											<option>User 2</option>
											<option>User 3</option>
											<option>User 4</option>
											<option>User 5</option>
										</FormControl>
									</InputGroup>
								)}
								{this.state.noticeType !== "Notice Type" && (
									<InputGroup className="mt-3">
										<InputGroup.Prepend>
											<InputGroup.Text>Notice Message</InputGroup.Text>
										</InputGroup.Prepend>
										<FormControl as="textarea" aria-label="With textarea" />
									</InputGroup>
								)}
								<Button className="mt-3" block variant="secondary">
									Send
								</Button>
							</Container>
						</Jumbotron>
					</div>
				</div>
			</div>
		);
	}
}
