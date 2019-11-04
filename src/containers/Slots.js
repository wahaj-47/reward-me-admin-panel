import React from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./Slots.css";
import { Table, InputGroup, FormControl, Badge, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";

export default class Slots extends React.Component {
	state = { slotEdited: false };

	async componentDidMount() {
		let token = sessionStorage.getItem("token");
		this.setState({ token });
		console.log(this.props.token);
		let response = await axios({
			method: "post",
			url: "/rewardMe/slots/",
			headers: {
				Authorization: "Bearer " + token
			}
		});
		console.log(this.state);
		this.setState({ slots: response.data.results });
	}

	handleSlotChange = async (id, value) => {
		let response = await axios({
			method: "post",
			url: "/rewardMe/slots/editSlot",
			headers: {
				Authorization: "Bearer " + this.state.token
			},
			data: {
				slot_id: id,
				slot_value: value
			}
		});
		console.log(response.data);
	};

	render() {
		const { slots } = this.state;

		return (
			<div>
				<Navbar></Navbar>
				<div>
					<div className="container">
						{typeof slots === "undefined" ? (
							<div className="mt-5">
								<Loader type="Oval" color="#00BFFF" height={100} width={100} />
							</div>
						) : (
							<div className="mt-5 mb-5">
								<h1>
									<Badge variant="dark">Edit Slots</Badge>
								</h1>

								<Table striped bordered variant="dark">
									<thead>
										<tr>
											<th>Slot Number</th>
											<th>Slot Value</th>
										</tr>
									</thead>
									<tbody>
										{slots.map(slot => {
											return (
												<tr key={slot.slot_id}>
													<td>
														<p>{slot.slot_id}</p>
													</td>
													<td>
														<InputGroup size="sm">
															<InputGroup.Prepend>
																<InputGroup.Text>$</InputGroup.Text>
															</InputGroup.Prepend>
															<FormControl
																id={slot.slot_id}
																type="number"
																aria-label="Amount (to the nearest dollar)"
																placeholder={slot.slot_value}
																min="1"
																onChange={event => {
																	this.handleSlotChange(
																		event.target.id,
																		event.target.value
																	);
																}}
															/>
														</InputGroup>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
								{this.state.changesSaved && (
									<p style={{ color: "#c9c9c9" }}>Changes Saved</p>
								)}
								<Button
									onClick={event => {
										event.preventDefault();
										this.setState({ changesSaved: true });
										setTimeout(() => {
											this.setState({ changesSaved: false });
										}, 800);
									}}
								>
									Save
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
