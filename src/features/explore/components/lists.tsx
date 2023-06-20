import { Platform, RefreshControl, ScrollView, View, useWindowDimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ExploreMediaQuery } from '../../../app/services/anilist/generated-anilist';
import { RenderMediaItem } from './media';
import { FlashList } from '@shopify/flash-list';
import { MediaListsPH } from './skeletons';
import { BackgroundArt } from './bg';
import React from 'react';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';

type RefreshableScrollProps = {
    children: React.ReactNode;
    onRefresh: () => void;
    refreshing: boolean;
};
export const RefreshableScroll = ({ children, refreshing, onRefresh }: RefreshableScrollProps) => {
    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {children}
        </ScrollView>
    );
};

type SectionScrollProps = {
    category_title: string;
    data: ExploreMediaQuery;
    isLoading: boolean;
};

export const SectionScroll = ({ category_title, data, isLoading }: SectionScrollProps) => {
    // const playSelectSound = useSound('selection');
    const initialBG =
        data?.Page?.media[0]?.bannerImage ?? data?.Page?.media[0]?.coverImage?.extraLarge ?? '';

    const { mediaLanguage } = useSelector((state: RootState) => state.persistedSettings);
    const { width, height } = useWindowDimensions();
    const { dark } = useTheme();

    // if (isLoading) return <AnimatedLoading />;

    return (
        <View style={{ width: width, justifyContent: 'center' }}>
            <Text
                variant="headlineLarge"
                style={{
                    fontWeight: 'bold',
                    margin: 30,
                    marginVertical: Platform.OS === 'web' ? 10 : 10,
                    textTransform: 'capitalize',
                }}
            >
                {category_title.toLowerCase()}
            </Text>
            {data ? (
                <FlashList
                    data={data?.Page?.media ?? []}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <RenderMediaItem
                            // @ts-ignore
                            item={item}
                            index={index}
                            language={mediaLanguage}
                        />
                    )}
                    horizontal={true}
                    estimatedItemSize={300}
                    indicatorStyle={dark ? 'black' : 'white'}
                    contentContainerStyle={{
                        padding: 20,
                        paddingVertical: Platform.OS === 'web' ? 40 : 20,
                    }}
                    ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <MediaListsPH />
            )}
            {data && Platform.OS === 'web' ? (
                // setting height to minHeight of parent causes artifacts at top of each section (LinearGradient)
                <BackgroundArt data={data} currentBG={initialBG} width={width} height={440} />
            ) : null}
        </View>
    );
};
