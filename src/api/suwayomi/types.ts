export type AboutServerQuery = {
	data: {
		aboutServer: {
			name: string;
			version: string;
			buildType: string;
			buildTime: string;
			revision: string;
		};
	};
}

export type GetSourcesNode = {
	id: string;
	name: string;
	displayName: string;
	iconUrl: string;
}
export type GetSourcesQuery = {
	data: {
		sources: {
			totalCount: number;
			pageInfo: {
				endCursor: string;
				hasNextPage: boolean;
			};
			nodes: GetSourcesNode[];
		}
	}
};

export type GetAllCategoriesNode = {
	id: number;
	name: string;
	mangas: {
		totalCount: number;
	};
};
export type GetAllCategoriesQuery = {
	data: {
		categories: {
			nodes: GetAllCategoriesNode[];
		};
	};
};

// $page: Int = 10, $query: String, $source: LongString!
export type FetchSourceMangaVariables = {
	page: number;
	query: string;
	source: string;
}

export type FetchSourceMangaMangaItem = {
	id: number;
	inLibrary: boolean;
	title: string;
	url: string;
	inLibraryAt: string;
	sourceId: string;
	thumbnailUrl: string;
	realUrl: string;
	categories: {
		nodes: {
			id: number,
			name: string
		}[]
	}
};
export type FetchSourceMangaMutation = {
	data: {
		fetchSourceManga: {
			clientMutationId: string | null,
			hasNextPage: boolean,
			mangas: FetchSourceMangaMangaItem[]
		}
	}
}

export type UpdateMangaVariables = {
	id: number;
	inLibrary: boolean;
	addToCategories?: number[];
	updateCategories: boolean;
};
export type UpdateMangaMutation = {
	data: {
		updateManga: {
			manga: {
				id: number;
				inLibrary: boolean;
				inLibraryAt: string;
			}
		}
		updateMangaCategories: {
			manga: {
				id: number;
				categories: {
					nodes: {
						id: number;
						mangas: {
							totalCount: number
						}
					}
					totalCount: number
				}
			}
		}
	}
};

export type MangaChaptersVariables = {
	mangaId: number;
};

export type MangaChaptersQuery = {
	data: {
		chapters: {
			nodes: {
				id: number;
				chapterNumber: number;
				isDownloaded: boolean;
			}[];
			totalCount: number;
			pageInfo: {
				hasNextPage: boolean;
			}
		}
	}
};

export type ChaptersDownloadVariables = {
	ids: number[];
};
export type ChaptersDownloadMutation = {
	data: {
		enqueueChapterDownloads: {
			downloadStatus: {
				state: 'STARTED' | 'STOPPED'
			}
		}
	}
};