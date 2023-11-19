import { FlashList } from '@shopify/flash-list';
import { MotiView } from 'moti';
// import { Skeleton } from 'moti/skeleton';
import { Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

// const Spacer = ({ width }) => <MotiView style={{ width:width ?? 16 }} />;

export const MediaListsPHs = () => {
    const placeHolders = new Array(12).fill('');

    const { colors, dark } = useTheme();
    return (
        <MotiView style={{ flexDirection: 'row' }}>
            {placeHolders.map((item, index) => (
                <MotiView key={index}>
                    {/* <Spacer /> */}
                    {/* <Skeleton
                        show={true}
                        height={Platform.OS === 'web' ? 400 : 230}
                        width={Platform.OS === 'web' ? 300 : 150}
                        // colors={[colors.secondaryContainer, colors.secondary]}
                        colorMode={dark ? 'dark' : 'light'}
                    /> */}
                    {/* <Spacer /> */}
                </MotiView>
            ))}
        </MotiView>
    );
};

export const MediaListsPH = () => {
    const placeHolders = new Array(12).fill('');
    const { colors, dark } = useTheme();
    return (
        // <FlashList
        //     data={placeHolders}
        //     keyExtractor={(item, index) => index.toString()}
        //     renderItem={({ item, index }) => (
        //         <Skeleton
        //             show={true}
        //             height={Platform.OS === 'web' ? 400 : 230}
        //             width={Platform.OS === 'web' ? 300 : 150}
        //             // colors={[colors.secondaryContainer, colors.secondary]}
        //             colorMode={dark ? 'dark' : 'light'}
        //         />
        //     )}
        //     horizontal={true}
        //     estimatedItemSize={300}
        //     contentContainerStyle={{ padding: 20, paddingVertical: 40 }}
        //     ItemSeparatorComponent={() => <MotiView style={{ width: 20 }} />}
        //     showsHorizontalScrollIndicator={false}
        //     style={{ minHeight: 450 }}
        // />
        <MotiView
            style={{
                height: Platform.OS === 'web' ? 400 : 230,
                width: Platform.OS === 'web' ? 300 : 150,
            }}
        />
    );
};
