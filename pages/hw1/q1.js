import React from "react";
import QuestionA from "../../src/components/ahomew1/QuestionA";

const qn = 1;

const q1 = () => {
	return (
		<QuestionA
			{...{
				question: {
					qn: 1,
					q: "Speaking fast, normal and slow",
					link: "/hw1/q1",
					words: ["August", "Ate", "Eight", "Board", "Bored"],
					sent: [
						"If I sit still, maybe I'll get out of here.",
						"Where did you come from?",
						"Go.",
						"Being oversmart is foolishness with extra steps.",
						"Little bugs taking time to clean their little face.",
					],
				},
			}}
		/>
	);
};

export default q1;
