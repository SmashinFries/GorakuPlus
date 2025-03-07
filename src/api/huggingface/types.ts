export type WdTaggerInput = {
	data: [
		Blob | String | { path: string }, // The input value that is provided in the "Input" Image component.
		number, // The input value that is provided in the "General Tags Threshold" Slider component.
		number, // The input value that is provided in the "Character Tags Threshold" Slider component.
		'danbooru'
	];
};

export type WdTaggerInputTest = {
	image: Blob | File,
	model_repo: "SmilingWolf/wd-swinv2-tagger-v3",
	general_thresh: number,
	general_mcut_enabled: boolean,
	character_thresh: number,
	character_mcut_enabled: boolean,
}

type WDTaggerObject = {
	label: string;
	confidences: { label: string, condifence: number }[];

}
export type WdTaggerOutput = [
	string,
	WDTaggerObject, // general tags
	WDTaggerObject, // character tags
	WDTaggerObject
];
