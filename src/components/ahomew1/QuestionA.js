import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import classes from "../../styles/SlidePanel.module.css";
import { PROJECT_BY } from "../../utils/config";
import { Recorder } from "../Recorder";

const QuestionA = ({ question }) => {
	return (
		<div className={classes.root}>
			<Typography variant="h5" textAlign="center" gutterBottom>
				{question.q}
			</Typography>
			<VerticalLinearStepper
				elements={[...question.words, ...question.sents]}
			/>
		</div>
	);
};

export default QuestionA;

const steps = [
	{
		label: "Select campaign settings",
		description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
	},
	{
		label: "Create an ad group",
		description:
			"An ad group contains one or more ads which target a shared set of keywords.",
	},
	{
		label: "Create an ad",
		description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
	},
];

export function VerticalLinearStepper({ elements }) {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<Box sx={{ maxWidth: 400 }}>
			<Stepper activeStep={activeStep} orientation="vertical">
				{elements.map((step, index) => (
					<Step key={step.label}>
						<StepLabel
							optional={
								step.split(" ").length > 1 ? (
									<Typography variant="caption">
										Sentence
									</Typography>
								) : (
									<Typography variant="caption">
										Word
									</Typography>
								)
							}
						>
							{step}
						</StepLabel>
						<StepContent>
							<BasicTabs
								type={
									step.split(" ").length > 1
										? "sentence"
										: "word"
								}
							/>

							<Box sx={{ mb: 2 }}>
								<div>
									<Button
										variant="contained"
										onClick={handleNext}
										sx={{ mt: 1, mr: 1 }}
									>
										{index === elements.length - 1
											? "Finish"
											: "Continue"}
									</Button>
									<Button
										disabled={index === 0}
										onClick={handleBack}
										sx={{ mt: 1, mr: 1 }}
									>
										Back
									</Button>
								</div>
							</Box>
						</StepContent>
					</Step>
				))}
			</Stepper>
			{activeStep === elements.length && (
				<Paper square elevation={0} sx={{ p: 3 }}>
					<Typography>
						All steps completed - you&apos;re finished
					</Typography>
					<Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
						Reset
					</Button>
				</Paper>
			)}
		</Box>
	);
}

function TabPanel(props) {
	const { children, value, index, tag, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography
						gutterBottom
						variant="body1"
					>{`Speak at a ${tag} rate`}</Typography>
					<Typography
						gutterBottom
						variant="body2"
					>{`Click arrow -> after recording`}</Typography>
					<Typography
						gutterBottom
						variant="body2"
					>{`Repeat 3 times`}</Typography>
					<>{children}</>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index, tag) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
		tag: tag,
	};
}

export function BasicTabs({ type }) {
	const [value, setValue] = React.useState(0);
	const [filename, setFilename] = useState("");

	const handleChange = (event, newValue) => {
		setValue(newValue);

		const info = {
			h1: 1,
			qn: 1,
			by: PROJECT_BY,
			con: "NANA".t,
			stype: type.toUpperCase(),
		};

		const filename = `H${info.hn}_Q${info.qn}_${info.by}_${info.con}_${info.stype}_${info.rate}_${info.id}.wav`;
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Normal" {...a11yProps(0, "normal")} />
					<Tab label="Slow" {...a11yProps(1, "slow")} />
					<Tab label="Fast" {...a11yProps(2, "fast")} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0} type={type} tag="normal">
				<Recorder />
			</TabPanel>
			<TabPanel value={value} index={1} type={type} tag="slow">
				<Recorder />
			</TabPanel>
			<TabPanel value={value} index={2} type={type} tag="fast">
				<Recorder />
			</TabPanel>
		</Box>
	);
}
