import { ReactNode, useEffect, useState } from 'react';
import { ExternalLinkType, MediaExternalLink } from '@/store/services/anilist/generated-anilist';
import { AnimeFull } from '@/store/services/mal/malApi';
import { StreamSites } from '@/types/mal';

type CustomMediaExternalLink = MediaExternalLink & { iconType: 'ani' | 'mal' | 'mu' };

export const useMediaLinks = (
    links: MediaExternalLink[],
    aniLink: string,
    malLink?: string,
    muLink?: string,
) => {
    const [dbLinks, setDbLinks] = useState<CustomMediaExternalLink[]>([]);
    const [extLinks, setExtLinks] = useState<MediaExternalLink[]>(links);

    const ani: CustomMediaExternalLink[] = [
        {
            id: 0,
            url: aniLink,
            site: 'AniList',
            icon: '',
            color: undefined,
            iconType: 'ani',
        },
    ];
    const mal: CustomMediaExternalLink[] = malLink
        ? [
              {
                  id: 2,
                  url: malLink,
                  site: 'MyAnimeList',
                  icon: '',
                  color: undefined,
                  iconType: 'mal',
              },
          ]
        : [];
    const mu: CustomMediaExternalLink[] = muLink
        ? [
              {
                  id: 3,
                  url: muLink,
                  site: 'MangaUpdates',
                  icon: '',
                  color: undefined,
                  iconType: 'mu',
              },
          ]
        : [];

    useEffect(() => {
        setDbLinks([...ani, ...mal, ...mu]);

        const infoLinks = links.filter((link) => link.type === ExternalLinkType.Info);
        const socialLinks = links.filter((link) => link.type === ExternalLinkType.Social);
        const streamLinks = links.filter((link) => link.type === ExternalLinkType.Streaming);

        setExtLinks([...infoLinks, ...socialLinks, ...streamLinks]);
    }, []);

    return { dbLinks, extLinks };
};
