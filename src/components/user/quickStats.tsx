import { AnimatePresence, MotiView } from 'moti';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
// import { UserHeatmap } from './heatmap';
import { UserOverviewQuery } from '@/store/services/anilist/generated-anilist';

type MediaStatIsland = {
    icon: string;
    title: string;
    value: number;
};
export const MediaStatIsland = ({ icon, title, value }: MediaStatIsland) => {
	const { colors } = useTheme();
	if (!value) return null;
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
					<Text style={[styles.value, { color: colors.onPrimaryContainer }]}>
						{value.toLocaleString()}
					</Text>
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
					value={anime?.minutesWatched ?? 0}
				/>
				<MediaStatIsland
					icon={'television-play'}
					title="Episodes Watched"
					value={anime?.episodesWatched ?? 0}
				/>
				<MediaStatIsland
					icon={'television-play'}
					title="Chapters Read"
					value={manga?.chaptersRead ?? 0}
				/>
				{/* <MediaStatIsland
                    icon={'television-play'}
                    title="Volumes Read"
                    value={manga.volumesRead}
                /> */}
			</View>
			{/* <Button style={{ marginHorizontal: 10 }} onPress={navToStats} mode="elevated">
                View Statistics
            </Button> */}
			{/* <UserHeatmap data={activity} /> */}
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
