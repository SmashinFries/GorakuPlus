import { UserOverviewQuery } from '@/api/anilist/__genereated__/gql';
import { useAppTheme } from '@/store/theme/themes';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Button, Surface, Text, useTheme } from 'react-native-paper';

type MediaStatIsland = {
	icon: string;
	title: string;
	value: number;
};
export const MediaStatIsland = ({ icon, title, value }: MediaStatIsland) => {
	const { colors } = useAppTheme();
	if (!value) return null;
	return (
		<View style={[styles.container]}>
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
		</View>
	);
};

const calculateLabels = (value, isManga?: boolean) => {
	// borrowed this method from the anilist site :)
	const bounderies: [number, number, number][] = isManga
		? [
				[0, 50, 100],
				[100, 500, 1e3],
				[1e3, 3e3, 5e3],
				[5e3, 7500, 1e4],
			]
		: [
				[0, 12, 1],
				[1, 5, 10],
				[10, 30, 50],
				[50, 75, 100],
			];
	const labels = bounderies.find((boundry) => {
		return value < boundry[2];
	});
	if (labels) {
		return labels;
	} else {
		const initialStep = isManga ? 1e3 * Math.floor(value / 1e3) : 100 * Math.floor(value / 100);
		return isManga
			? [initialStep, initialStep + 500, initialStep + 1e3]
			: [initialStep, initialStep + 50, initialStep + 100];
	}
};

type StatBarProps = {
	surfaceWidth: number;
	value: number;
	isManga?: boolean;
};
const StatBar = ({ surfaceWidth, value, isManga }: StatBarProps) => {
	const { colors } = useAppTheme();
	const labels = calculateLabels(value, isManga);
	const labelPosPerc = 0.3333 / 2;
	const totalLength = surfaceWidth - surfaceWidth * labelPosPerc * 2;
	const progressWidth = (totalLength * (value - labels[0])) / (labels[2] - labels[0]);

	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'flex-end',
					paddingTop: 20,
				}}
			>
				<View style={{ width: '33.3333%', alignItems: 'center' }}>
					<Text
						variant="labelSmall"
						style={{ position: 'absolute', top: -18, color: colors.onSurfaceVariant }}
					>
						{labels[0]}
					</Text>
					<View
						style={{
							width: 2,
							height: 10,
							backgroundColor: colors.surfaceVariant,
							borderRadius: 10,
							marginVertical: 2,
						}}
					/>
				</View>
				<View style={{ width: '33.3333%', alignItems: 'center' }}>
					<View
						style={{
							width: 2,
							height: 10,
							backgroundColor: colors.surfaceVariant,
							borderRadius: 10,
							marginVertical: 2,
						}}
					/>
					<Text
						variant="labelSmall"
						style={{ position: 'absolute', top: -18, color: colors.onSurfaceVariant }}
					>
						{labels[1]}
					</Text>
				</View>
				<View style={{ width: '33.3333%', alignItems: 'center' }}>
					<Text
						variant="labelSmall"
						style={{ position: 'absolute', top: -18, color: colors.onSurfaceVariant }}
					>
						{labels[2]}
					</Text>
					<View
						style={{
							width: 2,
							height: 10,
							backgroundColor: colors.surfaceVariant,
							borderRadius: 10,
							marginVertical: 2,
						}}
					/>
				</View>
			</View>
			<View
				style={{
					width: surfaceWidth,
					height: 8,
				}}
			>
				<View
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						backgroundColor: colors.primaryContainer,
					}}
				/>
				<View
					style={{
						position: 'absolute',
						height: '100%',
						width: progressWidth + surfaceWidth * labelPosPerc,
						borderTopRightRadius: 12,
						borderBottomRightRadius: 12,
						backgroundColor: colors.primary,
					}}
				/>
			</View>
		</View>
	);
};

type StatusCardProps = {
	data1: {
		value: number | string;
		label: string;
	};
	data2: {
		value: number;
		label: string;
	};
	data3: {
		value: number;
		label: string;
	};
	isManga?: boolean;
};
const StatusCard = ({ data1, data2, data3, isManga }: StatusCardProps) => {
	const { colors } = useAppTheme();
	const { width } = useWindowDimensions();
	const surfaceWidth = width - 10; // sub margin
	return (
		<Surface
			mode="elevated"
			style={{
				flex: 1,
				overflow: 'hidden',
				borderRadius: 8,
			}}
		>
			<View style={{ padding: 6, flexDirection: 'row', justifyContent: 'space-evenly' }}>
				<View style={{ alignItems: 'center' }}>
					<Text style={{ color: colors.onSurface }}>{data1.value}</Text>
					<Text
						variant="labelSmall"
						style={{ color: colors.onSurfaceVariant, textAlign: 'center' }}
					>
						{data1.label}
					</Text>
				</View>
				<View style={{ alignItems: 'center' }}>
					<Text style={{ color: colors.onSurface }}>
						{data2.value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
					</Text>
					<Text
						variant="labelMedium"
						style={{ color: colors.onSurfaceVariant, textAlign: 'center' }}
					>
						{data2.label}
					</Text>
				</View>
				<View style={{ alignItems: 'center' }}>
					<Text style={{ color: colors.onSurface }}>{data3.value.toFixed(1)}</Text>
					<Text
						variant="labelMedium"
						style={{ color: colors.onSurfaceVariant, textAlign: 'center' }}
					>
						{data3.label}
					</Text>
				</View>
			</View>
			<StatBar surfaceWidth={surfaceWidth} value={data2.value} isManga={isManga} />
		</Surface>
	);
};

type StatOverview = {
	anime: UserOverviewQuery['user']['statistics']['anime'];
	manga: UserOverviewQuery['user']['statistics']['manga'];
};
export const StatOverview = ({ anime, manga }: StatOverview) => {
	const { colors } = useAppTheme();

	const daysWasted = anime?.minutesWatched ? anime?.minutesWatched / (60 * 24) : 0;

	if (!anime && !manga) return null;
	return (
		<View>
			<View
				style={{
					marginHorizontal: 10,
					borderRadius: 12,
					gap: 20,
				}}
			>
				{anime && (
					<StatusCard
						data1={{ label: 'Total\nAnime', value: anime.count }}
						data2={{ label: 'Days\nWasted', value: daysWasted }}
						data3={{ label: 'Mean\nScore', value: anime.meanScore }}
					/>
				)}
				{manga && (
					<StatusCard
						data1={{ label: 'Total\nManga', value: manga.count }}
						data2={{ label: 'Chapters\nRead', value: manga.chaptersRead ?? 0 }}
						data3={{ label: 'Mean\nScore', value: manga.meanScore }}
						isManga
					/>
				)}
			</View>
			{/* <Button
				style={{ marginHorizontal: 10 }}
				onPress={() => console.log(Math.floor(daysWasted / 25) * 25)}
				mode="elevated"
			>
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
