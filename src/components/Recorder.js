import React from "react";
import RecControl from "./RecorderControls";

import { Context as RecordContext } from "../context/data/RecorderContext";

export const Recorder = () => {
	const {
		state: recordState,
		recordGetDevicesAction,
		recordStartAction,
		recordStopAction,
		recordPlayAction,
		recordPlayInstAction,
		recordUploadAction,
		recordResetAction,
	} = React.useContext(RecordContext);

	const handleRecord = () => {
		clearInterval(timeoutRef.current);
		if (recordState.isRecording) {
			timeoutRef.current = setTimeout(() => {
				handleRecStop();
			}, 250);
		} else {
			vizRef.current.scrollIntoView(false);
			recordStartAction(recordState.inputStream);
			timeoutRef.current = setTimeout(() => {
				handleRecStop();
			}, MAX_REC_DURATION);
		}
	};

	const handleRecStop = async () => {
		const res = await recordStopAction();
	};

	const handlePlay = () => {
		if (recordState.isPlaying) {
			playRef.current.pause();
		} else {
			playRef.current.play();
			setPlytip("Pause");
		}
	};

	const handleDone = () => {
		const finishedStim = { ...recordState.currentStim };
		const completed = userState.selectedUser?.completed + 1;
		recordUploadAction({
			...userState.selectedUser,
			stimTag: finishedStim.tag,
		}).then(() => {
			const user = {
				...userState.selectedUser,
				stimCount: finishedStim.sno + 1,
				completed: completed,
			};
			userUpdateAction(user);
			recordNextStimAction(completed);
		});
	};

	return (
		<div>
			<RecControl />
		</div>
	);
};
