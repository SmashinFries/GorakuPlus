import { useAppTheme } from '@/store/theme/themes';
import { GithubReleaseResponse } from '@/types';
import { downloadAppUpdate } from '@/utils/update';
import { useState } from 'react';
import { View } from 'react-native';
import ActionSheet, { ScrollView, SheetProps, useSheetRef } from 'react-native-actions-sheet';
import Markdown from 'react-native-markdown-display';
import { Button, Divider, Icon, ProgressBar, Text } from 'react-native-paper';

export type AppUpdaterSheetProps = {
	updateDetails: GithubReleaseResponse[0] | null;
};
// eslint-disable-next-line react/display-name
export const AppUpdaterSheet = ({ payload: { updateDetails } }: SheetProps<'AppUpdaterSheet'>) => {
	const ref = useSheetRef();
	const { colors } = useAppTheme();
	const [isDownloading, setIsDownloading] = useState(false);
	const [progress, setProgress] = useState(0);

	const installUpdate = async () => {
		if (updateDetails?.assets[0]) {
			downloadAppUpdate(
				updateDetails?.assets[0].browser_download_url,
				updateDetails.tag_name,
				(progPerc) => {
					setProgress(progPerc);
				},
				(isDownloadActive) => setIsDownloading(isDownloadActive),
			);
		}
	};

	return (
		<ActionSheet
			containerStyle={{ backgroundColor: colors.elevation.level1 }}
			indicatorStyle={{ backgroundColor: colors.onSurfaceVariant }}
		>
			<View>
				<View style={{ padding: 10 }}>
					<View
						style={{
							flexDirection: 'row',

							marginVertical: 5,
							alignItems: 'center',
						}}
					>
						<Icon source={'update'} size={36} color={colors.primary} />
						<View
							style={{
								paddingHorizontal: 12,
								alignItems: 'flex-start',
								justifyContent: 'center',
							}}
						>
							<Text variant="headlineSmall">New Update Available!</Text>
							<Text variant="labelLarge">Version {updateDetails?.tag_name}</Text>
						</View>
					</View>

					<Divider style={{ height: 2 }} />
				</View>
			</View>
			{updateDetails?.body && (
				<ScrollView>
					<View style={{ padding: 10 }}>
						<Markdown style={{ body: { color: colors.onSurface } }}>
							{updateDetails?.body}
						</Markdown>
					</View>
				</ScrollView>
			)}
			<View>
				<Divider style={{ height: 2 }} />
				<View
					style={{
						paddingVertical: 5,
					}}
				>
					<View>
						<ProgressBar progress={progress} />
					</View>
					<Button mode="contained" style={{ marginVertical: 5 }} onPress={installUpdate}>
						Update
					</Button>
					<Button
						mode="outlined"
						style={{ marginVertical: 5 }}
						onPress={() => ref.current?.hide()}
					>
						Skip
					</Button>
				</View>
			</View>
		</ActionSheet>
	);
};
