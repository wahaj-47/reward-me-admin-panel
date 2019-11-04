import React from "react";

import {
	Badge,
	Jumbotron,
	Container,
	Button,
	InputGroup,
	Form,
	FormControl,
	Table
} from "react-bootstrap";

import Loader from "react-loader-spinner";
import Navbar from "../components/Navbar";

import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default class Notice extends React.Component {
	state = {
		token: this.props.token,
		noticeType: "General Notice",
		noticeMessage: "",
		title: "",
		subtitle: "",
		noticeSent: false
	};

	async componentDidMount() {
		let token = sessionStorage.getItem("token");
		this.setState({ token });
		let response = await axios.all([
			axios({
				method: "get",
				url: "/rewardMe/deviceToken/all",
				headers: {
					Authorization: "Bearer " + token
				}
			}),
			axios({
				method: "get",
				url: "/rewardMe/notice",
				headers: {
					Authorization: "Bearer " + token
				}
			})
		]);
		console.log(response);
		this.setState({
			users: response[0].data.results,
			notices: response[1].data.results
		});
	}

	handleGeneralNotice = async event => {
		event.preventDefault();
		let response = await axios({
			method: "post",
			url: "/rewardMe/notice/general",
			headers: {
				Authorization: "Bearer " + this.state.token
			},
			data: {
				title: this.state.title,
				subtitle: this.state.subtitle,
				msg: this.state.noticeMessage
			}
		});
		if (response.data.noticeSent) {
			this.setState({ noticeSent: true });
			setTimeout(() => {
				this.setState({ noticeSent: false });
			}, 2000);
		}
	};

	handlePersonalNotice = async event => {
		console.log("only once");
		event.preventDefault();
		let response = await axios({
			method: "post",
			url: "/rewardMe/notice/personal",
			headers: {
				Authorization: "Bearer " + this.state.token
			},
			data: {
				user: this.state.user,
				title: this.state.title,
				subtitle: this.state.subtitle,
				msg: this.state.noticeMessage
			}
		});
		console.log(response.data);
		if (response.data.noticeSent) {
			this.setState({ noticeSent: true });
			setTimeout(() => {
				this.setState({ noticeSent: false });
			}, 2000);
		}
	};

	handleTitleChange = event => {
		this.setState({ title: event.target.value });
	};

	handleSubtitleChange = event => {
		this.setState({ subtitle: event.target.value });
	};

	handleNoticeMessage = event => {
		this.setState({ noticeMessage: event.target.value });
	};

	handleNoticeType = event => {
		this.setState({ noticeType: event.target.value });
	};

	render() {
		const { notices } = this.state;

		return (
			<div>
				<Navbar></Navbar>
				<div>
					<div className="container">
						<div className="mt-5">
							<h1>
								<Badge variant="dark">Send a Notice</Badge>
							</h1>
							<Jumbotron fluid>
								<Container>
									<Form
										onSubmit={
											this.state.noticeType === "General Notice"
												? this.handleGeneralNotice
												: this.handlePersonalNotice
										}
									>
										<InputGroup className="mt-3">
											<InputGroup.Prepend>
												<InputGroup.Text>Notice Type</InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl
												onChange={this.handleNoticeType}
												required
												as="select"
											>
												<option>General Notice</option>
												<option>Personal Notice</option>
											</FormControl>
										</InputGroup>
										<div className="mt-3">
											<Form.Group controlId="formBasicEmail">
												<Form.Control
													required
													type="text"
													placeholder="Notice Title"
													value={this.state.title}
													onChange={this.handleTitleChange}
												/>
											</Form.Group>
											<Form.Group controlId="formBasicEmail">
												<Form.Control
													required
													type="text"
													placeholder="Notice Subtitle"
													value={this.state.subtitle}
													onChange={this.handleSubtitleChange}
												/>
											</Form.Group>
											{this.state.noticeType === "Personal Notice" && (
												<InputGroup className="mt-3">
													<InputGroup.Prepend>
														<InputGroup.Text>Recipient</InputGroup.Text>
													</InputGroup.Prepend>
													<FormControl
														required
														as="select"
														onChange={event => {
															this.setState({
																user: {
																	user_id: event.target.value.split(",")[1],
																	device_token: [
																		{
																			device_token: event.target.value.split(
																				","
																			)[0]
																		}
																	]
																}
															});
															console.log(this.state.user);
														}}
													>
														<option>Select Recipient</option>

														{typeof this.state.users === "undefined" ? (
															<div className="mt-5">
																<Loader
																	type="Oval"
																	color="#00BFFF"
																	height={100}
																	width={100}
																/>
															</div>
														) : (
															this.state.users.map(item => (
																<option
																	value={[item.device_token, item.user_id]}
																	key={item.user_id}
																>
																	{item.name}
																</option>
															))
														)}
													</FormControl>
												</InputGroup>
											)}

											<InputGroup className="mt-3">
												<FormControl
													required
													maxLength="200"
													as="textarea"
													aria-label="With textarea"
													placeholder="Notice Message"
													onChange={this.handleNoticeMessage}
													value={this.state.noticeMessage}
												/>
											</InputGroup>
										</div>
										<Button
											className="mt-3"
											block
											variant="secondary"
											type="submit"
										>
											Send
										</Button>
										{this.state.noticeSent && (
											<div className="mt-3" style={{ color: "green" }}>
												Notice Sent
											</div>
										)}
									</Form>
								</Container>
							</Jumbotron>
							<div>
								{typeof notices === "undefined" ? (
									<div className="mt-5">
										<Loader
											type="Oval"
											color="#00BFFF"
											height={100}
											width={100}
										/>
									</div>
								) : (
									<div className="mt-5">
										<h1>
											<Badge variant="dark">Published Notices</Badge>
										</h1>
										<div
											style={{
												overflow: "auto",
												position: "relative",
												height: "500px"
											}}
										>
											<Table striped bordered variant="dark" hover>
												<thead>
													<tr>
														<th>Notice Type</th>
														<th>Notice Title</th>
														<th>Notice Subtitle</th>
														<th>Notice Message</th>
														<th>Published Date</th>
													</tr>
												</thead>
												<tbody>
													{notices.map(notice => {
														return (
															<tr
																onClick={() => {
																	const MySwal = withReactContent(Swal);

																	MySwal.fire({
																		title: <p>Hello World</p>,
																		footer: "Copyright 2018",
																		onOpen: () => {
																			// `MySwal` is a subclass of `Swal`
																			//   with all the same instance & static methods
																			MySwal.clickConfirm();
																		}
																	}).then(() => {
																		return MySwal.fire({
																			title: notice.title,
																			html: `<h6>Publish Date: ${notice.publishedDate
																				.split("T")
																				.shift()}</h6><p><b>Message:</b> ${
																				notice.msg
																			}</p>`,
																			showConfirmButton: true,
																			showCancelButton: true,
																			confirmButtonText: "Close",
																			cancelButtonText: "Delete",
																			cancelButtonColor: "red"
																		}).then(result => {
																			if (
																				/* Read more about handling dismissals below */
																				result.dismiss ===
																				Swal.DismissReason.cancel
																			) {
																				axios({
																					method: "post",
																					url: "/rewardMe/notice/delete",
																					headers: {
																						Authorization:
																							"Bearer " + this.state.token
																					},
																					data: {
																						notice_id: notice.notice_id
																					}
																				})
																					.then(() => {
																						MySwal.fire(
																							"Deleted!",
																							"Notice Deleted",
																							"success"
																						);
																					})
																					.then(async () => {
																						let response = await axios({
																							method: "get",
																							url: "/rewardMe/notice",
																							headers: {
																								Authorization:
																									"Bearer " + this.state.token
																							}
																						});

																						this.setState({
																							notices: response.data.results
																						});
																					});
																			}
																		});
																	});
																}}
																key={notice.notice_id}
															>
																<td>{notice.notice_type}</td>
																<td>{notice.title}</td>
																<td>{notice.subtitle}</td>
																<td>{notice.msg}</td>
																<td>
																	{notice.publishedDate.split("T").shift()}
																</td>
															</tr>
														);
													})}
												</tbody>
											</Table>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
