import { Box } from "@mui/material";
import React from "react";
import HWList from "../../src/components/HWList";

const HW1 = () => {
	return (
		<div>
			<h4>{"Click on one of the assignments!"}</h4>
			<Box mb={2}>
				<HWList />
			</Box>
		</div>
	);
};

export default HW1;
