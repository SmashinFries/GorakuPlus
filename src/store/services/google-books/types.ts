type ReadingModes = {
	text: boolean;
	image: boolean;
};

type PanelizationSummary = {
	containsEpubBubbles: boolean;
	containsImageBubbles: boolean;
};

type ImageLinks = {
	smallThumbnail: string;
	thumbnail: string;
};

type IndustryIdentifiers = {
	type: string;
	identifier: string;
};

type VolumeSeries = {
	seriesId: string;
	seriesBookType: string;
	orderNumber: number;
};

type SeriesInfo = {
	kind: string;
	bookDisplayNumber: string;
	volumeSeries: VolumeSeries[];
};

export type VolumeInfo = {
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	industryIdentifiers: IndustryIdentifiers[];
	readingModes: ReadingModes;
	pageCount: number;
	printType: string;
	categories: string[];
	averageRating: number;
	ratingsCount: number;
	maturityRating: string;
	allowAnonLogging: boolean;
	contentVersion: string;
	panelizationSummary: PanelizationSummary;
	imageLinks: ImageLinks;
	language: string;
	previewLink: string;
	infoLink: string;
	canonicalVolumeLink: string;
	seriesInfo: SeriesInfo;
};

type ListPrice = {
	amount: number;
	currencyCode: string;
};

type Offers = {
	finskyOfferType: number;
	listPrice: {
		amountInMicros: number;
		currencyCode: string;
	};
	retailPrice: {
		amountInMicros: number;
		currencyCode: string;
	};
	giftable: boolean;
};

export type SaleInfo = {
	country: string;
	saleability: string;
	isEbook: boolean;
	listPrice: ListPrice;
	retailPrice: ListPrice;
	buyLink: string;
	offers: Offers[];
};

export type ReadingFormat = {
	isAvailable: boolean;
	acsTokenLink: string;
};

export type AccessInfo = {
	country: string;
	viewability: string;
	embeddable: boolean;
	publicDomain: boolean;
	textToSpeechPermission: string;
	epub: ReadingFormat;
	pdf: ReadingFormat;
	webReaderLink: string;
	accessViewStatus: string;
	quoteSharingAllowed: boolean;
};

export type SearchInfo = {
	textSnippet: string;
};

export type VolumeDetails = {
	kind: string;
	id: string;
	etag: string;
	selfLink: string;
	volumeInfo: VolumeInfo;
	saleInfo: SaleInfo;
	accessInfo: AccessInfo;
	searchInfo: SearchInfo;
};

export type BookResponse = {
	kind: string;
	totalItems: number;
	items: VolumeDetails[];
};

export type GoogleQuery = {
	isbn: string;
};
