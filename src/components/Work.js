import React from "react";
import { ChangeArrows } from "./ChangeArrows";

// Slides
import Head from "next/head";
import Motivation from "./aslides/Motivation";
import Intro from "./aslides/Intro";
import Preface from "./aslides/Preface";
import Priorities from "./aslides/Priorities";

const Work = ({ id }) => {
	return (
		<>
			<Head>
				<title>{p(id).title}</title>
			</Head>
			{p(id).component}
			<ChangeArrows progs={p(id).progs} />
		</>
	);
};

export default Work;

export const p = (id) => {
	const progs = {
		prev: `/hw1/${parseInt(id) - 1}`,
		curr: `/hw1/${parseInt(id)}`,
		next: `/hw1/${parseInt(id) + 1}`,
	};

	switch (`${id}`) {
		case "1":
			return {
				progs: { ...progs, prev: `/slides/${id}` },
				title: "Motivation",
				component: <Motivation />,
			};
		case "2":
			return {
				progs,
				title: "Intro",
				component: <Intro />,
			};
		case "3":
			return {
				progs,
				title: "Priorities",
				component: <Priorities />,
			};
		case "4":
			return {
				progs,
				title: "General Theory",
				component: <Preface />,
			};
	}
};
