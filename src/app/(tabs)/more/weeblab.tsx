import { Accordion } from '@/components/animations';
import { copyToClipboard } from '@/utils';
import { saveImage } from '@/utils/images';
import { openWebBrowser } from '@/utils/webBrowser';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, Share, View } from 'react-native';
import {
	ActivityIndicator,
	Banner,
	Button,
	Chip,
	Divider,
	IconButton,
	Paragraph,
	SegmentedButtons,
	Surface,
	Text,
	TextInput,
	useTheme,
} from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as Burnt from 'burnt';
import { TOAST } from '@/constants/toast';
import { FactResponse, QuoteResponse, TextGenOptions, WaifuItEmotions } from '@/api/waifuit/types';
import { useAppTheme } from '@/store/theme/themes';
import {
	useEmotionQuery,
	useFactQuery,
	useOwOQuery,
	useQuoteQuery,
	useUvUQuery,
	useUwUQuery,
} from '@/api/waifuit/waifuit';
import { useAuthStore } from '@/store/authStore';

type TextInputContainerProps = {
	label: string;
	fact?: FactResponse;
	quote?: QuoteResponse;
	isFetching: boolean;
	onGenerate: () => void;
};
const TextInputContainer = ({
	label,
	fact,
	quote,
	isFetching,
	onGenerate,
}: TextInputContainerProps) => {
	const quoteText = quote ? `${quote?.quote}\n\n- ${quote?.author} (${quote?.anime})` : null;

	return (
		<View style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }]}>
			<TextInput
				mode="outlined"
				label={label}
				multiline
				value={fact?.fact ?? quoteText ?? ''}
				style={{ flexGrow: 2, maxWidth: '85%' }}
				editable={false}
				focusable={false}
			/>
			<View>
				<IconButton
					icon={
						!isFetching
							? 'refresh'
							: () => <ActivityIndicator style={{ alignSelf: 'center' }} />
					}
					onPress={onGenerate}
				/>
				<IconButton
					icon={'content-copy'}
					onPress={() => copyToClipboard(fact?.fact ?? quoteText)}
				/>
			</View>
		</View>
	);
};

const WeebLabPage = () => {
	const { colors } = useAppTheme();
	const { token } = useAuthStore().waifuit;

	const [selectedEmotion, setSelectedEmotion] = useState<WaifuItEmotions>(WaifuItEmotions.Angry);
	const emotionQuery = useEmotionQuery();

	const quoteQuery = useQuoteQuery();
	const factQuery = useFactQuery();

	const [generatedText, setGeneratedText] = useState<string>('');
	const [uwuTextQuery, setUwuTextQuery] = useState<string>('');
	const [uvuTextQuery, setUvuTextQuery] = useState<string>('');
	const [owoTextQuery, setOwoTextQuery] = useState<string>('');
	const [text, setText] = useState('');
	const owoQuery = useOwOQuery(owoTextQuery);
	const uvuQuery = useUvUQuery(uvuTextQuery);
	const uwuQuery = useUwUQuery(uwuTextQuery);

	const onTextGen = useCallback(
		(genType: TextGenOptions) => {
			switch (genType) {
				case TextGenOptions.owoify:
					setOwoTextQuery(text);
					break;
				case TextGenOptions.uvuify:
					setUvuTextQuery(text);
					break;
				case TextGenOptions.uwuify:
					setUwuTextQuery(text);
					break;
			}
		},
		[text],
	);

	return (
		<>
			<Stack.Screen options={{ title: 'Weeb Lab' }} />
			<ScrollView>
				<View style={{ alignItems: 'center' }}>
					<Image
						source={require('../../../../assets/waifu.it.logo.png')}
						style={{ aspectRatio: 1, width: '40%', maxHeight: 200 }}
						contentFit="contain"
					/>
					<Text
						onPress={() => openWebBrowser('https://waifu.it/')}
						variant="headlineMedium"
						style={{
							paddingVertical: 10,
							textDecorationLine: 'underline',
							color: colors.primary,
						}}
					>
						Waifu.It
					</Text>
					<View>
						<Paragraph>
							Waifu.It is a service that offers random anime waifus, quotes, facts,
							and more!
							{'\n'}
						</Paragraph>
					</View>
				</View>
				<Divider />
				{!token ? (
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							paddingHorizontal: 10,
						}}
					>
						<Text style={{ textAlign: 'center' }}>
							Currently testing Waifu.It! {'\n\n'} For this lab, you will need a
							token.
						</Text>
						<Button
							mode="elevated"
							style={{ marginVertical: 20 }}
							onPress={() => router.replace('/more/accounts')}
						>
							Setup Waifu.It Token
						</Button>
					</View>
				) : (
					<View>
						<Accordion title="Emotion Gif">
							<FlashList
								data={Object.keys(WaifuItEmotions)}
								keyExtractor={(item) => item}
								horizontal
								renderItem={({ item }) => (
									<Chip
										selected={selectedEmotion === WaifuItEmotions[item]}
										onPress={() => setSelectedEmotion(WaifuItEmotions[item])}
										style={{ margin: 5 }}
									>
										{item}
									</Chip>
								)}
								estimatedItemSize={77}
							/>
							<View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
								<View style={{ flexDirection: 'row' }}>
									{/* <Button
										mode="outlined"
										style={{ flexGrow: 2, justifyContent: 'center' }}
										labelStyle={{ textTransform: 'capitalize' }}
										onPress={onGenEmotion}
									>
										Get {selectedEmotion} gif
									</Button> */}
									<IconButton
										icon={'share-variant-outline'}
										disabled={!emotionQuery.data.data?.url}
										onPress={() =>
											Share.share({
												title: emotionQuery.data.data?.url,
												message: emotionQuery.data.data?.url,
												url: emotionQuery.data.data?.url,
											})
										}
									/>
									<IconButton
										icon={'download-outline'}
										disabled={!emotionQuery.data.data?.url}
										onPress={() => saveImage(emotionQuery.data.data?.url)}
									/>
								</View>
								{emotionQuery && (
									<Animated.View
										entering={FadeIn}
										exiting={FadeOut}
										style={{ alignItems: 'center', paddingVertical: 10 }}
									>
										{emotionQuery.isFetching ? (
											<View
												style={{
													height: 200,
													justifyContent: 'center',
													alignItems: 'center',
												}}
											>
												<ActivityIndicator animating={true} />
											</View>
										) : (
											<Image
												cachePolicy="none"
												source={{
													uri: emotionQuery.data.data?.url?.includes(
														'gif',
													)
														? emotionQuery.data.data?.url
														: `${emotionQuery.data.data?.url}.gif`,
												}}
												style={{
													maxHeight: 250,
													width: '95%',
													aspectRatio: 335 / 188.438,
													marginTop: 10,
												}}
												contentFit="contain"
											/>
										)}
									</Animated.View>
								)}
							</View>
						</Accordion>
						<Accordion title="Random Facts / Quotes">
							<View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
								<TextInputContainer
									label="Fact"
									fact={factQuery.data.data}
									onGenerate={() => factQuery.refetch()}
									isFetching={factQuery.isFetching}
								/>
								<TextInputContainer
									label="Quote"
									quote={quoteQuery.data.data}
									onGenerate={() => quoteQuery.refetch()}
									isFetching={quoteQuery.isFetching}
								/>
							</View>
						</Accordion>
						<Accordion title="Text Modification" description="owoify, uvuify, uwuify">
							<View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										marginVertical: 10,
									}}
								>
									<TextInput
										mode="flat"
										multiline
										value={text}
										onChangeText={(text) => setText(text)}
										placeholder="Enter some text"
										style={{ flexGrow: 2, maxWidth: '85%' }}
									/>
									<IconButton icon="close" onPress={() => setText('')} />
								</View>
								<View
									style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
								>
									<Button
										mode="outlined"
										style={{ flex: 1, justifyContent: 'center' }}
										onPress={() => onTextGen(TextGenOptions.owoify)}
									>
										owoify
									</Button>
									<Button
										mode="outlined"
										style={{ flex: 1, justifyContent: 'center' }}
										onPress={() => onTextGen(TextGenOptions.uvuify)}
									>
										uvuify
									</Button>
									<Button
										mode="outlined"
										style={{ flex: 1, justifyContent: 'center' }}
										onPress={() => onTextGen(TextGenOptions.uwuify)}
									>
										uwuify
									</Button>
								</View>
								<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
									<IconButton icon="arrow-down" />
									<IconButton
										icon={
											owoQuery.isFetching ||
											uvuQuery.isFetching ||
											uwuQuery.isFetching
												? () => (
														<ActivityIndicator
															style={{ alignSelf: 'center' }}
														/>
													)
												: 'arrow-down'
										}
									/>
									<IconButton icon="arrow-down" />
								</View>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										marginVertical: 10,
									}}
								>
									<TextInput
										mode="outlined"
										value={generatedText}
										multiline
										style={{ flexGrow: 2, maxWidth: '85%' }}
										editable={false}
										focusable={false}
									/>
									<IconButton
										icon={'content-copy'}
										onPress={() => copyToClipboard(generatedText)}
									/>
								</View>
							</View>
						</Accordion>
					</View>
				)}
			</ScrollView>
		</>
	);
};

export default WeebLabPage;
