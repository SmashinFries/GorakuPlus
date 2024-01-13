import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
    children: React.ReactNode;
};
const BodyContainer = ({ children }: Props) => {
    const { colors } = useTheme();

    if (Platform.OS === 'ios') {
        return (
            <View style={[styles.container, { backgroundColor: 'transparent' }]}>{children}</View>
        );
    } else {
        <LinearGradient locations={[0.1, 0.2]} colors={['transparent', colors.background]}>
            <View style={[styles.container, { backgroundColor: 'transparent' }]}>{children}</View>
        </LinearGradient>;
    }
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        overflow: 'visible',
        paddingTop: 100,
    },
});

export default BodyContainer;
