import React from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./Slots.css";
import { Table, Badge } from "react-bootstrap";
import Navbar from "../components/Navbar";

export default class Slots extends React.Component {
	state = {};

	async componentDidMount() {
		let token = sessionStorage.getItem("token");
		this.setState({ token });
		let response = await axios({
			method: "post",
			url: "/rewardMe/users/",
			headers: {
				Authorization: "Bearer " + token
			}
		});
		console.log(response.data);
		this.setState({ users: response.data.users });
	}

	render() {
		const { users } = this.state;

		return (
			<div>
				<Navbar></Navbar>
				<div>
					<div className="container">
						{typeof users === "undefined" ? (
							<div className="mt-5">
								<Loader type="Oval" color="#00BFFF" height={100} width={100} />
							</div>
						) : (
							<div className="mt-5">
								<h1>
									<Badge variant="dark">Registered Users</Badge>
								</h1>
								<p
									style={{
										fontSize: "1.5em",
										fontWeight: "bold",
										color: "white"
									}}
								>
									Total Users: {users.length}
								</p>
								<div
									style={{
										overflow: "auto",
										position: "relative",
										height: "500px"
									}}
								>
									<Table striped bordered variant="dark">
										<thead>
											<tr>
												<th>User Name</th>
												<th>Email</th>
											</tr>
										</thead>
										<tbody>
											{users.map(user => {
												return (
													<tr key={user.user_id}>
														<td>{user.name}</td>
														<td>{user.email}</td>
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
		);
	}
}
