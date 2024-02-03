import {
    Media,
    MediaFormat,
    MediaListStatus,
    MediaStatus,
    MediaType,
    ScoreDistribution,
} from '@/store/services/anilist/generated-anilist';
import { ThemeOptions } from '@/store/theme/theme';

const ScoreStats: ScoreDistribution[] = [
    {
        score: 10,
        amount: 64,
    },
    {
        score: 20,
        amount: 47,
    },
    {
        score: 30,
        amount: 60,
    },
    {
        score: 40,
        amount: 101,
    },
    {
        score: 50,
        amount: 152,
    },
    {
        score: 60,
        amount: 234,
    },
    {
        score: 70,
        amount: 278,
    },
    {
        score: 80,
        amount: 162,
    },
    {
        score: 90,
        amount: 147,
    },
    {
        score: 100,
        amount: 97,
    },
    // {
    //     score: 10,
    //     amount: 2227,
    // },
    // {
    //     score: 20,
    //     amount: 685,
    // },
    // {
    //     score: 30,
    //     amount: 1602,
    // },
    // {
    //     score: 40,
    //     amount: 2875,
    // },
    // {
    //     score: 50,
    //     amount: 7378,
    // },
    // {
    //     score: 60,
    //     amount: 14126,
    // },
    // {
    //     score: 70,
    //     amount: 43932,
    // },
    // {
    //     score: 80,
    //     amount: 99405,
    // },
    // {
    //     score: 90,
    //     amount: 138552,
    // },
    // {
    //     score: 100,
    //     amount: 123324,
    // },
];

const dummyWTCData: Media = {
    id: 934,
    idMal: 934,
    episodes: 26,
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/n934-p227WvkFZ7XX.jpg',
    type: MediaType.Anime,
    format: MediaFormat.Tv,
    isFavourite: false,
    description:
        'After moving into the quiet town of Hinamizawa, Maebara Keiichi spends his days blissfully in school often playing games with his local friends. However, appearances can be deceiving. One fateful day, Keiichi stumbles upon news of a murder that had occurred in Hinamizawa. From this point on, horrific events unfold in front of Keiichi, as he soon learns his close friends may not be all that they seem. Based on the amateur mystery game by 07th Expansion, the story is told in a series of different scenarios. ',
    genres: ['Horror', 'Mystery', 'Psychological', 'Supernatural', 'Thriller'],
    status: MediaStatus.Finished,
    siteUrl: 'https://anilist.co/anime/934',
    meanScore: 75,
    averageScore: 75,
    startDate: {
        year: 2006,
        month: 4,
        day: 5,
    },
    title: {
        english: 'When They Cry',
        native: 'ひぐらしのなく頃に',
        romaji: 'Higurashi no Naku Koro ni',
        userPreferred: 'Higurashi no Naku Koro ni',
    },
    coverImage: {
        extraLarge:
            'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx934-EOn2UlXaLUtj.jpg',
        large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx934-EOn2UlXaLUtj.jpg',
        medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx934-EOn2UlXaLUtj.jpg',
        color: '#e4a11a',
    },
    mediaListEntry: {
        id: 1,
        mediaId: 1,
        userId: 1,
        progress: 26 / 2,
        status: MediaListStatus.Current,
    },
    stats: {
        scoreDistribution: ScoreStats,
    },
    isFavouriteBlocked: false,
};

const dummyPPData: Media = {
    id: 34632,
    idMal: 4632,
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/manga/banner/34632-JULTgA6q6jAH.jpg',
    type: MediaType.Manga,
    format: MediaFormat.Manga,
    isFavourite: false,
    chapters: 147,
    description:
        'Meet Punpun Punyama. He’s an average kid in an average town.<br>\nHe wants to win a Nobel Prize and save the world.<br>\nHe wants the girl he has a crush on to like him back.<br>\nHe wants to find some porn.<br>\nThat’s what he wants, but what does he get…?\n<br><br>\n(Source: Viz Media)',
    genres: ['Drama', 'Psychological', 'Slice of Life'],
    status: MediaStatus.Finished,
    siteUrl: 'https://anilist.co/manga/34632',
    meanScore: 88,
    averageScore: 88,
    startDate: {
        year: 2007,
        month: 3,
        day: 15,
    },
    title: {
        english: 'Goodnight Punpun',
        native: 'おやすみプンプン',
        romaji: 'Oyasumi Punpun',
        userPreferred: 'Oyasumi Punpun',
    },
    coverImage: {
        extraLarge:
            'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx34632-14deknANZitb.png',
        large: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/nx34632-14deknANZitb.png',
        medium: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/small/nx34632-14deknANZitb.png',
        color: '#e4c943',
    },
    mediaListEntry: {
        id: 1,
        mediaId: 1,
        userId: 1,
        progress: 147 / 2,
        status: MediaListStatus.Current,
    },
    stats: {
        scoreDistribution: ScoreStats,
    },
    isFavouriteBlocked: false,
};

const dummyKawaiiData: Media = {
    id: 530,
    idMal: 530,
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/530.jpg',
    type: MediaType.Anime,
    format: MediaFormat.Tv,
    isFavourite: false,
    description:
        'Usagi Tsukino is an average student and crybaby klutz who constantly scores low on her tests. Unexpectedly, her humdrum life is turned upside down when she saves a cat with a crescent moon on its head from danger. The cat, named Luna, later reveals that their meeting was not an accident: Usagi is destined to become Sailor Moon, a planetary guardian with the power to protect the Earth. Given a special brooch that allows her to transform, she must use her new powers to save the city from evil energy-stealing monsters sent by the malevolent Queen Beryl of the Dark Kingdom.<br>\n<br>\nBut getting accustomed to her powers and fighting villains are not the only things she has to worry about. She must find the lost princess of the Moon Kingdom, the other Sailor Guardians, and the Legendary Silver Crystal in order to save the planet from destruction.<br>\n<br>\n(Source: MAL Rewrite)',
    genres: ['Action', 'Adventure', 'Fantasy', 'Mahou Shoujo', 'Romance'],
    status: MediaStatus.Finished,
    siteUrl: 'https://anilist.co/anime/530',
    meanScore: 75,
    averageScore: 75,
    episodes: 46,
    startDate: {
        year: 1992,
        month: 3,
        day: 7,
    },
    title: {
        english: 'Sailor Moon',
        native: '美少女戦士セーラームーン',
        romaji: 'Bishoujo Senshi Sailor Moon',
        userPreferred: 'Bishoujo Senshi Sailor Moon',
    },
    coverImage: {
        extraLarge:
            'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx530-DsF6LirJUEii.jpg',
        large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx530-DsF6LirJUEii.jpg',
        medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx530-DsF6LirJUEii.jpg',
        color: '#f18650',
    },
    mediaListEntry: {
        id: 1,
        mediaId: 1,
        userId: 1,
        status: MediaListStatus.Current,
        progress: 46 / 2,
    },
    stats: {
        scoreDistribution: ScoreStats,
    },
    isFavouriteBlocked: false,
};

const dummyHinataData: Media = {
    id: 20,
    idMal: 20,
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/20-HHxhPj5JD13a.jpg',
    type: MediaType.Anime,
    format: MediaFormat.Tv,
    episodes: 220,
    isFavourite: false,
    description:
        "<p>Naruto Uzumaki, a hyperactive and knuckle-headed ninja, lives in Konohagakure, the Hidden Leaf village. Moments prior to his birth, a huge demon known as the Kyuubi, the Nine-tailed Fox, attacked Konohagakure and wreaked havoc. In order to put an end to the Kyuubi's rampage, the leader of the village, the 4th Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto. <br><br><br />\nShunned because of the presence of the Kyuubi inside him, Naruto struggles to find his place in the village. He strives to become the Hokage of Konohagakure, and he meets many friends and foes along the way. <br><br><br />\n(Source: MAL Rewrite)</p>",
    genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Supernatural'],
    status: MediaStatus.Finished,
    siteUrl: 'https://anilist.co/anime/20',
    averageScore: 79,
    meanScore: 79,
    startDate: {
        year: 2006,
        month: 4,
        day: 4,
    },
    title: {
        romaji: 'NARUTO',
        english: 'Naruto',
        native: 'NARUTO -ナルト-',
        userPreferred: 'NARUTO',
    },
    coverImage: {
        color: '#e47850',
        extraLarge:
            'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-YJvLbgJQPCoI.jpg',
    },
    mediaListEntry: {
        id: 1,
        mediaId: 1,
        userId: 1,
        progress: 220 / 2,
        status: MediaListStatus.Current,
    },
    stats: {
        scoreDistribution: ScoreStats,
    },
    isFavouriteBlocked: false,
};

const dummyAquaData: Media = {
    id: 86238,
    type: MediaType.Manga,
    format: MediaFormat.Novel,
    isFavourite: false,
    status: MediaStatus.Finished,
    meanScore: 84,
    averageScore: 83,
    chapters: 127,
    startDate: {
        year: 2013,
        month: 10,
        day: 1,
    },
    endDate: {
        year: 2020,
        month: 5,
        day: 1,
    },
    title: {
        userPreferred: 'Kono Subarashii Sekai ni Shukufuku wo!',
        romaji: 'Kono Subarashii Sekai ni Shukufuku wo!',
        english: "Konosuba: God's Blessing on This Wonderful World!",
        native: 'この素晴らしい世界に祝福を!',
    },
    coverImage: {
        extraLarge:
            'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx86238-PvTZXUWWg2gd.jpg',
        large: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/nx86238-PvTZXUWWg2gd.jpg',
        medium: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/small/nx86238-PvTZXUWWg2gd.jpg',
        color: '#e4860d',
    },
    mediaListEntry: {
        id: 1,
        mediaId: 1,
        userId: 1,
        status: MediaListStatus.Current,
        progress: 127 / 2,
    },
    stats: {
        scoreDistribution: ScoreStats,
    },
    isFavouriteBlocked: false,
};

const dummyBerserkData: Media = {
    id: 30002,
    type: MediaType.Manga,
    format: MediaFormat.Manga,
    isFavourite: false,
    status: MediaStatus.Releasing,
    meanScore: 93,
    averageScore: 93,
    chapters: null,
    startDate: {
        year: 1989,
        month: 8,
        day: 25,
    },
    endDate: {
        year: null,
        month: null,
        day: null,
    },
    title: {
        userPreferred: 'Berserk',
        romaji: 'Berserk',
        english: 'Berserk',
        native: 'ベルセルク',
    },
    coverImage: {
        extraLarge:
            'https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30002-7EzO7o21jzeF.jpg',
        color: '#e4a143',
    },
    mediaListEntry: {
        id: 1,
        mediaId: 1,
        userId: 1,
        status: MediaListStatus.Current,
        progress: 50,
    },
    stats: {
        scoreDistribution: ScoreStats,
    },
    isFavouriteBlocked: false,
};

type DummyData = {
    [k in ThemeOptions]: Media;
};
const dummyData: DummyData = {
    punpun: dummyPPData,
    mi_chan: dummyWTCData,
    kawaii: dummyKawaiiData,
    hinata: dummyHinataData,
    aqua: dummyAquaData,
    berserk: dummyBerserkData,
};

export default dummyData;
