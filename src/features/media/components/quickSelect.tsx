import { IconButton, useTheme } from 'react-native-paper';
import { MotiView } from 'moti';
import { Selectable } from '../../../components/moti';
import { CrunchyRollIcon } from '../../../components/svgs';

type QuickSelectorProps = {
    icon: string;
    disabled?: boolean;
    onPress?: () => void;
};
export const QuickSelector = ({ icon, disabled, onPress }: QuickSelectorProps) => {
    const { colors } = useTheme();
    return (
        <Selectable
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            disabled={disabled}
            onPress={onPress}
        >
            {icon !== 'crunchy' ? (
                <IconButton disabled={disabled} iconColor={colors.primary} icon={icon} size={32} />
            ) : (
                <CrunchyRollIcon
                    width={38}
                    height={38}
                    logoColor={disabled ? colors.onSurface : colors.primary}
                    opacity={disabled ? 0.12 : 1}
                    fontColor={colors.onBackground}
                />
            )}
        </Selectable>
    );
};
