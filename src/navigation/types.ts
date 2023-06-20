import { NavigatorScreenParams } from '@react-navigation/native';
import { Media, MediaType } from '../app/services/anilist/generated-anilist';

export type RootStackProps = {
    root: NavigatorScreenParams<RootNavPaths>;
    media: {
        type: MediaType | 'MANHWA' | 'NOVEL';
        aniID: number;
        malID?: number;
    };
    charactersStack: NavigatorScreenParams<CharactersStackProps>;
    staffsStack: NavigatorScreenParams<StaffsStackProps>;
    music: {
        animeID: number;
    };
    danbooruStack: NavigatorScreenParams<DanbooruStackProps>;
};

export type RootNavPaths = {
    exploreStack: NavigatorScreenParams<ExploreStackProps>;
    recommendStack: undefined;
    listStack: undefined;
    userStack: undefined;
    moreStack: NavigatorScreenParams<MoreStackProps>;
};

// EXPLORE

export type ExploreStackProps = {
    explore: NavigatorScreenParams<ExploreTabsProps>;
    search: undefined;
};

export type ExploreTabsProps = {
    anime: undefined;
    manga: undefined;
    manhwa: undefined;
    novels: undefined;
};

// SEARCH
export type SearchStackProps = {};

// USER

export type UserStackProps = {
    user: undefined;
    stats: undefined;
};

// CHARACTER

export type CharactersStackProps = {
    characters: {
        id: number;
    };
    charDetail: {
        id: number;
    };
};

// STAFF

export type StaffsStackProps = {
    staffs: {
        id: number;
    };
    staffDetail: {
        id: number;
    };
};

// DANBOORU
export type DanbooruStackProps = {
    danbooru: undefined;
    danbooruDetail: {
        data: undefined;
    };
};

// MORE

export type MoreStackProps = {
    more: undefined;
    settings: NavigatorScreenParams<SettingsStackProps>;
    accounts: undefined;
};

export type SettingsStackProps = {
    settingsHome: undefined;
    appearance: undefined;
    tabs: undefined;
    language: undefined;
    media: undefined;
};
