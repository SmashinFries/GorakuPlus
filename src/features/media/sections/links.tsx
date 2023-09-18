import { IconButton, Text, useTheme } from 'react-native-paper';
import { MediaExternalLink } from '../../../app/services/anilist/generated-anilist';
import { TransXInViewMem, TransYUpViewMem } from '../../../components/animations';
import { ListHeading } from '../../../components/text';
import { ScrollView } from 'react-native';
import { openWebBrowser } from '../../../utils/webBrowser';
import { copyToClipboard } from '../../../utils';
import { useMediaLinks } from '../hooks/useLinks';
import { Image } from 'expo-image';
import { AnilistIcon, MalIcon, MangaUpdatesIcon } from '../../../components/svgs';
import { View } from 'react-native';

type LinkIconButtonProps = {
    link: MediaExternalLink;
    index: number;
    textColor: string;
    customIcon?: ({ size, color }: { size: number; color: string }) => JSX.Element;
};
const ExtLinkIconButton = ({ link, index, customIcon, textColor }: LinkIconButtonProps) => {
    return (
        <TransXInViewMem
            animation={false}
            direction="right"
            delay={index * 50}
            style={{ alignItems: 'center', marginHorizontal: 10 }}
        >
            <IconButton
                mode="contained"
                size={36}
                iconColor={link?.color ?? undefined}
                icon={customIcon ? customIcon : link?.icon ? { uri: link?.icon } : 'earth'}
                onPress={() => openWebBrowser(link?.url)}
                onLongPress={() => copyToClipboard(link?.url)}
            />
            <Text numberOfLines={2}>
                {link?.site}
                {link?.language ? ` · ${LANGUAGE_ABRV[link?.language]}` : null}
            </Text>
            {link?.notes ? (
                <Text
                    variant="labelMedium"
                    style={{
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        color: textColor,
                    }}
                >
                    {`(${link?.notes})`}
                </Text>
            ) : null}
        </TransXInViewMem>
    );
};

const LANGUAGE_ABRV = {
    Japanese: 'JP',
    Chinese: 'CN',
    Korean: 'KR',
    English: 'EN',
    Hungarian: 'HU',
    Spanish: 'ES',
    Portuguese: 'PT',
    French: 'FR',
    German: 'DE',
    Italian: 'IT',
    Hebrew: 'HE',
};

type MediaLinksProps = {
    links: MediaExternalLink[];
    malLink?: string;
    muLink?: string;
    aniLink: string;
};
const MediaLinks = ({ links, aniLink, malLink, muLink }: MediaLinksProps) => {
    const { colors } = useTheme();
    const { dbLinks, extLinks } = useMediaLinks(links, aniLink, malLink, muLink);

    return (
        <View style={{ marginVertical: 10, marginBottom: 20 }}>
            <ListHeading title="Links" />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: 15,
                }}
            >
                {dbLinks?.map(
                    (link, index) =>
                        link && (
                            <ExtLinkIconButton
                                key={index}
                                index={0}
                                link={link}
                                textColor={colors.onSurfaceVariant}
                                customIcon={({ size, color }) =>
                                    link?.iconType === 'ani' ? (
                                        <AnilistIcon width={size} height={size} isDark={true} />
                                    ) : link?.iconType === 'mal' ? (
                                        <MalIcon width={size} height={size} />
                                    ) : (
                                        <MangaUpdatesIcon width={size} height={size} />
                                    )
                                }
                            />
                        ),
                )}

                {extLinks?.map(
                    (link, index) =>
                        link && (
                            <ExtLinkIconButton
                                key={index}
                                index={index}
                                link={link}
                                textColor={colors.onSurfaceVariant}
                            />
                        ),
                )}
            </ScrollView>
        </View>
    );
};

export default MediaLinks;
