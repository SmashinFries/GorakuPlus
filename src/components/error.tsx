import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { MotiView } from 'moti';
import { StyleSheet } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

export const NetworkError = ({ status }: { status: QueryStatus }) => {
    const { colors } = useTheme();

    return (
        <MotiView style={[styles.container]}>
            <MotiView>
                <IconButton icon="server-network-off" size={38} iconColor={colors.error} />
            </MotiView>
            <Text>{'Something went wrong :('}</Text>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
