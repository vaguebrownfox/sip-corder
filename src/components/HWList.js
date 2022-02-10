import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "@mui/material";
import { PROJECT_LINK } from "../utils/config";
import { Box } from "@mui/system";

const questions = [
	{
		qn: 1,
		q: "Speaking fast, normal and slow",
		link: "/hw1/q1",
	},
	{
		qn: 2,
		q: "Listening with noise",
		link: "/hw1/q2",
	},
	{
		qn: 3,
		q: "Speaking far and near",
		link: "/hw1/q3",
	},
	{
		qn: 4,
		q: "Conversation",
		link: "/hw1/q4",
	},
];

export default function HWList() {
	const [checked, setChecked] = React.useState([0]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<List
			sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
		>
			{questions.map((question) => {
				const labelId = `checkbox-list-label-${question.qn}`;

				return (
					<Link
						key={question.qn}
						href={question.link}
						style={{ textDecoration: "none" }}
					>
						<ListItem
							key={question.qn}
							secondaryAction={
								<IconButton edge="end" aria-label="comments">
									<QuestionMarkIcon />
								</IconButton>
							}
							disablePadding
						>
							<ListItemButton
								role={undefined}
								// onClick={handleToggle(question.qn)}
								dense
							>
								<ListItemIcon>
									<Checkbox
										edge="start"
										checked={
											checked.indexOf(question.qn) !== -1
										}
										tabIndex={-1}
										disableRipple
										inputProps={{
											"aria-labelledby": labelId,
										}}
									/>
								</ListItemIcon>
								<ListItemText
									id={labelId}
									primary={`${question.q}`}
								/>
							</ListItemButton>
						</ListItem>
					</Link>
				);
			})}
		</List>
	);
}
