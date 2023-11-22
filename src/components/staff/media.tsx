import { View } from 'react-native';
import { MediaCard } from '../cards';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { MediaFormat, StaffDetailsQuery } from '@/store/services/anilist/generated-anilist';

type StaffMediaCardProps = {
    item: StaffDetailsQuery['Staff']['staffMedia']['edges'][0];
    onNav: any;
};
export const StaffMediaCard = ({ item, onNav }: StaffMediaCardProps) => {
    const { colors } = useTheme();
    return (
        <View style={{ marginHorizontal: 10, alignItems: 'center', maxHeight: 300 }}>
            <MediaCard
                coverImg={item.node.coverImage.extraLarge}
                titles={item.node.title}
                averageScore={item.node.averageScore}
                meanScore={item.node.meanScore}
                imgBgColor={item.node.coverImage.color}
                showHealthBar
                navigate={onNav}
            />
            <Text
                variant="labelLarge"
                numberOfLines={2}
                style={{ textTransform: 'capitalize', maxWidth: 200, textAlign: 'center' }}
            >
                {item.staffRole ?? '???'}
            </Text>
            <Text
                variant="labelMedium"
                style={{
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    color: colors.onSurfaceVariant,
                }}
            >
                {item.node?.format === MediaFormat.Tv
                    ? 'Anime'
                    : item.node?.isLicensed
                    ? item.node?.format
                    : 'Doujin'}{' '}
                · {item.node?.status?.replaceAll('_', ' ') ?? '??'}
            </Text>
            {item.node?.isFavourite && (
                <IconButton
                    icon="heart"
                    iconColor="red"
                    mode="contained"
                    size={18}
                    style={{ position: 'absolute', top: -15, left: -5 }}
                />
            )}
        </View>
    );
};
