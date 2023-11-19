import { NavigatorScreenParams } from '@react-navigation/native';
import {
    ExploreMediaQueryVariables,
    MediaListStatus,
    MediaType,
} from '@/store/services/anilist/generated-anilist';

export type RootStackProps = {
    root: NavigatorScreenParams<RootNavPaths>;
    media: {
        aniID: number;
        malID: number;
        type: MediaType;
    };
    characterStack: NavigatorScreenParams<CharacterStackProps>;
    staffStack: NavigatorScreenParams<StaffStackProps>;
    newsStack: NavigatorScreenParams<NewsStackProps>;
    music: {
        animeID: number;
    };
    statistics: { userId: number };
    notifications: { unreadNotifs: number };
    danbooruStack: NavigatorScreenParams<DanbooruStackProps>;
};

export type RootNavPaths = {
    exploreStack: NavigatorScreenParams<ExploreStackProps>;
    recommendStack: undefined;
    calendarStack: undefined;
    listStack: undefined;
    userStack: NavigatorScreenParams<UserStackProps>;
    moreStack: NavigatorScreenParams<MoreStackProps>;
};

// EXPLORE

export type ExploreStackProps = {
    explore: NavigatorScreenParams<ExploreTabsProps>;
    search: ExploreMediaQueryVariables;
};

export type ExploreTabsProps = {
    anime: undefined;
    manga: undefined;
    manhwa: undefined;
    novels: undefined;
};

// STATS
export type StatsStackProps = {
    userId: number;
};
export type StatsTabProps = {
    anime: {
        userId: number;
    };
    manga: {
        userId: number;
    };
};

// export type StatScreenProps = CompositeScreenProps<
//     MaterialTopTabScreenProps<StatsTabProps>,
//     NativeStackScreenProps<StatsStackProps>
// >;

// LIST
export type ListStackProps = {
    animeList: NavigatorScreenParams<ListTabsProps>;
    mangaList: NavigatorScreenParams<ListTabsProps>;
};

export type ListTabsProps = {
    [key: string]: {
        mediaType: MediaType;
        listName: string | MediaListStatus;
    };
};

// SEARCH
export type SearchStackProps = {};

// USER

export type UserStackProps = {
    user: undefined;
    stats: undefined;
};

// CHARACTER

export type CharacterStackProps = {
    characterList: {
        mediaId: number;
    };
    character: {
        id: number;
    };
};

// STAFF

export type StaffStackProps = {
    staffList: {
        mediaId: number;
    };
    staff: {
        id: number;
    };
};

// NEWS

export type NewsStackProps = {
    newsList: {
        type: MediaType;
        malId: number;
    };
};

// DANBOORU
export type DanbooruStackProps = {
    danbooruList: {
        tag: string;
    };
    danbooruDetail: {
        id: number;
    };
};

// MORE

export type MoreStackProps = {
    more: undefined;
    settings: NavigatorScreenParams<SettingsStackProps>;
    accounts: undefined;
    about: undefined;
};

export type SettingsStackProps = {
    settingsHome: undefined;
    appearance: undefined;
    tabs: undefined;
    language: undefined;
    mediaSettings: NavigatorScreenParams<MediaSettingsStackProps>;
    notifications: undefined;
};

export type BannedTagsStackProps = {
    btags: undefined;
};

export type MediaSettingsStackProps = {
    msHome: undefined;
    bannedTags: NavigatorScreenParams<BannedTagsStackProps>;
};
