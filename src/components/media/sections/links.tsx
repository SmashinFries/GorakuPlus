import { IconButton, Text, useTheme } from 'react-native-paper';
import { MediaExternalLink } from '@/store/services/anilist/generated-anilist';
import { TransXInViewMem, TransYUpViewMem } from '@/components/animations';
import { ListHeading } from '@/components/text';
import { ScrollView } from 'react-native';
import { openWebBrowser } from '@/utils/webBrowser';
import { copyToClipboard } from '@/utils';
import { useMediaLinks } from '@/hooks/media/useLinks';
import {
    AnilistIcon,
    FunimationIcon,
    MalIcon,
    MangaUpdatesIcon,
    NetflixIcon,
} from '@/components/svgs';
import { View } from 'react-native';
import { AnimeFull } from '@/store/services/mal/malApi';
import { StreamSites } from '@/types/mal';

type LinkIconButtonProps = {
    index: number;
    textColor: string;
    siteName?: string;
    customIcon?: ({ size, color }: { size: number; color: string }) => JSX.Element;
    iconLink?: string;
    iconColor?: string;
    siteUrl?: string;
    language?: string;
    notes?: string;
};
const ExtLinkIconButton = ({
    siteName,
    index,
    iconColor,
    customIcon,
    siteUrl,
    iconLink,
    textColor,
    language,
    notes,
}: LinkIconButtonProps) => {
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
                iconColor={iconColor ?? undefined}
                icon={customIcon ? customIcon : iconLink ? { uri: iconLink } : 'earth'}
                onPress={() => openWebBrowser(siteUrl)}
                onLongPress={() => copyToClipboard(siteUrl)}
            />
            <Text numberOfLines={2}>
                {siteName}
                {language ? ` · ${LANGUAGE_ABRV[language]}` : null}
            </Text>
            {notes ? (
                <Text
                    variant="labelMedium"
                    style={{
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        color: textColor,
                    }}
                >
                    {`(${notes})`}
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
                                iconColor={link.color}
                                iconLink={link.icon}
                                language={link.language}
                                notes={link.notes}
                                siteName={link.site}
                                siteUrl={link.url}
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
                                textColor={colors.onSurfaceVariant}
                                iconColor={link.color}
                                iconLink={link.icon}
                                language={link.language}
                                notes={link.notes}
                                siteName={link.site}
                                siteUrl={link.url}
                            />
                        ),
                )}
            </ScrollView>
        </View>
    );
};

export const StreamingLinks = ({ streamLinks }: { streamLinks: AnimeFull['streaming'] }) => {
    const { colors } = useTheme();

    const CustomIcon = ({ name, size }: { name: string; size: number }) => {
        switch (name as StreamSites) {
            case 'Netflix':
                return <NetflixIcon width={size} height={size} />;
            case 'Funimation':
                return <FunimationIcon width={size} height={size} />;
            default:
                return null;
        }
    };

    return (
        <View style={{ marginVertical: 10, marginBottom: 20 }}>
            <ListHeading title="Streaming" />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: 15,
                }}
            >
                {streamLinks?.map(
                    (stream, index) =>
                        stream && (
                            <ExtLinkIconButton
                                key={index}
                                index={index}
                                textColor={colors.onSurfaceVariant}
                                siteName={stream.name}
                                siteUrl={stream.url}
                                // customIcon={({ size }) => (
                                //     <CustomIcon name={stream.name} size={size} />
                                // )}
                            />
                        ),
                )}
            </ScrollView>
        </View>
    );
};

export default MediaLinks;
