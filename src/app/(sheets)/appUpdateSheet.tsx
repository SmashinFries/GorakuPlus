import { useAppTheme } from '@/store/theme/themes';
import { downloadAppUpdate } from '@/utils/update';
import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Button, Icon, ProgressBar, Text } from 'react-native-paper';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import React from 'react';
import { GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { useAppUpdaterStore } from '@/store/appUpdateStore';

const AppUpdaterSheet = () => {
	const { updateDetails } = useAppUpdaterStore();
	const scrollRef = useRef<ScrollView>(null);

	const ref = useRef<TrueSheet>(null);
	const { colors } = useAppTheme();
	const [isDownloading, setIsDownloading] = useState(false);
	const [progress, setProgress] = useState(0);

	const onIsDownloading = (isDownloadActive: boolean) => {
		setIsDownloading(isDownloadActive);
		if (!isDownloadActive) {
			ref.current?.dismiss();
		}
	};

	const onProgress = (progPerc: number) => {
		setProgress(progPerc);
	};

	const installUpdate = async () => {
		if (updateDetails?.assets[0]) {
			downloadAppUpdate(
				updateDetails?.assets[0].browser_download_url,
				updateDetails?.tag_name,
				onProgress,
				onIsDownloading,
			);
		}
	};

	return (
		<GlobalBottomSheetParent
			sheetRef={ref}
			grabber={false}
			header={
				updateDetails && (
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
									<Text variant="labelLarge">
										Version {updateDetails?.tag_name}
									</Text>
								</View>
							</View>
						</View>
						{/* <Divider style={{ backgroundColor: colors.outlineVariant }} /> */}
						<View
							style={{
								width: '100%',
								height: 2,
								backgroundColor: colors.outlineVariant,
							}}
						/>
					</View>
				)
			}
			FooterComponent={
				<View
					style={{ backgroundColor: colors.elevation.level1, gap: 8, paddingBottom: 8 }}
				>
					<View>
						<ProgressBar progress={progress} style={{ height: 6 }} />
					</View>
					<View style={{ paddingHorizontal: 6, gap: 8 }}>
						<Button loading={isDownloading} mode="contained" onPress={installUpdate}>
							Update
						</Button>
						<Button
							mode="outlined"
							// style={{ margin: 5 }}
							onPress={() => ref.current?.dismiss()}
						>
							Skip
						</Button>
					</View>
				</View>
			}
			scrollable
			scrollRef={scrollRef}
			name="AppUpdaterSheet"
		>
			{updateDetails && updateDetails.body && (
				<View
					style={{
						padding: 10,
						paddingBottom: 220,
						backgroundColor: colors.elevation.level1,
					}}
				>
					<Markdown style={{ body: { color: colors.onSurface } }}>
						{updateDetails?.body}
					</Markdown>
				</View>
			)}
		</GlobalBottomSheetParent>
	);
};

export default AppUpdaterSheet;
