import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
    children: React.ReactNode;
};
const BodyContainer = ({ children }: Props) => {
    const { colors } = useTheme();
    return (
        <LinearGradient locations={[0.1, 0.25]} colors={['transparent', colors.background]}>
            <MotiView style={[styles.container, { backgroundColor: 'transparent' }]}>
                {children}
            </MotiView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        paddingTop: 100,
    },
});

export default BodyContainer;
