import React from "react";
import QuestionC from "../../src/components/ahomew1/QuestionC";
import { questions } from "../../src/utils/questions";

const qn = 3;

const q3 = () => {
	const [question, setQuestion] = React.useState();
	React.useLayoutEffect(() => {
		const q = questions.filter((q) => q.qn == qn);
		setQuestion(q[0]);
	}, []);

	return (
		<div>
			<QuestionC {...{ question }} />
		</div>
	);
};

export default q3;
