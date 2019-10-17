import React from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./Slots.css";

import { Table, InputGroup, FormControl } from "react-bootstrap";
import AdminNav from "../Components/AdminNav";

export default class Slots extends React.Component {
	state = {};

	async componentDidMount() {
		let response = await axios({
			method: "post",
			url: "/slots/",
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGFzaGlydGloYW1pcGtAZ21haWwuY29tIiwiaGFzaCI6IjgyN2NjYjBlZWE4YTcwNmM0YzM0YTE2ODkxZjg0ZTdiIn0sImlhdCI6MTU3MTA0MzM3OX0.uOGq5PAyK_gudEEM3-bUE3YMbpqE-vn_qMrySK22guk"
			}
		});
		this.setState({ slots: response.data.results });
	}

	render() {
		const { slots } = this.state;
		console.log(slots);
		return (
			<div>
				<AdminNav></AdminNav>
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
														type="number"
														aria-label="Amount (to the nearest dollar)"
														placeholder={slot.slot_value}
														min="1"
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
