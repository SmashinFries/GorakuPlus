export type ScoreVisualType =
	| 'healthbar-full'
	| 'healthbar'
	| 'number'
	| 'gradient-bar'
	| 'bar'
	| 'bar-graph';
export enum ScoreVisualTypeEnum {
	'Healthbar Full' = 'healthbar-full',
	Healthbar = 'healthbar',
	Number = 'number',
	Bar = 'bar',
	'Gradient Bar' = 'gradient-bar',
	'Bar Graph' = 'bar-graph',
}

export type MediaInfoDisplay = 'list' | 'tabs';
