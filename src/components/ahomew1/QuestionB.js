import React from "react";
import { Typography } from "@mui/material";
import classes from "../../styles/SlidePanel.module.css";
import Layout from "../Layout";

const QuestionB = ({ question }) => {
	return (
		<div className={classes.root}>
			<Typography variant="h5" textAlign="center">
				{question.q}
			</Typography>
		</div>
	);
};

export default QuestionB;
