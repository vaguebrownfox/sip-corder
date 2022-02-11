// record context
import createDataContext from "../createDataContext";
import { batch } from "react-redux";

// functions
import {
	getAudioInputDevices,
	getAudioOutputDevices,
	getAudioInputStream,
	audioRecord,
	createAudioBuffer,
	audioBufferToWaveBlob,
} from "../../functions/recorder";
import { firebaseUserAudio } from "../../../firebase/storage";

// Initial State
const recordInitialState = {
	loading: false,
	audioDevices: { inputDevices: [], outputDevices: [] },
	inputDevice: {},
	outputDevice: {},
	analyserNode: {},
	inputStream: null,

	isRecording: false,
	isPlaying: false,
	isPlayingInst: false,
	recDone: false,
	plyDone: false,
	playUrl: "",
	audioBuffer: [],

	seconds: 0,
};

// Reducer
const recordReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "REC_RESET":
			return { ...action.payload };
		case "GET_DEVICES":
			return {
				...state,
				audioDevices: action.payload,
				inputDevice: action.payload.inputDevices[0],
				outputDevice: action.payload.outputDevices[0],
				inputStream: action.payload.audioInputStream,
				analyserNode: action.payload.analyserNode,
			};
		case "SET_INPUT_DEVICE":
			return {
				...state,
				inputDevice: action.payload,
			};
		case "SET_OUTPUT_DEVICE":
			return {
				...state,
				outputDevice: action.payload,
			};
		case "SET_INPUT_STREAM":
			return {
				...state,
				inputStream: action.payload,
			};
		case "SET_REC_STATE":
			return { ...state, isRecording: action.payload };
		case "SET_PLY_STATE":
			return { ...state, isPlaying: action.payload };
		case "SET_PLYINST_STATE":
			return { ...state, isPlayingInst: action.payload };
		case "SET_REC_DONE":
			return { ...state, recDone: action.payload };
		case "SET_PLY_URL":
			return { ...state, playUrl: action.payload };
		case "SET_AUD_BUF":
			return {
				...state,
				audioBuffer: action.payload,
			};
		case "SECONDS":
			let secs = state.seconds;
			switch (action.payload) {
				case "up":
					secs += 1;
					break;
				case "down":
					secs -= 1;
					break;
				case "reset":
					secs = 0;
					break;
				default:
					break;
			}
			return { ...state, seconds: secs };
		default:
			return state;
	}
};

// Actions
const recordLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("record action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordGetDevicesAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		const {
			audioDevices: inputDevices,
			audioInputStream,
			analyserNode,
		} = await getAudioInputDevices();
		const outputDevices = await getAudioOutputDevices();

		dispatch({
			type: "GET_DEVICES",
			payload: {
				inputDevices,
				outputDevices,
				audioInputStream,
				analyserNode,
			},
		});

		console.log("record context ::get devices");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordSetInputAction = (dispatch) => {
	return async (device) => {
		dispatch({ type: "SET_LOADING", payload: true });

		const stream = await getAudioInputStream(device);
		dispatch({ type: "SET_INPUT_DEVICE", payload: device });
		dispatch({ type: "SET_INPUT_STREAM", payload: stream });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordSetOutputAction = (dispatch) => {
	return (device) => {
		dispatch({ type: "SET_LOADING", payload: true });

		dispatch({ type: "SET_OUTPUT_DEVICE", payload: device });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

let recorder = null;
let interval = null;

const recordStartAction = (dispatch) => {
	return async (inputStream) => {
		dispatch({ type: "SET_LOADING", payload: true });

		if (!recorder) {
			recorder = await audioRecord(inputStream).catch((e) => {
				console.log("audioRecord error", e);
				return null;
			});
		}
		if (!recorder) {
			return null;
		}
		const isRecStart = await recorder
			.startRecord()
			.then((e) => {
				startVibrate(70);
				return e;
			})
			.catch((e) => {
				console.log("audioRecord start error", e);
				return null;
			});
		console.log("record action log:: start record", isRecStart);

		if (isRecStart) {
			console.log("record action log:: start record");
			batch(() => {
				dispatch({ type: "SET_REC_DONE", payload: false });
				dispatch({ type: "SET_REC_STATE", payload: true });
				dispatch({ type: "SET_PLY_STATE", payload: false });
				dispatch({ type: "SECONDS", payload: "reset" });
			});

			interval = setInterval(() => {
				dispatch({ type: "SECONDS", payload: "up" });
			}, 1000);
		} else {
			dispatch({ type: "SET_REC_STATE", payload: false });
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

let audio = null;

const recordStopAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		if (!recorder) {
			console.log("record action log:: recorder not defined");
			return null;
		}

		audio = await recorder
			.stopRecord()
			.then((e) => {
				startVibrate(70);
				return e;
			})
			.catch(() => null);

		if (audio) {
			// const audioBuffer = await createAudioBuffer(audio.audioUrl);
			// const audioData = audioBuffer.getChannelData(0);
			// const skip = Math.floor(audioData.length / (256 * 4));
			// const audioDataF = audioData.filter((e, i) => i % skip === 0);

			batch(() => {
				dispatch({ type: "SET_REC_STATE", payload: false });
				dispatch({ type: "SET_REC_DONE", payload: true });
				dispatch({ type: "SET_PLY_URL", payload: audio.audioUrl });
			});

			// const res = await detectStims(audio.audioUrl);
			// console.table(res);

			// dispatch({ type: "SET_AUD_BUF", payload: audioDataF });
			clearInterval(interval);
		}

		dispatch({ type: "SET_LOADING", payload: false });

		return audio;
	};
};

const recordPlayAction = (dispatch) => {
	return (isPly) => {
		dispatch({ type: "SET_PLY_STATE", payload: isPly });
	};
};

const recordPlayInstAction = (dispatch) => {
	return (isPly) => {
		dispatch({ type: "SET_PLYINST_STATE", payload: isPly });
	};
};

const recordResetAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		dispatch({ type: "REC_RESET", payload: { ...recordInitialState } });

		console.log("record reset log", recordInitialState);
		if (recorder) {
			recorder.stopRecord().catch(() => null);
			clearInterval(interval);
			recorder = null;
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordUploadAction = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		if (audio) {
			// Convert to wav format
			const audioBuffer = await createAudioBuffer(audio.audioUrl);
			audio.wavBlob = await audioBufferToWaveBlob(audioBuffer);

			firebaseUserAudio(user, audio);
			dispatch({ type: "SET_REC_DONE", payload: false });
		} else {
			console.error("record action log:: audio not defined");
			throw new Error("Upload error");
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	recordReducer,
	{
		recordLoadAction,

		recordGetDevicesAction,
		recordSetInputAction,
		recordSetOutputAction,

		recordStartAction,
		recordStopAction,
		recordPlayAction,
		recordPlayInstAction,

		recordUploadAction,

		recordResetAction,
	},
	recordInitialState
);

export const startVibrate = (duration) => {
	try {
		navigator.vibrate(duration);
	} catch (e) {
		console.log("device doesn't support vibrate");
	}
};
