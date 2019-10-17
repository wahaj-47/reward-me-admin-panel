import React from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./Slots.css";
import { Table, InputGroup, FormControl } from "react-bootstrap";

export default class Slots extends React.Component {
	state = {};

	async componentDidMount() {
		console.log(this.props.token);
		let response = await axios({
			method: "post",
			url: "/slots/",
			headers: {
				Authorization: "Bearer " + this.props.token
			}
		});
		console.log(this.state);
		this.setState({ slots: response.data.results });
	}

	handleSlotChange = async (id, value) => {
		let response = await axios({
			method: "post",
			url: "/slots/editSlot",
			headers: {
				Authorization: "Bearer " + this.props.token
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
				<div className="container">
					{typeof slots === "undefined" ? (
						<div className="mt-5">
							<Loader type="Oval" color="#00BFFF" height={100} width={100} />
						</div>
					) : (
						<Table striped bordered variant="dark" className="mt-5">
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
											<td>{slot.slot_id}</td>
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
					)}
				</div>
			</div>
		);
	}
}
