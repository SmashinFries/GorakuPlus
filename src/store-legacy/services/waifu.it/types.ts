export enum WaifuItEmotions {
	Angry = 'angry',
	Baka = 'baka',
	Bite = 'bite',
	Blush = 'blush',
	Bonk = 'bonk',
	Bored = 'bored',
	Bully = 'bully',
	Bye = 'bye',
	Chase = 'chase',
	Cheer = 'cheer',
	Cringe = 'cringe',
	Cry = 'cry',
	Cuddle = 'cuddle',
	Dab = 'dab',
	Dance = 'dance',
	Die = 'die',
	Disgust = 'disgust',
	Facepalm = 'facepalm',
	Feed = 'feed',
	Glomp = 'glomp',
	Happy = 'happy',
	Hi = 'hi',
	Highfive = 'highfive',
	Hold = 'hold',
	Hug = 'hug',
	Kick = 'kick',
	Kill = 'kill',
	Kiss = 'kiss',
	Laugh = 'laugh',
	Lick = 'lick',
	Love = 'love',
	Lurk = 'lurk',
	Midfing = 'midfing',
	Nervous = 'nervous',
	Nom = 'nom',
	Nope = 'nope',
	Nuzzle = 'nuzzle',
	Panic = 'panic',
	Pat = 'pat',
	Peck = 'peck',
	Poke = 'poke',
	Pout = 'pout',
	Punch = 'punch',
	Run = 'run',
	Sad = 'sad',
	Shoot = 'shoot',
	Shrug = 'shrug',
	Sip = 'sip',
	Slap = 'slap',
	Sleepy = 'sleepy',
	Smile = 'smile',
	Smug = 'smug',
	Stab = 'stab',
	Stare = 'stare',
	Suicide = 'suicide',
	Tease = 'tease',
	Think = 'think',
	Thumbsup = 'thumbsup',
	Tickle = 'tickle',
	Triggered = 'triggered',
	Wag = 'wag',
	Wave = 'wave',
	Wink = 'wink',
	Yes = 'yes',
}

export type InteractionParams = {
	emotion: WaifuItEmotions;
};

export type InteractionResponse = {
	url: string;
};

export type QuoteResponse = {
	_id: number;
	quote: string;
	anime: string;
	author: string;
};

export type FactResponse = {
	_id: number;
	tags: [];
	fact: string;
};

export type WaifuResponse = {
	_id: number;
	images: string[];
	names: {
		en: string;
		jp: string;
		alt: string;
	};
	from: {
		name: string;
		type: string;
	};
	statistics: {
		fav: number;
		love: number;
		hate: number;
		upvote: number;
		downvote: number;
	};
};

export enum TextGenOptions {
	owoify = 'owoify',
	uvuify = 'uvuify',
	uwuify = 'uwuify',
}

export type TextGenParams = {
	text: string;
};

export type TextGenResponse = {
	text: string;
};
