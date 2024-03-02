import { Accordion } from '@/components/animations';
import { ListHeading } from '@/components/text';
import { useAppSelector } from '@/store/hooks';
import {
	FactResponse,
	QuoteResponse,
	TextGenOptions,
	WaifuItEmotions,
} from '@/store/services/waifu.it/types';
import {
	useLazyGetFactQuery,
	useLazyGetInteractionQuery,
	useLazyGetQuoteQuery,
	useLazyOwoifyQuery,
	useLazyUvuifyQuery,
	useLazyUwuifyQuery,
} from '@/store/services/waifu.it/waifuit';
import { copyToClipboard } from '@/utils';
import { saveImage } from '@/utils/images';
import { openWebBrowser } from '@/utils/webBrowser';
import { SerializedError } from '@reduxjs/toolkit';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
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
	const { token } = useAppSelector((state) => state.persistedWaifuItToken);
	const { colors } = useTheme();

	const [getEmotion, emotion] = useLazyGetInteractionQuery();
	const [selectedEmotion, setSelectedEmotion] = useState<WaifuItEmotions>(WaifuItEmotions.Angry);

	const [getQuote, quoteQuery] = useLazyGetQuoteQuery();

	const [getFact, factQuery] = useLazyGetFactQuery();

	const [owoify, owoDetails] = useLazyOwoifyQuery();
	const [uvuify, uvuDetails] = useLazyUvuifyQuery();
	const [uwuify, uwuDetails] = useLazyUwuifyQuery();
	const [generatedText, setGeneratedText] = useState<string>('');
	const [textGenQuery, setTextGenQuery] = useState<string>('');

	const onGenEmotion = () => {
		getEmotion({ emotion: selectedEmotion });
	};

	const onTextGen = async (genType: TextGenOptions) => {
		switch (genType) {
		case TextGenOptions.owoify:
			try {
				const owoifyResult = await owoify({ text: textGenQuery }).unwrap();
				setGeneratedText(owoifyResult.text);
			} catch (e) {
				Burnt.toast({
					title: `Error code: ${e?.status} -> ${e?.data?.statusMessage}`,
					duration: TOAST.SHORT,
				});
			}
			break;
		case TextGenOptions.uvuify:
			try {
				const uvuifyResult = await uvuify({ text: textGenQuery }).unwrap();
				setGeneratedText(uvuifyResult.text);
			} catch (e) {
				Burnt.toast({
					title: `Error code: ${e?.status} -> ${e?.data?.statusMessage}`,
					duration: TOAST.SHORT,
				});
			}

			break;
		case TextGenOptions.uwuify:
			try {
				const uwuifyResult = await uwuify({ text: textGenQuery }).unwrap();
				setGeneratedText(uwuifyResult.text);
			} catch (e) {
				Burnt.toast({
					title: `Error code: ${e?.status} -> ${e?.data?.statusMessage}`,
					duration: TOAST.SHORT,
				});
			}

			break;
		}
	};

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
									<Button
										mode="outlined"
										style={{ flexGrow: 2, justifyContent: 'center' }}
										labelStyle={{ textTransform: 'capitalize' }}
										onPress={onGenEmotion}
									>
                                        Get {selectedEmotion} gif
									</Button>
									<IconButton
										icon={'share-variant-outline'}
										disabled={!emotion.data?.url}
										onPress={() =>
											Share.share({
												title: emotion.data?.url,
												message: emotion.data?.url,
												url: emotion.data?.url,
											})
										}
									/>
									<IconButton
										icon={'download-outline'}
										disabled={!emotion.data?.url}
										onPress={() => saveImage(emotion.data?.url)}
									/>
								</View>
								{emotion && (
									<Animated.View
										entering={FadeIn}
										exiting={FadeOut}
										style={{ alignItems: 'center', paddingVertical: 10 }}
									>
										{emotion.isFetching ? (
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
													uri: emotion.data?.url?.includes('gif')
														? emotion.data?.url
														: `${emotion.data?.url}.gif`,
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
									fact={factQuery.data}
									onGenerate={() => getFact()}
									isFetching={factQuery.isFetching}
								/>
								<TextInputContainer
									label="Quote"
									quote={quoteQuery.data}
									onGenerate={() => getQuote()}
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
										value={textGenQuery}
										onChangeText={(text) => setTextGenQuery(text)}
										placeholder="Enter some text"
										style={{ flexGrow: 2, maxWidth: '85%' }}
									/>
									<IconButton icon="close" onPress={() => setTextGenQuery('')} />
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
											owoDetails.isFetching ||
                                            uvuDetails.isFetching ||
                                            uwuDetails.isFetching
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
