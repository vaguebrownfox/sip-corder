import React from "react";
import QuestionD from "../../src/components/ahomew1/QuestionD";
import { questions } from "../../src/utils/questions";

const qn = 4;

const q4 = () => {
	const [question, setQuestion] = React.useState();
	React.useLayoutEffect(() => {
		const q = questions.filter((q) => q.qn == qn);
	}, []);

	return (
		<div>
			<QuestionD {...{ question }} />
		</div>
	);
};

export default q4;
