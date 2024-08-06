/**
 * @type output_type: 0=html | 2=json
 * @type numres: # of results
 * @type api_key: your api key
 * @type hide: 0=show all | 1=hide expected explicit | 2=hide expected and suspected | 3=show only safe
 * @type file: formdata image file
 */
export type SauceNaoParams = {
	output_type: string;
	numres: string;
	api_key: string;
	hide: string;
	file: { type: string; uri: string; name: string } | string | Blob;
};

type HeaderIndexItem = {
	status: number;
	parent_id: number;
	id: number;
	results: number;
};
type SauceNaoResponseHeader = {
	user_id: string;
	account_type: string;
	short_limit: string;
	long_limit: string;
	long_remaining: number;
	short_remaining: number;
	status: number;
	results_requested: string;
	index: { [key: string]: HeaderIndexItem };
	search_depth: string;
	minimum_similarity: number; // float
	query_image_display: string;
	query_image: string;
	results_returned: number;
};

type SauceNaoResultHeader = {
	similarity: string;
	thumbnail: string;
	index_id: number;
	index_name: string;
	dupes: number;
	hidden: number;
};

type SauceNaoResultData = {
	ext_urls: string[];
	md_id: string;
	mu_id: number;
	mal_id: number;
	source: string;
	part: string;
	artist: string;
	author: string;
};

export type SauceNaoResultItem = {
	header: SauceNaoResultHeader;
	data: SauceNaoResultData;
};

export type SauceNaoResponse = {
	header: SauceNaoResponseHeader;
	results: SauceNaoResultItem[];
};
