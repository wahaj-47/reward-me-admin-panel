import React from "react";
import "./App.css";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
	console.log(process.env.PUBLIC_URL);

	return (
		<div className="App">
			<Routes />
		</div>
	);
}

export default App;
