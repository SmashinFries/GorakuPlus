import { IconButton, useTheme } from 'react-native-paper';
import { MotiView } from 'moti';
import { Selectable } from '../../../components/moti';
import { CrunchyRollIcon } from '../../../components/svgs';
import { View } from 'react-native';

type QuickSelectorProps = {
    icon: string;
    disabled?: boolean;
    onPress?: () => void;
};
export const QuickSelector = ({ icon, disabled = false, onPress }: QuickSelectorProps) => {
    const { colors } = useTheme();
    return (
        <View
            style={{
                // flex: 1,
                maxWidth: 34,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
            }}
        >
            {icon !== 'crunchy' ? (
                <IconButton
                    onPress={onPress ?? null}
                    disabled={disabled}
                    iconColor={colors.primary}
                    icon={icon}
                    size={32}
                />
            ) : (
                <CrunchyRollIcon
                    width={38}
                    height={38}
                    onPress={onPress ?? null}
                    logoColor={disabled ? colors.onSurface : colors.primary}
                    opacity={disabled ? 0.12 : 1}
                    fontColor={colors.onBackground}
                />
            )}
        </View>
    );
};
