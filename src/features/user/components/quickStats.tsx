import { AnimatePresence, MotiView } from 'moti';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';

type MediaStatIsland = {
    icon: string;
    title: string;
    value: number;
};
export const MediaStatIsland = ({ icon, title, value }: MediaStatIsland) => {
    const { colors } = useTheme();
    return (
        <AnimatePresence exitBeforeEnter>
            <MotiView
                from={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={[styles.container]}
            >
                {/* <IconButton icon={icon} />
                 */}
                <Text numberOfLines={2} style={{ textAlign: 'center' }}>
                    {title}
                </Text>
                <View style={[styles.valueContainer, { backgroundColor: colors.primaryContainer }]}>
                    <Text style={[styles.value]}>{value.toLocaleString()}</Text>
                </View>
            </MotiView>
        </AnimatePresence>
    );
};

type StatOverview = {
    anime: {
        minutesWatched: number;
        episodesWatched: number;
    };
    manga: {
        chaptersRead: number;
        volumesRead: number;
    };
};
export const StatOverview = ({ anime, manga }: StatOverview) => {
    const { colors } = useTheme();
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginHorizontal: 10,
                    borderRadius: 12,
                }}
            >
                <MediaStatIsland
                    icon={'timer-outline'}
                    title="Minutes Wasted"
                    value={anime.minutesWatched}
                />
                <MediaStatIsland
                    icon={'television-play'}
                    title="Episodes Watched"
                    value={anime.episodesWatched}
                />
                <MediaStatIsland
                    icon={'television-play'}
                    title="Chapters Read"
                    value={manga.chaptersRead}
                />
                {/* <MediaStatIsland
                    icon={'television-play'}
                    title="Volumes Read"
                    value={manga.volumesRead}
                /> */}
            </View>
            <Button style={{ marginHorizontal: 10 }} mode="elevated">
                View Statistics
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        maxWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueContainer: {
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 5,
    },
    value: {
        fontSize: 20,
        paddingVertical: 10,
    },
});
