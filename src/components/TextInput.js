import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function TextInput() {
	const [name, setName] = React.useState("");
	const [set, setSet] = React.useState(false);

	const regxUN = /^[a-zA-Z]+$/;
	const handleInput = (e) => {
		let input = e.target.value.toLowerCase();
		input = regxUN.test(input) || input == "" ? input : name;
		setName(input.toUpperCase());
	};

	const handleSet = () => {
		setSet(true);
	};

	const handleReset = () => {
		setSet(false);
	};

	return (
		<Box
			component="form"
			sx={{
				"& > :not(style)": { m: 1, width: "25ch" },
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				alignItems: "center",
			}}
			noValidate
			autoComplete="off"
			onSubmit={(e) => {
				e.preventDefault();
				console.log("submit");
				handleSet();
			}}
		>
			<TextField
				id="outlined-basic"
				label="Enter your name"
				variant="outlined"
				onChange={handleInput}
				value={name}
				disabled={set}
				onSubmit={null}
			/>
			<Button
				variant="contained"
				sx={{ width: "8px" }}
				onClick={set ? handleReset : handleSet}
				href={"/hw1"}
				disabled={name.length < 2}
			>
				{set ? "Reset" : "Go!"}
			</Button>
		</Box>
	);
}
