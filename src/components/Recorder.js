import React from "react";
import RecControl from "./RecorderControls";

import { Context as RecordContext } from "../context/data/RecorderContext";

export const Recorder = () => {
	const {
		state: recordState,
		recordLoadStimsAction,
		recordNextStimAction,
		recordGetDevicesAction,
		recordStartAction,
		recordStopAction,
		recordPlayAction,
		recordPlayInstAction,
		recordUploadAction,
		recordResetAction,
		recordVadAction,
	} = React.useContext(RecordContext);
	return (
		<div>
			<RecControl />
		</div>
	);
};
