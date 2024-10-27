import { Accordion } from '@/components/animations';
import { copyToClipboard } from '@/utils';
import { saveImage } from '@/utils/images';
import { openWebBrowser } from '@/utils/webBrowser';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, Share, View } from 'react-native';
import {
	ActivityIndicator,
	Button,
	Chip,
	Divider,
	IconButton,
	Paragraph,
	Portal,
	Text,
	TextInput,
} from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
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
import { WaifuItTokenDialog } from '@/components/dialogs';
import { useShallow } from 'zustand/react/shallow';
import { useQueryClient } from '@tanstack/react-query';
import { sendErrorMessage } from '@/utils/toast';
import { WaifuItHeader } from '@/components/headers';

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

const WaifuItLoginPage = ({ onAuthOpen }: { onAuthOpen: () => void }) => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				paddingHorizontal: 10,
			}}
		>
			<Button mode="elevated" style={{ marginVertical: 20 }} onPress={onAuthOpen}>
				Setup Waifu.It Token
			</Button>
		</View>
	);
};

const WeebLabPage = () => {
	const { colors } = useAppTheme();
	const { token } = useAuthStore(useShallow((state) => state.waifuit));
	const queryClient = useQueryClient();

	const [vis, setVis] = useState(false);

	const [selectedEmotion, setSelectedEmotion] = useState<WaifuItEmotions>(WaifuItEmotions.Angry);
	const emotionQuery = useEmotionQuery();

	const [factData, setFactData] = useState<FactResponse>(null);
	const [factIsFetching, setFactIsFetching] = useState(false);
	const [quoteData, setQuoteData] = useState<QuoteResponse>(null);
	const [quoteIsFetching, setQuoteIsFetching] = useState(false);

	// const [generatedText, setGeneratedText] = useState<string>('');
	const [activeTextMod, setActiveTextMod] = useState<'uwu' | 'uvu' | 'owo'>();
	const [uwuTextQuery, setUwuTextQuery] = useState<string>('');
	const [uvuTextQuery, setUvuTextQuery] = useState<string>('');
	const [owoTextQuery, setOwoTextQuery] = useState<string>('');
	const [text, setText] = useState('');
	const owoQuery = useOwOQuery(owoTextQuery);
	const uvuQuery = useUvUQuery(uvuTextQuery);
	const uwuQuery = useUwUQuery(uwuTextQuery);

	const fetchQuote = async () => {
		setQuoteIsFetching(true);
		try {
			const result = await queryClient.fetchQuery(useQuoteQuery.options());
			setQuoteData(result.data);
			setQuoteIsFetching(false);
		} catch (_e) {
			setQuoteIsFetching(false);
			sendErrorMessage('Failed to Fetch. Please check auth token.');
		}
	};

	const fetchFact = async () => {
		setFactIsFetching(true);
		try {
			const result = await queryClient.fetchQuery(useFactQuery.options());
			setFactData(result.data);
			setFactIsFetching(false);
		} catch (_e) {
			setFactIsFetching(false);
			sendErrorMessage('Failed to Fetch. Please check auth token.');
		}
	};

	const generatedText = useMemo(
		() =>
			activeTextMod === 'owo'
				? owoQuery?.data?.data?.text
				: activeTextMod === 'uvu'
					? uvuQuery?.data?.data?.text
					: uwuQuery?.data?.data?.text,
		[activeTextMod, owoQuery?.data, uvuQuery?.data, uwuQuery?.data],
	);

	const onTextGen = useCallback(
		(genType: TextGenOptions) => {
			switch (genType) {
				case TextGenOptions.owoify:
					setOwoTextQuery(text);
					setActiveTextMod('owo');
					break;
				case TextGenOptions.uvuify:
					setUvuTextQuery(text);
					setActiveTextMod('uvu');
					break;
				case TextGenOptions.uwuify:
					setUwuTextQuery(text);
					setActiveTextMod('uwu');
					break;
			}
		},
		[text],
	);

	return (
		<>
			<Stack.Screen
				options={{
					title: 'WaifuIt',
					header: (props) => <WaifuItHeader {...props} onAuthOpen={() => setVis(true)} />,
				}}
			/>
			<ScrollView>
				<View style={{ alignItems: 'center', paddingVertical: 20 }}>
					<Image
						source={require('../../../../../assets/waifu.it.logo.png')}
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
							and more
							{'\n'}
						</Paragraph>
					</View>
				</View>
				<Divider />
				{!token ? (
					<WaifuItLoginPage onAuthOpen={() => setVis(true)} />
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
										disabled={!emotionQuery?.data?.data?.url}
										onPress={() =>
											Share.share({
												title: emotionQuery?.data?.data?.url,
												message: emotionQuery.data?.data?.url,
												url: emotionQuery.data?.data?.url,
											})
										}
									/>
									<IconButton
										icon={'download-outline'}
										disabled={!emotionQuery.data?.data?.url}
										onPress={() => saveImage(emotionQuery?.data?.data?.url)}
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
													uri: emotionQuery?.data?.data?.url?.includes(
														'gif',
													)
														? emotionQuery?.data?.data?.url
														: `${emotionQuery?.data?.data?.url}.gif`,
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
									fact={factData}
									onGenerate={() => fetchFact()}
									isFetching={factIsFetching}
								/>
								<TextInputContainer
									label="Quote"
									quote={quoteData}
									onGenerate={() => fetchQuote()}
									isFetching={quoteIsFetching}
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
			<Portal>
				<WaifuItTokenDialog visible={vis} onDismiss={() => setVis(false)} />
			</Portal>
		</>
	);
};

export default WeebLabPage;
