import { Box } from "@mui/material";
import React from "react";
import QuestionA from "../../src/components/ahomew1/QuestionA";

const qn = 1;

const QA = () => {
	return (
		<Box mb={2} ml={2} justifyContent="center">
			<QuestionA
				{...{
					question: {
						qn: 1,
						q: "Speaking fast, normal and slow",
						link: "/hw1/q1",

						// 5 words
						words: ["August", "Ate", "Eight", "Board", "Bored"],

						// 5 sentences
						sents: [
							"If I sit still, maybe I'll get out of here.",
							"Where did you come from?",
							"Go.",
							"Being oversmart is foolishness with extra steps.",
							"Little bugs taking time to clean their little face.",
						],
					},
				}}
			/>
		</Box>
	);
};

export default QA;
