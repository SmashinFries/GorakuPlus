import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useColumns } from '@/utils';
import { useCallback } from 'react';
import { StaffItem } from '@/components/staff/card';
import { useStaffList } from '@/hooks/staff/useStaff';
import { router, useLocalSearchParams } from 'expo-router';
import { CharacterItem, CharacterLabel } from '@/components/characters/card';

const StaffListScreen = () => {
    const { mediaId } = useLocalSearchParams<{ mediaId: string }>();
    const { loadMore, staffData } = useStaffList(Number(mediaId));
    const { columns, listKey } = useColumns(180);
    const { height } = useWindowDimensions();
    const { colors } = useTheme();

    const RenderItem = useCallback(
        (props) => (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginVertical: 10,
                    marginHorizontal: 5,
                }}
            >
                <CharacterItem
                    {...props}
                    subTextColor={colors.onSurfaceVariant}
                    onNavigation={(id) => router.push(`/staff/info/${id}`)}
                />
                <CharacterLabel
                    role={props.item.role}
                    favourites={props.item.node?.favourites}
                    fontColor={colors.onSurfaceVariant}
                />
            </View>
        ),
        [],
    );

    if (staffData.isUninitialized) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <FlashList
                numColumns={3}
                key={3}
                data={staffData.data?.Media?.staff?.edges}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={RenderItem}
                contentContainerStyle={{ padding: 10 }}
                estimatedItemSize={241}
                drawDistance={height / 2}
                onEndReached={() => loadMore()}
            />
        </View>
    );
};

export default StaffListScreen;
