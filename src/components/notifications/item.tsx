import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Pressable, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Image } from 'expo-image';
import { GetNotificationsQuery } from '@/store/services/anilist/generated-anilist';
import { getNotificationMessage, getTimeUntil, rgbToRgba } from '../../utils';
import { useAppSelector } from '@/store/hooks';

type NotifItemProps = {
	item: GetNotificationsQuery['Page']['notifications'][0];
	onNav: () => void;
};
export const NotifItem = ({ item, onNav }: NotifItemProps) => {
	const { colors } = useTheme();
	const { mediaLanguage } = useAppSelector((state) => state.persistedSettings);

	if (!item?.media) return null;

	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={{
				marginVertical: 5,
				marginHorizontal: 10,
				borderRadius: 12,
				backgroundColor: rgbToRgba(colors.primaryContainer, 0.2),
			}}
		>
			<Pressable onPress={onNav} android_ripple={{ color: colors.primary }}>
				<View style={{ flexDirection: 'row' }}>
					{/* {item.media.bannerImage && (
                        <Image
                            source={{ uri: item.media.bannerImage }}
                            blurRadius={6}
                            style={{ width: '100%', height: '100%', position: 'absolute' }}
                        />
                    )} */}
					<Image
						source={{ uri: item.media?.coverImage?.extraLarge }}
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
								color: colors.onPrimaryContainer,
								width: '100%',
							}}
						>
							<Text style={{ fontStyle: 'italic' }}>
								{mediaLanguage === 'native'
									? item?.media?.title?.native
									: mediaLanguage === 'romaji'
										? item?.media?.title?.romaji
										: item?.media?.title?.english ??
											item?.media?.title?.romaji}{' '}
							</Text>
							{'\n'}
							{getNotificationMessage(item, mediaLanguage)}
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
