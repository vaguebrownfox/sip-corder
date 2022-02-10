import React from "react";
import QuestionB from "../../src/components/ahomew1/QuestionB";
import { questions } from "../../src/utils/questions";

const qn = 2;

const q2 = () => {
	const [question, setQuestion] = React.useState();
	React.useLayoutEffect(() => {
		const q = questions.filter((q) => q.qn == qn);
		setQuestion(q[0]);
	}, []);

	return (
		<div>
			<QuestionB {...{ question }} />
		</div>
	);
};

export default q2;
