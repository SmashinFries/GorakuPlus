import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { IconButton, Tooltip, useTheme } from 'react-native-paper';
import { openWebBrowser } from '@/utils/webBrowser';

type InteractionBarProps = {
    profile_url: string;
    submissions_url: string;
    settings_url: string;
    onStatPress: () => void;
};
export const ProfileActionBar = ({
    profile_url,
    submissions_url,
    settings_url,
    onStatPress,
}: InteractionBarProps) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container]}>
            {/* <Divider /> */}
            <View style={[styles.iconsContainer]}>
                {/* <IconButton icon="download-outline" onPress={() => saveImage(url, name)} /> */}
                <Tooltip title="Profile Page">
                    <IconButton
                        icon="account-eye-outline"
                        rippleColor={colors.primary}
                        onPress={() => openWebBrowser(profile_url)}
                    />
                </Tooltip>
                <Tooltip title="Statistics">
                    <IconButton
                        icon="chart-bar"
                        rippleColor={colors.primary}
                        onPress={onStatPress}
                    />
                </Tooltip>
                <Tooltip title="Submissions">
                    <IconButton
                        icon="database-eye-outline"
                        rippleColor={colors.primary}
                        onPress={() => openWebBrowser(submissions_url)}
                    />
                </Tooltip>
                <Tooltip title="User Settings">
                    <IconButton
                        icon="cog-outline"
                        rippleColor={colors.primary}
                        onPress={() => openWebBrowser(settings_url)}
                    />
                </Tooltip>
            </View>
            {/* <Divider /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-evenly',
    },
});
