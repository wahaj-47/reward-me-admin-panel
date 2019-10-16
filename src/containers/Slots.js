import React from "react";
import "./Slots.css";

import { Table, InputGroup, FormControl } from "react-bootstrap";
import Routes from "../Routes";
import Logo from "../logo.png";
import { Link } from "react-router-dom";
import AdminNav from "../Components/AdminNav";

export default class Slots extends React.Component {
	state = {};

	render() {
		return (
			<div>
				<AdminNav></AdminNav>
				<div className="container">
					<Table striped bordered variant="dark" className="mt-5">
						<thead>
							<tr>
								<th>Slot Number</th>
								<th>Slot Value</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>
									<InputGroup size="sm">
										<InputGroup.Prepend>
											<InputGroup.Text>$</InputGroup.Text>
										</InputGroup.Prepend>
										<FormControl
											type="number"
											aria-label="Amount (to the nearest dollar)"
											placeholder="5"
											min="1"
										/>
									</InputGroup>
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		);
	}
}
