import { View } from 'react-native';
import { Chip, Icon, Text, TextProps } from 'react-native-paper';
import { convertDate } from '@/utils';
import {
	FuzzyDate,
	MediaCoverImage,
	MediaFormat,
	MediaStatus,
	MediaType,
} from '@/api/anilist/__genereated__/gql';
import { Image } from 'expo-image';
import QRCode from 'react-native-qrcode-svg';
import { InstagramCardScore } from './score';
import AniListMarkdownViewer from '../markdown/renderer';

export type MediaAniCardProps = {
	title: string;
	titleLines?: number | null;
	titleSize?: TextProps<any>['variant'];
	type: MediaType;
	format: MediaFormat | null | undefined;
	coverImg: MediaCoverImage | null | undefined;
	totalContent?: number;
	startDate?: FuzzyDate;
	anilistScore: number | null | undefined;
	malScore?: number;
	tags?: string[];
	tagLimit?: number;
	description?: string;
	isDescriptionHtml?: boolean;
	descriptionLines?: number | null;
	status?: MediaStatus;
	id?: number;
};

export const MediaAniCard = ({ descriptionLines = 6, ...cardProps }: MediaAniCardProps) => {
	const subTextColor = '#d6d6d6';
	return (
		<View
			style={{
				width: '100%',
				aspectRatio: 1,
				justifyContent: 'space-evenly',
				// backgroundColor: Color('#0d6be4').fade(0.5).string(),
			}}
		>
			<View style={{ position: 'absolute', width: '100%', height: '100%' }}>
				<Image
					source={{
						uri: cardProps.coverImg?.extraLarge,
					}}
					style={{ width: '100%', height: '100%' }}
					contentFit="cover"
					blurRadius={10}
				/>
				<View
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0,0,0,0.7)',
					}}
				/>
			</View>
			<View style={{ flexDirection: 'row', paddingTop: 20 }}>
				<View style={{ justifyContent: 'center', paddingHorizontal: 6 }}>
					<Image
						source={{
							uri: cardProps.coverImg?.extraLarge,
						}}
						style={{ borderRadius: 12, width: 140, aspectRatio: 2 / 3 }}
					/>
				</View>
				<View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 8 }}>
					<Text
						variant={cardProps.titleSize ?? 'headlineSmall'}
						style={{ fontWeight: '800', color: '#FFF' }}
						numberOfLines={cardProps.titleLines ?? undefined}
					>
						{cardProps.title}
					</Text>
					<View style={{ paddingVertical: 5 }}>
						<Text style={{ textTransform: 'capitalize', color: subTextColor }}>
							{[
								cardProps.type,
								cardProps.format !== MediaFormat.Manga ? cardProps.format : null,
								cardProps.totalContent
									? `${cardProps.totalContent} ${cardProps.type === MediaType.Anime ? ' EP' : cardProps.format === MediaFormat.Novel ? ' Vols' : ' Chpts'}`
									: null,
								cardProps.type === MediaType.Manga ? cardProps.status : null,
							]
								.filter((val) => val !== null)
								.join(' | ')}
						</Text>
						{cardProps.startDate ? (
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									paddingVertical: 5,
								}}
							>
								<Icon source={'calendar-outline'} size={14} color={subTextColor} />
								<Text style={{ paddingLeft: 4, color: subTextColor }}>
									{convertDate(cardProps.startDate)}
								</Text>
							</View>
						) : null}
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start',
						}}
					>
						<InstagramCardScore type="anilist" score={cardProps.anilistScore} />
						<InstagramCardScore type="mal" score={cardProps.malScore} />
					</View>
				</View>
			</View>

			<View
				style={{
					flex: 1,
					justifyContent: 'space-evenly',
					paddingVertical: 12,
					overflow: 'hidden',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						paddingHorizontal: 6,
						overflow: 'hidden',
					}}
				>
					{cardProps.tags
						?.filter((_, idx) =>
							Number.isInteger(cardProps.tagLimit)
								? idx < (cardProps?.tagLimit ?? 0)
								: true,
						)
						.map((tag, idx) => (
							<Chip
								key={idx}
								compact
								textStyle={{ color: '#FFF' }}
								style={{
									backgroundColor: '#1c1b1c',
									marginRight: 6,
									marginVertical: 4,
								}}
							>
								{tag}
							</Chip>
						))}
				</View>
				<View style={{ justifyContent: 'center' }}>
					{cardProps.isDescriptionHtml ? (
						<View style={{ paddingHorizontal: 10 }}>
							<AniListMarkdownViewer
								body={cardProps.description}
								textColor="#FFF"
								numLines={descriptionLines ?? 5}
							/>
						</View>
					) : (
						<Text
							numberOfLines={descriptionLines ?? 2}
							style={{ paddingHorizontal: 10, color: '#FFF' }}
						>
							{cardProps.description}
						</Text>
					)}
				</View>
				{/* <View
					style={{
						height: 2,
						width: '96%',
						alignSelf: 'center',
						backgroundColor: cardProps.coverImg.color,
						borderRadius: 4,
					}}
				/> */}
			</View>
			{cardProps.id && (
				<View style={{ position: 'absolute', top: 4, right: 4 }}>
					<QRCode
						value={`https://www.anilist.co/${cardProps.type.toLowerCase()}/${cardProps.id}`}
						backgroundColor="transparent"
						color="#FFF"
						size={24}
					/>
				</View>
			)}
		</View>
	);
};
