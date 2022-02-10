import { Box } from "@mui/material";
import * as React from "react";
import HWList from "../components/HWList";
import TextInput from "../components/TextInput";
import { PROJECT_DESC } from "../utils/config";

const classes = {
	img: {
		width: "auto",
	},
};

const App = React.memo(function App({ src, children, title }) {
	return (
		<div>
			<h4>{PROJECT_DESC}</h4>
			<Box mb={2}>
				<TextInput />
			</Box>
		</div>
	);
});

export default App;
