import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { getNotificationMessage, getTimeUntil } from '../../utils';
import {
	AiringNotification,
	GetNotificationsQuery_Page_Page_notifications_AiringNotification,
} from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useAppTheme } from '@/store/theme/themes';

type NotifItemProps = {
	item: GetNotificationsQuery_Page_Page_notifications_AiringNotification;
	onNav: () => void;
};
export const NotifItem = ({ item, onNav }: NotifItemProps) => {
	const { colors } = useAppTheme();
	const { mediaLanguage } = useSettingsStore();

	if (!item?.media) return null;

	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={{
				marginVertical: 5,
				marginHorizontal: 10,
				borderRadius: 12,
				backgroundColor: colors.elevation.level2,
				overflow: 'hidden',
			}}
		>
			<Pressable onPress={onNav} android_ripple={{ color: colors.primary }}>
				<View style={{ flexDirection: 'row' }}>
					<Image
						source={{ uri: item?.media?.coverImage?.extraLarge }}
						style={{ height: 140, width: 90, borderRadius: 12, aspectRatio: 2 / 3 }}
						contentFit="cover"
					/>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<Text
							numberOfLines={4}
							style={{
								paddingHorizontal: 10,
								paddingVertical: 10,
								color: colors.onSurface,
								width: '100%',
							}}
						>
							<Text style={{ fontStyle: 'italic' }}>
								{mediaLanguage === 'native'
									? item?.media?.title?.native
									: mediaLanguage === 'romaji'
										? item?.media?.title?.romaji
										: (item?.media?.title?.english ??
											item?.media?.title?.romaji)}{' '}
							</Text>
							{'\n'}
							<Text variant="labelMedium" style={{ color: colors.onSurfaceVariant }}>
								{getNotificationMessage(
									item as AiringNotification,
									mediaLanguage ?? 'romaji',
								)}
							</Text>
						</Text>
					</View>
					{/* <LinearGradient
                        style={{ width: '100%', height: '100%' }}
                        colors={[colors.background, 'transparent', colors.background]}
                    >
                        
                    </LinearGradient> */}
				</View>
				<View
					style={{
						position: 'absolute',
						width: '100%',
						alignItems: 'flex-end',
						justifyContent: 'flex-end',
						bottom: 6,
						paddingHorizontal: 8,
					}}
				>
					<Text variant="labelSmall">{getTimeUntil(item?.createdAt, 'createdAt')}</Text>
				</View>
			</Pressable>
		</Animated.View>
	);
};
