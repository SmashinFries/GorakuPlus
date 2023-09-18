import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterStackProps, StaffStackProps } from '../../navigation/types';
import { useColumns } from '../../utils';
import { useCallback, useEffect, useState } from 'react';
import { StaffItem } from './components/card';
import { useStaffList } from './hooks/useStaff';

const StaffListScreen = ({
    navigation,
    route,
}: NativeStackScreenProps<StaffStackProps, 'staffList'>) => {
    const { mediaId } = route.params;
    const { loadMore, staffData } = useStaffList(mediaId);
    const { columns, listKey } = useColumns(180);
    const { height } = useWindowDimensions();
    const { colors } = useTheme();

    const RenderItem = useCallback(
        (props) => (
            <StaffItem
                {...props}
                subTextColor={colors.onSurfaceVariant}
                onNavigation={(id) => navigation.navigate('staff', { id: id })}
            />
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
                numColumns={columns}
                key={listKey}
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
