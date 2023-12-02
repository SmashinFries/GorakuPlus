import { Dialog, Text, Button, useTheme, RadioButton, Divider, Checkbox } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScoreContainer } from '../../../score';
import {
    Media,
    MediaFormat,
    MediaListStatus,
    MediaStatus,
    MediaType,
} from '@/store/services/anilist/generated-anilist';
import { MediaCard, MediaProgressBar } from '../../../cards';
import { rgbToRgba } from '@/utils';
import { ThemeOptions } from '@/store/theme/theme';
import { mediaCardAppearanceActions } from '@/store/slices/settingsSlice';

type SliderViewProps = {
    title: string;
    score: number;
    setScore: (value: number) => void;
    trackColor: string;
    lowerLimit?: number;
    upperLimit?: number;
};
const SliderView = ({
    score,
    setScore,
    title,
    lowerLimit,
    upperLimit,
    trackColor,
}: SliderViewProps) => {
    return (
        <View style={{ paddingVertical: 10 }}>
            <Text>{title}</Text>
            <Slider
                value={score}
                onValueChange={(value) => setScore(value)}
                minimumTrackTintColor={trackColor}
                maximumTrackTintColor={trackColor}
                step={1}
                minimumValue={0}
                maximumValue={100}
                thumbTintColor={trackColor}
                lowerLimit={lowerLimit ?? null}
                upperLimit={upperLimit ?? null}
            />
        </View>
    );
};

type DialogProps = {
    visible: boolean;
    onDismiss: () => void;
    red: number;
    yellow: number;
    updateScoreColor: (red: number, yellow: number) => any;
};
export const ScoreColorDialog = ({
    onDismiss,
    visible,
    red,
    yellow,
    updateScoreColor,
}: DialogProps) => {
    const [newRed, setRed] = useState(red);
    const [newYellow, setYellow] = useState(yellow ?? 74);
    const { colors } = useTheme();

    const onCancel = () => {
        setRed(red);
        setYellow(yellow);
        onDismiss();
    };

    const onDone = () => {
        updateScoreColor(newRed, newYellow);
        onDismiss();
    };

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Score Defaults</Dialog.Title>
            <Dialog.Content>
                <SliderView
                    score={newRed}
                    setScore={setRed}
                    title="Max Red Score"
                    upperLimit={newYellow - 1}
                    trackColor={colors.primary}
                />
                <SliderView
                    score={newYellow}
                    setScore={setYellow}
                    title="Max Yellow Score"
                    lowerLimit={newRed + 1}
                    trackColor={colors.primary}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <ScoreContainer score={newRed} color="red" opacity={0.35} animate={false} />
                    <Button
                        onPress={() => {
                            setRed(red);
                            setYellow(yellow ?? 74);
                        }}
                    >
                        Reset
                    </Button>
                    <ScoreContainer
                        score={newYellow}
                        color="yellow"
                        opacity={0.35}
                        animate={false}
                    />
                </View>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onCancel}>Cancel</Button>
                <Button onPress={onDone}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

type ScoreDialogProps = {
    visible: boolean;
    defaultScore: 'average' | 'mean';
    updateDefaultScore: (defaultScore: 'average' | 'mean') => void;
    onDismiss: () => void;
};
export const DefaultScoreDialog = ({
    visible,
    defaultScore,
    updateDefaultScore,
    onDismiss,
}: ScoreDialogProps) => {
    const [scoreType, setScoreType] = useState<ScoreDialogProps['defaultScore']>(defaultScore);

    const onCancel = () => {
        setScoreType(defaultScore);
        onDismiss();
    };

    const onDone = () => {
        updateDefaultScore(scoreType);
        onDismiss();
    };

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Score Defaults</Dialog.Title>
            <Dialog.Content>
                <RadioButton.Group
                    onValueChange={(value: ScoreDialogProps['defaultScore']) => setScoreType(value)}
                    value={scoreType}
                >
                    {['average', 'mean'].map((stype, idx) => (
                        <RadioButton.Item
                            key={idx}
                            label={stype}
                            labelStyle={{ textTransform: 'capitalize' }}
                            value={stype}
                            // status={langOption === lang ? 'checked' : 'unchecked'}
                        />
                    ))}
                </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onCancel}>Cancel</Button>
                <Button onPress={onDone}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

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
        progress: 26 / 2,
        status: MediaListStatus.Current,
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
        progress: 147 / 2,
        status: MediaListStatus.Current,
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
        status: MediaListStatus.Current,
        progress: 46 / 2,
    },
    isFavouriteBlocked: false,
};

const dummyDefaultData: Media = {
    id: 20996,
    idMal: 28977,
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/918-bljqHE1PFArH.jpg',
    type: MediaType.Anime,
    format: MediaFormat.Tv,
    isFavourite: false,
    description:
        "Life isn't easy in feudal Japan... especially since the aliens landed and conquered everything! Oh sure, the new health care is great, but the public ban on the use of swords has left a lot of defeated samurai with a difficult decision to make concerning their future career paths! This is especially true if, as in the case of Gintoki Sakata, they're not particularly inclined towards holding a day job, which is why Gintoki's opted for the freelance route, taking any job that's offered to him as long as the financial remuneration sounds right. Unfortunately, in a brave new world filled with stray bug-eyed monsters, upwardly mobile Yakuza and overly ambitious E.T. entrepreneurs, those jobs usually don't pay as well as they should for the pain, suffering and indignities endured!<br><br>\n(Source: Sentai Filmworks)",
    genres: ['Action', 'Comedy', 'Drama', 'Sci-Fi'],
    status: MediaStatus.Finished,
    siteUrl: 'https://anilist.co/anime/918',
    meanScore: 85,
    averageScore: 85,
    episodes: 51,
    startDate: {
        year: 2006,
        month: 4,
        day: 4,
    },
    title: {
        english: 'Gintama',
        native: '銀魂',
        romaji: 'Gintama',
        userPreferred: 'Gintama',
    },
    coverImage: {
        extraLarge:
            'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20996-kBEGEGdeK1r7.jpg',
        large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20996-kBEGEGdeK1r7.jpg',
        medium: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx20996-kBEGEGdeK1r7.jpg',
        color: '#e45d86',
    },
    mediaListEntry: {
        progress: 51 / 2,
        status: MediaListStatus.Current,
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
        status: MediaListStatus.Current,
        progress: 127 / 2,
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
        status: MediaListStatus.Current,
        progress: 50,
    },
};

type DummyData = {
    [k in ThemeOptions]: Media;
};
const dummyData: DummyData = {
    punpun: dummyPPData,
    sonozaki_mion: dummyWTCData,
    kawaii: dummyKawaiiData,
    default: dummyDefaultData,
    aqua: dummyAquaData,
    berserk: dummyBerserkData,
};

type MediaTileCustomizerProps = {
    visible: boolean;
    scoreHealthBar: boolean;
    scoreGlow: boolean;
    scoreColors: { red: number; yellow: number };
    scoreNumber: boolean;
    themeMode: ThemeOptions;
    showItemListStatus: boolean;
    mediaLanguage: 'english' | 'romaji' | 'native';
    onSettingChange: (props: mediaCardAppearanceActions) => void;
    onDismiss: () => void;
};
export const MediaTileCustomizer = ({
    visible,
    onDismiss,
    onSettingChange,
    scoreColors,
    scoreHealthBar,
    scoreGlow,
    scoreNumber,
    themeMode,
    showItemListStatus,
    mediaLanguage,
}: MediaTileCustomizerProps) => {
    const { colors } = useTheme();
    const [showHB, setShowHB] = useState(scoreHealthBar);
    const [showGlow, setShowGlow] = useState(scoreGlow);
    const [showScoreNumber, setShowScoreNumber] = useState(scoreNumber);
    const [showStatus, setShowStatus] = useState(showItemListStatus);

    const onCancel = () => {
        onDismiss();
    };

    const onDone = () => {
        onSettingChange({
            scoreGlow: showGlow,
            scoreHealthBar: showHB,
            scoreNumber: showScoreNumber,
            showItemListStatus: showStatus,
        });
        onDismiss();
    };

    useEffect(() => {
        if (visible) {
            setShowHB(scoreHealthBar);
            setShowGlow(scoreGlow);
            setShowScoreNumber(scoreNumber);
            setShowStatus(showItemListStatus);
        }
    }, [visible]);

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Tile Customization</Dialog.Title>
            <Dialog.Content>
                <Dialog.ScrollArea>
                    <View
                        style={{
                            alignSelf: 'center',
                            marginVertical: 10,
                        }}
                    >
                        <MediaCard
                            coverImg={dummyData[themeMode].coverImage?.extraLarge}
                            titles={dummyData[themeMode].title}
                            meanScore={dummyData[themeMode].meanScore}
                            averageScore={dummyData[themeMode].averageScore}
                            showHealthBar={showHB}
                            scoreColors={scoreColors}
                            scoreNumber={showScoreNumber}
                            scorebgColor={rgbToRgba(colors.primaryContainer, 0.75)}
                            navigate={() => null}
                        />
                        <MediaProgressBar
                            progress={
                                (dummyData[themeMode].episodes ??
                                    dummyData[themeMode].mediaListEntry.progress) / 2
                            }
                            total={dummyData[themeMode].episodes ?? dummyData[themeMode].chapters}
                            mediaStatus={dummyData[themeMode].status}
                            mediaListEntry={dummyData[themeMode].mediaListEntry}
                            showListStatus={showStatus}
                        />
                    </View>
                    <Divider />
                    {/* <Checkbox.Item
                        label="Score HealthBar"
                        onPress={() => setShowHB(!showHB)}
                        status={showHB ? 'checked' : 'unchecked'}
                    /> */}
                    {/* <Checkbox.Item
                        label="Score Glow"
                        onPress={() => setShowGlow(!showGlow)}
                        status={showGlow ? 'checked' : 'unchecked'}
                    /> */}
                    <Checkbox.Item
                        label="Score Number"
                        onPress={() => setShowScoreNumber(!showScoreNumber)}
                        status={showScoreNumber ? 'checked' : 'unchecked'}
                    />
                    <Checkbox.Item
                        label="List status / progress"
                        onPress={() => setShowStatus(!showStatus)}
                        status={showStatus ? 'checked' : 'unchecked'}
                    />
                    <Text variant="titleMedium" style={{ marginVertical: 10, textAlign: 'center' }}>
                        More options soon!
                    </Text>
                </Dialog.ScrollArea>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onCancel}>Cancel</Button>
                <Button onPress={onDone}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
