import { TransYUpViewMem } from '@/components/animations';
import { ListHeading } from '@/components/text';
import { useBlur } from '@/hooks/useNSFWBlur';
import { Media } from '@/store/services/anilist/generated-anilist';
import { useAppTheme } from '@/store/theme/theme';
import { SaveImageDialog } from '@/utils/images';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Portal } from 'react-native-paper';

type ScreenshotItemProps = {
    item: Media['streamingEpisodes'][0];
    index: number;
};
const ScreenshotItem = ({
    item,
    index,
    onDownload,
}: ScreenshotItemProps & { onDownload: (img: string) => void }) => {
    const { blurAmount, toggleBlur } = useBlur();
    const { colors } = useAppTheme();
    return (
        <Pressable
            onPress={() => {
                onDownload(item.thumbnail);
            }}
            onLongPress={toggleBlur}
            style={{ marginHorizontal: 5, height: 160, aspectRatio: 16 / 9 }}
        >
            <Image
                source={{ uri: item.thumbnail }}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
                placeholder={colors.blurhash}
                placeholderContentFit="cover"
                transition={800}
                blurRadius={blurAmount}
                recyclingKey={item.thumbnail}
            />
        </Pressable>
    );
};

type ScreenshotsProps = {
    data: Media['streamingEpisodes'];
};
const ScreenshotImages = ({ data }: ScreenshotsProps) => {
    const { colors } = useAppTheme();
    const [selectedImg, setSelectedImg] = useState('');

    const onDismiss = useCallback(() => setSelectedImg(''), []);

    const onDownload = useCallback((img_url: string) => {
        setSelectedImg(img_url);
    }, []);

    const RenderItem = useCallback((props) => {
        return <ScreenshotItem {...props} onDownload={onDownload} />;
    }, []);

    if (!data || data?.length === 0) {
        return null;
    }

    return (
        <TransYUpViewMem style={{ overflow: 'visible' }}>
            <ListHeading
                title="Screenshots"
                subtitle="Contains spoilers!"
                subtitleStyle={{ color: colors.onSurfaceVariant }}
            />
            <View style={{ width: '100%', height: 160 }}>
                <FlashList
                    data={data}
                    renderItem={RenderItem}
                    keyExtractor={(item, index) => index.toString()}
                    estimatedItemSize={250}
                    horizontal
                    contentContainerStyle={{ padding: 15 }}
                    showsHorizontalScrollIndicator={false}
                    // drawDistance={225 * data?.data?.length}
                />
            </View>
            <Portal>
                <SaveImageDialog img_url={selectedImg} onDismiss={onDismiss} />
            </Portal>
        </TransYUpViewMem>
    );
};

export default ScreenshotImages;
