export const updateMultiSelectFilters = (
	incomingVal: string,
	inValues: string[] | string | undefined,
	notInValues?: string[] | string | undefined,
) => {
	let in_values = inValues ? [...inValues] : [];
	let not_in_values = notInValues ? [...notInValues] : [];

	if (notInValues === undefined) {
		if (in_values.includes(incomingVal)) {
			in_values = in_values.filter((val) => val !== incomingVal);
		} else {
			in_values.push(incomingVal);
		}
	} else {
		if (in_values.includes(incomingVal)) {
			not_in_values.push(incomingVal);
			in_values = in_values.filter((val) => val !== incomingVal);
		} else if (not_in_values.includes(incomingVal)) {
			not_in_values = not_in_values.filter((val) => val !== incomingVal);
		} else {
			in_values.push(incomingVal);
		}
	}
	return {
		in_values: in_values.length > 0 ? in_values : undefined,
		not_in_values: not_in_values.length > 0 ? not_in_values : undefined,
	};
};
