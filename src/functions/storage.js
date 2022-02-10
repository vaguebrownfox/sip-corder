import { PROJECT_BY } from "../utils/config";
import { stor } from "./firebase";
import { AUDIO_DATA_FOLDER, PROJECT_ID } from "./firebaseSetup";

const storageRef = stor.ref();

export const firebaseUserAudio = (filename, audio) => {
	const userAudioRef = storageRef.child(AUDIO_DATA_FOLDER).child(user.userId);

	userAudioRef
		.child(filename)
		.put(audio.wavBlob)
		.then((snapshot) => {
			console.log(
				"Uploaded a blob or file!  bytes:",
				snapshot.totalBytes
			);
		});
};
