export function getAllHWorksIds() {
	const keys = [1, 2, 3, 4];

	const qids = keys.map((s, _) => ({ params: { qid: `${s}` } }));

	return qids;
}
