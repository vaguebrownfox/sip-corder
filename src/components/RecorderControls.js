import DoneIcon from "@mui/icons-material/ArrowForwardRounded";
import RecordStartIcon from "@mui/icons-material/FiberManualRecordRounded";
import PauseIcon from "@mui/icons-material/PauseRounded";
import PlayIcon from "@mui/icons-material/PlayArrowRounded";
import RecordStopIcon from "@mui/icons-material/StopRounded";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import theme from "../styles/theme";

export const RecControl = ({
	handleRecord,
	handleDone,
	handlePlay,
	isRecording,
	isPlaying,
	isPlayingInst,
	recDone,
	playTip,
}) => {
	return (
		<div style={classes.root}>
			<div style={classes.controls}>
				<div style={classes.controlIconRec}>
					<IconButton
						aria-label="info"
						onClick={handlePlay}
						disabled={isRecording || isPlayingInst || !recDone}
					>
						<Tooltip title={playTip} placement="bottom" arrow>
							{isPlaying ? (
								<PauseIcon style={classes.controlIcon} />
							) : (
								<PlayIcon style={classes.controlIcon} />
							)}
						</Tooltip>
					</IconButton>
					{recDone && !isRecording && (
						<Typography color="secondary" variant="caption">
							{playTip}
						</Typography>
					)}
				</div>
				<div style={classes.controlIconRec}>
					<IconButton
						aria-label="record"
						onClick={handleRecord}
						color="secondary"
						disabled={isPlaying || isPlayingInst}
						sx={{ color: red[400] }}
					>
						<Tooltip
							title={`${
								isRecording
									? "Stop recording"
									: recDone
									? "Redo recording?"
									: "Start recording"
							}`}
							placement="top"
							arrow
						>
							{isRecording ? (
								<RecordStopIcon
									classes={{ root: classes.recIcon }}
									fontSize="large"
									sx={classes.recIcon}
								/>
							) : recDone ? (
								<RecordStartIcon
									fontSize="large"
									sx={{ color: "red" }}
								/>
							) : (
								<RecordStartIcon
									classes={{ root: classes.recIcon }}
									fontSize="large"
								/>
							)}
						</Tooltip>
					</IconButton>

					<Typography color="secondary" variant="caption">
						{`${
							isRecording ? "Stop" : recDone ? "Redo?" : "Start"
						}`}
					</Typography>
				</div>
				<div style={classes.controlIconRec}>
					<IconButton
						aria-label="next"
						onClick={handleDone}
						disabled={!recDone || isPlaying || isPlayingInst}
					>
						<Tooltip arrow title="Save and Continue">
							<DoneIcon style={classes.controlIcon} />
						</Tooltip>
					</IconButton>
					{recDone && (
						<Typography color="secondary" variant="caption">
							Continue
						</Typography>
					)}
				</div>
			</div>
		</div>
	);
};

const classes = {
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
	},
	controls: {
		display: "flex",
		alignItems: "flex-start",
		width: "100%",
		maxWidth: theme.spacing(32),
		justifyContent: "space-evenly",
		border: "1px solid #cdcdcd",
		borderRadius: "8px",
		padding: theme.spacing(2),
	},
	recIcon: {
		background: theme.palette.secondary.rec,
		boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		animation: `$glowee 3000ms ${theme.transitions.easing.easeInOut} 400ms infinite`,
		borderRadius: "50%",
		color: theme.palette.secondary.rec,
	},
	controlIcon: {
		height: 32,
		width: 32,

		"&:hover": {
			transform: "scale(1.1)",
			cursor: "crosshair",
		},
	},
	controlIconOlp: {
		height: 38,
		width: 38,

		"&:hover": {
			transform: "scale(1.1)",
			cursor: "crosshair",
		},
	},
	recbutton: {
		position: "relative",
	},

	"@keyframes glowee": {
		"0%": {
			boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		},
		"50%": {
			boxShadow: `0 0 7px 4px ${theme.palette.secondary.main}`,
		},
		"100%": {
			boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		},
	},
	playerShow: {
		// display: "none",
		transform: "scale(0.8)",
	},
	playerHide: {
		display: "none",
	},
	controlIconRec: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
};

export default RecControl;
