import { MotiView } from 'moti';
import { GetAnimePicturesApiResponse } from '@/store/services/mal/malApi';
import { Portal } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { MotiPressable } from 'moti/interactions';
import { TransYUpViewMem } from '@/components/animations';
import { ListHeading } from '@/components/text';
import { SaveImageDialog } from '@/utils/images';
import { useCallback, useState } from 'react';

type MalImageItemProps = {
    item: GetAnimePicturesApiResponse['data'][0];
    index: number;
};
const MalImageItem = ({
    item,
    index,
    onDownload,
}: MalImageItemProps & { onDownload: (img: string) => void }) => {
    return (
        <MotiPressable
            onLongPress={() => {
                onDownload(item.jpg?.large_image_url);
            }}
            style={{ marginHorizontal: 5 }}
        >
            <Image
                // @ts-ignore jikan openapi is behind
                source={{ uri: item.jpg?.large_image_url }}
                style={{ width: 225, height: 250 }}
                contentFit="scale-down"
            />
        </MotiPressable>
    );
};

type MalImagesProps = {
    data: GetAnimePicturesApiResponse;
};
const MalImages = ({ data }: MalImagesProps) => {
    const [selectedImg, setSelectedImg] = useState('');

    const onDismiss = useCallback(() => setSelectedImg(''), []);

    const onDownload = useCallback((img_url: string) => {
        setSelectedImg(img_url);
    }, []);

    const RenderItem = useCallback((props) => {
        return <MalImageItem {...props} onDownload={onDownload} />;
    }, []);

    if (!data?.data) {
        return null;
    }

    return (
        <TransYUpViewMem style={{ overflow: 'visible' }}>
            <ListHeading title="Images" />
            <MotiView style={{ width: '100%', height: 260 }}>
                <FlashList
                    data={data?.data}
                    renderItem={RenderItem}
                    keyExtractor={(item, index) => index.toString()}
                    estimatedItemSize={250}
                    horizontal
                    contentContainerStyle={{ padding: 15 }}
                    showsHorizontalScrollIndicator={false}
                    drawDistance={225 * data?.data?.length}
                />
            </MotiView>
            <Portal>
                <SaveImageDialog img_url={selectedImg} onDismiss={onDismiss} />
            </Portal>
        </TransYUpViewMem>
    );
};

export default MalImages;
