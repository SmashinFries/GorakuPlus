import { Button, List, Surface, Text, TouchableRipple } from 'react-native-paper';
import { convertDate, copyToClipboard, rgbToRgba } from '@/utils';
import { View } from 'react-native';
import { useMemo } from 'react';
import { Accordion } from '@/components/animations';
import { COUNTRY_OPTIONS } from '@/constants/anilist';
import { router } from 'expo-router';
import Animated from 'react-native-reanimated';
import { AniMediaQuery, MediaFormat, MediaType } from '@/api/anilist/__genereated__/gql';
import { AnimeFull, MangaFull } from '@/api/jikan/models';
import { useAppTheme } from '@/store/theme/themes';
import { SeriesModelV1 } from '@/api/mangaupdates/models';

type MetaDataProps = {
	data: AniMediaQuery['Media'] | undefined;
	malData?: AnimeFull | MangaFull;
};
export const MetaData = ({ data, malData }: MetaDataProps) => {
	const { colors, roundness } = useAppTheme();
	const startDate = data?.startDate ? convertDate(data?.startDate, true) : null;
	const endDate = data?.endDate ? convertDate(data?.endDate, true) : null;

	// delay={960}

	return (
		<Animated.View>
			<Accordion title="Details" enableDivider>
				<List.Item
					title={'Source'}
					right={(props) => (
						<Text {...props} style={{ textTransform: 'capitalize' }}>
							{data?.source?.replaceAll('_', ' ') ?? '??'}
						</Text>
					)}
				/>
				<List.Item
					title={
						data?.type === 'ANIME'
							? 'Episodes'
							: data?.format === MediaFormat.Novel
								? 'Volumes'
								: 'Chapters'
					}
					right={(props) => (
						<Text {...props}>
							{data?.chapters ?? data?.volumes ?? data?.episodes ?? 'N/A'}
						</Text>
					)}
				/>
				<List.Item
					title="Origin"
					right={(props) => (
						<Text {...props}>
							{data?.countryOfOrigin
								? COUNTRY_OPTIONS[
										data?.countryOfOrigin as keyof typeof COUNTRY_OPTIONS
									]['name']
								: 'N/A'}
						</Text>
					)}
				/>
				{data?.type === MediaType.Anime && (
					<List.Item
						title="Duration"
						right={(props) => <Text {...props}>{data?.duration ?? 'N/A'}</Text>}
					/>
				)}
				{data?.season && (
					<List.Item
						title="Season"
						right={(props) => (
							<Text {...props} style={{ textTransform: 'capitalize' }}>
								{data?.season && data?.seasonYear
									? `${data?.season} ${data?.seasonYear}`
									: 'N/A'}
							</Text>
						)}
					/>
				)}
				<List.Item
					title="Start Date"
					right={(props) => <Text {...props}>{startDate ?? 'N/A'}</Text>}
				/>
				<List.Item
					title="End Date"
					right={(props) => <Text {...props}>{endDate ?? 'N/A'}</Text>}
				/>
				<List.Item
					title="Maturity Rating"
					right={(props) => (
						<Text selectable {...props} style={{ width: '50%', textAlign: 'right' }}>
							{(malData as AnimeFull)?.rating ?? 'N/A'}
						</Text>
					)}
				/>
				<List.Item
					title="Favorites"
					right={(props) => (
						<Text {...props}>{data?.favourites?.toLocaleString() ?? 'N/A'}</Text>
					)}
				/>
				<List.Item
					title="Format"
					right={(props) => (
						<Text {...props} style={{ textTransform: 'capitalize' }}>
							{data?.format?.replaceAll('_', ' ') ?? 'N/A'}
						</Text>
					)}
				/>
				<List.Item
					title="Trending Rank"
					right={(props) => (
						<Text {...props}>{data?.trending?.toLocaleString() ?? 'N/A'}</Text>
					)}
				/>
				<List.Item
					title="Popularity Rank"
					right={(props) => (
						<Text {...props}>{data?.popularity?.toLocaleString() ?? 'N/A'}</Text>
					)}
				/>
				<List.Item
					title="HashTags"
					description={
						data?.hashtag?.includes('#')
							? () => (
									<View
										style={{
											flexDirection: 'row',
											flexWrap: 'wrap',
											marginTop: 10,
										}}
									>
										{data?.hashtag?.split('#')?.map(
											(name, idx) =>
												name.length > 1 && (
													<Button
														key={idx}
														mode="elevated"
														style={{ margin: 5 }}
														onPress={() => copyToClipboard(`#${name}`)}
													>
														{`#${name}`}
													</Button>
												),
										)}
									</View>
								)
							: null
					}
					right={
						!data?.hashtag?.includes('#')
							? (props) => <Text {...props}>{'N/A'}</Text>
							: undefined
					}
				/>
				<List.Item
					title="Synonyms"
					description={
						(data?.synonyms?.length ?? 0) > 0
							? () => (
									<View
										style={{
											marginTop: 10,
											flexDirection: 'row',
											flexWrap: 'wrap',
										}}
									>
										{data?.synonyms?.map((name, idx) => (
											//   <Button
											//       key={idx}
											//       mode="elevated"
											//       style={{ margin: 5 }}
											//       onPress={() => copyToClipboard(name)}
											//   >
											//       {name}
											//   </Button>
											<Surface
												key={idx}
												mode="elevated"
												style={{
													margin: 5,
													borderRadius: roundness * 5,
												}}
											>
												<TouchableRipple
													borderless
													style={{ borderRadius: roundness * 5 }}
													rippleColor={rgbToRgba(colors.primary, 0.12)}
													onPress={() => copyToClipboard(name)}
												>
													<Text
														style={{
															color: colors.primary,
															marginVertical: 10,
															marginHorizontal: 24,
														}}
													>
														{name}
													</Text>
												</TouchableRipple>
											</Surface>
										))}
									</View>
								)
							: null
					}
					right={
						(data?.synonyms?.length ?? 0) < 1
							? (props) => (
									<Text {...props} style={{ width: '50%', textAlign: 'right' }}>
										{'N/A'}
									</Text>
								)
							: undefined
					}
				/>
				{data?.type !== MediaType.Manga && (
					<List.Item
						title="Studios"
						description={
							(data?.studios?.edges?.filter((val) => val?.isMain === true).length ??
								0) > 0
								? () => (
										<View
											style={{
												flexDirection: 'row',
												flexWrap: 'wrap',
												marginTop: 10,
											}}
										>
											{data?.studios?.edges?.map(
												(studio, idx) =>
													studio?.isMain && (
														<Button
															key={idx}
															mode="elevated"
															icon={
																studio.node?.isFavourite
																	? 'star'
																	: undefined
															}
															style={{ margin: 5 }}
															onPress={() =>
																router.push(
																	`/studio/${studio.node?.id}`,
																)
															}
															onLongPress={
																() => {
																	router.push({
																		pathname:
																			'/(sheets)/studioActions',
																		params: {
																			params: JSON.stringify(
																				studio.node,
																			),
																		},
																	});
																}
																// copyToClipboard(studio.node.name)
															}
														>
															{studio?.node?.name}
														</Button>
													),
											)}
										</View>
									)
								: null
						}
						right={
							(data?.studios?.edges?.length ?? 0) < 1
								? (props) => (
										<Text
											{...props}
											style={{ width: '50%', textAlign: 'right' }}
										>
											{'N/A'}
										</Text>
									)
								: undefined
						}
					/>
				)}
				{data?.type !== MediaType.Manga && (
					<List.Item
						title="Producers"
						description={() => (
							<View
								style={{
									flexDirection: 'row',
									flexWrap: 'wrap',
									marginTop: 10,
									// justifyContent: 'flex-end',
								}}
							>
								{data?.studios?.edges?.map(
									(studio, idx) =>
										!studio?.isMain && (
											<Button
												key={idx}
												mode="elevated"
												style={{ margin: 5 }}
												onPress={() =>
													router.push(`/studio/${studio?.node?.id}`)
												}
												onLongPress={() => {
													router.push({
														pathname: '/(sheets)/studioActions',
														params: {
															params: JSON.stringify(studio?.node),
														},
													});
												}}
											>
												{studio?.node?.name}
											</Button>
										),
								)}
							</View>
						)}
						right={
							(data?.studios?.edges?.filter((val) => val?.isMain === false)?.length ??
								0) < 1
								? (props) => (
										<Text
											{...props}
											style={{ width: '50%', textAlign: 'right' }}
										>
											{'N/A'}
										</Text>
									)
								: undefined
						}
					/>
				)}
			</Accordion>
		</Animated.View>
	);
};

export const MUData = ({
	data,
	openMuDialog,
}: {
	data: SeriesModelV1;
	openMuDialog: () => void;
}) => {
	const { colors } = useAppTheme();
	const isEnglishTrans = useMemo(
		() => data?.publishers?.some((pub) => pub.type === 'English') ?? false,
		[data?.publishers],
	);

	if (!data) return null;

	return (
		<View>
			<Accordion containerKey={data?.series_id} title="Manga Updates" enableDivider={true}>
				<List.Item
					title="Title"
					description="Wrong series?"
					descriptionStyle={{
						textDecorationLine: 'underline',
						color: colors.primary,
					}}
					right={(_props) => (
						<Text style={{ maxWidth: '50%' }}>{data?.title ?? 'N/A'}</Text>
					)}
					onPress={openMuDialog}
				/>
				<List.Item
					title="Licensed (English)"
					right={(props) => (
						<List.Icon {...props} icon={isEnglishTrans ? 'check' : 'close'} />
					)}
				/>
				<List.Item
					title="Latest Chapter"
					right={(_props) => <Text selectable>{data?.latest_chapter ?? 'N/A'}</Text>}
				/>
				<List.Item
					title="Last Updated"
					right={(_props) => (
						<Text selectable>{data?.last_updated?.as_string ?? 'N/A'}</Text>
					)}
				/>
				{data?.anime?.start ? (
					<List.Item
						title="Anime Start"
						right={(_props) => (
							<Text style={{ width: '50%', textAlign: 'right' }} selectable>
								{data?.anime?.start ?? 'N/A'}
							</Text>
						)}
					/>
				) : null}
				{data?.anime?.end ? (
					<List.Item
						title="Anime End"
						right={(_props) => (
							<Text style={{ width: '50%', textAlign: 'right' }} selectable>
								{data?.anime?.end ?? 'N/A'}
							</Text>
						)}
					/>
				) : null}
			</Accordion>
		</View>
	);
};
