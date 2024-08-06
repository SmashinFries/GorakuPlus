import { GetNotificationsQuery } from '@/api/anilist/__genereated__/gql';

export type NotifTypes = GetNotificationsQuery['Page']['notifications'][0]['__typename'];
