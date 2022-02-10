import { createTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: "#000",
		},
		secondary: {
			main: "#000",
			rec: red[200],
		},
		error: {
			main: red.A400,
		},
	},
	overrides: {
		MuiStepIcon: {
			root: {
				"&$completed": {
					color: "#BF4904B3",
				},
				"&$active": {
					color: "#BF4904",
				},
			},
			text: {
				fill: grey[100],
			},
			active: {},
			completed: {},
		},
		MuiStepLabel: {
			label: {
				"&$completed": {
					color: grey[800],
				},
				"&$active": {
					color: grey[900],
				},
				color: grey[800],
			},
		},
		MuiStepContent: {
			last: {
				margin: 0,
				marginTop: 16,
				padding: 8,
			},
		},
	},
});

export default theme;
