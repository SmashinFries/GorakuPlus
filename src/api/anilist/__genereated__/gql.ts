import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { fetchAnilistData } from 'configs/anilist/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  CountryCode: { input: any; output: any; }
  FuzzyDateInt: { input: any; output: any; }
  Json: { input: any; output: any; }
};

/** Notification for when a activity is liked */
export type ActivityLikeNotification = {
  __typename?: 'ActivityLikeNotification';
  /** The liked activity */
  activity?: Maybe<ActivityUnion>;
  /** The id of the activity which was liked */
  activityId: Scalars['Int']['output'];
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who liked the activity */
  user?: Maybe<User>;
  /** The id of the user who liked to the activity */
  userId: Scalars['Int']['output'];
};

/** Notification for when authenticated user is @ mentioned in activity or reply */
export type ActivityMentionNotification = {
  __typename?: 'ActivityMentionNotification';
  /** The liked activity */
  activity?: Maybe<ActivityUnion>;
  /** The id of the activity where mentioned */
  activityId: Scalars['Int']['output'];
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who mentioned the authenticated user */
  user?: Maybe<User>;
  /** The id of the user who mentioned the authenticated user */
  userId: Scalars['Int']['output'];
};

/** Notification for when a user is send an activity message */
export type ActivityMessageNotification = {
  __typename?: 'ActivityMessageNotification';
  /** The id of the activity message */
  activityId: Scalars['Int']['output'];
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The message activity */
  message?: Maybe<MessageActivity>;
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who sent the message */
  user?: Maybe<User>;
  /** The if of the user who send the message */
  userId: Scalars['Int']['output'];
};

/** Replay to an activity item */
export type ActivityReply = {
  __typename?: 'ActivityReply';
  /** The id of the parent activity */
  activityId?: Maybe<Scalars['Int']['output']>;
  /** The time the reply was created at */
  createdAt: Scalars['Int']['output'];
  /** The id of the reply */
  id: Scalars['Int']['output'];
  /** If the currently authenticated user liked the reply */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /** The amount of likes the reply has */
  likeCount: Scalars['Int']['output'];
  /** The users who liked the reply */
  likes?: Maybe<Array<Maybe<User>>>;
  /** The reply text */
  text?: Maybe<Scalars['String']['output']>;
  /** The user who created reply */
  user?: Maybe<User>;
  /** The id of the replies creator */
  userId?: Maybe<Scalars['Int']['output']>;
};


/** Replay to an activity item */
export type ActivityReplyTextArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Notification for when a activity reply is liked */
export type ActivityReplyLikeNotification = {
  __typename?: 'ActivityReplyLikeNotification';
  /** The liked activity */
  activity?: Maybe<ActivityUnion>;
  /** The id of the activity where the reply which was liked */
  activityId: Scalars['Int']['output'];
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who liked the activity reply */
  user?: Maybe<User>;
  /** The id of the user who liked to the activity reply */
  userId: Scalars['Int']['output'];
};

/** Notification for when a user replies to the authenticated users activity */
export type ActivityReplyNotification = {
  __typename?: 'ActivityReplyNotification';
  /** The liked activity */
  activity?: Maybe<ActivityUnion>;
  /** The id of the activity which was replied too */
  activityId: Scalars['Int']['output'];
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who replied to the activity */
  user?: Maybe<User>;
  /** The id of the user who replied to the activity */
  userId: Scalars['Int']['output'];
};

/** Notification for when a user replies to activity the authenticated user has replied to */
export type ActivityReplySubscribedNotification = {
  __typename?: 'ActivityReplySubscribedNotification';
  /** The liked activity */
  activity?: Maybe<ActivityUnion>;
  /** The id of the activity which was replied too */
  activityId: Scalars['Int']['output'];
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who replied to the activity */
  user?: Maybe<User>;
  /** The id of the user who replied to the activity */
  userId: Scalars['Int']['output'];
};

/** Activity sort enums */
export enum ActivitySort {
  Id = 'ID',
  IdDesc = 'ID_DESC',
  Pinned = 'PINNED'
}

/** Activity type enum. */
export enum ActivityType {
  /** A anime list update activity */
  AnimeList = 'ANIME_LIST',
  /** A manga list update activity */
  MangaList = 'MANGA_LIST',
  /** Anime & Manga list update, only used in query arguments */
  MediaList = 'MEDIA_LIST',
  /** A text message activity sent to another user */
  Message = 'MESSAGE',
  /** A text activity */
  Text = 'TEXT'
}

/** Activity union type */
export type ActivityUnion = ListActivity | MessageActivity | TextActivity;

/** Notification for when an episode of anime airs */
export type AiringNotification = {
  __typename?: 'AiringNotification';
  /** The id of the aired anime */
  animeId: Scalars['Int']['output'];
  /** The notification context text */
  contexts?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The episode number that just aired */
  episode: Scalars['Int']['output'];
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The associated media of the airing schedule */
  media?: Maybe<Media>;
  /** The type of notification */
  type?: Maybe<NotificationType>;
};

/** Score & Watcher stats for airing anime by episode and mid-week */
export type AiringProgression = {
  __typename?: 'AiringProgression';
  /** The episode the stats were recorded at. .5 is the mid point between 2 episodes airing dates. */
  episode?: Maybe<Scalars['Float']['output']>;
  /** The average score for the media */
  score?: Maybe<Scalars['Float']['output']>;
  /** The amount of users watching the anime */
  watching?: Maybe<Scalars['Int']['output']>;
};

/** Media Airing Schedule. NOTE: We only aim to guarantee that FUTURE airing data is present and accurate. */
export type AiringSchedule = {
  __typename?: 'AiringSchedule';
  /** The time the episode airs at */
  airingAt: Scalars['Int']['output'];
  /** The airing episode number */
  episode: Scalars['Int']['output'];
  /** The id of the airing schedule item */
  id: Scalars['Int']['output'];
  /** The associate media of the airing episode */
  media?: Maybe<Media>;
  /** The associate media id of the airing episode */
  mediaId: Scalars['Int']['output'];
  /** Seconds until episode starts airing */
  timeUntilAiring: Scalars['Int']['output'];
};

export type AiringScheduleConnection = {
  __typename?: 'AiringScheduleConnection';
  edges?: Maybe<Array<Maybe<AiringScheduleEdge>>>;
  nodes?: Maybe<Array<Maybe<AiringSchedule>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
};

/** AiringSchedule connection edge */
export type AiringScheduleEdge = {
  __typename?: 'AiringScheduleEdge';
  /** The id of the connection */
  id?: Maybe<Scalars['Int']['output']>;
  node?: Maybe<AiringSchedule>;
};

export type AiringScheduleInput = {
  airingAt?: InputMaybe<Scalars['Int']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  timeUntilAiring?: InputMaybe<Scalars['Int']['input']>;
};

/** Airing schedule sort enums */
export enum AiringSort {
  Episode = 'EPISODE',
  EpisodeDesc = 'EPISODE_DESC',
  Id = 'ID',
  IdDesc = 'ID_DESC',
  MediaId = 'MEDIA_ID',
  MediaIdDesc = 'MEDIA_ID_DESC',
  Time = 'TIME',
  TimeDesc = 'TIME_DESC'
}

export type AniChartHighlightInput = {
  highlight?: InputMaybe<Scalars['String']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
};

export type AniChartUser = {
  __typename?: 'AniChartUser';
  highlights?: Maybe<Scalars['Json']['output']>;
  settings?: Maybe<Scalars['Json']['output']>;
  user?: Maybe<User>;
};

/** A character that features in an anime or manga */
export type Character = {
  __typename?: 'Character';
  /** The character's age. Note this is a string, not an int, it may contain further text and additional ages. */
  age?: Maybe<Scalars['String']['output']>;
  /** The characters blood type */
  bloodType?: Maybe<Scalars['String']['output']>;
  /** The character's birth date */
  dateOfBirth?: Maybe<FuzzyDate>;
  /** A general description of the character */
  description?: Maybe<Scalars['String']['output']>;
  /** The amount of user's who have favourited the character */
  favourites?: Maybe<Scalars['Int']['output']>;
  /** The character's gender. Usually Male, Female, or Non-binary but can be any string. */
  gender?: Maybe<Scalars['String']['output']>;
  /** The id of the character */
  id: Scalars['Int']['output'];
  /** Character images */
  image?: Maybe<CharacterImage>;
  /** If the character is marked as favourite by the currently authenticated user */
  isFavourite: Scalars['Boolean']['output'];
  /** If the character is blocked from being added to favourites */
  isFavouriteBlocked: Scalars['Boolean']['output'];
  /** Media that includes the character */
  media?: Maybe<MediaConnection>;
  /** Notes for site moderators */
  modNotes?: Maybe<Scalars['String']['output']>;
  /** The names of the character */
  name?: Maybe<CharacterName>;
  /** The url for the character page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
  /** @deprecated No data available */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};


/** A character that features in an anime or manga */
export type CharacterDescriptionArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A character that features in an anime or manga */
export type CharacterMediaArgs = {
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaSort>>>;
  type?: InputMaybe<MediaType>;
};

export type CharacterConnection = {
  __typename?: 'CharacterConnection';
  edges?: Maybe<Array<Maybe<CharacterEdge>>>;
  nodes?: Maybe<Array<Maybe<Character>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
};

/** Character connection edge */
export type CharacterEdge = {
  __typename?: 'CharacterEdge';
  /** The order the character should be displayed from the users favourites */
  favouriteOrder?: Maybe<Scalars['Int']['output']>;
  /** The id of the connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** The media the character is in */
  media?: Maybe<Array<Maybe<Media>>>;
  /** Media specific character name */
  name?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Character>;
  /** The characters role in the media */
  role?: Maybe<CharacterRole>;
  /** The voice actors of the character with role date */
  voiceActorRoles?: Maybe<Array<Maybe<StaffRoleType>>>;
  /** The voice actors of the character */
  voiceActors?: Maybe<Array<Maybe<Staff>>>;
};


/** Character connection edge */
export type CharacterEdgeVoiceActorRolesArgs = {
  language?: InputMaybe<StaffLanguage>;
  sort?: InputMaybe<Array<InputMaybe<StaffSort>>>;
};


/** Character connection edge */
export type CharacterEdgeVoiceActorsArgs = {
  language?: InputMaybe<StaffLanguage>;
  sort?: InputMaybe<Array<InputMaybe<StaffSort>>>;
};

export type CharacterImage = {
  __typename?: 'CharacterImage';
  /** The character's image of media at its largest size */
  large?: Maybe<Scalars['String']['output']>;
  /** The character's image of media at medium size */
  medium?: Maybe<Scalars['String']['output']>;
};

/** The names of the character */
export type CharacterName = {
  __typename?: 'CharacterName';
  /** Other names the character might be referred to as */
  alternative?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Other names the character might be referred to as but are spoilers */
  alternativeSpoiler?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The character's given name */
  first?: Maybe<Scalars['String']['output']>;
  /** The character's first and last name */
  full?: Maybe<Scalars['String']['output']>;
  /** The character's surname */
  last?: Maybe<Scalars['String']['output']>;
  /** The character's middle name */
  middle?: Maybe<Scalars['String']['output']>;
  /** The character's full name in their native language */
  native?: Maybe<Scalars['String']['output']>;
  /** The currently authenticated users preferred name language. Default romaji for non-authenticated */
  userPreferred?: Maybe<Scalars['String']['output']>;
};

/** The names of the character */
export type CharacterNameInput = {
  /** Other names the character might be referred by */
  alternative?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Other names the character might be referred to as but are spoilers */
  alternativeSpoiler?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The character's given name */
  first?: InputMaybe<Scalars['String']['input']>;
  /** The character's surname */
  last?: InputMaybe<Scalars['String']['input']>;
  /** The character's middle name */
  middle?: InputMaybe<Scalars['String']['input']>;
  /** The character's full name in their native language */
  native?: InputMaybe<Scalars['String']['input']>;
};

/** The role the character plays in the media */
export enum CharacterRole {
  /** A background character in the media */
  Background = 'BACKGROUND',
  /** A primary character role in the media */
  Main = 'MAIN',
  /** A supporting character role in the media */
  Supporting = 'SUPPORTING'
}

/** Character sort enums */
export enum CharacterSort {
  Favourites = 'FAVOURITES',
  FavouritesDesc = 'FAVOURITES_DESC',
  Id = 'ID',
  IdDesc = 'ID_DESC',
  /** Order manually decided by moderators */
  Relevance = 'RELEVANCE',
  Role = 'ROLE',
  RoleDesc = 'ROLE_DESC',
  SearchMatch = 'SEARCH_MATCH'
}

/** A submission for a character that features in an anime or manga */
export type CharacterSubmission = {
  __typename?: 'CharacterSubmission';
  /** Data Mod assigned to handle the submission */
  assignee?: Maybe<User>;
  /** Character that the submission is referencing */
  character?: Maybe<Character>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the submission */
  id: Scalars['Int']['output'];
  /** Whether the submission is locked */
  locked?: Maybe<Scalars['Boolean']['output']>;
  /** Inner details of submission status */
  notes?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  /** Status of the submission */
  status?: Maybe<SubmissionStatus>;
  /** The character submission changes */
  submission?: Maybe<Character>;
  /** Submitter for the submission */
  submitter?: Maybe<User>;
};

export type CharacterSubmissionConnection = {
  __typename?: 'CharacterSubmissionConnection';
  edges?: Maybe<Array<Maybe<CharacterSubmissionEdge>>>;
  nodes?: Maybe<Array<Maybe<CharacterSubmission>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
};

/** CharacterSubmission connection edge */
export type CharacterSubmissionEdge = {
  __typename?: 'CharacterSubmissionEdge';
  node?: Maybe<CharacterSubmission>;
  /** The characters role in the media */
  role?: Maybe<CharacterRole>;
  /** The submitted voice actors of the character */
  submittedVoiceActors?: Maybe<Array<Maybe<StaffSubmission>>>;
  /** The voice actors of the character */
  voiceActors?: Maybe<Array<Maybe<Staff>>>;
};

/** Deleted data type */
export type Deleted = {
  __typename?: 'Deleted';
  /** If an item has been successfully deleted */
  deleted?: Maybe<Scalars['Boolean']['output']>;
};

export enum ExternalLinkMediaType {
  Anime = 'ANIME',
  Manga = 'MANGA',
  Staff = 'STAFF'
}

export enum ExternalLinkType {
  Info = 'INFO',
  Social = 'SOCIAL',
  Streaming = 'STREAMING'
}

/** User's favourite anime, manga, characters, staff & studios */
export type Favourites = {
  __typename?: 'Favourites';
  /** Favourite anime */
  anime?: Maybe<MediaConnection>;
  /** Favourite characters */
  characters?: Maybe<CharacterConnection>;
  /** Favourite manga */
  manga?: Maybe<MediaConnection>;
  /** Favourite staff */
  staff?: Maybe<StaffConnection>;
  /** Favourite studios */
  studios?: Maybe<StudioConnection>;
};


/** User's favourite anime, manga, characters, staff & studios */
export type FavouritesAnimeArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


/** User's favourite anime, manga, characters, staff & studios */
export type FavouritesCharactersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


/** User's favourite anime, manga, characters, staff & studios */
export type FavouritesMangaArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


/** User's favourite anime, manga, characters, staff & studios */
export type FavouritesStaffArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


/** User's favourite anime, manga, characters, staff & studios */
export type FavouritesStudiosArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};

/** Notification for when the authenticated user is followed by another user */
export type FollowingNotification = {
  __typename?: 'FollowingNotification';
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The liked activity */
  user?: Maybe<User>;
  /** The id of the user who followed the authenticated user */
  userId: Scalars['Int']['output'];
};

/** User's format statistics */
export type FormatStats = {
  __typename?: 'FormatStats';
  amount?: Maybe<Scalars['Int']['output']>;
  format?: Maybe<MediaFormat>;
};

/** Date object that allows for incomplete date values (fuzzy) */
export type FuzzyDate = {
  __typename?: 'FuzzyDate';
  /** Numeric Day (24) */
  day?: Maybe<Scalars['Int']['output']>;
  /** Numeric Month (3) */
  month?: Maybe<Scalars['Int']['output']>;
  /** Numeric Year (2017) */
  year?: Maybe<Scalars['Int']['output']>;
};

/** Date object that allows for incomplete date values (fuzzy) */
export type FuzzyDateInput = {
  /** Numeric Day (24) */
  day?: InputMaybe<Scalars['Int']['input']>;
  /** Numeric Month (3) */
  month?: InputMaybe<Scalars['Int']['input']>;
  /** Numeric Year (2017) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** User's genre statistics */
export type GenreStats = {
  __typename?: 'GenreStats';
  amount?: Maybe<Scalars['Int']['output']>;
  genre?: Maybe<Scalars['String']['output']>;
  meanScore?: Maybe<Scalars['Int']['output']>;
  /** The amount of time in minutes the genre has been watched by the user */
  timeWatched?: Maybe<Scalars['Int']['output']>;
};

/** Page of data (Used for internal use only) */
export type InternalPage = {
  __typename?: 'InternalPage';
  activities?: Maybe<Array<Maybe<ActivityUnion>>>;
  activityReplies?: Maybe<Array<Maybe<ActivityReply>>>;
  airingSchedules?: Maybe<Array<Maybe<AiringSchedule>>>;
  characterSubmissions?: Maybe<Array<Maybe<CharacterSubmission>>>;
  characters?: Maybe<Array<Maybe<Character>>>;
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  likes?: Maybe<Array<Maybe<User>>>;
  media?: Maybe<Array<Maybe<Media>>>;
  mediaList?: Maybe<Array<Maybe<MediaList>>>;
  mediaSubmissions?: Maybe<Array<Maybe<MediaSubmission>>>;
  mediaTrends?: Maybe<Array<Maybe<MediaTrend>>>;
  modActions?: Maybe<Array<Maybe<ModAction>>>;
  notifications?: Maybe<Array<Maybe<NotificationUnion>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
  recommendations?: Maybe<Array<Maybe<Recommendation>>>;
  reports?: Maybe<Array<Maybe<Report>>>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  revisionHistory?: Maybe<Array<Maybe<RevisionHistory>>>;
  staff?: Maybe<Array<Maybe<Staff>>>;
  staffSubmissions?: Maybe<Array<Maybe<StaffSubmission>>>;
  studios?: Maybe<Array<Maybe<Studio>>>;
  threadComments?: Maybe<Array<Maybe<ThreadComment>>>;
  threads?: Maybe<Array<Maybe<Thread>>>;
  userBlockSearch?: Maybe<Array<Maybe<User>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


/** Page of data (Used for internal use only) */
export type InternalPageActivitiesArgs = {
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_greater?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['Int']['input']>;
  hasReplies?: InputMaybe<Scalars['Boolean']['input']>;
  hasRepliesOrTypeText?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  messengerId?: InputMaybe<Scalars['Int']['input']>;
  messengerId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  messengerId_not?: InputMaybe<Scalars['Int']['input']>;
  messengerId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sort?: InputMaybe<Array<InputMaybe<ActivitySort>>>;
  type?: InputMaybe<ActivityType>;
  type_in?: InputMaybe<Array<InputMaybe<ActivityType>>>;
  type_not?: InputMaybe<ActivityType>;
  type_not_in?: InputMaybe<Array<InputMaybe<ActivityType>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userId_not?: InputMaybe<Scalars['Int']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


/** Page of data (Used for internal use only) */
export type InternalPageActivityRepliesArgs = {
  activityId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageAiringSchedulesArgs = {
  airingAt?: InputMaybe<Scalars['Int']['input']>;
  airingAt_greater?: InputMaybe<Scalars['Int']['input']>;
  airingAt_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  episode_greater?: InputMaybe<Scalars['Int']['input']>;
  episode_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  episode_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode_not?: InputMaybe<Scalars['Int']['input']>;
  episode_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notYetAired?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InputMaybe<AiringSort>>>;
};


/** Page of data (Used for internal use only) */
export type InternalPageCharacterSubmissionsArgs = {
  assigneeId?: InputMaybe<Scalars['Int']['input']>;
  characterId?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SubmissionSort>>>;
  status?: InputMaybe<SubmissionStatus>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageCharactersArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CharacterSort>>>;
};


/** Page of data (Used for internal use only) */
export type InternalPageFollowersArgs = {
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  userId: Scalars['Int']['input'];
};


/** Page of data (Used for internal use only) */
export type InternalPageFollowingArgs = {
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  userId: Scalars['Int']['input'];
};


/** Page of data (Used for internal use only) */
export type InternalPageLikesArgs = {
  likeableId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<LikeableType>;
};


/** Page of data (Used for internal use only) */
export type InternalPageMediaArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>;
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>;
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>;
  averageScore_not?: InputMaybe<Scalars['Int']['input']>;
  chapters?: InputMaybe<Scalars['Int']['input']>;
  chapters_greater?: InputMaybe<Scalars['Int']['input']>;
  chapters_lesser?: InputMaybe<Scalars['Int']['input']>;
  countryOfOrigin?: InputMaybe<Scalars['CountryCode']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  duration_greater?: InputMaybe<Scalars['Int']['input']>;
  duration_lesser?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_like?: InputMaybe<Scalars['String']['input']>;
  episodes?: InputMaybe<Scalars['Int']['input']>;
  episodes_greater?: InputMaybe<Scalars['Int']['input']>;
  episodes_lesser?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<MediaFormat>;
  format_in?: InputMaybe<Array<InputMaybe<MediaFormat>>>;
  format_not?: InputMaybe<MediaFormat>;
  format_not_in?: InputMaybe<Array<InputMaybe<MediaFormat>>>;
  genre?: InputMaybe<Scalars['String']['input']>;
  genre_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  genre_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  idMal?: InputMaybe<Scalars['Int']['input']>;
  idMal_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  idMal_not?: InputMaybe<Scalars['Int']['input']>;
  idMal_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  isLicensed?: InputMaybe<Scalars['Boolean']['input']>;
  licensedBy?: InputMaybe<Scalars['String']['input']>;
  licensedById?: InputMaybe<Scalars['Int']['input']>;
  licensedById_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  licensedBy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  minimumTagRank?: InputMaybe<Scalars['Int']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  popularity?: InputMaybe<Scalars['Int']['input']>;
  popularity_greater?: InputMaybe<Scalars['Int']['input']>;
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>;
  popularity_not?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<MediaSeason>;
  seasonYear?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaSort>>>;
  source?: InputMaybe<MediaSource>;
  source_in?: InputMaybe<Array<InputMaybe<MediaSource>>>;
  startDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_like?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<MediaStatus>;
  status_in?: InputMaybe<Array<InputMaybe<MediaStatus>>>;
  status_not?: InputMaybe<MediaStatus>;
  status_not_in?: InputMaybe<Array<InputMaybe<MediaStatus>>>;
  tag?: InputMaybe<Scalars['String']['input']>;
  tagCategory?: InputMaybe<Scalars['String']['input']>;
  tagCategory_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagCategory_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<MediaType>;
  volumes?: InputMaybe<Scalars['Int']['input']>;
  volumes_greater?: InputMaybe<Scalars['Int']['input']>;
  volumes_lesser?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageMediaListArgs = {
  compareWithAuthList?: InputMaybe<Scalars['Boolean']['input']>;
  completedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_like?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notes_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaListSort>>>;
  startedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_like?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<MediaListStatus>;
  status_in?: InputMaybe<Array<InputMaybe<MediaListStatus>>>;
  status_not?: InputMaybe<MediaListStatus>;
  status_not_in?: InputMaybe<Array<InputMaybe<MediaListStatus>>>;
  type?: InputMaybe<MediaType>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userName?: InputMaybe<Scalars['String']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageMediaSubmissionsArgs = {
  assigneeId?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SubmissionSort>>>;
  status?: InputMaybe<SubmissionStatus>;
  submissionId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<MediaType>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageMediaTrendsArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>;
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>;
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>;
  averageScore_not?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_greater?: InputMaybe<Scalars['Int']['input']>;
  date_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  episode_greater?: InputMaybe<Scalars['Int']['input']>;
  episode_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  popularity?: InputMaybe<Scalars['Int']['input']>;
  popularity_greater?: InputMaybe<Scalars['Int']['input']>;
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>;
  popularity_not?: InputMaybe<Scalars['Int']['input']>;
  releasing?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaTrendSort>>>;
  trending?: InputMaybe<Scalars['Int']['input']>;
  trending_greater?: InputMaybe<Scalars['Int']['input']>;
  trending_lesser?: InputMaybe<Scalars['Int']['input']>;
  trending_not?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageModActionsArgs = {
  modId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageNotificationsArgs = {
  resetNotificationCount?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<NotificationType>;
  type_in?: InputMaybe<Array<InputMaybe<NotificationType>>>;
};


/** Page of data (Used for internal use only) */
export type InternalPageRecommendationsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaRecommendationId?: InputMaybe<Scalars['Int']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  rating_greater?: InputMaybe<Scalars['Int']['input']>;
  rating_lesser?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<RecommendationSort>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageReportsArgs = {
  reportedId?: InputMaybe<Scalars['Int']['input']>;
  reporterId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageReviewsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaType?: InputMaybe<MediaType>;
  sort?: InputMaybe<Array<InputMaybe<ReviewSort>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageRevisionHistoryArgs = {
  characterId?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  staffId?: InputMaybe<Scalars['Int']['input']>;
  studioId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageStaffArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<StaffSort>>>;
};


/** Page of data (Used for internal use only) */
export type InternalPageStaffSubmissionsArgs = {
  assigneeId?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SubmissionSort>>>;
  staffId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<SubmissionStatus>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageStudiosArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<StudioSort>>>;
};


/** Page of data (Used for internal use only) */
export type InternalPageThreadCommentsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ThreadCommentSort>>>;
  threadId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageThreadsArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaCategoryId?: InputMaybe<Scalars['Int']['input']>;
  replyUserId?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ThreadSort>>>;
  subscribed?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageUserBlockSearchArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


/** Page of data (Used for internal use only) */
export type InternalPageUsersArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  isModerator?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
};

/** Types that can be liked */
export enum LikeableType {
  Activity = 'ACTIVITY',
  ActivityReply = 'ACTIVITY_REPLY',
  Thread = 'THREAD',
  ThreadComment = 'THREAD_COMMENT'
}

/** Likeable union type */
export type LikeableUnion = ActivityReply | ListActivity | MessageActivity | TextActivity | Thread | ThreadComment;

/** User list activity (anime & manga updates) */
export type ListActivity = {
  __typename?: 'ListActivity';
  /** The time the activity was created at */
  createdAt: Scalars['Int']['output'];
  /** The id of the activity */
  id: Scalars['Int']['output'];
  /** If the currently authenticated user liked the activity */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /** If the activity is locked and can receive replies */
  isLocked?: Maybe<Scalars['Boolean']['output']>;
  /** If the activity is pinned to the top of the users activity feed */
  isPinned?: Maybe<Scalars['Boolean']['output']>;
  /** If the currently authenticated user is subscribed to the activity */
  isSubscribed?: Maybe<Scalars['Boolean']['output']>;
  /** The amount of likes the activity has */
  likeCount: Scalars['Int']['output'];
  /** The users who liked the activity */
  likes?: Maybe<Array<Maybe<User>>>;
  /** The associated media to the activity update */
  media?: Maybe<Media>;
  /** The list progress made */
  progress?: Maybe<Scalars['String']['output']>;
  /** The written replies to the activity */
  replies?: Maybe<Array<Maybe<ActivityReply>>>;
  /** The number of activity replies */
  replyCount: Scalars['Int']['output'];
  /** The url for the activity page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
  /** The list item's textual status */
  status?: Maybe<Scalars['String']['output']>;
  /** The type of activity */
  type?: Maybe<ActivityType>;
  /** The owner of the activity */
  user?: Maybe<User>;
  /** The user id of the activity's creator */
  userId?: Maybe<Scalars['Int']['output']>;
};

export type ListActivityOption = {
  __typename?: 'ListActivityOption';
  disabled?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<MediaListStatus>;
};

export type ListActivityOptionInput = {
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<MediaListStatus>;
};

/** User's list score statistics */
export type ListScoreStats = {
  __typename?: 'ListScoreStats';
  meanScore?: Maybe<Scalars['Int']['output']>;
  standardDeviation?: Maybe<Scalars['Int']['output']>;
};

/** Anime or Manga */
export type Media = {
  __typename?: 'Media';
  /** The media's entire airing schedule */
  airingSchedule?: Maybe<AiringScheduleConnection>;
  /** If the media should have forum thread automatically created for it on airing episode release */
  autoCreateForumThread?: Maybe<Scalars['Boolean']['output']>;
  /** A weighted average score of all the user's scores of the media */
  averageScore?: Maybe<Scalars['Int']['output']>;
  /** The banner image of the media */
  bannerImage?: Maybe<Scalars['String']['output']>;
  /** The amount of chapters the manga has when complete */
  chapters?: Maybe<Scalars['Int']['output']>;
  /** The characters in the media */
  characters?: Maybe<CharacterConnection>;
  /** Where the media was created. (ISO 3166-1 alpha-2) */
  countryOfOrigin?: Maybe<Scalars['CountryCode']['output']>;
  /** The cover images of the media */
  coverImage?: Maybe<MediaCoverImage>;
  /** Short description of the media's story and characters */
  description?: Maybe<Scalars['String']['output']>;
  /** The general length of each anime episode in minutes */
  duration?: Maybe<Scalars['Int']['output']>;
  /** The last official release date of the media */
  endDate?: Maybe<FuzzyDate>;
  /** The amount of episodes the anime has when complete */
  episodes?: Maybe<Scalars['Int']['output']>;
  /** External links to another site related to the media */
  externalLinks?: Maybe<Array<Maybe<MediaExternalLink>>>;
  /** The amount of user's who have favourited the media */
  favourites?: Maybe<Scalars['Int']['output']>;
  /** The format the media was released in */
  format?: Maybe<MediaFormat>;
  /** The genres of the media */
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Official Twitter hashtags for the media */
  hashtag?: Maybe<Scalars['String']['output']>;
  /** The id of the media */
  id: Scalars['Int']['output'];
  /** The mal id of the media */
  idMal?: Maybe<Scalars['Int']['output']>;
  /** If the media is intended only for 18+ adult audiences */
  isAdult?: Maybe<Scalars['Boolean']['output']>;
  /** If the media is marked as favourite by the current authenticated user */
  isFavourite: Scalars['Boolean']['output'];
  /** If the media is blocked from being added to favourites */
  isFavouriteBlocked: Scalars['Boolean']['output'];
  /** If the media is officially licensed or a self-published doujin release */
  isLicensed?: Maybe<Scalars['Boolean']['output']>;
  /** Locked media may not be added to lists our favorited. This may be due to the entry pending for deletion or other reasons. */
  isLocked?: Maybe<Scalars['Boolean']['output']>;
  /** If the media is blocked from being recommended to/from */
  isRecommendationBlocked?: Maybe<Scalars['Boolean']['output']>;
  /** If the media is blocked from being reviewed */
  isReviewBlocked?: Maybe<Scalars['Boolean']['output']>;
  /** Mean score of all the user's scores of the media */
  meanScore?: Maybe<Scalars['Int']['output']>;
  /** The authenticated user's media list entry for the media */
  mediaListEntry?: Maybe<MediaList>;
  /** Notes for site moderators */
  modNotes?: Maybe<Scalars['String']['output']>;
  /** The media's next episode airing schedule */
  nextAiringEpisode?: Maybe<AiringSchedule>;
  /** The number of users with the media on their list */
  popularity?: Maybe<Scalars['Int']['output']>;
  /** The ranking of the media in a particular time span and format compared to other media */
  rankings?: Maybe<Array<Maybe<MediaRank>>>;
  /** User recommendations for similar media */
  recommendations?: Maybe<RecommendationConnection>;
  /** Other media in the same or connecting franchise */
  relations?: Maybe<MediaConnection>;
  /** User reviews of the media */
  reviews?: Maybe<ReviewConnection>;
  /** The season the media was initially released in */
  season?: Maybe<MediaSeason>;
  /**
   * The year & season the media was initially released in
   * @deprecated
   */
  seasonInt?: Maybe<Scalars['Int']['output']>;
  /** The season year the media was initially released in */
  seasonYear?: Maybe<Scalars['Int']['output']>;
  /** The url for the media page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
  /** Source type the media was adapted from. */
  source?: Maybe<MediaSource>;
  /** The staff who produced the media */
  staff?: Maybe<StaffConnection>;
  /** The first official release date of the media */
  startDate?: Maybe<FuzzyDate>;
  stats?: Maybe<MediaStats>;
  /** The current releasing status of the media */
  status?: Maybe<MediaStatus>;
  /** Data and links to legal streaming episodes on external sites */
  streamingEpisodes?: Maybe<Array<Maybe<MediaStreamingEpisode>>>;
  /** The companies who produced the media */
  studios?: Maybe<StudioConnection>;
  /** Alternative titles of the media */
  synonyms?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** List of tags that describes elements and themes of the media */
  tags?: Maybe<Array<Maybe<MediaTag>>>;
  /** The official titles of the media in various languages */
  title?: Maybe<MediaTitle>;
  /** Media trailer or advertisement */
  trailer?: Maybe<MediaTrailer>;
  /** The amount of related activity in the past hour */
  trending?: Maybe<Scalars['Int']['output']>;
  /** The media's daily trend stats */
  trends?: Maybe<MediaTrendConnection>;
  /** The type of the media; anime or manga */
  type?: Maybe<MediaType>;
  /** When the media's data was last updated */
  updatedAt?: Maybe<Scalars['Int']['output']>;
  /** The amount of volumes the manga has when complete */
  volumes?: Maybe<Scalars['Int']['output']>;
};


/** Anime or Manga */
export type MediaAiringScheduleArgs = {
  notYetAired?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


/** Anime or Manga */
export type MediaCharactersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<CharacterRole>;
  sort?: InputMaybe<Array<InputMaybe<CharacterSort>>>;
};


/** Anime or Manga */
export type MediaDescriptionArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Anime or Manga */
export type MediaRecommendationsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<RecommendationSort>>>;
};


/** Anime or Manga */
export type MediaReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ReviewSort>>>;
};


/** Anime or Manga */
export type MediaSourceArgs = {
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** Anime or Manga */
export type MediaStaffArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<StaffSort>>>;
};


/** Anime or Manga */
export type MediaStatusArgs = {
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** Anime or Manga */
export type MediaStudiosArgs = {
  isMain?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InputMaybe<StudioSort>>>;
};


/** Anime or Manga */
export type MediaTrendsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  releasing?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaTrendSort>>>;
};

/** Internal - Media characters separated */
export type MediaCharacter = {
  __typename?: 'MediaCharacter';
  /** The characters in the media voiced by the parent actor */
  character?: Maybe<Character>;
  /** Media specific character name */
  characterName?: Maybe<Scalars['String']['output']>;
  dubGroup?: Maybe<Scalars['String']['output']>;
  /** The id of the connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** The characters role in the media */
  role?: Maybe<CharacterRole>;
  roleNotes?: Maybe<Scalars['String']['output']>;
  /** The voice actor of the character */
  voiceActor?: Maybe<Staff>;
};

export type MediaConnection = {
  __typename?: 'MediaConnection';
  edges?: Maybe<Array<Maybe<MediaEdge>>>;
  nodes?: Maybe<Array<Maybe<Media>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
};

export type MediaCoverImage = {
  __typename?: 'MediaCoverImage';
  /** Average #hex color of cover image */
  color?: Maybe<Scalars['String']['output']>;
  /** The cover image url of the media at its largest size. If this size isn't available, large will be provided instead. */
  extraLarge?: Maybe<Scalars['String']['output']>;
  /** The cover image url of the media at a large size */
  large?: Maybe<Scalars['String']['output']>;
  /** The cover image url of the media at medium size */
  medium?: Maybe<Scalars['String']['output']>;
};

/** Notification for when a media entry's data was changed in a significant way impacting users' list tracking */
export type MediaDataChangeNotification = {
  __typename?: 'MediaDataChangeNotification';
  /** The reason for the media data change */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The media that received data changes */
  media?: Maybe<Media>;
  /** The id of the media that received data changes */
  mediaId: Scalars['Int']['output'];
  /** The reason for the media data change */
  reason?: Maybe<Scalars['String']['output']>;
  /** The type of notification */
  type?: Maybe<NotificationType>;
};

/** Notification for when a media tracked in a user's list is deleted from the site */
export type MediaDeletionNotification = {
  __typename?: 'MediaDeletionNotification';
  /** The reason for the media deletion */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The title of the deleted media */
  deletedMediaTitle?: Maybe<Scalars['String']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The reason for the media deletion */
  reason?: Maybe<Scalars['String']['output']>;
  /** The type of notification */
  type?: Maybe<NotificationType>;
};

/** Media connection edge */
export type MediaEdge = {
  __typename?: 'MediaEdge';
  /** Media specific character name */
  characterName?: Maybe<Scalars['String']['output']>;
  /** The characters role in the media */
  characterRole?: Maybe<CharacterRole>;
  /** The characters in the media voiced by the parent actor */
  characters?: Maybe<Array<Maybe<Character>>>;
  /** Used for grouping roles where multiple dubs exist for the same language. Either dubbing company name or language variant. */
  dubGroup?: Maybe<Scalars['String']['output']>;
  /** The order the media should be displayed from the users favourites */
  favouriteOrder?: Maybe<Scalars['Int']['output']>;
  /** The id of the connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** If the studio is the main animation studio of the media (For Studio->MediaConnection field only) */
  isMainStudio: Scalars['Boolean']['output'];
  node?: Maybe<Media>;
  /** The type of relation to the parent model */
  relationType?: Maybe<MediaRelation>;
  /** Notes regarding the VA's role for the character */
  roleNotes?: Maybe<Scalars['String']['output']>;
  /** The role of the staff member in the production of the media */
  staffRole?: Maybe<Scalars['String']['output']>;
  /** The voice actors of the character with role date */
  voiceActorRoles?: Maybe<Array<Maybe<StaffRoleType>>>;
  /** The voice actors of the character */
  voiceActors?: Maybe<Array<Maybe<Staff>>>;
};


/** Media connection edge */
export type MediaEdgeRelationTypeArgs = {
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** Media connection edge */
export type MediaEdgeVoiceActorRolesArgs = {
  language?: InputMaybe<StaffLanguage>;
  sort?: InputMaybe<Array<InputMaybe<StaffSort>>>;
};


/** Media connection edge */
export type MediaEdgeVoiceActorsArgs = {
  language?: InputMaybe<StaffLanguage>;
  sort?: InputMaybe<Array<InputMaybe<StaffSort>>>;
};

/** An external link to another site related to the media or staff member */
export type MediaExternalLink = {
  __typename?: 'MediaExternalLink';
  color?: Maybe<Scalars['String']['output']>;
  /** The icon image url of the site. Not available for all links. Transparent PNG 64x64 */
  icon?: Maybe<Scalars['String']['output']>;
  /** The id of the external link */
  id: Scalars['Int']['output'];
  isDisabled?: Maybe<Scalars['Boolean']['output']>;
  /** Language the site content is in. See Staff language field for values. */
  language?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  /** The links website site name */
  site: Scalars['String']['output'];
  /** The links website site id */
  siteId?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<ExternalLinkType>;
  /** The url of the external link or base url of link source */
  url?: Maybe<Scalars['String']['output']>;
};

/** An external link to another site related to the media */
export type MediaExternalLinkInput = {
  /** The id of the external link */
  id: Scalars['Int']['input'];
  /** The site location of the external link */
  site: Scalars['String']['input'];
  /** The url of the external link */
  url: Scalars['String']['input'];
};

/** The format the media was released in */
export enum MediaFormat {
  /** Professionally published manga with more than one chapter */
  Manga = 'MANGA',
  /** Anime movies with a theatrical release */
  Movie = 'MOVIE',
  /** Short anime released as a music video */
  Music = 'MUSIC',
  /** Written books released as a series of light novels */
  Novel = 'NOVEL',
  /** (Original Net Animation) Anime that have been originally released online or are only available through streaming services. */
  Ona = 'ONA',
  /** Manga with just one chapter */
  OneShot = 'ONE_SHOT',
  /** (Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast */
  Ova = 'OVA',
  /** Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc */
  Special = 'SPECIAL',
  /** Anime broadcast on television */
  Tv = 'TV',
  /** Anime which are under 15 minutes in length and broadcast on television */
  TvShort = 'TV_SHORT'
}

/** List of anime or manga */
export type MediaList = {
  __typename?: 'MediaList';
  /** Map of advanced scores with name keys */
  advancedScores?: Maybe<Scalars['Json']['output']>;
  /** When the entry was completed by the user */
  completedAt?: Maybe<FuzzyDate>;
  /** When the entry data was created */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** Map of booleans for which custom lists the entry are in */
  customLists?: Maybe<Scalars['Json']['output']>;
  /** If the entry shown be hidden from non-custom lists */
  hiddenFromStatusLists?: Maybe<Scalars['Boolean']['output']>;
  /** The id of the list entry */
  id: Scalars['Int']['output'];
  media?: Maybe<Media>;
  /** The id of the media */
  mediaId: Scalars['Int']['output'];
  /** Text notes */
  notes?: Maybe<Scalars['String']['output']>;
  /** Priority of planning */
  priority?: Maybe<Scalars['Int']['output']>;
  /** If the entry should only be visible to authenticated user */
  private?: Maybe<Scalars['Boolean']['output']>;
  /** The amount of episodes/chapters consumed by the user */
  progress?: Maybe<Scalars['Int']['output']>;
  /** The amount of volumes read by the user */
  progressVolumes?: Maybe<Scalars['Int']['output']>;
  /** The amount of times the user has rewatched/read the media */
  repeat?: Maybe<Scalars['Int']['output']>;
  /** The score of the entry */
  score?: Maybe<Scalars['Float']['output']>;
  /** When the entry was started by the user */
  startedAt?: Maybe<FuzzyDate>;
  /** The watching/reading status */
  status?: Maybe<MediaListStatus>;
  /** When the entry data was last updated */
  updatedAt?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  /** The id of the user owner of the list entry */
  userId: Scalars['Int']['output'];
};


/** List of anime or manga */
export type MediaListCustomListsArgs = {
  asArray?: InputMaybe<Scalars['Boolean']['input']>;
};


/** List of anime or manga */
export type MediaListScoreArgs = {
  format?: InputMaybe<ScoreFormat>;
};

/** List of anime or manga */
export type MediaListCollection = {
  __typename?: 'MediaListCollection';
  /**
   * A map of media list entry arrays grouped by custom lists
   * @deprecated Not GraphQL spec compliant, use lists field instead.
   */
  customLists?: Maybe<Array<Maybe<Array<Maybe<MediaList>>>>>;
  /** If there is another chunk */
  hasNextChunk?: Maybe<Scalars['Boolean']['output']>;
  /** Grouped media list entries */
  lists?: Maybe<Array<Maybe<MediaListGroup>>>;
  /**
   * A map of media list entry arrays grouped by status
   * @deprecated Not GraphQL spec compliant, use lists field instead.
   */
  statusLists?: Maybe<Array<Maybe<Array<Maybe<MediaList>>>>>;
  /** The owner of the list */
  user?: Maybe<User>;
};


/** List of anime or manga */
export type MediaListCollectionCustomListsArgs = {
  asArray?: InputMaybe<Scalars['Boolean']['input']>;
};


/** List of anime or manga */
export type MediaListCollectionStatusListsArgs = {
  asArray?: InputMaybe<Scalars['Boolean']['input']>;
};

/** List group of anime or manga entries */
export type MediaListGroup = {
  __typename?: 'MediaListGroup';
  /** Media list entries */
  entries?: Maybe<Array<Maybe<MediaList>>>;
  isCustomList?: Maybe<Scalars['Boolean']['output']>;
  isSplitCompletedList?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<MediaListStatus>;
};

/** A user's list options */
export type MediaListOptions = {
  __typename?: 'MediaListOptions';
  /** The user's anime list options */
  animeList?: Maybe<MediaListTypeOptions>;
  /** The user's manga list options */
  mangaList?: Maybe<MediaListTypeOptions>;
  /** The default order list rows should be displayed in */
  rowOrder?: Maybe<Scalars['String']['output']>;
  /** The score format the user is using for media lists */
  scoreFormat?: Maybe<ScoreFormat>;
  /**
   * The list theme options for both lists
   * @deprecated No longer used
   */
  sharedTheme?: Maybe<Scalars['Json']['output']>;
  /**
   * If the shared theme should be used instead of the individual list themes
   * @deprecated No longer used
   */
  sharedThemeEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated No longer used */
  useLegacyLists?: Maybe<Scalars['Boolean']['output']>;
};

/** A user's list options for anime or manga lists */
export type MediaListOptionsInput = {
  /** The names of the user's advanced scoring sections */
  advancedScoring?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** If advanced scoring is enabled */
  advancedScoringEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** The names of the user's custom lists */
  customLists?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The order each list should be displayed in */
  sectionOrder?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** If the completed sections of the list should be separated by format */
  splitCompletedSectionByFormat?: InputMaybe<Scalars['Boolean']['input']>;
  /** list theme */
  theme?: InputMaybe<Scalars['String']['input']>;
};

/** Media list sort enums */
export enum MediaListSort {
  AddedTime = 'ADDED_TIME',
  AddedTimeDesc = 'ADDED_TIME_DESC',
  FinishedOn = 'FINISHED_ON',
  FinishedOnDesc = 'FINISHED_ON_DESC',
  MediaId = 'MEDIA_ID',
  MediaIdDesc = 'MEDIA_ID_DESC',
  MediaPopularity = 'MEDIA_POPULARITY',
  MediaPopularityDesc = 'MEDIA_POPULARITY_DESC',
  MediaTitleEnglish = 'MEDIA_TITLE_ENGLISH',
  MediaTitleEnglishDesc = 'MEDIA_TITLE_ENGLISH_DESC',
  MediaTitleNative = 'MEDIA_TITLE_NATIVE',
  MediaTitleNativeDesc = 'MEDIA_TITLE_NATIVE_DESC',
  MediaTitleRomaji = 'MEDIA_TITLE_ROMAJI',
  MediaTitleRomajiDesc = 'MEDIA_TITLE_ROMAJI_DESC',
  Priority = 'PRIORITY',
  PriorityDesc = 'PRIORITY_DESC',
  Progress = 'PROGRESS',
  ProgressDesc = 'PROGRESS_DESC',
  ProgressVolumes = 'PROGRESS_VOLUMES',
  ProgressVolumesDesc = 'PROGRESS_VOLUMES_DESC',
  Repeat = 'REPEAT',
  RepeatDesc = 'REPEAT_DESC',
  Score = 'SCORE',
  ScoreDesc = 'SCORE_DESC',
  StartedOn = 'STARTED_ON',
  StartedOnDesc = 'STARTED_ON_DESC',
  Status = 'STATUS',
  StatusDesc = 'STATUS_DESC',
  UpdatedTime = 'UPDATED_TIME',
  UpdatedTimeDesc = 'UPDATED_TIME_DESC'
}

/** Media list watching/reading status enum. */
export enum MediaListStatus {
  /** Finished watching/reading */
  Completed = 'COMPLETED',
  /** Currently watching/reading */
  Current = 'CURRENT',
  /** Stopped watching/reading before completing */
  Dropped = 'DROPPED',
  /** Paused watching/reading */
  Paused = 'PAUSED',
  /** Planning to watch/read */
  Planning = 'PLANNING',
  /** Re-watching/reading */
  Repeating = 'REPEATING'
}

/** A user's list options for anime or manga lists */
export type MediaListTypeOptions = {
  __typename?: 'MediaListTypeOptions';
  /** The names of the user's advanced scoring sections */
  advancedScoring?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** If advanced scoring is enabled */
  advancedScoringEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The names of the user's custom lists */
  customLists?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The order each list should be displayed in */
  sectionOrder?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** If the completed sections of the list should be separated by format */
  splitCompletedSectionByFormat?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The list theme options
   * @deprecated This field has not yet been fully implemented and may change without warning
   */
  theme?: Maybe<Scalars['Json']['output']>;
};

/** Notification for when a media entry is merged into another for a user who had it on their list */
export type MediaMergeNotification = {
  __typename?: 'MediaMergeNotification';
  /** The reason for the media data change */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The title of the deleted media */
  deletedMediaTitles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The media that was merged into */
  media?: Maybe<Media>;
  /** The id of the media that was merged into */
  mediaId: Scalars['Int']['output'];
  /** The reason for the media merge */
  reason?: Maybe<Scalars['String']['output']>;
  /** The type of notification */
  type?: Maybe<NotificationType>;
};

/** The ranking of a media in a particular time span and format compared to other media */
export type MediaRank = {
  __typename?: 'MediaRank';
  /** If the ranking is based on all time instead of a season/year */
  allTime?: Maybe<Scalars['Boolean']['output']>;
  /** String that gives context to the ranking type and time span */
  context: Scalars['String']['output'];
  /** The format the media is ranked within */
  format: MediaFormat;
  /** The id of the rank */
  id: Scalars['Int']['output'];
  /** The numerical rank of the media */
  rank: Scalars['Int']['output'];
  /** The season the media is ranked within */
  season?: Maybe<MediaSeason>;
  /** The type of ranking */
  type: MediaRankType;
  /** The year the media is ranked within */
  year?: Maybe<Scalars['Int']['output']>;
};

/** The type of ranking */
export enum MediaRankType {
  /** Ranking is based on the media's popularity */
  Popular = 'POPULAR',
  /** Ranking is based on the media's ratings/score */
  Rated = 'RATED'
}

/** Type of relation media has to its parent. */
export enum MediaRelation {
  /** An adaption of this media into a different format */
  Adaptation = 'ADAPTATION',
  /** An alternative version of the same media */
  Alternative = 'ALTERNATIVE',
  /** Shares at least 1 character */
  Character = 'CHARACTER',
  /** Version 2 only. */
  Compilation = 'COMPILATION',
  /** Version 2 only. */
  Contains = 'CONTAINS',
  /** Other */
  Other = 'OTHER',
  /** The media a side story is from */
  Parent = 'PARENT',
  /** Released before the relation */
  Prequel = 'PREQUEL',
  /** Released after the relation */
  Sequel = 'SEQUEL',
  /** A side story of the parent media */
  SideStory = 'SIDE_STORY',
  /** Version 2 only. The source material the media was adapted from */
  Source = 'SOURCE',
  /** An alternative version of the media with a different primary focus */
  SpinOff = 'SPIN_OFF',
  /** A shortened and summarized version */
  Summary = 'SUMMARY'
}

export enum MediaSeason {
  /** Months September to November */
  Fall = 'FALL',
  /** Months March to May */
  Spring = 'SPRING',
  /** Months June to August */
  Summer = 'SUMMER',
  /** Months December to February */
  Winter = 'WINTER'
}

/** Media sort enums */
export enum MediaSort {
  Chapters = 'CHAPTERS',
  ChaptersDesc = 'CHAPTERS_DESC',
  Duration = 'DURATION',
  DurationDesc = 'DURATION_DESC',
  EndDate = 'END_DATE',
  EndDateDesc = 'END_DATE_DESC',
  Episodes = 'EPISODES',
  EpisodesDesc = 'EPISODES_DESC',
  Favourites = 'FAVOURITES',
  FavouritesDesc = 'FAVOURITES_DESC',
  Format = 'FORMAT',
  FormatDesc = 'FORMAT_DESC',
  Id = 'ID',
  IdDesc = 'ID_DESC',
  Popularity = 'POPULARITY',
  PopularityDesc = 'POPULARITY_DESC',
  Score = 'SCORE',
  ScoreDesc = 'SCORE_DESC',
  SearchMatch = 'SEARCH_MATCH',
  StartDate = 'START_DATE',
  StartDateDesc = 'START_DATE_DESC',
  Status = 'STATUS',
  StatusDesc = 'STATUS_DESC',
  TitleEnglish = 'TITLE_ENGLISH',
  TitleEnglishDesc = 'TITLE_ENGLISH_DESC',
  TitleNative = 'TITLE_NATIVE',
  TitleNativeDesc = 'TITLE_NATIVE_DESC',
  TitleRomaji = 'TITLE_ROMAJI',
  TitleRomajiDesc = 'TITLE_ROMAJI_DESC',
  Trending = 'TRENDING',
  TrendingDesc = 'TRENDING_DESC',
  Type = 'TYPE',
  TypeDesc = 'TYPE_DESC',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  Volumes = 'VOLUMES',
  VolumesDesc = 'VOLUMES_DESC'
}

/** Source type the media was adapted from */
export enum MediaSource {
  /** Version 2+ only. Japanese Anime */
  Anime = 'ANIME',
  /** Version 3 only. Comics excluding manga */
  Comic = 'COMIC',
  /** Version 2+ only. Self-published works */
  Doujinshi = 'DOUJINSHI',
  /** Version 3 only. Games excluding video games */
  Game = 'GAME',
  /** Written work published in volumes */
  LightNovel = 'LIGHT_NOVEL',
  /** Version 3 only. Live action media such as movies or TV show */
  LiveAction = 'LIVE_ACTION',
  /** Asian comic book */
  Manga = 'MANGA',
  /** Version 3 only. Multimedia project */
  MultimediaProject = 'MULTIMEDIA_PROJECT',
  /** Version 2+ only. Written works not published in volumes */
  Novel = 'NOVEL',
  /** An original production not based of another work */
  Original = 'ORIGINAL',
  /** Other */
  Other = 'OTHER',
  /** Version 3 only. Picture book */
  PictureBook = 'PICTURE_BOOK',
  /** Video game */
  VideoGame = 'VIDEO_GAME',
  /** Video game driven primary by text and narrative */
  VisualNovel = 'VISUAL_NOVEL',
  /** Version 3 only. Written works published online */
  WebNovel = 'WEB_NOVEL'
}

/** A media's statistics */
export type MediaStats = {
  __typename?: 'MediaStats';
  /** @deprecated Replaced by MediaTrends */
  airingProgression?: Maybe<Array<Maybe<AiringProgression>>>;
  scoreDistribution?: Maybe<Array<Maybe<ScoreDistribution>>>;
  statusDistribution?: Maybe<Array<Maybe<StatusDistribution>>>;
};

/** The current releasing status of the media */
export enum MediaStatus {
  /** Ended before the work could be finished */
  Cancelled = 'CANCELLED',
  /** Has completed and is no longer being released */
  Finished = 'FINISHED',
  /** Version 2 only. Is currently paused from releasing and will resume at a later date */
  Hiatus = 'HIATUS',
  /** To be released at a later date */
  NotYetReleased = 'NOT_YET_RELEASED',
  /** Currently releasing */
  Releasing = 'RELEASING'
}

/** Data and links to legal streaming episodes on external sites */
export type MediaStreamingEpisode = {
  __typename?: 'MediaStreamingEpisode';
  /** The site location of the streaming episodes */
  site?: Maybe<Scalars['String']['output']>;
  /** Url of episode image thumbnail */
  thumbnail?: Maybe<Scalars['String']['output']>;
  /** Title of the episode */
  title?: Maybe<Scalars['String']['output']>;
  /** The url of the episode */
  url?: Maybe<Scalars['String']['output']>;
};

/** Media submission */
export type MediaSubmission = {
  __typename?: 'MediaSubmission';
  /** Data Mod assigned to handle the submission */
  assignee?: Maybe<User>;
  changes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  characters?: Maybe<Array<Maybe<MediaSubmissionComparison>>>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  externalLinks?: Maybe<Array<Maybe<MediaSubmissionComparison>>>;
  /** The id of the submission */
  id: Scalars['Int']['output'];
  /** Whether the submission is locked */
  locked?: Maybe<Scalars['Boolean']['output']>;
  media?: Maybe<Media>;
  notes?: Maybe<Scalars['String']['output']>;
  relations?: Maybe<Array<Maybe<MediaEdge>>>;
  source?: Maybe<Scalars['String']['output']>;
  staff?: Maybe<Array<Maybe<MediaSubmissionComparison>>>;
  /** Status of the submission */
  status?: Maybe<SubmissionStatus>;
  studios?: Maybe<Array<Maybe<MediaSubmissionComparison>>>;
  submission?: Maybe<Media>;
  /** User submitter of the submission */
  submitter?: Maybe<User>;
  submitterStats?: Maybe<Scalars['Json']['output']>;
};

/** Media submission with comparison to current data */
export type MediaSubmissionComparison = {
  __typename?: 'MediaSubmissionComparison';
  character?: Maybe<MediaCharacter>;
  externalLink?: Maybe<MediaExternalLink>;
  staff?: Maybe<StaffEdge>;
  studio?: Maybe<StudioEdge>;
  submission?: Maybe<MediaSubmissionEdge>;
};

export type MediaSubmissionEdge = {
  __typename?: 'MediaSubmissionEdge';
  character?: Maybe<Character>;
  characterName?: Maybe<Scalars['String']['output']>;
  characterRole?: Maybe<CharacterRole>;
  characterSubmission?: Maybe<Character>;
  dubGroup?: Maybe<Scalars['String']['output']>;
  externalLink?: Maybe<MediaExternalLink>;
  /** The id of the direct submission */
  id?: Maybe<Scalars['Int']['output']>;
  isMain?: Maybe<Scalars['Boolean']['output']>;
  media?: Maybe<Media>;
  roleNotes?: Maybe<Scalars['String']['output']>;
  staff?: Maybe<Staff>;
  staffRole?: Maybe<Scalars['String']['output']>;
  staffSubmission?: Maybe<Staff>;
  studio?: Maybe<Studio>;
  voiceActor?: Maybe<Staff>;
  voiceActorSubmission?: Maybe<Staff>;
};

/** A tag that describes a theme or element of the media */
export type MediaTag = {
  __typename?: 'MediaTag';
  /** The categories of tags this tag belongs to */
  category?: Maybe<Scalars['String']['output']>;
  /** A general description of the tag */
  description?: Maybe<Scalars['String']['output']>;
  /** The id of the tag */
  id: Scalars['Int']['output'];
  /** If the tag is only for adult 18+ media */
  isAdult?: Maybe<Scalars['Boolean']['output']>;
  /** If the tag could be a spoiler for any media */
  isGeneralSpoiler?: Maybe<Scalars['Boolean']['output']>;
  /** If the tag is a spoiler for this media */
  isMediaSpoiler?: Maybe<Scalars['Boolean']['output']>;
  /** The name of the tag */
  name: Scalars['String']['output'];
  /** The relevance ranking of the tag out of the 100 for this media */
  rank?: Maybe<Scalars['Int']['output']>;
  /** The user who submitted the tag */
  userId?: Maybe<Scalars['Int']['output']>;
};

/** The official titles of the media in various languages */
export type MediaTitle = {
  __typename?: 'MediaTitle';
  /** The official english title */
  english?: Maybe<Scalars['String']['output']>;
  /** Official title in it's native language */
  native?: Maybe<Scalars['String']['output']>;
  /** The romanization of the native language title */
  romaji?: Maybe<Scalars['String']['output']>;
  /** The currently authenticated users preferred title language. Default romaji for non-authenticated */
  userPreferred?: Maybe<Scalars['String']['output']>;
};


/** The official titles of the media in various languages */
export type MediaTitleEnglishArgs = {
  stylised?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The official titles of the media in various languages */
export type MediaTitleNativeArgs = {
  stylised?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The official titles of the media in various languages */
export type MediaTitleRomajiArgs = {
  stylised?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The official titles of the media in various languages */
export type MediaTitleInput = {
  /** The official english title */
  english?: InputMaybe<Scalars['String']['input']>;
  /** Official title in it's native language */
  native?: InputMaybe<Scalars['String']['input']>;
  /** The romanization of the native language title */
  romaji?: InputMaybe<Scalars['String']['input']>;
};

/** Media trailer or advertisement */
export type MediaTrailer = {
  __typename?: 'MediaTrailer';
  /** The trailer video id */
  id?: Maybe<Scalars['String']['output']>;
  /** The site the video is hosted by (Currently either youtube or dailymotion) */
  site?: Maybe<Scalars['String']['output']>;
  /** The url for the thumbnail image of the video */
  thumbnail?: Maybe<Scalars['String']['output']>;
};

/** Daily media statistics */
export type MediaTrend = {
  __typename?: 'MediaTrend';
  /** A weighted average score of all the user's scores of the media */
  averageScore?: Maybe<Scalars['Int']['output']>;
  /** The day the data was recorded (timestamp) */
  date: Scalars['Int']['output'];
  /** The episode number of the anime released on this day */
  episode?: Maybe<Scalars['Int']['output']>;
  /** The number of users with watching/reading the media */
  inProgress?: Maybe<Scalars['Int']['output']>;
  /** The related media */
  media?: Maybe<Media>;
  /** The id of the tag */
  mediaId: Scalars['Int']['output'];
  /** The number of users with the media on their list */
  popularity?: Maybe<Scalars['Int']['output']>;
  /** If the media was being released at this time */
  releasing: Scalars['Boolean']['output'];
  /** The amount of media activity on the day */
  trending: Scalars['Int']['output'];
};

export type MediaTrendConnection = {
  __typename?: 'MediaTrendConnection';
  edges?: Maybe<Array<Maybe<MediaTrendEdge>>>;
  nodes?: Maybe<Array<Maybe<MediaTrend>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
};

/** Media trend connection edge */
export type MediaTrendEdge = {
  __typename?: 'MediaTrendEdge';
  node?: Maybe<MediaTrend>;
};

/** Media trend sort enums */
export enum MediaTrendSort {
  Date = 'DATE',
  DateDesc = 'DATE_DESC',
  Episode = 'EPISODE',
  EpisodeDesc = 'EPISODE_DESC',
  Id = 'ID',
  IdDesc = 'ID_DESC',
  MediaId = 'MEDIA_ID',
  MediaIdDesc = 'MEDIA_ID_DESC',
  Popularity = 'POPULARITY',
  PopularityDesc = 'POPULARITY_DESC',
  Score = 'SCORE',
  ScoreDesc = 'SCORE_DESC',
  Trending = 'TRENDING',
  TrendingDesc = 'TRENDING_DESC'
}

/** Media type enum, anime or manga. */
export enum MediaType {
  /** Japanese Anime */
  Anime = 'ANIME',
  /** Asian comic */
  Manga = 'MANGA'
}

/** User message activity */
export type MessageActivity = {
  __typename?: 'MessageActivity';
  /** The time the activity was created at */
  createdAt: Scalars['Int']['output'];
  /** The id of the activity */
  id: Scalars['Int']['output'];
  /** If the currently authenticated user liked the activity */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /** If the activity is locked and can receive replies */
  isLocked?: Maybe<Scalars['Boolean']['output']>;
  /** If the message is private and only viewable to the sender and recipients */
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  /** If the currently authenticated user is subscribed to the activity */
  isSubscribed?: Maybe<Scalars['Boolean']['output']>;
  /** The amount of likes the activity has */
  likeCount: Scalars['Int']['output'];
  /** The users who liked the activity */
  likes?: Maybe<Array<Maybe<User>>>;
  /** The message text (Markdown) */
  message?: Maybe<Scalars['String']['output']>;
  /** The user who sent the activity message */
  messenger?: Maybe<User>;
  /** The user id of the activity's sender */
  messengerId?: Maybe<Scalars['Int']['output']>;
  /** The user who the activity message was sent to */
  recipient?: Maybe<User>;
  /** The user id of the activity's recipient */
  recipientId?: Maybe<Scalars['Int']['output']>;
  /** The written replies to the activity */
  replies?: Maybe<Array<Maybe<ActivityReply>>>;
  /** The number of activity replies */
  replyCount: Scalars['Int']['output'];
  /** The url for the activity page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
  /** The type of the activity */
  type?: Maybe<ActivityType>;
};


/** User message activity */
export type MessageActivityMessageArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ModAction = {
  __typename?: 'ModAction';
  createdAt: Scalars['Int']['output'];
  data?: Maybe<Scalars['String']['output']>;
  /** The id of the action */
  id: Scalars['Int']['output'];
  mod?: Maybe<User>;
  objectId?: Maybe<Scalars['Int']['output']>;
  objectType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ModActionType>;
  user?: Maybe<User>;
};

export enum ModActionType {
  Anon = 'ANON',
  Ban = 'BAN',
  Delete = 'DELETE',
  Edit = 'EDIT',
  Expire = 'EXPIRE',
  Note = 'NOTE',
  Report = 'REPORT',
  Reset = 'RESET'
}

/** Mod role enums */
export enum ModRole {
  /** An AniList administrator */
  Admin = 'ADMIN',
  /** An anime data moderator */
  AnimeData = 'ANIME_DATA',
  /** A character data moderator */
  CharacterData = 'CHARACTER_DATA',
  /** A community moderator */
  Community = 'COMMUNITY',
  /** An AniList developer */
  Developer = 'DEVELOPER',
  /** A discord community moderator */
  DiscordCommunity = 'DISCORD_COMMUNITY',
  /** A lead anime data moderator */
  LeadAnimeData = 'LEAD_ANIME_DATA',
  /** A lead community moderator */
  LeadCommunity = 'LEAD_COMMUNITY',
  /** A head developer of AniList */
  LeadDeveloper = 'LEAD_DEVELOPER',
  /** A lead manga data moderator */
  LeadMangaData = 'LEAD_MANGA_DATA',
  /** A lead social media moderator */
  LeadSocialMedia = 'LEAD_SOCIAL_MEDIA',
  /** A manga data moderator */
  MangaData = 'MANGA_DATA',
  /** A retired moderator */
  Retired = 'RETIRED',
  /** A social media moderator */
  SocialMedia = 'SOCIAL_MEDIA',
  /** A staff data moderator */
  StaffData = 'STAFF_DATA'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Delete an activity item of the authenticated users */
  DeleteActivity?: Maybe<Deleted>;
  /** Delete an activity reply of the authenticated users */
  DeleteActivityReply?: Maybe<Deleted>;
  /** Delete a custom list and remove the list entries from it */
  DeleteCustomList?: Maybe<Deleted>;
  /** Delete a media list entry */
  DeleteMediaListEntry?: Maybe<Deleted>;
  /** Delete a review */
  DeleteReview?: Maybe<Deleted>;
  /** Delete a thread */
  DeleteThread?: Maybe<Deleted>;
  /** Delete a thread comment */
  DeleteThreadComment?: Maybe<Deleted>;
  /** Rate a review */
  RateReview?: Maybe<Review>;
  /** Create or update an activity reply */
  SaveActivityReply?: Maybe<ActivityReply>;
  /** Update list activity (Mod Only) */
  SaveListActivity?: Maybe<ListActivity>;
  /** Create or update a media list entry */
  SaveMediaListEntry?: Maybe<MediaList>;
  /** Create or update message activity for the currently authenticated user */
  SaveMessageActivity?: Maybe<MessageActivity>;
  /** Recommendation a media */
  SaveRecommendation?: Maybe<Recommendation>;
  /** Create or update a review */
  SaveReview?: Maybe<Review>;
  /** Create or update text activity for the currently authenticated user */
  SaveTextActivity?: Maybe<TextActivity>;
  /** Create or update a forum thread */
  SaveThread?: Maybe<Thread>;
  /** Create or update a thread comment */
  SaveThreadComment?: Maybe<ThreadComment>;
  /** Toggle activity to be pinned to the top of the user's activity feed */
  ToggleActivityPin?: Maybe<ActivityUnion>;
  /** Toggle the subscription of an activity item */
  ToggleActivitySubscription?: Maybe<ActivityUnion>;
  /** Favourite or unfavourite an anime, manga, character, staff member, or studio */
  ToggleFavourite?: Maybe<Favourites>;
  /** Toggle the un/following of a user */
  ToggleFollow?: Maybe<User>;
  /**
   * Add or remove a like from a likeable type.
   *                           Returns all the users who liked the same model
   */
  ToggleLike?: Maybe<Array<Maybe<User>>>;
  /** Add or remove a like from a likeable type. */
  ToggleLikeV2?: Maybe<LikeableUnion>;
  /** Toggle the subscription of a forum thread */
  ToggleThreadSubscription?: Maybe<Thread>;
  UpdateAniChartHighlights?: Maybe<Scalars['Json']['output']>;
  UpdateAniChartSettings?: Maybe<Scalars['Json']['output']>;
  /** Update the order favourites are displayed in */
  UpdateFavouriteOrder?: Maybe<Favourites>;
  /** Update multiple media list entries to the same values */
  UpdateMediaListEntries?: Maybe<Array<Maybe<MediaList>>>;
  UpdateUser?: Maybe<User>;
};


export type MutationDeleteActivityArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteActivityReplyArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteCustomListArgs = {
  customList?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MediaType>;
};


export type MutationDeleteMediaListEntryArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteReviewArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteThreadArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteThreadCommentArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationRateReviewArgs = {
  rating?: InputMaybe<ReviewRating>;
  reviewId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSaveActivityReplyArgs = {
  activityId?: InputMaybe<Scalars['Int']['input']>;
  asMod?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSaveListActivityArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSaveMediaListEntryArgs = {
  advancedScores?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  completedAt?: InputMaybe<FuzzyDateInput>;
  customLists?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hiddenFromStatusLists?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  progressVolumes?: InputMaybe<Scalars['Int']['input']>;
  repeat?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Float']['input']>;
  scoreRaw?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<FuzzyDateInput>;
  status?: InputMaybe<MediaListStatus>;
};


export type MutationSaveMessageActivityArgs = {
  asMod?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
  recipientId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSaveRecommendationArgs = {
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaRecommendationId?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<RecommendationRating>;
};


export type MutationSaveReviewArgs = {
  body?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSaveTextActivityArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSaveThreadArgs = {
  body?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  mediaCategories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sticky?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSaveThreadCommentArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  parentCommentId?: InputMaybe<Scalars['Int']['input']>;
  threadId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationToggleActivityPinArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  pinned?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationToggleActivitySubscriptionArgs = {
  activityId?: InputMaybe<Scalars['Int']['input']>;
  subscribe?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationToggleFavouriteArgs = {
  animeId?: InputMaybe<Scalars['Int']['input']>;
  characterId?: InputMaybe<Scalars['Int']['input']>;
  mangaId?: InputMaybe<Scalars['Int']['input']>;
  staffId?: InputMaybe<Scalars['Int']['input']>;
  studioId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationToggleFollowArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationToggleLikeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<LikeableType>;
};


export type MutationToggleLikeV2Args = {
  id?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<LikeableType>;
};


export type MutationToggleThreadSubscriptionArgs = {
  subscribe?: InputMaybe<Scalars['Boolean']['input']>;
  threadId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateAniChartHighlightsArgs = {
  highlights?: InputMaybe<Array<InputMaybe<AniChartHighlightInput>>>;
};


export type MutationUpdateAniChartSettingsArgs = {
  outgoingLinkProvider?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  titleLanguage?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateFavouriteOrderArgs = {
  animeIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  animeOrder?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  characterIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  characterOrder?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mangaIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mangaOrder?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  staffIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  staffOrder?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  studioIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  studioOrder?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type MutationUpdateMediaListEntriesArgs = {
  advancedScores?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  completedAt?: InputMaybe<FuzzyDateInput>;
  hiddenFromStatusLists?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notes?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  progressVolumes?: InputMaybe<Scalars['Int']['input']>;
  repeat?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Float']['input']>;
  scoreRaw?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<FuzzyDateInput>;
  status?: InputMaybe<MediaListStatus>;
};


export type MutationUpdateUserArgs = {
  about?: InputMaybe<Scalars['String']['input']>;
  activityMergeTime?: InputMaybe<Scalars['Int']['input']>;
  airingNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  animeListOptions?: InputMaybe<MediaListOptionsInput>;
  disabledListActivity?: InputMaybe<Array<InputMaybe<ListActivityOptionInput>>>;
  displayAdultContent?: InputMaybe<Scalars['Boolean']['input']>;
  donatorBadge?: InputMaybe<Scalars['String']['input']>;
  mangaListOptions?: InputMaybe<MediaListOptionsInput>;
  notificationOptions?: InputMaybe<Array<InputMaybe<NotificationOptionInput>>>;
  profileColor?: InputMaybe<Scalars['String']['input']>;
  restrictMessagesToFollowing?: InputMaybe<Scalars['Boolean']['input']>;
  rowOrder?: InputMaybe<Scalars['String']['input']>;
  scoreFormat?: InputMaybe<ScoreFormat>;
  staffNameLanguage?: InputMaybe<UserStaffNameLanguage>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  titleLanguage?: InputMaybe<UserTitleLanguage>;
};

/** Notification option */
export type NotificationOption = {
  __typename?: 'NotificationOption';
  /** Whether this type of notification is enabled */
  enabled?: Maybe<Scalars['Boolean']['output']>;
  /** The type of notification */
  type?: Maybe<NotificationType>;
};

/** Notification option input */
export type NotificationOptionInput = {
  /** Whether this type of notification is enabled */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** The type of notification */
  type?: InputMaybe<NotificationType>;
};

/** Notification type enum */
export enum NotificationType {
  /** A user has liked your activity */
  ActivityLike = 'ACTIVITY_LIKE',
  /** A user has mentioned you in their activity */
  ActivityMention = 'ACTIVITY_MENTION',
  /** A user has sent you message */
  ActivityMessage = 'ACTIVITY_MESSAGE',
  /** A user has replied to your activity */
  ActivityReply = 'ACTIVITY_REPLY',
  /** A user has liked your activity reply */
  ActivityReplyLike = 'ACTIVITY_REPLY_LIKE',
  /** A user has replied to activity you have also replied to */
  ActivityReplySubscribed = 'ACTIVITY_REPLY_SUBSCRIBED',
  /** An anime you are currently watching has aired */
  Airing = 'AIRING',
  /** A user has followed you */
  Following = 'FOLLOWING',
  /** An anime or manga has had a data change that affects how a user may track it in their lists */
  MediaDataChange = 'MEDIA_DATA_CHANGE',
  /** An anime or manga on the user's list has been deleted from the site */
  MediaDeletion = 'MEDIA_DELETION',
  /** Anime or manga entries on the user's list have been merged into a single entry */
  MediaMerge = 'MEDIA_MERGE',
  /** A new anime or manga has been added to the site where its related media is on the user's list */
  RelatedMediaAddition = 'RELATED_MEDIA_ADDITION',
  /** A user has liked your forum comment */
  ThreadCommentLike = 'THREAD_COMMENT_LIKE',
  /** A user has mentioned you in a forum comment */
  ThreadCommentMention = 'THREAD_COMMENT_MENTION',
  /** A user has replied to your forum comment */
  ThreadCommentReply = 'THREAD_COMMENT_REPLY',
  /** A user has liked your forum thread */
  ThreadLike = 'THREAD_LIKE',
  /** A user has commented in one of your subscribed forum threads */
  ThreadSubscribed = 'THREAD_SUBSCRIBED'
}

/** Notification union type */
export type NotificationUnion = ActivityLikeNotification | ActivityMentionNotification | ActivityMessageNotification | ActivityReplyLikeNotification | ActivityReplyNotification | ActivityReplySubscribedNotification | AiringNotification | FollowingNotification | MediaDataChangeNotification | MediaDeletionNotification | MediaMergeNotification | RelatedMediaAdditionNotification | ThreadCommentLikeNotification | ThreadCommentMentionNotification | ThreadCommentReplyNotification | ThreadCommentSubscribedNotification | ThreadLikeNotification;

/** Page of data */
export type Page = {
  __typename?: 'Page';
  activities?: Maybe<Array<Maybe<ActivityUnion>>>;
  activityReplies?: Maybe<Array<Maybe<ActivityReply>>>;
  airingSchedules?: Maybe<Array<Maybe<AiringSchedule>>>;
  characters?: Maybe<Array<Maybe<Character>>>;
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  likes?: Maybe<Array<Maybe<User>>>;
  media?: Maybe<Array<Maybe<Media>>>;
  mediaList?: Maybe<Array<Maybe<MediaList>>>;
  mediaTrends?: Maybe<Array<Maybe<MediaTrend>>>;
  notifications?: Maybe<Array<Maybe<NotificationUnion>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
  recommendations?: Maybe<Array<Maybe<Recommendation>>>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  staff?: Maybe<Array<Maybe<Staff>>>;
  studios?: Maybe<Array<Maybe<Studio>>>;
  threadComments?: Maybe<Array<Maybe<ThreadComment>>>;
  threads?: Maybe<Array<Maybe<Thread>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


/** Page of data */
export type PageActivitiesArgs = {
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_greater?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['Int']['input']>;
  hasReplies?: InputMaybe<Scalars['Boolean']['input']>;
  hasRepliesOrTypeText?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  messengerId?: InputMaybe<Scalars['Int']['input']>;
  messengerId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  messengerId_not?: InputMaybe<Scalars['Int']['input']>;
  messengerId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sort?: InputMaybe<Array<InputMaybe<ActivitySort>>>;
  type?: InputMaybe<ActivityType>;
  type_in?: InputMaybe<Array<InputMaybe<ActivityType>>>;
  type_not?: InputMaybe<ActivityType>;
  type_not_in?: InputMaybe<Array<InputMaybe<ActivityType>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userId_not?: InputMaybe<Scalars['Int']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


/** Page of data */
export type PageActivityRepliesArgs = {
  activityId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data */
export type PageAiringSchedulesArgs = {
  airingAt?: InputMaybe<Scalars['Int']['input']>;
  airingAt_greater?: InputMaybe<Scalars['Int']['input']>;
  airingAt_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  episode_greater?: InputMaybe<Scalars['Int']['input']>;
  episode_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  episode_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode_not?: InputMaybe<Scalars['Int']['input']>;
  episode_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notYetAired?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InputMaybe<AiringSort>>>;
};


/** Page of data */
export type PageCharactersArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CharacterSort>>>;
};


/** Page of data */
export type PageFollowersArgs = {
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  userId: Scalars['Int']['input'];
};


/** Page of data */
export type PageFollowingArgs = {
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  userId: Scalars['Int']['input'];
};


/** Page of data */
export type PageLikesArgs = {
  likeableId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<LikeableType>;
};


/** Page of data */
export type PageMediaArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>;
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>;
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>;
  averageScore_not?: InputMaybe<Scalars['Int']['input']>;
  chapters?: InputMaybe<Scalars['Int']['input']>;
  chapters_greater?: InputMaybe<Scalars['Int']['input']>;
  chapters_lesser?: InputMaybe<Scalars['Int']['input']>;
  countryOfOrigin?: InputMaybe<Scalars['CountryCode']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  duration_greater?: InputMaybe<Scalars['Int']['input']>;
  duration_lesser?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_like?: InputMaybe<Scalars['String']['input']>;
  episodes?: InputMaybe<Scalars['Int']['input']>;
  episodes_greater?: InputMaybe<Scalars['Int']['input']>;
  episodes_lesser?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<MediaFormat>;
  format_in?: InputMaybe<Array<InputMaybe<MediaFormat>>>;
  format_not?: InputMaybe<MediaFormat>;
  format_not_in?: InputMaybe<Array<InputMaybe<MediaFormat>>>;
  genre?: InputMaybe<Scalars['String']['input']>;
  genre_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  genre_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  idMal?: InputMaybe<Scalars['Int']['input']>;
  idMal_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  idMal_not?: InputMaybe<Scalars['Int']['input']>;
  idMal_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  isLicensed?: InputMaybe<Scalars['Boolean']['input']>;
  licensedBy?: InputMaybe<Scalars['String']['input']>;
  licensedById?: InputMaybe<Scalars['Int']['input']>;
  licensedById_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  licensedBy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  minimumTagRank?: InputMaybe<Scalars['Int']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  popularity?: InputMaybe<Scalars['Int']['input']>;
  popularity_greater?: InputMaybe<Scalars['Int']['input']>;
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>;
  popularity_not?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<MediaSeason>;
  seasonYear?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaSort>>>;
  source?: InputMaybe<MediaSource>;
  source_in?: InputMaybe<Array<InputMaybe<MediaSource>>>;
  startDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_like?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<MediaStatus>;
  status_in?: InputMaybe<Array<InputMaybe<MediaStatus>>>;
  status_not?: InputMaybe<MediaStatus>;
  status_not_in?: InputMaybe<Array<InputMaybe<MediaStatus>>>;
  tag?: InputMaybe<Scalars['String']['input']>;
  tagCategory?: InputMaybe<Scalars['String']['input']>;
  tagCategory_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagCategory_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<MediaType>;
  volumes?: InputMaybe<Scalars['Int']['input']>;
  volumes_greater?: InputMaybe<Scalars['Int']['input']>;
  volumes_lesser?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data */
export type PageMediaListArgs = {
  compareWithAuthList?: InputMaybe<Scalars['Boolean']['input']>;
  completedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_like?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notes_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaListSort>>>;
  startedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_like?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<MediaListStatus>;
  status_in?: InputMaybe<Array<InputMaybe<MediaListStatus>>>;
  status_not?: InputMaybe<MediaListStatus>;
  status_not_in?: InputMaybe<Array<InputMaybe<MediaListStatus>>>;
  type?: InputMaybe<MediaType>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userName?: InputMaybe<Scalars['String']['input']>;
};


/** Page of data */
export type PageMediaTrendsArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>;
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>;
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>;
  averageScore_not?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_greater?: InputMaybe<Scalars['Int']['input']>;
  date_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  episode_greater?: InputMaybe<Scalars['Int']['input']>;
  episode_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  popularity?: InputMaybe<Scalars['Int']['input']>;
  popularity_greater?: InputMaybe<Scalars['Int']['input']>;
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>;
  popularity_not?: InputMaybe<Scalars['Int']['input']>;
  releasing?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaTrendSort>>>;
  trending?: InputMaybe<Scalars['Int']['input']>;
  trending_greater?: InputMaybe<Scalars['Int']['input']>;
  trending_lesser?: InputMaybe<Scalars['Int']['input']>;
  trending_not?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data */
export type PageNotificationsArgs = {
  resetNotificationCount?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<NotificationType>;
  type_in?: InputMaybe<Array<InputMaybe<NotificationType>>>;
};


/** Page of data */
export type PageRecommendationsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaRecommendationId?: InputMaybe<Scalars['Int']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  rating_greater?: InputMaybe<Scalars['Int']['input']>;
  rating_lesser?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<RecommendationSort>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data */
export type PageReviewsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaType?: InputMaybe<MediaType>;
  sort?: InputMaybe<Array<InputMaybe<ReviewSort>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data */
export type PageStaffArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<StaffSort>>>;
};


/** Page of data */
export type PageStudiosArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<StudioSort>>>;
};


/** Page of data */
export type PageThreadCommentsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ThreadCommentSort>>>;
  threadId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data */
export type PageThreadsArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaCategoryId?: InputMaybe<Scalars['Int']['input']>;
  replyUserId?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ThreadSort>>>;
  subscribed?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


/** Page of data */
export type PageUsersArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  isModerator?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The current page */
  currentPage?: Maybe<Scalars['Int']['output']>;
  /** If there is another page */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** The last page */
  lastPage?: Maybe<Scalars['Int']['output']>;
  /** The count on a page */
  perPage?: Maybe<Scalars['Int']['output']>;
  /** The total number of items. Note: This value is not guaranteed to be accurate, do not rely on this for logic */
  total?: Maybe<Scalars['Int']['output']>;
};

/** Provides the parsed markdown as html */
export type ParsedMarkdown = {
  __typename?: 'ParsedMarkdown';
  /** The parsed markdown as html */
  html?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Activity query */
  Activity?: Maybe<ActivityUnion>;
  /** Activity reply query */
  ActivityReply?: Maybe<ActivityReply>;
  /** Airing schedule query */
  AiringSchedule?: Maybe<AiringSchedule>;
  AniChartUser?: Maybe<AniChartUser>;
  /** Character query */
  Character?: Maybe<Character>;
  /** ExternalLinkSource collection query */
  ExternalLinkSourceCollection?: Maybe<Array<Maybe<MediaExternalLink>>>;
  /** Follow query */
  Follower?: Maybe<User>;
  /** Follow query */
  Following?: Maybe<User>;
  /** Collection of all the possible media genres */
  GenreCollection?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Like query */
  Like?: Maybe<User>;
  /** Provide AniList markdown to be converted to html (Requires auth) */
  Markdown?: Maybe<ParsedMarkdown>;
  /** Media query */
  Media?: Maybe<Media>;
  /** Media list query */
  MediaList?: Maybe<MediaList>;
  /** Media list collection query, provides list pre-grouped by status & custom lists. User ID and Media Type arguments required. */
  MediaListCollection?: Maybe<MediaListCollection>;
  /** Collection of all the possible media tags */
  MediaTagCollection?: Maybe<Array<Maybe<MediaTag>>>;
  /** Media Trend query */
  MediaTrend?: Maybe<MediaTrend>;
  /** Notification query */
  Notification?: Maybe<NotificationUnion>;
  Page?: Maybe<Page>;
  /** Recommendation query */
  Recommendation?: Maybe<Recommendation>;
  /** Review query */
  Review?: Maybe<Review>;
  /** Site statistics query */
  SiteStatistics?: Maybe<SiteStatistics>;
  /** Staff query */
  Staff?: Maybe<Staff>;
  /** Studio query */
  Studio?: Maybe<Studio>;
  /** Thread query */
  Thread?: Maybe<Thread>;
  /** Comment query */
  ThreadComment?: Maybe<Array<Maybe<ThreadComment>>>;
  /** User query */
  User?: Maybe<User>;
  /** Get the currently authenticated user */
  Viewer?: Maybe<User>;
};


export type QueryActivityArgs = {
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_greater?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['Int']['input']>;
  hasReplies?: InputMaybe<Scalars['Boolean']['input']>;
  hasRepliesOrTypeText?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  messengerId?: InputMaybe<Scalars['Int']['input']>;
  messengerId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  messengerId_not?: InputMaybe<Scalars['Int']['input']>;
  messengerId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sort?: InputMaybe<Array<InputMaybe<ActivitySort>>>;
  type?: InputMaybe<ActivityType>;
  type_in?: InputMaybe<Array<InputMaybe<ActivityType>>>;
  type_not?: InputMaybe<ActivityType>;
  type_not_in?: InputMaybe<Array<InputMaybe<ActivityType>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userId_not?: InputMaybe<Scalars['Int']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type QueryActivityReplyArgs = {
  activityId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAiringScheduleArgs = {
  airingAt?: InputMaybe<Scalars['Int']['input']>;
  airingAt_greater?: InputMaybe<Scalars['Int']['input']>;
  airingAt_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  episode_greater?: InputMaybe<Scalars['Int']['input']>;
  episode_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  episode_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode_not?: InputMaybe<Scalars['Int']['input']>;
  episode_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notYetAired?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InputMaybe<AiringSort>>>;
};


export type QueryCharacterArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CharacterSort>>>;
};


export type QueryExternalLinkSourceCollectionArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaType?: InputMaybe<ExternalLinkMediaType>;
  type?: InputMaybe<ExternalLinkType>;
};


export type QueryFollowerArgs = {
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  userId: Scalars['Int']['input'];
};


export type QueryFollowingArgs = {
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  userId: Scalars['Int']['input'];
};


export type QueryLikeArgs = {
  likeableId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<LikeableType>;
};


export type QueryMarkdownArgs = {
  markdown: Scalars['String']['input'];
};


export type QueryMediaArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>;
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>;
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>;
  averageScore_not?: InputMaybe<Scalars['Int']['input']>;
  chapters?: InputMaybe<Scalars['Int']['input']>;
  chapters_greater?: InputMaybe<Scalars['Int']['input']>;
  chapters_lesser?: InputMaybe<Scalars['Int']['input']>;
  countryOfOrigin?: InputMaybe<Scalars['CountryCode']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  duration_greater?: InputMaybe<Scalars['Int']['input']>;
  duration_lesser?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_like?: InputMaybe<Scalars['String']['input']>;
  episodes?: InputMaybe<Scalars['Int']['input']>;
  episodes_greater?: InputMaybe<Scalars['Int']['input']>;
  episodes_lesser?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<MediaFormat>;
  format_in?: InputMaybe<Array<InputMaybe<MediaFormat>>>;
  format_not?: InputMaybe<MediaFormat>;
  format_not_in?: InputMaybe<Array<InputMaybe<MediaFormat>>>;
  genre?: InputMaybe<Scalars['String']['input']>;
  genre_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  genre_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  idMal?: InputMaybe<Scalars['Int']['input']>;
  idMal_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  idMal_not?: InputMaybe<Scalars['Int']['input']>;
  idMal_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  isLicensed?: InputMaybe<Scalars['Boolean']['input']>;
  licensedBy?: InputMaybe<Scalars['String']['input']>;
  licensedById?: InputMaybe<Scalars['Int']['input']>;
  licensedById_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  licensedBy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  minimumTagRank?: InputMaybe<Scalars['Int']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  popularity?: InputMaybe<Scalars['Int']['input']>;
  popularity_greater?: InputMaybe<Scalars['Int']['input']>;
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>;
  popularity_not?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<MediaSeason>;
  seasonYear?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaSort>>>;
  source?: InputMaybe<MediaSource>;
  source_in?: InputMaybe<Array<InputMaybe<MediaSource>>>;
  startDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_like?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<MediaStatus>;
  status_in?: InputMaybe<Array<InputMaybe<MediaStatus>>>;
  status_not?: InputMaybe<MediaStatus>;
  status_not_in?: InputMaybe<Array<InputMaybe<MediaStatus>>>;
  tag?: InputMaybe<Scalars['String']['input']>;
  tagCategory?: InputMaybe<Scalars['String']['input']>;
  tagCategory_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tagCategory_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<MediaType>;
  volumes?: InputMaybe<Scalars['Int']['input']>;
  volumes_greater?: InputMaybe<Scalars['Int']['input']>;
  volumes_lesser?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMediaListArgs = {
  compareWithAuthList?: InputMaybe<Scalars['Boolean']['input']>;
  completedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_like?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notes_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaListSort>>>;
  startedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_like?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<MediaListStatus>;
  status_in?: InputMaybe<Array<InputMaybe<MediaListStatus>>>;
  status_not?: InputMaybe<MediaListStatus>;
  status_not_in?: InputMaybe<Array<InputMaybe<MediaListStatus>>>;
  type?: InputMaybe<MediaType>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMediaListCollectionArgs = {
  chunk?: InputMaybe<Scalars['Int']['input']>;
  completedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  completedAt_like?: InputMaybe<Scalars['String']['input']>;
  forceSingleCompletedList?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notes_like?: InputMaybe<Scalars['String']['input']>;
  perChunk?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaListSort>>>;
  startedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startedAt_like?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<MediaListStatus>;
  status_in?: InputMaybe<Array<InputMaybe<MediaListStatus>>>;
  status_not?: InputMaybe<MediaListStatus>;
  status_not_in?: InputMaybe<Array<InputMaybe<MediaListStatus>>>;
  type?: InputMaybe<MediaType>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMediaTagCollectionArgs = {
  status?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMediaTrendArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>;
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>;
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>;
  averageScore_not?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_greater?: InputMaybe<Scalars['Int']['input']>;
  date_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode?: InputMaybe<Scalars['Int']['input']>;
  episode_greater?: InputMaybe<Scalars['Int']['input']>;
  episode_lesser?: InputMaybe<Scalars['Int']['input']>;
  episode_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaId_not?: InputMaybe<Scalars['Int']['input']>;
  mediaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  popularity?: InputMaybe<Scalars['Int']['input']>;
  popularity_greater?: InputMaybe<Scalars['Int']['input']>;
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>;
  popularity_not?: InputMaybe<Scalars['Int']['input']>;
  releasing?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaTrendSort>>>;
  trending?: InputMaybe<Scalars['Int']['input']>;
  trending_greater?: InputMaybe<Scalars['Int']['input']>;
  trending_lesser?: InputMaybe<Scalars['Int']['input']>;
  trending_not?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNotificationArgs = {
  resetNotificationCount?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<NotificationType>;
  type_in?: InputMaybe<Array<InputMaybe<NotificationType>>>;
};


export type QueryPageArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecommendationArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaRecommendationId?: InputMaybe<Scalars['Int']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  rating_greater?: InputMaybe<Scalars['Int']['input']>;
  rating_lesser?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<RecommendationSort>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReviewArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaType?: InputMaybe<MediaType>;
  sort?: InputMaybe<Array<InputMaybe<ReviewSort>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStaffArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<StaffSort>>>;
};


export type QueryStudioArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<StudioSort>>>;
};


export type QueryThreadArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mediaCategoryId?: InputMaybe<Scalars['Int']['input']>;
  replyUserId?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ThreadSort>>>;
  subscribed?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryThreadCommentArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ThreadCommentSort>>>;
  threadId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  isModerator?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
};

/** Media recommendation */
export type Recommendation = {
  __typename?: 'Recommendation';
  /** The id of the recommendation */
  id: Scalars['Int']['output'];
  /** The media the recommendation is from */
  media?: Maybe<Media>;
  /** The recommended media */
  mediaRecommendation?: Maybe<Media>;
  /** Users rating of the recommendation */
  rating?: Maybe<Scalars['Int']['output']>;
  /** The user that first created the recommendation */
  user?: Maybe<User>;
  /** The rating of the recommendation by currently authenticated user */
  userRating?: Maybe<RecommendationRating>;
};

export type RecommendationConnection = {
  __typename?: 'RecommendationConnection';
  edges?: Maybe<Array<Maybe<RecommendationEdge>>>;
  nodes?: Maybe<Array<Maybe<Recommendation>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
};

/** Recommendation connection edge */
export type RecommendationEdge = {
  __typename?: 'RecommendationEdge';
  node?: Maybe<Recommendation>;
};

/** Recommendation rating enums */
export enum RecommendationRating {
  NoRating = 'NO_RATING',
  RateDown = 'RATE_DOWN',
  RateUp = 'RATE_UP'
}

/** Recommendation sort enums */
export enum RecommendationSort {
  Id = 'ID',
  IdDesc = 'ID_DESC',
  Rating = 'RATING',
  RatingDesc = 'RATING_DESC'
}

/** Notification for when new media is added to the site */
export type RelatedMediaAdditionNotification = {
  __typename?: 'RelatedMediaAdditionNotification';
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The associated media of the airing schedule */
  media?: Maybe<Media>;
  /** The id of the new media */
  mediaId: Scalars['Int']['output'];
  /** The type of notification */
  type?: Maybe<NotificationType>;
};

export type Report = {
  __typename?: 'Report';
  cleared?: Maybe<Scalars['Boolean']['output']>;
  /** When the entry data was created */
  createdAt?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  reported?: Maybe<User>;
  reporter?: Maybe<User>;
};

/** A Review that features in an anime or manga */
export type Review = {
  __typename?: 'Review';
  /** The main review body text */
  body?: Maybe<Scalars['String']['output']>;
  /** The time of the thread creation */
  createdAt: Scalars['Int']['output'];
  /** The id of the review */
  id: Scalars['Int']['output'];
  /** The media the review is of */
  media?: Maybe<Media>;
  /** The id of the review's media */
  mediaId: Scalars['Int']['output'];
  /** For which type of media the review is for */
  mediaType?: Maybe<MediaType>;
  /** If the review is not yet publicly published and is only viewable by creator */
  private?: Maybe<Scalars['Boolean']['output']>;
  /** The total user rating of the review */
  rating?: Maybe<Scalars['Int']['output']>;
  /** The amount of user ratings of the review */
  ratingAmount?: Maybe<Scalars['Int']['output']>;
  /** The review score of the media */
  score?: Maybe<Scalars['Int']['output']>;
  /** The url for the review page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
  /** A short summary of the review */
  summary?: Maybe<Scalars['String']['output']>;
  /** The time of the thread last update */
  updatedAt: Scalars['Int']['output'];
  /** The creator of the review */
  user?: Maybe<User>;
  /** The id of the review's creator */
  userId: Scalars['Int']['output'];
  /** The rating of the review by currently authenticated user */
  userRating?: Maybe<ReviewRating>;
};


/** A Review that features in an anime or manga */
export type ReviewBodyArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReviewConnection = {
  __typename?: 'ReviewConnection';
  edges?: Maybe<Array<Maybe<ReviewEdge>>>;
  nodes?: Maybe<Array<Maybe<Review>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
};

/** Review connection edge */
export type ReviewEdge = {
  __typename?: 'ReviewEdge';
  node?: Maybe<Review>;
};

/** Review rating enums */
export enum ReviewRating {
  DownVote = 'DOWN_VOTE',
  NoVote = 'NO_VOTE',
  UpVote = 'UP_VOTE'
}

/** Review sort enums */
export enum ReviewSort {
  CreatedAt = 'CREATED_AT',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Id = 'ID',
  IdDesc = 'ID_DESC',
  Rating = 'RATING',
  RatingDesc = 'RATING_DESC',
  Score = 'SCORE',
  ScoreDesc = 'SCORE_DESC',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Feed of mod edit activity */
export type RevisionHistory = {
  __typename?: 'RevisionHistory';
  /** The action taken on the objects */
  action?: Maybe<RevisionHistoryAction>;
  /** A JSON object of the fields that changed */
  changes?: Maybe<Scalars['Json']['output']>;
  /** The character the mod feed entry references */
  character?: Maybe<Character>;
  /** When the mod feed entry was created */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The external link source the mod feed entry references */
  externalLink?: Maybe<MediaExternalLink>;
  /** The id of the media */
  id: Scalars['Int']['output'];
  /** The media the mod feed entry references */
  media?: Maybe<Media>;
  /** The staff member the mod feed entry references */
  staff?: Maybe<Staff>;
  /** The studio the mod feed entry references */
  studio?: Maybe<Studio>;
  /** The user who made the edit to the object */
  user?: Maybe<User>;
};

/** Revision history actions */
export enum RevisionHistoryAction {
  Create = 'CREATE',
  Edit = 'EDIT'
}

/** A user's list score distribution. */
export type ScoreDistribution = {
  __typename?: 'ScoreDistribution';
  /** The amount of list entries with this score */
  amount?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
};

/** Media list scoring type */
export enum ScoreFormat {
  /** An integer from 0-3. Should be represented in Smileys. 0 => No Score, 1 => :(, 2 => :|, 3 => :) */
  Point_3 = 'POINT_3',
  /** An integer from 0-5. Should be represented in Stars */
  Point_5 = 'POINT_5',
  /** An integer from 0-10 */
  Point_10 = 'POINT_10',
  /** A float from 0-10 with 1 decimal place */
  Point_10Decimal = 'POINT_10_DECIMAL',
  /** An integer from 0-100 */
  Point_100 = 'POINT_100'
}

export type SiteStatistics = {
  __typename?: 'SiteStatistics';
  anime?: Maybe<SiteTrendConnection>;
  characters?: Maybe<SiteTrendConnection>;
  manga?: Maybe<SiteTrendConnection>;
  reviews?: Maybe<SiteTrendConnection>;
  staff?: Maybe<SiteTrendConnection>;
  studios?: Maybe<SiteTrendConnection>;
  users?: Maybe<SiteTrendConnection>;
};


export type SiteStatisticsAnimeArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SiteTrendSort>>>;
};


export type SiteStatisticsCharactersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SiteTrendSort>>>;
};


export type SiteStatisticsMangaArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SiteTrendSort>>>;
};


export type SiteStatisticsReviewsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SiteTrendSort>>>;
};


export type SiteStatisticsStaffArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SiteTrendSort>>>;
};


export type SiteStatisticsStudiosArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SiteTrendSort>>>;
};


export type SiteStatisticsUsersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SiteTrendSort>>>;
};

/** Daily site statistics */
export type SiteTrend = {
  __typename?: 'SiteTrend';
  /** The change from yesterday */
  change: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  /** The day the data was recorded (timestamp) */
  date: Scalars['Int']['output'];
};

export type SiteTrendConnection = {
  __typename?: 'SiteTrendConnection';
  edges?: Maybe<Array<Maybe<SiteTrendEdge>>>;
  nodes?: Maybe<Array<Maybe<SiteTrend>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
};

/** Site trend connection edge */
export type SiteTrendEdge = {
  __typename?: 'SiteTrendEdge';
  node?: Maybe<SiteTrend>;
};

/** Site trend sort enums */
export enum SiteTrendSort {
  Change = 'CHANGE',
  ChangeDesc = 'CHANGE_DESC',
  Count = 'COUNT',
  CountDesc = 'COUNT_DESC',
  Date = 'DATE',
  DateDesc = 'DATE_DESC'
}

/** Voice actors or production staff */
export type Staff = {
  __typename?: 'Staff';
  /** The person's age in years */
  age?: Maybe<Scalars['Int']['output']>;
  /** The persons blood type */
  bloodType?: Maybe<Scalars['String']['output']>;
  /** Media the actor voiced characters in. (Same data as characters with media as node instead of characters) */
  characterMedia?: Maybe<MediaConnection>;
  /** Characters voiced by the actor */
  characters?: Maybe<CharacterConnection>;
  dateOfBirth?: Maybe<FuzzyDate>;
  dateOfDeath?: Maybe<FuzzyDate>;
  /** A general description of the staff member */
  description?: Maybe<Scalars['String']['output']>;
  /** The amount of user's who have favourited the staff member */
  favourites?: Maybe<Scalars['Int']['output']>;
  /** The staff's gender. Usually Male, Female, or Non-binary but can be any string. */
  gender?: Maybe<Scalars['String']['output']>;
  /** The persons birthplace or hometown */
  homeTown?: Maybe<Scalars['String']['output']>;
  /** The id of the staff member */
  id: Scalars['Int']['output'];
  /** The staff images */
  image?: Maybe<StaffImage>;
  /** If the staff member is marked as favourite by the currently authenticated user */
  isFavourite: Scalars['Boolean']['output'];
  /** If the staff member is blocked from being added to favourites */
  isFavouriteBlocked: Scalars['Boolean']['output'];
  /**
   * The primary language the staff member dub's in
   * @deprecated Replaced with languageV2
   */
  language?: Maybe<StaffLanguage>;
  /** The primary language of the staff member. Current values: Japanese, English, Korean, Italian, Spanish, Portuguese, French, German, Hebrew, Hungarian, Chinese, Arabic, Filipino, Catalan, Finnish, Turkish, Dutch, Swedish, Thai, Tagalog, Malaysian, Indonesian, Vietnamese, Nepali, Hindi, Urdu */
  languageV2?: Maybe<Scalars['String']['output']>;
  /** Notes for site moderators */
  modNotes?: Maybe<Scalars['String']['output']>;
  /** The names of the staff member */
  name?: Maybe<StaffName>;
  /** The person's primary occupations */
  primaryOccupations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The url for the staff page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
  /** Staff member that the submission is referencing */
  staff?: Maybe<Staff>;
  /** Media where the staff member has a production role */
  staffMedia?: Maybe<MediaConnection>;
  /** Inner details of submission status */
  submissionNotes?: Maybe<Scalars['String']['output']>;
  /** Status of the submission */
  submissionStatus?: Maybe<Scalars['Int']['output']>;
  /** Submitter for the submission */
  submitter?: Maybe<User>;
  /** @deprecated No data available */
  updatedAt?: Maybe<Scalars['Int']['output']>;
  /** [startYear, endYear] (If the 2nd value is not present staff is still active) */
  yearsActive?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};


/** Voice actors or production staff */
export type StaffCharacterMediaArgs = {
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaSort>>>;
};


/** Voice actors or production staff */
export type StaffCharactersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CharacterSort>>>;
};


/** Voice actors or production staff */
export type StaffDescriptionArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Voice actors or production staff */
export type StaffStaffMediaArgs = {
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaSort>>>;
  type?: InputMaybe<MediaType>;
};

export type StaffConnection = {
  __typename?: 'StaffConnection';
  edges?: Maybe<Array<Maybe<StaffEdge>>>;
  nodes?: Maybe<Array<Maybe<Staff>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
};

/** Staff connection edge */
export type StaffEdge = {
  __typename?: 'StaffEdge';
  /** The order the staff should be displayed from the users favourites */
  favouriteOrder?: Maybe<Scalars['Int']['output']>;
  /** The id of the connection */
  id?: Maybe<Scalars['Int']['output']>;
  node?: Maybe<Staff>;
  /** The role of the staff member in the production of the media */
  role?: Maybe<Scalars['String']['output']>;
};

export type StaffImage = {
  __typename?: 'StaffImage';
  /** The person's image of media at its largest size */
  large?: Maybe<Scalars['String']['output']>;
  /** The person's image of media at medium size */
  medium?: Maybe<Scalars['String']['output']>;
};

/** The primary language of the voice actor */
export enum StaffLanguage {
  /** English */
  English = 'ENGLISH',
  /** French */
  French = 'FRENCH',
  /** German */
  German = 'GERMAN',
  /** Hebrew */
  Hebrew = 'HEBREW',
  /** Hungarian */
  Hungarian = 'HUNGARIAN',
  /** Italian */
  Italian = 'ITALIAN',
  /** Japanese */
  Japanese = 'JAPANESE',
  /** Korean */
  Korean = 'KOREAN',
  /** Portuguese */
  Portuguese = 'PORTUGUESE',
  /** Spanish */
  Spanish = 'SPANISH'
}

/** The names of the staff member */
export type StaffName = {
  __typename?: 'StaffName';
  /** Other names the staff member might be referred to as (pen names) */
  alternative?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The person's given name */
  first?: Maybe<Scalars['String']['output']>;
  /** The person's first and last name */
  full?: Maybe<Scalars['String']['output']>;
  /** The person's surname */
  last?: Maybe<Scalars['String']['output']>;
  /** The person's middle name */
  middle?: Maybe<Scalars['String']['output']>;
  /** The person's full name in their native language */
  native?: Maybe<Scalars['String']['output']>;
  /** The currently authenticated users preferred name language. Default romaji for non-authenticated */
  userPreferred?: Maybe<Scalars['String']['output']>;
};

/** The names of the staff member */
export type StaffNameInput = {
  /** Other names the character might be referred by */
  alternative?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The person's given name */
  first?: InputMaybe<Scalars['String']['input']>;
  /** The person's surname */
  last?: InputMaybe<Scalars['String']['input']>;
  /** The person's middle name */
  middle?: InputMaybe<Scalars['String']['input']>;
  /** The person's full name in their native language */
  native?: InputMaybe<Scalars['String']['input']>;
};

/** Voice actor role for a character */
export type StaffRoleType = {
  __typename?: 'StaffRoleType';
  /** Used for grouping roles where multiple dubs exist for the same language. Either dubbing company name or language variant. */
  dubGroup?: Maybe<Scalars['String']['output']>;
  /** Notes regarding the VA's role for the character */
  roleNotes?: Maybe<Scalars['String']['output']>;
  /** The voice actors of the character */
  voiceActor?: Maybe<Staff>;
};

/** Staff sort enums */
export enum StaffSort {
  Favourites = 'FAVOURITES',
  FavouritesDesc = 'FAVOURITES_DESC',
  Id = 'ID',
  IdDesc = 'ID_DESC',
  Language = 'LANGUAGE',
  LanguageDesc = 'LANGUAGE_DESC',
  /** Order manually decided by moderators */
  Relevance = 'RELEVANCE',
  Role = 'ROLE',
  RoleDesc = 'ROLE_DESC',
  SearchMatch = 'SEARCH_MATCH'
}

/** User's staff statistics */
export type StaffStats = {
  __typename?: 'StaffStats';
  amount?: Maybe<Scalars['Int']['output']>;
  meanScore?: Maybe<Scalars['Int']['output']>;
  staff?: Maybe<Staff>;
  /** The amount of time in minutes the staff member has been watched by the user */
  timeWatched?: Maybe<Scalars['Int']['output']>;
};

/** A submission for a staff that features in an anime or manga */
export type StaffSubmission = {
  __typename?: 'StaffSubmission';
  /** Data Mod assigned to handle the submission */
  assignee?: Maybe<User>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the submission */
  id: Scalars['Int']['output'];
  /** Whether the submission is locked */
  locked?: Maybe<Scalars['Boolean']['output']>;
  /** Inner details of submission status */
  notes?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  /** Staff that the submission is referencing */
  staff?: Maybe<Staff>;
  /** Status of the submission */
  status?: Maybe<SubmissionStatus>;
  /** The staff submission changes */
  submission?: Maybe<Staff>;
  /** Submitter for the submission */
  submitter?: Maybe<User>;
};

/** The distribution of the watching/reading status of media or a user's list */
export type StatusDistribution = {
  __typename?: 'StatusDistribution';
  /** The amount of entries with this status */
  amount?: Maybe<Scalars['Int']['output']>;
  /** The day the activity took place (Unix timestamp) */
  status?: Maybe<MediaListStatus>;
};

/** Animation or production company */
export type Studio = {
  __typename?: 'Studio';
  /** The amount of user's who have favourited the studio */
  favourites?: Maybe<Scalars['Int']['output']>;
  /** The id of the studio */
  id: Scalars['Int']['output'];
  /** If the studio is an animation studio or a different kind of company */
  isAnimationStudio: Scalars['Boolean']['output'];
  /** If the studio is marked as favourite by the currently authenticated user */
  isFavourite: Scalars['Boolean']['output'];
  /** The media the studio has worked on */
  media?: Maybe<MediaConnection>;
  /** The name of the studio */
  name: Scalars['String']['output'];
  /** The url for the studio page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
};


/** Animation or production company */
export type StudioMediaArgs = {
  isMain?: InputMaybe<Scalars['Boolean']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaSort>>>;
};

export type StudioConnection = {
  __typename?: 'StudioConnection';
  edges?: Maybe<Array<Maybe<StudioEdge>>>;
  nodes?: Maybe<Array<Maybe<Studio>>>;
  /** The pagination information */
  pageInfo?: Maybe<PageInfo>;
};

/** Studio connection edge */
export type StudioEdge = {
  __typename?: 'StudioEdge';
  /** The order the character should be displayed from the users favourites */
  favouriteOrder?: Maybe<Scalars['Int']['output']>;
  /** The id of the connection */
  id?: Maybe<Scalars['Int']['output']>;
  /** If the studio is the main animation studio of the anime */
  isMain: Scalars['Boolean']['output'];
  node?: Maybe<Studio>;
};

/** Studio sort enums */
export enum StudioSort {
  Favourites = 'FAVOURITES',
  FavouritesDesc = 'FAVOURITES_DESC',
  Id = 'ID',
  IdDesc = 'ID_DESC',
  Name = 'NAME',
  NameDesc = 'NAME_DESC',
  SearchMatch = 'SEARCH_MATCH'
}

/** User's studio statistics */
export type StudioStats = {
  __typename?: 'StudioStats';
  amount?: Maybe<Scalars['Int']['output']>;
  meanScore?: Maybe<Scalars['Int']['output']>;
  studio?: Maybe<Studio>;
  /** The amount of time in minutes the studio's works have been watched by the user */
  timeWatched?: Maybe<Scalars['Int']['output']>;
};

/** Submission sort enums */
export enum SubmissionSort {
  Id = 'ID',
  IdDesc = 'ID_DESC'
}

/** Submission status */
export enum SubmissionStatus {
  Accepted = 'ACCEPTED',
  PartiallyAccepted = 'PARTIALLY_ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** User's tag statistics */
export type TagStats = {
  __typename?: 'TagStats';
  amount?: Maybe<Scalars['Int']['output']>;
  meanScore?: Maybe<Scalars['Int']['output']>;
  tag?: Maybe<MediaTag>;
  /** The amount of time in minutes the tag has been watched by the user */
  timeWatched?: Maybe<Scalars['Int']['output']>;
};

/** User text activity */
export type TextActivity = {
  __typename?: 'TextActivity';
  /** The time the activity was created at */
  createdAt: Scalars['Int']['output'];
  /** The id of the activity */
  id: Scalars['Int']['output'];
  /** If the currently authenticated user liked the activity */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /** If the activity is locked and can receive replies */
  isLocked?: Maybe<Scalars['Boolean']['output']>;
  /** If the activity is pinned to the top of the users activity feed */
  isPinned?: Maybe<Scalars['Boolean']['output']>;
  /** If the currently authenticated user is subscribed to the activity */
  isSubscribed?: Maybe<Scalars['Boolean']['output']>;
  /** The amount of likes the activity has */
  likeCount: Scalars['Int']['output'];
  /** The users who liked the activity */
  likes?: Maybe<Array<Maybe<User>>>;
  /** The written replies to the activity */
  replies?: Maybe<Array<Maybe<ActivityReply>>>;
  /** The number of activity replies */
  replyCount: Scalars['Int']['output'];
  /** The url for the activity page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
  /** The status text (Markdown) */
  text?: Maybe<Scalars['String']['output']>;
  /** The type of activity */
  type?: Maybe<ActivityType>;
  /** The user who created the activity */
  user?: Maybe<User>;
  /** The user id of the activity's creator */
  userId?: Maybe<Scalars['Int']['output']>;
};


/** User text activity */
export type TextActivityTextArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Forum Thread */
export type Thread = {
  __typename?: 'Thread';
  /** The text body of the thread (Markdown) */
  body?: Maybe<Scalars['String']['output']>;
  /** The categories of the thread */
  categories?: Maybe<Array<Maybe<ThreadCategory>>>;
  /** The time of the thread creation */
  createdAt: Scalars['Int']['output'];
  /** The id of the thread */
  id: Scalars['Int']['output'];
  /** If the currently authenticated user liked the thread */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /** If the thread is locked and can receive comments */
  isLocked?: Maybe<Scalars['Boolean']['output']>;
  /** If the thread is stickied and should be displayed at the top of the page */
  isSticky?: Maybe<Scalars['Boolean']['output']>;
  /** If the currently authenticated user is subscribed to the thread */
  isSubscribed?: Maybe<Scalars['Boolean']['output']>;
  /** The amount of likes the thread has */
  likeCount: Scalars['Int']['output'];
  /** The users who liked the thread */
  likes?: Maybe<Array<Maybe<User>>>;
  /** The media categories of the thread */
  mediaCategories?: Maybe<Array<Maybe<Media>>>;
  /** The time of the last reply */
  repliedAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the most recent comment on the thread */
  replyCommentId?: Maybe<Scalars['Int']['output']>;
  /** The number of comments on the thread */
  replyCount?: Maybe<Scalars['Int']['output']>;
  /** The user to last reply to the thread */
  replyUser?: Maybe<User>;
  /** The id of the user who most recently commented on the thread */
  replyUserId?: Maybe<Scalars['Int']['output']>;
  /** The url for the thread page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
  /** The title of the thread */
  title?: Maybe<Scalars['String']['output']>;
  /** The time of the thread last update */
  updatedAt: Scalars['Int']['output'];
  /** The owner of the thread */
  user?: Maybe<User>;
  /** The id of the thread owner user */
  userId: Scalars['Int']['output'];
  /** The number of times users have viewed the thread */
  viewCount?: Maybe<Scalars['Int']['output']>;
};


/** Forum Thread */
export type ThreadBodyArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A forum thread category */
export type ThreadCategory = {
  __typename?: 'ThreadCategory';
  /** The id of the category */
  id: Scalars['Int']['output'];
  /** The name of the category */
  name: Scalars['String']['output'];
};

/** Forum Thread Comment */
export type ThreadComment = {
  __typename?: 'ThreadComment';
  /** The comment's child reply comments */
  childComments?: Maybe<Scalars['Json']['output']>;
  /** The text content of the comment (Markdown) */
  comment?: Maybe<Scalars['String']['output']>;
  /** The time of the comments creation */
  createdAt: Scalars['Int']['output'];
  /** The id of the comment */
  id: Scalars['Int']['output'];
  /** If the currently authenticated user liked the comment */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /** If the comment tree is locked and may not receive replies or edits */
  isLocked?: Maybe<Scalars['Boolean']['output']>;
  /** The amount of likes the comment has */
  likeCount: Scalars['Int']['output'];
  /** The users who liked the comment */
  likes?: Maybe<Array<Maybe<User>>>;
  /** The url for the comment page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
  /** The thread the comment belongs to */
  thread?: Maybe<Thread>;
  /** The id of thread the comment belongs to */
  threadId?: Maybe<Scalars['Int']['output']>;
  /** The time of the comments last update */
  updatedAt: Scalars['Int']['output'];
  /** The user who created the comment */
  user?: Maybe<User>;
  /** The user id of the comment's owner */
  userId?: Maybe<Scalars['Int']['output']>;
};


/** Forum Thread Comment */
export type ThreadCommentCommentArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Notification for when a thread comment is liked */
export type ThreadCommentLikeNotification = {
  __typename?: 'ThreadCommentLikeNotification';
  /** The thread comment that was liked */
  comment?: Maybe<ThreadComment>;
  /** The id of the activity which was liked */
  commentId: Scalars['Int']['output'];
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The thread that the relevant comment belongs to */
  thread?: Maybe<Thread>;
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who liked the activity */
  user?: Maybe<User>;
  /** The id of the user who liked to the activity */
  userId: Scalars['Int']['output'];
};

/** Notification for when authenticated user is @ mentioned in a forum thread comment */
export type ThreadCommentMentionNotification = {
  __typename?: 'ThreadCommentMentionNotification';
  /** The thread comment that included the @ mention */
  comment?: Maybe<ThreadComment>;
  /** The id of the comment where mentioned */
  commentId: Scalars['Int']['output'];
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The thread that the relevant comment belongs to */
  thread?: Maybe<Thread>;
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who mentioned the authenticated user */
  user?: Maybe<User>;
  /** The id of the user who mentioned the authenticated user */
  userId: Scalars['Int']['output'];
};

/** Notification for when a user replies to your forum thread comment */
export type ThreadCommentReplyNotification = {
  __typename?: 'ThreadCommentReplyNotification';
  /** The reply thread comment */
  comment?: Maybe<ThreadComment>;
  /** The id of the reply comment */
  commentId: Scalars['Int']['output'];
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The thread that the relevant comment belongs to */
  thread?: Maybe<Thread>;
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who replied to the activity */
  user?: Maybe<User>;
  /** The id of the user who create the comment reply */
  userId: Scalars['Int']['output'];
};

/** Thread comments sort enums */
export enum ThreadCommentSort {
  Id = 'ID',
  IdDesc = 'ID_DESC'
}

/** Notification for when a user replies to a subscribed forum thread */
export type ThreadCommentSubscribedNotification = {
  __typename?: 'ThreadCommentSubscribedNotification';
  /** The reply thread comment */
  comment?: Maybe<ThreadComment>;
  /** The id of the new comment in the subscribed thread */
  commentId: Scalars['Int']['output'];
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The thread that the relevant comment belongs to */
  thread?: Maybe<Thread>;
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who replied to the subscribed thread */
  user?: Maybe<User>;
  /** The id of the user who commented on the thread */
  userId: Scalars['Int']['output'];
};

/** Notification for when a thread is liked */
export type ThreadLikeNotification = {
  __typename?: 'ThreadLikeNotification';
  /** The liked thread comment */
  comment?: Maybe<ThreadComment>;
  /** The notification context text */
  context?: Maybe<Scalars['String']['output']>;
  /** The time the notification was created at */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** The id of the Notification */
  id: Scalars['Int']['output'];
  /** The thread that the relevant comment belongs to */
  thread?: Maybe<Thread>;
  /** The id of the thread which was liked */
  threadId: Scalars['Int']['output'];
  /** The type of notification */
  type?: Maybe<NotificationType>;
  /** The user who liked the activity */
  user?: Maybe<User>;
  /** The id of the user who liked to the activity */
  userId: Scalars['Int']['output'];
};

/** Thread sort enums */
export enum ThreadSort {
  CreatedAt = 'CREATED_AT',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Id = 'ID',
  IdDesc = 'ID_DESC',
  IsSticky = 'IS_STICKY',
  RepliedAt = 'REPLIED_AT',
  RepliedAtDesc = 'REPLIED_AT_DESC',
  ReplyCount = 'REPLY_COUNT',
  ReplyCountDesc = 'REPLY_COUNT_DESC',
  SearchMatch = 'SEARCH_MATCH',
  Title = 'TITLE',
  TitleDesc = 'TITLE_DESC',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ViewCount = 'VIEW_COUNT',
  ViewCountDesc = 'VIEW_COUNT_DESC'
}

/** A user */
export type User = {
  __typename?: 'User';
  /** The bio written by user (Markdown) */
  about?: Maybe<Scalars['String']['output']>;
  /** The user's avatar images */
  avatar?: Maybe<UserAvatar>;
  /** The user's banner images */
  bannerImage?: Maybe<Scalars['String']['output']>;
  bans?: Maybe<Scalars['Json']['output']>;
  /** When the user's account was created. (Does not exist for accounts created before 2020) */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** Custom donation badge text */
  donatorBadge?: Maybe<Scalars['String']['output']>;
  /** The donation tier of the user */
  donatorTier?: Maybe<Scalars['Int']['output']>;
  /** The users favourites */
  favourites?: Maybe<Favourites>;
  /** The id of the user */
  id: Scalars['Int']['output'];
  /** If the user is blocked by the authenticated user */
  isBlocked?: Maybe<Scalars['Boolean']['output']>;
  /** If this user if following the authenticated user */
  isFollower?: Maybe<Scalars['Boolean']['output']>;
  /** If the authenticated user if following this user */
  isFollowing?: Maybe<Scalars['Boolean']['output']>;
  /** The user's media list options */
  mediaListOptions?: Maybe<MediaListOptions>;
  /** The user's moderator roles if they are a site moderator */
  moderatorRoles?: Maybe<Array<Maybe<ModRole>>>;
  /**
   * If the user is a moderator or data moderator
   * @deprecated Deprecated. Replaced with moderatorRoles field.
   */
  moderatorStatus?: Maybe<Scalars['String']['output']>;
  /** The name of the user */
  name: Scalars['String']['output'];
  /** The user's general options */
  options?: Maybe<UserOptions>;
  /** The user's previously used names. */
  previousNames?: Maybe<Array<Maybe<UserPreviousName>>>;
  /** The url for the user page on the AniList website */
  siteUrl?: Maybe<Scalars['String']['output']>;
  /** The users anime & manga list statistics */
  statistics?: Maybe<UserStatisticTypes>;
  /**
   * The user's statistics
   * @deprecated Deprecated. Replaced with statistics field.
   */
  stats?: Maybe<UserStats>;
  /** The number of unread notifications the user has */
  unreadNotificationCount?: Maybe<Scalars['Int']['output']>;
  /** When the user's data was last updated */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};


/** A user */
export type UserAboutArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A user */
export type UserFavouritesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** A user's activity history stats. */
export type UserActivityHistory = {
  __typename?: 'UserActivityHistory';
  /** The amount of activity on the day */
  amount?: Maybe<Scalars['Int']['output']>;
  /** The day the activity took place (Unix timestamp) */
  date?: Maybe<Scalars['Int']['output']>;
  /** The level of activity represented on a 1-10 scale */
  level?: Maybe<Scalars['Int']['output']>;
};

/** A user's avatars */
export type UserAvatar = {
  __typename?: 'UserAvatar';
  /** The avatar of user at its largest size */
  large?: Maybe<Scalars['String']['output']>;
  /** The avatar of user at medium size */
  medium?: Maybe<Scalars['String']['output']>;
};

export type UserCountryStatistic = {
  __typename?: 'UserCountryStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  country?: Maybe<Scalars['CountryCode']['output']>;
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
};

export type UserFormatStatistic = {
  __typename?: 'UserFormatStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  format?: Maybe<MediaFormat>;
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
};

export type UserGenreStatistic = {
  __typename?: 'UserGenreStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  genre?: Maybe<Scalars['String']['output']>;
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
};

export type UserLengthStatistic = {
  __typename?: 'UserLengthStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  length?: Maybe<Scalars['String']['output']>;
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
};

/** User data for moderators */
export type UserModData = {
  __typename?: 'UserModData';
  alts?: Maybe<Array<Maybe<User>>>;
  bans?: Maybe<Scalars['Json']['output']>;
  counts?: Maybe<Scalars['Json']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  ip?: Maybe<Scalars['Json']['output']>;
  privacy?: Maybe<Scalars['Int']['output']>;
};

/** A user's general options */
export type UserOptions = {
  __typename?: 'UserOptions';
  /** Minutes between activity for them to be merged together. 0 is Never, Above 2 weeks (20160 mins) is Always. */
  activityMergeTime?: Maybe<Scalars['Int']['output']>;
  /** Whether the user receives notifications when a show they are watching aires */
  airingNotifications?: Maybe<Scalars['Boolean']['output']>;
  /** The list activity types the user has disabled from being created from list updates */
  disabledListActivity?: Maybe<Array<Maybe<ListActivityOption>>>;
  /** Whether the user has enabled viewing of 18+ content */
  displayAdultContent?: Maybe<Scalars['Boolean']['output']>;
  /** Notification options */
  notificationOptions?: Maybe<Array<Maybe<NotificationOption>>>;
  /** Profile highlight color (blue, purple, pink, orange, red, green, gray) */
  profileColor?: Maybe<Scalars['String']['output']>;
  /** Whether the user only allow messages from users they follow */
  restrictMessagesToFollowing?: Maybe<Scalars['Boolean']['output']>;
  /** The language the user wants to see staff and character names in */
  staffNameLanguage?: Maybe<UserStaffNameLanguage>;
  /** The user's timezone offset (Auth user only) */
  timezone?: Maybe<Scalars['String']['output']>;
  /** The language the user wants to see media titles in */
  titleLanguage?: Maybe<UserTitleLanguage>;
};

/** A user's previous name */
export type UserPreviousName = {
  __typename?: 'UserPreviousName';
  /** When the user first changed from this name. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** A previous name of the user. */
  name?: Maybe<Scalars['String']['output']>;
  /** When the user most recently changed from this name. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type UserReleaseYearStatistic = {
  __typename?: 'UserReleaseYearStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
  releaseYear?: Maybe<Scalars['Int']['output']>;
};

export type UserScoreStatistic = {
  __typename?: 'UserScoreStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
  score?: Maybe<Scalars['Int']['output']>;
};

/** User sort enums */
export enum UserSort {
  ChaptersRead = 'CHAPTERS_READ',
  ChaptersReadDesc = 'CHAPTERS_READ_DESC',
  Id = 'ID',
  IdDesc = 'ID_DESC',
  SearchMatch = 'SEARCH_MATCH',
  Username = 'USERNAME',
  UsernameDesc = 'USERNAME_DESC',
  WatchedTime = 'WATCHED_TIME',
  WatchedTimeDesc = 'WATCHED_TIME_DESC'
}

/** The language the user wants to see staff and character names in */
export enum UserStaffNameLanguage {
  /** The staff or character's name in their native language */
  Native = 'NATIVE',
  /** The romanization of the staff or character's native name */
  Romaji = 'ROMAJI',
  /** The romanization of the staff or character's native name, with western name ordering */
  RomajiWestern = 'ROMAJI_WESTERN'
}

export type UserStaffStatistic = {
  __typename?: 'UserStaffStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
  staff?: Maybe<Staff>;
};

export type UserStartYearStatistic = {
  __typename?: 'UserStartYearStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
  startYear?: Maybe<Scalars['Int']['output']>;
};

export type UserStatisticTypes = {
  __typename?: 'UserStatisticTypes';
  anime?: Maybe<UserStatistics>;
  manga?: Maybe<UserStatistics>;
};

export type UserStatistics = {
  __typename?: 'UserStatistics';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  countries?: Maybe<Array<Maybe<UserCountryStatistic>>>;
  episodesWatched: Scalars['Int']['output'];
  formats?: Maybe<Array<Maybe<UserFormatStatistic>>>;
  genres?: Maybe<Array<Maybe<UserGenreStatistic>>>;
  lengths?: Maybe<Array<Maybe<UserLengthStatistic>>>;
  meanScore: Scalars['Float']['output'];
  minutesWatched: Scalars['Int']['output'];
  releaseYears?: Maybe<Array<Maybe<UserReleaseYearStatistic>>>;
  scores?: Maybe<Array<Maybe<UserScoreStatistic>>>;
  staff?: Maybe<Array<Maybe<UserStaffStatistic>>>;
  standardDeviation: Scalars['Float']['output'];
  startYears?: Maybe<Array<Maybe<UserStartYearStatistic>>>;
  statuses?: Maybe<Array<Maybe<UserStatusStatistic>>>;
  studios?: Maybe<Array<Maybe<UserStudioStatistic>>>;
  tags?: Maybe<Array<Maybe<UserTagStatistic>>>;
  voiceActors?: Maybe<Array<Maybe<UserVoiceActorStatistic>>>;
  volumesRead: Scalars['Int']['output'];
};


export type UserStatisticsCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsFormatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsGenresArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsLengthsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsReleaseYearsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsScoresArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsStaffArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsStartYearsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsStatusesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsStudiosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsTagsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};


export type UserStatisticsVoiceActorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserStatisticsSort>>>;
};

/** User statistics sort enum */
export enum UserStatisticsSort {
  Count = 'COUNT',
  CountDesc = 'COUNT_DESC',
  Id = 'ID',
  IdDesc = 'ID_DESC',
  MeanScore = 'MEAN_SCORE',
  MeanScoreDesc = 'MEAN_SCORE_DESC',
  Progress = 'PROGRESS',
  ProgressDesc = 'PROGRESS_DESC'
}

/** A user's statistics */
export type UserStats = {
  __typename?: 'UserStats';
  activityHistory?: Maybe<Array<Maybe<UserActivityHistory>>>;
  animeListScores?: Maybe<ListScoreStats>;
  animeScoreDistribution?: Maybe<Array<Maybe<ScoreDistribution>>>;
  animeStatusDistribution?: Maybe<Array<Maybe<StatusDistribution>>>;
  /** The amount of manga chapters the user has read */
  chaptersRead?: Maybe<Scalars['Int']['output']>;
  favouredActors?: Maybe<Array<Maybe<StaffStats>>>;
  favouredFormats?: Maybe<Array<Maybe<FormatStats>>>;
  favouredGenres?: Maybe<Array<Maybe<GenreStats>>>;
  favouredGenresOverview?: Maybe<Array<Maybe<GenreStats>>>;
  favouredStaff?: Maybe<Array<Maybe<StaffStats>>>;
  favouredStudios?: Maybe<Array<Maybe<StudioStats>>>;
  favouredTags?: Maybe<Array<Maybe<TagStats>>>;
  favouredYears?: Maybe<Array<Maybe<YearStats>>>;
  mangaListScores?: Maybe<ListScoreStats>;
  mangaScoreDistribution?: Maybe<Array<Maybe<ScoreDistribution>>>;
  mangaStatusDistribution?: Maybe<Array<Maybe<StatusDistribution>>>;
  /** The amount of anime the user has watched in minutes */
  watchedTime?: Maybe<Scalars['Int']['output']>;
};

export type UserStatusStatistic = {
  __typename?: 'UserStatusStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
  status?: Maybe<MediaListStatus>;
};

export type UserStudioStatistic = {
  __typename?: 'UserStudioStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
  studio?: Maybe<Studio>;
};

export type UserTagStatistic = {
  __typename?: 'UserTagStatistic';
  chaptersRead: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
  tag?: Maybe<MediaTag>;
};

/** The language the user wants to see media titles in */
export enum UserTitleLanguage {
  /** The official english title */
  English = 'ENGLISH',
  /** The official english title, stylised by media creator */
  EnglishStylised = 'ENGLISH_STYLISED',
  /** Official title in it's native language */
  Native = 'NATIVE',
  /** Official title in it's native language, stylised by media creator */
  NativeStylised = 'NATIVE_STYLISED',
  /** The romanization of the native language title */
  Romaji = 'ROMAJI',
  /** The romanization of the native language title, stylised by media creator */
  RomajiStylised = 'ROMAJI_STYLISED'
}

export type UserVoiceActorStatistic = {
  __typename?: 'UserVoiceActorStatistic';
  chaptersRead: Scalars['Int']['output'];
  characterIds: Array<Maybe<Scalars['Int']['output']>>;
  count: Scalars['Int']['output'];
  meanScore: Scalars['Float']['output'];
  mediaIds: Array<Maybe<Scalars['Int']['output']>>;
  minutesWatched: Scalars['Int']['output'];
  voiceActor?: Maybe<Staff>;
};

/** User's year statistics */
export type YearStats = {
  __typename?: 'YearStats';
  amount?: Maybe<Scalars['Int']['output']>;
  meanScore?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type ToggleFavMutation_ToggleFavourite_Favourites_anime_MediaConnection_edges_MediaEdge_node_Media = { __typename?: 'Media', id: number, isFavourite: boolean };

export type ToggleFavMutation_ToggleFavourite_Favourites_anime_MediaConnection_edges_MediaEdge = { __typename?: 'MediaEdge', node?: ToggleFavMutation_ToggleFavourite_Favourites_anime_MediaConnection_edges_MediaEdge_node_Media | null };

export type ToggleFavMutation_ToggleFavourite_Favourites_anime_MediaConnection = { __typename?: 'MediaConnection', edges?: Array<ToggleFavMutation_ToggleFavourite_Favourites_anime_MediaConnection_edges_MediaEdge | null> | null };

export type ToggleFavMutation_ToggleFavourite_Favourites_manga_MediaConnection_edges_MediaEdge_node_Media = { __typename?: 'Media', id: number, isFavourite: boolean };

export type ToggleFavMutation_ToggleFavourite_Favourites_manga_MediaConnection_edges_MediaEdge = { __typename?: 'MediaEdge', node?: ToggleFavMutation_ToggleFavourite_Favourites_manga_MediaConnection_edges_MediaEdge_node_Media | null };

export type ToggleFavMutation_ToggleFavourite_Favourites_manga_MediaConnection = { __typename?: 'MediaConnection', edges?: Array<ToggleFavMutation_ToggleFavourite_Favourites_manga_MediaConnection_edges_MediaEdge | null> | null };

export type ToggleFavMutation_ToggleFavourite_Favourites_characters_CharacterConnection_edges_CharacterEdge_node_Character = { __typename?: 'Character', id: number, isFavourite: boolean };

export type ToggleFavMutation_ToggleFavourite_Favourites_characters_CharacterConnection_edges_CharacterEdge = { __typename?: 'CharacterEdge', node?: ToggleFavMutation_ToggleFavourite_Favourites_characters_CharacterConnection_edges_CharacterEdge_node_Character | null };

export type ToggleFavMutation_ToggleFavourite_Favourites_characters_CharacterConnection = { __typename?: 'CharacterConnection', edges?: Array<ToggleFavMutation_ToggleFavourite_Favourites_characters_CharacterConnection_edges_CharacterEdge | null> | null };

export type ToggleFavMutation_ToggleFavourite_Favourites_staff_StaffConnection_edges_StaffEdge_node_Staff = { __typename?: 'Staff', id: number, isFavourite: boolean };

export type ToggleFavMutation_ToggleFavourite_Favourites_staff_StaffConnection_edges_StaffEdge = { __typename?: 'StaffEdge', node?: ToggleFavMutation_ToggleFavourite_Favourites_staff_StaffConnection_edges_StaffEdge_node_Staff | null };

export type ToggleFavMutation_ToggleFavourite_Favourites_staff_StaffConnection = { __typename?: 'StaffConnection', edges?: Array<ToggleFavMutation_ToggleFavourite_Favourites_staff_StaffConnection_edges_StaffEdge | null> | null };

export type ToggleFavMutation_ToggleFavourite_Favourites_studios_StudioConnection_edges_StudioEdge_node_Studio = { __typename?: 'Studio', id: number, isFavourite: boolean };

export type ToggleFavMutation_ToggleFavourite_Favourites_studios_StudioConnection_edges_StudioEdge = { __typename?: 'StudioEdge', node?: ToggleFavMutation_ToggleFavourite_Favourites_studios_StudioConnection_edges_StudioEdge_node_Studio | null };

export type ToggleFavMutation_ToggleFavourite_Favourites_studios_StudioConnection = { __typename?: 'StudioConnection', edges?: Array<ToggleFavMutation_ToggleFavourite_Favourites_studios_StudioConnection_edges_StudioEdge | null> | null };

export type ToggleFavMutation_ToggleFavourite_Favourites = { __typename: 'Favourites', anime?: ToggleFavMutation_ToggleFavourite_Favourites_anime_MediaConnection | null, manga?: ToggleFavMutation_ToggleFavourite_Favourites_manga_MediaConnection | null, characters?: ToggleFavMutation_ToggleFavourite_Favourites_characters_CharacterConnection | null, staff?: ToggleFavMutation_ToggleFavourite_Favourites_staff_StaffConnection | null, studios?: ToggleFavMutation_ToggleFavourite_Favourites_studios_StudioConnection | null };

export type ToggleFavMutation_Mutation = { __typename?: 'Mutation', ToggleFavourite?: ToggleFavMutation_ToggleFavourite_Favourites | null };


export type ToggleFavMutationVariables = Exact<{
  animeId?: InputMaybe<Scalars['Int']['input']>;
  mangaId?: InputMaybe<Scalars['Int']['input']>;
  characterId?: InputMaybe<Scalars['Int']['input']>;
  staffId?: InputMaybe<Scalars['Int']['input']>;
  studioId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ToggleFavMutation = ToggleFavMutation_Mutation;

export type SaveMediaListItemMutation_SaveMediaListEntry_MediaList_media_Media = { __typename?: 'Media', id: number, type?: MediaType | null, countryOfOrigin?: any | null };

export type SaveMediaListItemMutation_SaveMediaListEntry_MediaList_startedAt_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type SaveMediaListItemMutation_SaveMediaListEntry_MediaList_completedAt_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null };

export type SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null };

export type SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null, animeList?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions | null, mangaList?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions | null };

export type SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User = { __typename?: 'User', mediaListOptions?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User_mediaListOptions_MediaListOptions | null };

export type SaveMediaListItemMutation_SaveMediaListEntry_MediaList = { __typename?: 'MediaList', id: number, mediaId: number, status?: MediaListStatus | null, score?: number | null, advancedScores?: any | null, progress?: number | null, progressVolumes?: number | null, repeat?: number | null, notes?: string | null, private?: boolean | null, hiddenFromStatusLists?: boolean | null, customLists?: any | null, updatedAt?: number | null, createdAt?: number | null, media?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_media_Media | null, startedAt?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_startedAt_FuzzyDate | null, completedAt?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_completedAt_FuzzyDate | null, user?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User | null };

export type SaveMediaListItemMutation_Mutation = { __typename?: 'Mutation', SaveMediaListEntry?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList | null };


export type SaveMediaListItemMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<MediaListStatus>;
  score?: InputMaybe<Scalars['Float']['input']>;
  scoreRaw?: InputMaybe<Scalars['Int']['input']>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  progressVolumes?: InputMaybe<Scalars['Int']['input']>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
  hideFromStatusList?: InputMaybe<Scalars['Boolean']['input']>;
  repeat?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<FuzzyDateInput>;
  completedAt?: InputMaybe<FuzzyDateInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  customLists?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type SaveMediaListItemMutation = SaveMediaListItemMutation_Mutation;

export type DeleteMediaListItemMutation_DeleteMediaListEntry_Deleted = { __typename?: 'Deleted', deleted?: boolean | null };

export type DeleteMediaListItemMutation_Mutation = { __typename?: 'Mutation', DeleteMediaListEntry?: DeleteMediaListItemMutation_DeleteMediaListEntry_Deleted | null };


export type DeleteMediaListItemMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteMediaListItemMutation = DeleteMediaListItemMutation_Mutation;

export type ChangeLanguageMutation_UpdateUser_User = { __typename?: 'User', id: number };

export type ChangeLanguageMutation_Mutation = { __typename?: 'Mutation', UpdateUser?: ChangeLanguageMutation_UpdateUser_User | null };


export type ChangeLanguageMutationVariables = Exact<{
  titleLanguage?: InputMaybe<UserTitleLanguage>;
  staffNameLanguage?: InputMaybe<UserStaffNameLanguage>;
}>;


export type ChangeLanguageMutation = ChangeLanguageMutation_Mutation;

export type UpdateViewerMutation_UpdateUser_User = { __typename?: 'User', id: number };

export type UpdateViewerMutation_Mutation = { __typename?: 'Mutation', UpdateUser?: UpdateViewerMutation_UpdateUser_User | null };


export type UpdateViewerMutationVariables = Exact<{
  notificationOptions?: InputMaybe<Array<InputMaybe<NotificationOptionInput>> | InputMaybe<NotificationOptionInput>>;
  displayNSFW?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateViewerMutation = UpdateViewerMutation_Mutation;

export type SaveRecomMutation_SaveRecommendation_Recommendation = { __typename?: 'Recommendation', rating?: number | null, userRating?: RecommendationRating | null };

export type SaveRecomMutation_Mutation = { __typename?: 'Mutation', SaveRecommendation?: SaveRecomMutation_SaveRecommendation_Recommendation | null };


export type SaveRecomMutationVariables = Exact<{
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  mediaRecommendationId?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<RecommendationRating>;
}>;


export type SaveRecomMutation = SaveRecomMutation_Mutation;

export type DeleteActMutation_DeleteActivity_Deleted = { __typename?: 'Deleted', deleted?: boolean | null };

export type DeleteActMutation_Mutation = { __typename?: 'Mutation', DeleteActivity?: DeleteActMutation_DeleteActivity_Deleted | null };


export type DeleteActMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteActMutation = DeleteActMutation_Mutation;

export type ReviewRatingMutation_RateReview_Review = { __typename?: 'Review', id: number, userRating?: ReviewRating | null, rating?: number | null, ratingAmount?: number | null };

export type ReviewRatingMutation_Mutation = { __typename?: 'Mutation', RateReview?: ReviewRatingMutation_RateReview_Review | null };


export type ReviewRatingMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<ReviewRating>;
}>;


export type ReviewRatingMutation = ReviewRatingMutation_Mutation;

export type UpdateUserMutation_UpdateUser_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type UpdateUserMutation_UpdateUser_User_options_UserOptions_notificationOptions_NotificationOption = { __typename?: 'NotificationOption', type?: NotificationType | null, enabled?: boolean | null };

export type UpdateUserMutation_UpdateUser_User_options_UserOptions_disabledListActivity_ListActivityOption = { __typename?: 'ListActivityOption', type?: MediaListStatus | null, disabled?: boolean | null };

export type UpdateUserMutation_UpdateUser_User_options_UserOptions = { __typename?: 'UserOptions', titleLanguage?: UserTitleLanguage | null, staffNameLanguage?: UserStaffNameLanguage | null, restrictMessagesToFollowing?: boolean | null, airingNotifications?: boolean | null, displayAdultContent?: boolean | null, profileColor?: string | null, timezone?: string | null, activityMergeTime?: number | null, notificationOptions?: Array<UpdateUserMutation_UpdateUser_User_options_UserOptions_notificationOptions_NotificationOption | null> | null, disabledListActivity?: Array<UpdateUserMutation_UpdateUser_User_options_UserOptions_disabledListActivity_ListActivityOption | null> | null };

export type UpdateUserMutation_UpdateUser_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null, sectionOrder?: Array<string | null> | null, splitCompletedSectionByFormat?: boolean | null, advancedScoring?: Array<string | null> | null, advancedScoringEnabled?: boolean | null };

export type UpdateUserMutation_UpdateUser_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null, sectionOrder?: Array<string | null> | null, splitCompletedSectionByFormat?: boolean | null, advancedScoring?: Array<string | null> | null, advancedScoringEnabled?: boolean | null };

export type UpdateUserMutation_UpdateUser_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null, rowOrder?: string | null, animeList?: UpdateUserMutation_UpdateUser_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions | null, mangaList?: UpdateUserMutation_UpdateUser_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions | null };

export type UpdateUserMutation_UpdateUser_User = { __typename?: 'User', id: number, name: string, about?: string | null, bannerImage?: string | null, unreadNotificationCount?: number | null, donatorTier?: number | null, donatorBadge?: string | null, moderatorRoles?: Array<ModRole | null> | null, avatar?: UpdateUserMutation_UpdateUser_User_avatar_UserAvatar | null, options?: UpdateUserMutation_UpdateUser_User_options_UserOptions | null, mediaListOptions?: UpdateUserMutation_UpdateUser_User_mediaListOptions_MediaListOptions | null };

export type UpdateUserMutation_Mutation = { __typename?: 'Mutation', UpdateUser?: UpdateUserMutation_UpdateUser_User | null };


export type UpdateUserMutationVariables = Exact<{
  about?: InputMaybe<Scalars['String']['input']>;
  titleLanguage?: InputMaybe<UserTitleLanguage>;
  staffNameLanguage?: InputMaybe<UserStaffNameLanguage>;
  airingNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  displayAdultContent?: InputMaybe<Scalars['Boolean']['input']>;
  scoreFormat?: InputMaybe<ScoreFormat>;
  rowOrder?: InputMaybe<Scalars['String']['input']>;
  profileColor?: InputMaybe<Scalars['String']['input']>;
  donatorBadge?: InputMaybe<Scalars['String']['input']>;
  notificationOptions?: InputMaybe<Array<InputMaybe<NotificationOptionInput>> | InputMaybe<NotificationOptionInput>>;
  animeListOptions?: InputMaybe<MediaListOptionsInput>;
  mangaListOptions?: InputMaybe<MediaListOptionsInput>;
  timezone?: InputMaybe<Scalars['String']['input']>;
  activityMergeTime?: InputMaybe<Scalars['Int']['input']>;
  restrictMessagesToFollowing?: InputMaybe<Scalars['Boolean']['input']>;
  disabledListActivity?: InputMaybe<Array<InputMaybe<ListActivityOptionInput>> | InputMaybe<ListActivityOptionInput>>;
}>;


export type UpdateUserMutation = UpdateUserMutation_Mutation;

export type ToggleFollowMutation_ToggleFollow_User = { __typename?: 'User', id: number, isFollowing?: boolean | null };

export type ToggleFollowMutation_Mutation = { __typename?: 'Mutation', ToggleFollow?: ToggleFollowMutation_ToggleFollow_User | null };


export type ToggleFollowMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ToggleFollowMutation = ToggleFollowMutation_Mutation;

export type ToggleLikeMutation_ToggleLikeV2_ActivityReply = { __typename: 'ActivityReply', id: number, isLiked?: boolean | null, likeCount: number };

export type ToggleLikeMutation_ToggleLikeV2_ListActivity = { __typename: 'ListActivity', id: number, isLiked?: boolean | null, likeCount: number };

export type ToggleLikeMutation_ToggleLikeV2_MessageActivity = { __typename: 'MessageActivity', id: number, isLiked?: boolean | null, likeCount: number };

export type ToggleLikeMutation_ToggleLikeV2_TextActivity = { __typename: 'TextActivity', id: number, isLiked?: boolean | null, likeCount: number };

export type ToggleLikeMutation_ToggleLikeV2_Thread = { __typename: 'Thread', id: number, isLiked?: boolean | null, likeCount: number };

export type ToggleLikeMutation_ToggleLikeV2_ThreadComment = { __typename: 'ThreadComment', id: number, isLiked?: boolean | null, likeCount: number };

export type ToggleLikeMutation_ToggleLikeV2 = ToggleLikeMutation_ToggleLikeV2_ActivityReply | ToggleLikeMutation_ToggleLikeV2_ListActivity | ToggleLikeMutation_ToggleLikeV2_MessageActivity | ToggleLikeMutation_ToggleLikeV2_TextActivity | ToggleLikeMutation_ToggleLikeV2_Thread | ToggleLikeMutation_ToggleLikeV2_ThreadComment;

export type ToggleLikeMutation_Mutation = { __typename?: 'Mutation', ToggleLikeV2?: ToggleLikeMutation_ToggleLikeV2 | null };


export type ToggleLikeMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<LikeableType>;
}>;


export type ToggleLikeMutation = ToggleLikeMutation_Mutation;

export type ToggleThreadSubscriptionMutation_ToggleThreadSubscription_Thread = { __typename?: 'Thread', id: number, isSubscribed?: boolean | null };

export type ToggleThreadSubscriptionMutation_Mutation = { __typename?: 'Mutation', ToggleThreadSubscription?: ToggleThreadSubscriptionMutation_ToggleThreadSubscription_Thread | null };


export type ToggleThreadSubscriptionMutationVariables = Exact<{
  threadId?: InputMaybe<Scalars['Int']['input']>;
  subscribe?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ToggleThreadSubscriptionMutation = ToggleThreadSubscriptionMutation_Mutation;

export type SaveThreadCommentMutation_SaveThreadComment_ThreadComment = { __typename?: 'ThreadComment', id: number };

export type SaveThreadCommentMutation_Mutation = { __typename?: 'Mutation', SaveThreadComment?: SaveThreadCommentMutation_SaveThreadComment_ThreadComment | null };


export type SaveThreadCommentMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  threadId?: InputMaybe<Scalars['Int']['input']>;
  parentCommentId?: InputMaybe<Scalars['Int']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
}>;


export type SaveThreadCommentMutation = SaveThreadCommentMutation_Mutation;

export type DeleteThreadCommentMutation_DeleteThreadComment_Deleted = { __typename?: 'Deleted', deleted?: boolean | null };

export type DeleteThreadCommentMutation_Mutation = { __typename?: 'Mutation', DeleteThreadComment?: DeleteThreadCommentMutation_DeleteThreadComment_Deleted | null };


export type DeleteThreadCommentMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteThreadCommentMutation = DeleteThreadCommentMutation_Mutation;

export type SaveThreadMutation_SaveThread_Thread = { __typename?: 'Thread', id: number };

export type SaveThreadMutation_Mutation = { __typename?: 'Mutation', SaveThread?: SaveThreadMutation_SaveThread_Thread | null };


export type SaveThreadMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  mediaCategories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
}>;


export type SaveThreadMutation = SaveThreadMutation_Mutation;

export type DeleteThreadMutation_DeleteThread_Deleted = { __typename?: 'Deleted', deleted?: boolean | null };

export type DeleteThreadMutation_Mutation = { __typename?: 'Mutation', DeleteThread?: DeleteThreadMutation_DeleteThread_Deleted | null };


export type DeleteThreadMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteThreadMutation = DeleteThreadMutation_Mutation;

export type MediaAniCardQueryQuery_Media_Media_title_MediaTitle = { __typename?: 'MediaTitle', romaji?: string | null, english?: string | null, native?: string | null, userPreferred?: string | null };

export type MediaAniCardQueryQuery_Media_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', color?: string | null, extraLarge?: string | null };

export type MediaAniCardQueryQuery_Media_Media_startDate_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type MediaAniCardQueryQuery_Media_Media_tags_MediaTag = { __typename?: 'MediaTag', name: string };

export type MediaAniCardQueryQuery_Media_Media = { __typename?: 'Media', type?: MediaType | null, format?: MediaFormat | null, averageScore?: number | null, meanScore?: number | null, status?: MediaStatus | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, idMal?: number | null, genres?: Array<string | null> | null, descriptionHTML?: string | null, title?: MediaAniCardQueryQuery_Media_Media_title_MediaTitle | null, coverImage?: MediaAniCardQueryQuery_Media_Media_coverImage_MediaCoverImage | null, startDate?: MediaAniCardQueryQuery_Media_Media_startDate_FuzzyDate | null, tags?: Array<MediaAniCardQueryQuery_Media_Media_tags_MediaTag | null> | null };

export type MediaAniCardQueryQuery_Query = { __typename?: 'Query', Media?: MediaAniCardQueryQuery_Media_Media | null };


export type MediaAniCardQueryQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MediaAniCardQueryQuery = MediaAniCardQueryQuery_Query;

export type WeeklyAnimeQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, total?: number | null };

export type WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle = { __typename?: 'MediaTitle', english?: string | null, native?: string | null, romaji?: string | null, userPreferred?: string | null };

export type WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', medium?: string | null, large?: string | null, extraLarge?: string | null, color?: string | null };

export type WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList = { __typename?: 'MediaList', id: number, mediaId: number, status?: MediaListStatus | null, score?: number | null, advancedScores?: any | null, progress?: number | null, progressVolumes?: number | null, repeat?: number | null, notes?: string | null, private?: boolean | null, hiddenFromStatusLists?: boolean | null, customLists?: any | null, updatedAt?: number | null, createdAt?: number | null, startedAt?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_startedAt_FuzzyDate | null, completedAt?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_completedAt_FuzzyDate | null, user?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User | null };

export type WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats_scoreDistribution_ScoreDistribution = { __typename?: 'ScoreDistribution', score?: number | null, amount?: number | null };

export type WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats = { __typename?: 'MediaStats', scoreDistribution?: Array<WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats_scoreDistribution_ScoreDistribution | null> | null };

export type WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule = { __typename?: 'AiringSchedule', id: number, airingAt: number, timeUntilAiring: number, episode: number, mediaId: number };

export type WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule = { __typename?: 'AiringSchedule', id: number, episode: number, airingAt: number, timeUntilAiring: number, media?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media | null };

export type WeeklyAnimeQuery_Page_Page = { __typename?: 'Page', pageInfo?: WeeklyAnimeQuery_Page_Page_pageInfo_PageInfo | null, airingSchedules?: Array<WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule | null> | null };

export type WeeklyAnimeQuery_Query = { __typename?: 'Query', Page?: WeeklyAnimeQuery_Page_Page | null };


export type WeeklyAnimeQueryVariables = Exact<{
  weekStart?: InputMaybe<Scalars['Int']['input']>;
  weekEnd?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type WeeklyAnimeQuery = WeeklyAnimeQuery_Query;

export type AiringRangeQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, total?: number | null };

export type AiringRangeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type AiringRangeQuery_Page_Page_airingSchedules_AiringSchedule = { __typename?: 'AiringSchedule', id: number, episode: number, airingAt: number, timeUntilAiring: number, media?: AiringRangeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media | null };

export type AiringRangeQuery_Page_Page = { __typename?: 'Page', pageInfo?: AiringRangeQuery_Page_Page_pageInfo_PageInfo | null, airingSchedules?: Array<AiringRangeQuery_Page_Page_airingSchedules_AiringSchedule | null> | null };

export type AiringRangeQuery_Query = { __typename?: 'Query', Page?: AiringRangeQuery_Page_Page | null };


export type AiringRangeQueryVariables = Exact<{
  start?: InputMaybe<Scalars['Int']['input']>;
  end?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AiringRangeQuery = AiringRangeQuery_Query;

export type SeasonalAnimeQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, hasNextPage?: boolean | null };

export type SeasonalAnimeQuery_Page_Page_media_Media_airingSchedule_AiringScheduleConnection_nodes_AiringSchedule = { __typename?: 'AiringSchedule', airingAt: number };

export type SeasonalAnimeQuery_Page_Page_media_Media_airingSchedule_AiringScheduleConnection = { __typename?: 'AiringScheduleConnection', nodes?: Array<SeasonalAnimeQuery_Page_Page_media_Media_airingSchedule_AiringScheduleConnection_nodes_AiringSchedule | null> | null };

export type SeasonalAnimeQuery_Page_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, airingSchedule?: SeasonalAnimeQuery_Page_Page_media_Media_airingSchedule_AiringScheduleConnection | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type SeasonalAnimeQuery_Page_Page = { __typename?: 'Page', pageInfo?: SeasonalAnimeQuery_Page_Page_pageInfo_PageInfo | null, media?: Array<SeasonalAnimeQuery_Page_Page_media_Media | null> | null };

export type SeasonalAnimeQuery_Query = { __typename?: 'Query', Page?: SeasonalAnimeQuery_Page_Page | null };


export type SeasonalAnimeQueryVariables = Exact<{
  season?: InputMaybe<MediaSeason>;
  seasonYear?: InputMaybe<Scalars['Int']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SeasonalAnimeQuery = SeasonalAnimeQuery_Query;

export type TagCollectionQuery_MediaTagCollection_MediaTag = { __typename?: 'MediaTag', id: number, name: string, description?: string | null, category?: string | null, rank?: number | null, isGeneralSpoiler?: boolean | null, isMediaSpoiler?: boolean | null, isAdult?: boolean | null, userId?: number | null };

export type TagCollectionQuery_Query = { __typename?: 'Query', MediaTagCollection?: Array<TagCollectionQuery_MediaTagCollection_MediaTag | null> | null };


export type TagCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type TagCollectionQuery = TagCollectionQuery_Query;

export type LinkSourceCollectionQuery_AnimeExternalLinkSourceCollection_MediaExternalLink = { __typename?: 'MediaExternalLink', id: number, url?: string | null, site: string, siteId?: number | null, type?: ExternalLinkType | null, language?: string | null, color?: string | null, icon?: string | null, notes?: string | null, isDisabled?: boolean | null };

export type LinkSourceCollectionQuery_MangaExternalLinkSourceCollection_MediaExternalLink = { __typename?: 'MediaExternalLink', id: number, url?: string | null, site: string, siteId?: number | null, type?: ExternalLinkType | null, language?: string | null, color?: string | null, icon?: string | null, notes?: string | null, isDisabled?: boolean | null };

export type LinkSourceCollectionQuery_Query = { __typename?: 'Query', AnimeExternalLinkSourceCollection?: Array<LinkSourceCollectionQuery_AnimeExternalLinkSourceCollection_MediaExternalLink | null> | null, MangaExternalLinkSourceCollection?: Array<LinkSourceCollectionQuery_MangaExternalLinkSourceCollection_MediaExternalLink | null> | null };


export type LinkSourceCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type LinkSourceCollectionQuery = LinkSourceCollectionQuery_Query;

export type GenreCollectionQuery_Query = { __typename?: 'Query', GenreCollection?: Array<string | null> | null };


export type GenreCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GenreCollectionQuery = GenreCollectionQuery_Query;

export type AllCollectionsQuery_MediaTagCollection_MediaTag = { __typename?: 'MediaTag', id: number, name: string, description?: string | null, category?: string | null, rank?: number | null, isGeneralSpoiler?: boolean | null, isMediaSpoiler?: boolean | null, isAdult?: boolean | null, userId?: number | null };

export type AllCollectionsQuery_AnimeExternalLinkSourceCollection_MediaExternalLink = { __typename?: 'MediaExternalLink', id: number, url?: string | null, site: string, siteId?: number | null, type?: ExternalLinkType | null, language?: string | null, color?: string | null, icon?: string | null, notes?: string | null, isDisabled?: boolean | null };

export type AllCollectionsQuery_MangaExternalLinkSourceCollection_MediaExternalLink = { __typename?: 'MediaExternalLink', id: number, url?: string | null, site: string, siteId?: number | null, type?: ExternalLinkType | null, language?: string | null, color?: string | null, icon?: string | null, notes?: string | null, isDisabled?: boolean | null };

export type AllCollectionsQuery_Query = { __typename?: 'Query', GenreCollection?: Array<string | null> | null, MediaTagCollection?: Array<AllCollectionsQuery_MediaTagCollection_MediaTag | null> | null, AnimeExternalLinkSourceCollection?: Array<AllCollectionsQuery_AnimeExternalLinkSourceCollection_MediaExternalLink | null> | null, MangaExternalLinkSourceCollection?: Array<AllCollectionsQuery_MangaExternalLinkSourceCollection_MediaExternalLink | null> | null };


export type AllCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCollectionsQuery = AllCollectionsQuery_Query;

export type MediaListEntryMetaFragment = { __typename?: 'MediaList', id: number, mediaId: number, status?: MediaListStatus | null, score?: number | null, advancedScores?: any | null, progress?: number | null, progressVolumes?: number | null, repeat?: number | null, notes?: string | null, private?: boolean | null, hiddenFromStatusLists?: boolean | null, customLists?: any | null, updatedAt?: number | null, createdAt?: number | null, startedAt?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_startedAt_FuzzyDate | null, completedAt?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_completedAt_FuzzyDate | null, user?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User | null };

export type MainMetaFragment = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type AnimeExploreQuery_Viewer_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null };

export type AnimeExploreQuery_Viewer_User = { __typename?: 'User', mediaListOptions?: AnimeExploreQuery_Viewer_User_mediaListOptions_MediaListOptions | null };

export type AnimeExploreQuery_trending_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type AnimeExploreQuery_trending_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type AnimeExploreQuery_trending_Page = { __typename?: 'Page', pageInfo?: AnimeExploreQuery_trending_Page_pageInfo_PageInfo | null, media?: Array<AnimeExploreQuery_trending_Page_media_Media | null> | null };

export type AnimeExploreQuery_popular_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type AnimeExploreQuery_popular_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type AnimeExploreQuery_popular_Page = { __typename?: 'Page', pageInfo?: AnimeExploreQuery_popular_Page_pageInfo_PageInfo | null, media?: Array<AnimeExploreQuery_popular_Page_media_Media | null> | null };

export type AnimeExploreQuery_top_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type AnimeExploreQuery_top_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type AnimeExploreQuery_top_Page = { __typename?: 'Page', pageInfo?: AnimeExploreQuery_top_Page_pageInfo_PageInfo | null, media?: Array<AnimeExploreQuery_top_Page_media_Media | null> | null };

export type AnimeExploreQuery_thisSeason_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type AnimeExploreQuery_thisSeason_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type AnimeExploreQuery_thisSeason_Page = { __typename?: 'Page', pageInfo?: AnimeExploreQuery_thisSeason_Page_pageInfo_PageInfo | null, media?: Array<AnimeExploreQuery_thisSeason_Page_media_Media | null> | null };

export type AnimeExploreQuery_nextSeason_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type AnimeExploreQuery_nextSeason_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type AnimeExploreQuery_nextSeason_Page = { __typename?: 'Page', pageInfo?: AnimeExploreQuery_nextSeason_Page_pageInfo_PageInfo | null, media?: Array<AnimeExploreQuery_nextSeason_Page_media_Media | null> | null };

export type AnimeExploreQuery_Query = { __typename?: 'Query', Viewer?: AnimeExploreQuery_Viewer_User | null, trending?: AnimeExploreQuery_trending_Page | null, popular?: AnimeExploreQuery_popular_Page | null, top?: AnimeExploreQuery_top_Page | null, thisSeason?: AnimeExploreQuery_thisSeason_Page | null, nextSeason?: AnimeExploreQuery_nextSeason_Page | null };


export type AnimeExploreQueryVariables = Exact<{
  includeViewer: Scalars['Boolean']['input'];
  perPage?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<MediaSeason>;
  seasonYear?: InputMaybe<Scalars['Int']['input']>;
  nextSeason?: InputMaybe<MediaSeason>;
  nextSeasonYear?: InputMaybe<Scalars['Int']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  tag_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type AnimeExploreQuery = AnimeExploreQuery_Query;

export type MangaExploreQuery_Viewer_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null };

export type MangaExploreQuery_Viewer_User = { __typename?: 'User', mediaListOptions?: MangaExploreQuery_Viewer_User_mediaListOptions_MediaListOptions | null };

export type MangaExploreQuery_newReleases_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type MangaExploreQuery_newReleases_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type MangaExploreQuery_newReleases_Page = { __typename?: 'Page', pageInfo?: MangaExploreQuery_newReleases_Page_pageInfo_PageInfo | null, media?: Array<MangaExploreQuery_newReleases_Page_media_Media | null> | null };

export type MangaExploreQuery_trending_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type MangaExploreQuery_trending_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type MangaExploreQuery_trending_Page = { __typename?: 'Page', pageInfo?: MangaExploreQuery_trending_Page_pageInfo_PageInfo | null, media?: Array<MangaExploreQuery_trending_Page_media_Media | null> | null };

export type MangaExploreQuery_popular_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type MangaExploreQuery_popular_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type MangaExploreQuery_popular_Page = { __typename?: 'Page', pageInfo?: MangaExploreQuery_popular_Page_pageInfo_PageInfo | null, media?: Array<MangaExploreQuery_popular_Page_media_Media | null> | null };

export type MangaExploreQuery_top_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type MangaExploreQuery_top_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type MangaExploreQuery_top_Page = { __typename?: 'Page', pageInfo?: MangaExploreQuery_top_Page_pageInfo_PageInfo | null, media?: Array<MangaExploreQuery_top_Page_media_Media | null> | null };

export type MangaExploreQuery_Query = { __typename?: 'Query', Viewer?: MangaExploreQuery_Viewer_User | null, newReleases?: MangaExploreQuery_newReleases_Page | null, trending?: MangaExploreQuery_trending_Page | null, popular?: MangaExploreQuery_popular_Page | null, top?: MangaExploreQuery_top_Page | null };


export type MangaExploreQueryVariables = Exact<{
  includeViewer: Scalars['Boolean']['input'];
  perPage?: InputMaybe<Scalars['Int']['input']>;
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  tag_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type MangaExploreQuery = MangaExploreQuery_Query;

export type ManhwaExploreQuery_Viewer_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null };

export type ManhwaExploreQuery_Viewer_User = { __typename?: 'User', mediaListOptions?: ManhwaExploreQuery_Viewer_User_mediaListOptions_MediaListOptions | null };

export type ManhwaExploreQuery_newReleases_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type ManhwaExploreQuery_newReleases_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type ManhwaExploreQuery_newReleases_Page = { __typename?: 'Page', pageInfo?: ManhwaExploreQuery_newReleases_Page_pageInfo_PageInfo | null, media?: Array<ManhwaExploreQuery_newReleases_Page_media_Media | null> | null };

export type ManhwaExploreQuery_trending_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type ManhwaExploreQuery_trending_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type ManhwaExploreQuery_trending_Page = { __typename?: 'Page', pageInfo?: ManhwaExploreQuery_trending_Page_pageInfo_PageInfo | null, media?: Array<ManhwaExploreQuery_trending_Page_media_Media | null> | null };

export type ManhwaExploreQuery_popular_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type ManhwaExploreQuery_popular_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type ManhwaExploreQuery_popular_Page = { __typename?: 'Page', pageInfo?: ManhwaExploreQuery_popular_Page_pageInfo_PageInfo | null, media?: Array<ManhwaExploreQuery_popular_Page_media_Media | null> | null };

export type ManhwaExploreQuery_top_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type ManhwaExploreQuery_top_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type ManhwaExploreQuery_top_Page = { __typename?: 'Page', pageInfo?: ManhwaExploreQuery_top_Page_pageInfo_PageInfo | null, media?: Array<ManhwaExploreQuery_top_Page_media_Media | null> | null };

export type ManhwaExploreQuery_Query = { __typename?: 'Query', Viewer?: ManhwaExploreQuery_Viewer_User | null, newReleases?: ManhwaExploreQuery_newReleases_Page | null, trending?: ManhwaExploreQuery_trending_Page | null, popular?: ManhwaExploreQuery_popular_Page | null, top?: ManhwaExploreQuery_top_Page | null };


export type ManhwaExploreQueryVariables = Exact<{
  includeViewer: Scalars['Boolean']['input'];
  perPage?: InputMaybe<Scalars['Int']['input']>;
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  tag_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type ManhwaExploreQuery = ManhwaExploreQuery_Query;

export type ManhuaExploreQuery_Viewer_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null };

export type ManhuaExploreQuery_Viewer_User = { __typename?: 'User', mediaListOptions?: ManhuaExploreQuery_Viewer_User_mediaListOptions_MediaListOptions | null };

export type ManhuaExploreQuery_newReleases_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type ManhuaExploreQuery_newReleases_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type ManhuaExploreQuery_newReleases_Page = { __typename?: 'Page', pageInfo?: ManhuaExploreQuery_newReleases_Page_pageInfo_PageInfo | null, media?: Array<ManhuaExploreQuery_newReleases_Page_media_Media | null> | null };

export type ManhuaExploreQuery_trending_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type ManhuaExploreQuery_trending_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type ManhuaExploreQuery_trending_Page = { __typename?: 'Page', pageInfo?: ManhuaExploreQuery_trending_Page_pageInfo_PageInfo | null, media?: Array<ManhuaExploreQuery_trending_Page_media_Media | null> | null };

export type ManhuaExploreQuery_popular_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type ManhuaExploreQuery_popular_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type ManhuaExploreQuery_popular_Page = { __typename?: 'Page', pageInfo?: ManhuaExploreQuery_popular_Page_pageInfo_PageInfo | null, media?: Array<ManhuaExploreQuery_popular_Page_media_Media | null> | null };

export type ManhuaExploreQuery_top_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type ManhuaExploreQuery_top_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type ManhuaExploreQuery_top_Page = { __typename?: 'Page', pageInfo?: ManhuaExploreQuery_top_Page_pageInfo_PageInfo | null, media?: Array<ManhuaExploreQuery_top_Page_media_Media | null> | null };

export type ManhuaExploreQuery_Query = { __typename?: 'Query', Viewer?: ManhuaExploreQuery_Viewer_User | null, newReleases?: ManhuaExploreQuery_newReleases_Page | null, trending?: ManhuaExploreQuery_trending_Page | null, popular?: ManhuaExploreQuery_popular_Page | null, top?: ManhuaExploreQuery_top_Page | null };


export type ManhuaExploreQueryVariables = Exact<{
  includeViewer: Scalars['Boolean']['input'];
  perPage?: InputMaybe<Scalars['Int']['input']>;
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  tag_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type ManhuaExploreQuery = ManhuaExploreQuery_Query;

export type NovelExploreQuery_Viewer_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null };

export type NovelExploreQuery_Viewer_User = { __typename?: 'User', mediaListOptions?: NovelExploreQuery_Viewer_User_mediaListOptions_MediaListOptions | null };

export type NovelExploreQuery_newReleases_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type NovelExploreQuery_newReleases_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type NovelExploreQuery_newReleases_Page = { __typename?: 'Page', pageInfo?: NovelExploreQuery_newReleases_Page_pageInfo_PageInfo | null, media?: Array<NovelExploreQuery_newReleases_Page_media_Media | null> | null };

export type NovelExploreQuery_trending_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type NovelExploreQuery_trending_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type NovelExploreQuery_trending_Page = { __typename?: 'Page', pageInfo?: NovelExploreQuery_trending_Page_pageInfo_PageInfo | null, media?: Array<NovelExploreQuery_trending_Page_media_Media | null> | null };

export type NovelExploreQuery_popular_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type NovelExploreQuery_popular_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type NovelExploreQuery_popular_Page = { __typename?: 'Page', pageInfo?: NovelExploreQuery_popular_Page_pageInfo_PageInfo | null, media?: Array<NovelExploreQuery_popular_Page_media_Media | null> | null };

export type NovelExploreQuery_top_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type NovelExploreQuery_top_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type NovelExploreQuery_top_Page = { __typename?: 'Page', pageInfo?: NovelExploreQuery_top_Page_pageInfo_PageInfo | null, media?: Array<NovelExploreQuery_top_Page_media_Media | null> | null };

export type NovelExploreQuery_Query = { __typename?: 'Query', Viewer?: NovelExploreQuery_Viewer_User | null, newReleases?: NovelExploreQuery_newReleases_Page | null, trending?: NovelExploreQuery_trending_Page | null, popular?: NovelExploreQuery_popular_Page | null, top?: NovelExploreQuery_top_Page | null };


export type NovelExploreQueryVariables = Exact<{
  includeViewer: Scalars['Boolean']['input'];
  perPage?: InputMaybe<Scalars['Int']['input']>;
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  tag_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type NovelExploreQuery = NovelExploreQuery_Query;

export type RecommendationsQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', currentPage?: number | null, hasNextPage?: boolean | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_media_Media_title_MediaTitle = { __typename?: 'MediaTitle', userPreferred?: string | null, romaji?: string | null, native?: string | null, english?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_media_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', color?: string | null, extraLarge?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_media_Media_stats_MediaStats_scoreDistribution_ScoreDistribution = { __typename?: 'ScoreDistribution', score?: number | null, amount?: number | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_media_Media_stats_MediaStats = { __typename?: 'MediaStats', scoreDistribution?: Array<RecommendationsQuery_Page_Page_recommendations_Recommendation_media_Media_stats_MediaStats_scoreDistribution_ScoreDistribution | null> | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, type?: MediaType | null, bannerImage?: string | null, isAdult?: boolean | null, meanScore?: number | null, averageScore?: number | null, title?: RecommendationsQuery_Page_Page_recommendations_Recommendation_media_Media_title_MediaTitle | null, coverImage?: RecommendationsQuery_Page_Page_recommendations_Recommendation_media_Media_coverImage_MediaCoverImage | null, stats?: RecommendationsQuery_Page_Page_recommendations_Recommendation_media_Media_stats_MediaStats | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_mediaRecommendation_Media_title_MediaTitle = { __typename?: 'MediaTitle', userPreferred?: string | null, romaji?: string | null, native?: string | null, english?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_mediaRecommendation_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', color?: string | null, extraLarge?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_mediaRecommendation_Media_stats_MediaStats_scoreDistribution_ScoreDistribution = { __typename?: 'ScoreDistribution', score?: number | null, amount?: number | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_mediaRecommendation_Media_stats_MediaStats = { __typename?: 'MediaStats', scoreDistribution?: Array<RecommendationsQuery_Page_Page_recommendations_Recommendation_mediaRecommendation_Media_stats_MediaStats_scoreDistribution_ScoreDistribution | null> | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_mediaRecommendation_Media = { __typename?: 'Media', id: number, idMal?: number | null, type?: MediaType | null, bannerImage?: string | null, meanScore?: number | null, averageScore?: number | null, title?: RecommendationsQuery_Page_Page_recommendations_Recommendation_mediaRecommendation_Media_title_MediaTitle | null, coverImage?: RecommendationsQuery_Page_Page_recommendations_Recommendation_mediaRecommendation_Media_coverImage_MediaCoverImage | null, stats?: RecommendationsQuery_Page_Page_recommendations_Recommendation_mediaRecommendation_Media_stats_MediaStats | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_options_UserOptions = { __typename?: 'UserOptions', profileColor?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media_title_MediaTitle = { __typename?: 'MediaTitle', userPreferred?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', color?: string | null, extraLarge?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, siteUrl?: string | null, title?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media_title_MediaTitle | null, coverImage?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media_coverImage_MediaCoverImage | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_anime_MediaConnection = { __typename?: 'MediaConnection', nodes?: Array<RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media | null> | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media_title_MediaTitle = { __typename?: 'MediaTitle', userPreferred?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', color?: string | null, extraLarge?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, siteUrl?: string | null, title?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media_title_MediaTitle | null, coverImage?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media_coverImage_MediaCoverImage | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_manga_MediaConnection = { __typename?: 'MediaConnection', nodes?: Array<RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media | null> | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_name_CharacterName = { __typename?: 'CharacterName', userPreferred?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_image_CharacterImage = { __typename?: 'CharacterImage', large?: string | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character = { __typename?: 'Character', id: number, gender?: string | null, siteUrl?: string | null, name?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_name_CharacterName | null, image?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_image_CharacterImage | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_characters_CharacterConnection = { __typename?: 'CharacterConnection', nodes?: Array<RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character | null> | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites = { __typename?: 'Favourites', anime?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_anime_MediaConnection | null, manga?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_manga_MediaConnection | null, characters?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites_characters_CharacterConnection | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, about?: string | null, createdAt?: number | null, siteUrl?: string | null, options?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_options_UserOptions | null, avatar?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_avatar_UserAvatar | null, favourites?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User_favourites_Favourites | null };

export type RecommendationsQuery_Page_Page_recommendations_Recommendation = { __typename?: 'Recommendation', id: number, rating?: number | null, userRating?: RecommendationRating | null, media?: RecommendationsQuery_Page_Page_recommendations_Recommendation_media_Media | null, mediaRecommendation?: RecommendationsQuery_Page_Page_recommendations_Recommendation_mediaRecommendation_Media | null, user?: RecommendationsQuery_Page_Page_recommendations_Recommendation_user_User | null };

export type RecommendationsQuery_Page_Page = { __typename?: 'Page', pageInfo?: RecommendationsQuery_Page_Page_pageInfo_PageInfo | null, recommendations?: Array<RecommendationsQuery_Page_Page_recommendations_Recommendation | null> | null };

export type RecommendationsQuery_Query = { __typename?: 'Query', Page?: RecommendationsQuery_Page_Page | null };


export type RecommendationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<RecommendationSort>> | InputMaybe<RecommendationSort>>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type RecommendationsQuery = RecommendationsQuery_Query;

export type StudioListQuery_Studio_Studio_media_MediaConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type StudioListQuery_Studio_Studio_media_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type StudioListQuery_Studio_Studio_media_MediaConnection = { __typename?: 'MediaConnection', pageInfo?: StudioListQuery_Studio_Studio_media_MediaConnection_pageInfo_PageInfo | null, nodes?: Array<StudioListQuery_Studio_Studio_media_MediaConnection_nodes_Media | null> | null };

export type StudioListQuery_Studio_Studio = { __typename?: 'Studio', id: number, name: string, isAnimationStudio: boolean, siteUrl?: string | null, isFavourite: boolean, media?: StudioListQuery_Studio_Studio_media_MediaConnection | null };

export type StudioListQuery_Query = { __typename?: 'Query', Studio?: StudioListQuery_Studio_Studio | null };


export type StudioListQueryVariables = Exact<{
  studioId?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StudioListQuery = StudioListQuery_Query;

export type MediaListEntryFragment_MediaList_startedAt_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type MediaListEntryFragment_MediaList_completedAt_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type MediaListEntryFragment_MediaList_media_Media_tags_MediaTag = { __typename?: 'MediaTag', id: number, name: string, description?: string | null, isAdult?: boolean | null, isMediaSpoiler?: boolean | null, isGeneralSpoiler?: boolean | null, category?: string | null };

export type MediaListEntryFragment_MediaList_media_Media = { __typename?: 'Media', synonyms?: Array<string | null> | null, id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, tags?: Array<MediaListEntryFragment_MediaList_media_Media_tags_MediaTag | null> | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type MediaListEntryFragment = { __typename?: 'MediaList', id: number, mediaId: number, status?: MediaListStatus | null, score?: number | null, progress?: number | null, progressVolumes?: number | null, repeat?: number | null, priority?: number | null, private?: boolean | null, hiddenFromStatusLists?: boolean | null, customLists?: any | null, advancedScores?: any | null, createdAt?: number | null, notes?: string | null, updatedAt?: number | null, startedAt?: MediaListEntryFragment_MediaList_startedAt_FuzzyDate | null, completedAt?: MediaListEntryFragment_MediaList_completedAt_FuzzyDate | null, media?: MediaListEntryFragment_MediaList_media_Media | null };

export type UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList = { __typename?: 'MediaList', id: number, mediaId: number, status?: MediaListStatus | null, score?: number | null, progress?: number | null, progressVolumes?: number | null, repeat?: number | null, priority?: number | null, private?: boolean | null, hiddenFromStatusLists?: boolean | null, customLists?: any | null, advancedScores?: any | null, createdAt?: number | null, notes?: string | null, updatedAt?: number | null, startedAt?: MediaListEntryFragment_MediaList_startedAt_FuzzyDate | null, completedAt?: MediaListEntryFragment_MediaList_completedAt_FuzzyDate | null, media?: MediaListEntryFragment_MediaList_media_Media | null };

export type UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup = { __typename?: 'MediaListGroup', name?: string | null, isCustomList?: boolean | null, isSplitCompletedList?: boolean | null, entries?: Array<UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList | null> | null };

export type UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes_anime_UserStatistics = { __typename?: 'UserStatistics', count: number };

export type UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes_manga_UserStatistics = { __typename?: 'UserStatistics', count: number };

export type UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes = { __typename?: 'UserStatisticTypes', anime?: UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes_anime_UserStatistics | null, manga?: UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes_manga_UserStatistics | null };

export type UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_user_User = { __typename?: 'User', statistics?: UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes | null };

export type UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection = { __typename?: 'MediaListCollection', lists?: Array<UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup | null> | null, user?: UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection_user_User | null };

export type UserAnimeListCollectionQuery_Query = { __typename?: 'Query', MediaListCollection?: UserAnimeListCollectionQuery_MediaListCollection_MediaListCollection | null };


export type UserAnimeListCollectionQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaListSort>> | InputMaybe<MediaListSort>>;
}>;


export type UserAnimeListCollectionQuery = UserAnimeListCollectionQuery_Query;

export type UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList = { __typename?: 'MediaList', id: number, mediaId: number, status?: MediaListStatus | null, score?: number | null, progress?: number | null, progressVolumes?: number | null, repeat?: number | null, priority?: number | null, private?: boolean | null, hiddenFromStatusLists?: boolean | null, customLists?: any | null, advancedScores?: any | null, createdAt?: number | null, notes?: string | null, updatedAt?: number | null, startedAt?: MediaListEntryFragment_MediaList_startedAt_FuzzyDate | null, completedAt?: MediaListEntryFragment_MediaList_completedAt_FuzzyDate | null, media?: MediaListEntryFragment_MediaList_media_Media | null };

export type UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup = { __typename?: 'MediaListGroup', name?: string | null, isCustomList?: boolean | null, isSplitCompletedList?: boolean | null, entries?: Array<UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup_entries_MediaList | null> | null };

export type UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes_anime_UserStatistics = { __typename?: 'UserStatistics', count: number };

export type UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes_manga_UserStatistics = { __typename?: 'UserStatistics', count: number };

export type UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes = { __typename?: 'UserStatisticTypes', anime?: UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes_anime_UserStatistics | null, manga?: UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes_manga_UserStatistics | null };

export type UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_user_User = { __typename?: 'User', statistics?: UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_user_User_statistics_UserStatisticTypes | null };

export type UserMangaListCollectionQuery_MediaListCollection_MediaListCollection = { __typename?: 'MediaListCollection', lists?: Array<UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_lists_MediaListGroup | null> | null, user?: UserMangaListCollectionQuery_MediaListCollection_MediaListCollection_user_User | null };

export type UserMangaListCollectionQuery_Query = { __typename?: 'Query', MediaListCollection?: UserMangaListCollectionQuery_MediaListCollection_MediaListCollection | null };


export type UserMangaListCollectionQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaListSort>> | InputMaybe<MediaListSort>>;
}>;


export type UserMangaListCollectionQuery = UserMangaListCollectionQuery_Query;

export type UserCustomListsQuery_MediaListCollection_MediaListCollection_user_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null };

export type UserCustomListsQuery_MediaListCollection_MediaListCollection_user_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null };

export type UserCustomListsQuery_MediaListCollection_MediaListCollection_user_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', animeList?: UserCustomListsQuery_MediaListCollection_MediaListCollection_user_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions | null, mangaList?: UserCustomListsQuery_MediaListCollection_MediaListCollection_user_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions | null };

export type UserCustomListsQuery_MediaListCollection_MediaListCollection_user_User = { __typename?: 'User', mediaListOptions?: UserCustomListsQuery_MediaListCollection_MediaListCollection_user_User_mediaListOptions_MediaListOptions | null };

export type UserCustomListsQuery_MediaListCollection_MediaListCollection = { __typename?: 'MediaListCollection', user?: UserCustomListsQuery_MediaListCollection_MediaListCollection_user_User | null };

export type UserCustomListsQuery_Query = { __typename?: 'Query', MediaListCollection?: UserCustomListsQuery_MediaListCollection_MediaListCollection | null };


export type UserCustomListsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MediaType>;
}>;


export type UserCustomListsQuery = UserCustomListsQuery_Query;

export type RandomMediaQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null };

export type RandomMediaQuery_Page_Page_media_Media_tags_MediaTag = { __typename?: 'MediaTag', id: number, name: string, description?: string | null, rank?: number | null, category?: string | null, isAdult?: boolean | null, isGeneralSpoiler?: boolean | null, isMediaSpoiler?: boolean | null };

export type RandomMediaQuery_Page_Page_media_Media_title_MediaTitle = { __typename?: 'MediaTitle', userPreferred?: string | null, romaji?: string | null, native?: string | null, english?: string | null };

export type RandomMediaQuery_Page_Page_media_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', extraLarge?: string | null };

export type RandomMediaQuery_Page_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, type?: MediaType | null, format?: MediaFormat | null, isAdult?: boolean | null, genres?: Array<string | null> | null, description?: string | null, status?: MediaStatus | null, bannerImage?: string | null, meanScore?: number | null, averageScore?: number | null, tags?: Array<RandomMediaQuery_Page_Page_media_Media_tags_MediaTag | null> | null, title?: RandomMediaQuery_Page_Page_media_Media_title_MediaTitle | null, coverImage?: RandomMediaQuery_Page_Page_media_Media_coverImage_MediaCoverImage | null };

export type RandomMediaQuery_Page_Page = { __typename?: 'Page', pageInfo?: RandomMediaQuery_Page_Page_pageInfo_PageInfo | null, media?: Array<RandomMediaQuery_Page_Page_media_Media | null> | null };

export type RandomMediaQuery_Query = { __typename?: 'Query', Page?: RandomMediaQuery_Page_Page | null };


export type RandomMediaQueryVariables = Exact<{
  random?: InputMaybe<Scalars['Int']['input']>;
  perRandom?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<MediaType>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type RandomMediaQuery = RandomMediaQuery_Query;

export type AniMediaQuery_User_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null };

export type AniMediaQuery_User_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null };

export type AniMediaQuery_User_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null, animeList?: AniMediaQuery_User_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions | null, mangaList?: AniMediaQuery_User_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions | null };

export type AniMediaQuery_User_User = { __typename?: 'User', mediaListOptions?: AniMediaQuery_User_User_mediaListOptions_MediaListOptions | null };

export type AniMediaQuery_Following_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type AniMediaQuery_Following_Page_mediaList_MediaList_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type AniMediaQuery_Following_Page_mediaList_MediaList_user_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null };

export type AniMediaQuery_Following_Page_mediaList_MediaList_user_User = { __typename?: 'User', id: number, name: string, isFollowing?: boolean | null, isFollower?: boolean | null, createdAt?: number | null, siteUrl?: string | null, aboutHTML?: string | null, avatar?: AniMediaQuery_Following_Page_mediaList_MediaList_user_User_avatar_UserAvatar | null, mediaListOptions?: AniMediaQuery_Following_Page_mediaList_MediaList_user_User_mediaListOptions_MediaListOptions | null };

export type AniMediaQuery_Following_Page_mediaList_MediaList = { __typename?: 'MediaList', id: number, status?: MediaListStatus | null, score?: number | null, progress?: number | null, user?: AniMediaQuery_Following_Page_mediaList_MediaList_user_User | null };

export type AniMediaQuery_Following_Page = { __typename?: 'Page', pageInfo?: AniMediaQuery_Following_Page_pageInfo_PageInfo | null, mediaList?: Array<AniMediaQuery_Following_Page_mediaList_MediaList | null> | null };

export type AniMediaQuery_Media_Media_title_MediaTitle = { __typename?: 'MediaTitle', romaji?: string | null, english?: string | null, native?: string | null, userPreferred?: string | null };

export type AniMediaQuery_Media_Media_startDate_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type AniMediaQuery_Media_Media_endDate_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type AniMediaQuery_Media_Media_tags_MediaTag = { __typename?: 'MediaTag', id: number, name: string, description?: string | null, rank?: number | null, category?: string | null, isAdult?: boolean | null, isGeneralSpoiler?: boolean | null, isMediaSpoiler?: boolean | null, userId?: number | null };

export type AniMediaQuery_Media_Media_trailer_MediaTrailer = { __typename?: 'MediaTrailer', id?: string | null, site?: string | null, thumbnail?: string | null };

export type AniMediaQuery_Media_Media_stats_MediaStats_statusDistribution_StatusDistribution = { __typename?: 'StatusDistribution', status?: MediaListStatus | null, amount?: number | null };

export type AniMediaQuery_Media_Media_stats_MediaStats_scoreDistribution_ScoreDistribution = { __typename?: 'ScoreDistribution', score?: number | null, amount?: number | null };

export type AniMediaQuery_Media_Media_stats_MediaStats = { __typename?: 'MediaStats', statusDistribution?: Array<AniMediaQuery_Media_Media_stats_MediaStats_statusDistribution_StatusDistribution | null> | null, scoreDistribution?: Array<AniMediaQuery_Media_Media_stats_MediaStats_scoreDistribution_ScoreDistribution | null> | null };

export type AniMediaQuery_Media_Media_relations_MediaConnection_edges_MediaEdge_node_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type AniMediaQuery_Media_Media_relations_MediaConnection_edges_MediaEdge = { __typename?: 'MediaEdge', id?: number | null, relationType?: MediaRelation | null, node?: AniMediaQuery_Media_Media_relations_MediaConnection_edges_MediaEdge_node_Media | null };

export type AniMediaQuery_Media_Media_relations_MediaConnection = { __typename?: 'MediaConnection', edges?: Array<AniMediaQuery_Media_Media_relations_MediaConnection_edges_MediaEdge | null> | null };

export type AniMediaQuery_Media_Media_externalLinks_MediaExternalLink = { __typename?: 'MediaExternalLink', id: number, site: string, url?: string | null, color?: string | null, icon?: string | null, notes?: string | null, type?: ExternalLinkType | null, language?: string | null };

export type AniMediaQuery_Media_Media_rankings_MediaRank = { __typename?: 'MediaRank', id: number, rank: number, type: MediaRankType, format: MediaFormat, year?: number | null, season?: MediaSeason | null, allTime?: boolean | null, context: string };

export type AniMediaQuery_Media_Media_streamingEpisodes_MediaStreamingEpisode = { __typename?: 'MediaStreamingEpisode', title?: string | null, thumbnail?: string | null, url?: string | null, site?: string | null };

export type AniMediaQuery_Media_Media_nextAiringEpisode_AiringSchedule = { __typename?: 'AiringSchedule', id: number, airingAt: number, timeUntilAiring: number, episode: number, mediaId: number };

export type AniMediaQuery_Media_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', color?: string | null, extraLarge?: string | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, hasNextPage?: boolean | null, currentPage?: number | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff_name_StaffName = { __typename?: 'StaffName', full?: string | null, userPreferred?: string | null, native?: string | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff_image_StaffImage = { __typename?: 'StaffImage', large?: string | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff = { __typename?: 'Staff', id: number, language?: string | null, name?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff_name_StaffName | null, image?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff_image_StaffImage | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType = { __typename?: 'StaffRoleType', voiceActor?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_dateOfBirth_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_name_CharacterName = { __typename?: 'CharacterName', full?: string | null, native?: string | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_image_CharacterImage = { __typename?: 'CharacterImage', large?: string | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character = { __typename?: 'Character', id: number, isFavourite: boolean, gender?: string | null, description?: string | null, favourites?: number | null, siteUrl?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_name_CharacterName | null, image?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_image_CharacterImage | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge = { __typename?: 'CharacterEdge', id?: number | null, role?: CharacterRole | null, voiceActorRoles?: Array<AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType | null> | null, node?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character | null };

export type AniMediaQuery_Media_Media_characters_CharacterConnection = { __typename?: 'CharacterConnection', pageInfo?: AniMediaQuery_Media_Media_characters_CharacterConnection_pageInfo_PageInfo | null, edges?: Array<AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge | null> | null };

export type AniMediaQuery_Media_Media_recommendations_RecommendationConnection_edges_RecommendationEdge_node_Recommendation_mediaRecommendation_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type AniMediaQuery_Media_Media_recommendations_RecommendationConnection_edges_RecommendationEdge_node_Recommendation = { __typename?: 'Recommendation', id: number, rating?: number | null, userRating?: RecommendationRating | null, mediaRecommendation?: AniMediaQuery_Media_Media_recommendations_RecommendationConnection_edges_RecommendationEdge_node_Recommendation_mediaRecommendation_Media | null };

export type AniMediaQuery_Media_Media_recommendations_RecommendationConnection_edges_RecommendationEdge = { __typename?: 'RecommendationEdge', node?: AniMediaQuery_Media_Media_recommendations_RecommendationConnection_edges_RecommendationEdge_node_Recommendation | null };

export type AniMediaQuery_Media_Media_recommendations_RecommendationConnection = { __typename?: 'RecommendationConnection', edges?: Array<AniMediaQuery_Media_Media_recommendations_RecommendationConnection_edges_RecommendationEdge | null> | null };

export type AniMediaQuery_Media_Media_mediaListEntry_MediaList = { __typename?: 'MediaList', id: number, mediaId: number, status?: MediaListStatus | null, score?: number | null, advancedScores?: any | null, progress?: number | null, progressVolumes?: number | null, repeat?: number | null, notes?: string | null, private?: boolean | null, hiddenFromStatusLists?: boolean | null, customLists?: any | null, updatedAt?: number | null, createdAt?: number | null, startedAt?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_startedAt_FuzzyDate | null, completedAt?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_completedAt_FuzzyDate | null, user?: SaveMediaListItemMutation_SaveMediaListEntry_MediaList_user_User | null };

export type AniMediaQuery_Media_Media_staff_StaffConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, hasNextPage?: boolean | null, currentPage?: number | null };

export type AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_dateOfBirth_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_name_StaffName = { __typename?: 'StaffName', full?: string | null, native?: string | null };

export type AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_image_StaffImage = { __typename?: 'StaffImage', large?: string | null };

export type AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff = { __typename?: 'Staff', id: number, isFavourite: boolean, description?: string | null, gender?: string | null, favourites?: number | null, siteUrl?: string | null, language?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_name_StaffName | null, image?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_image_StaffImage | null };

export type AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge = { __typename?: 'StaffEdge', role?: string | null, node?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff | null };

export type AniMediaQuery_Media_Media_staff_StaffConnection = { __typename?: 'StaffConnection', pageInfo?: AniMediaQuery_Media_Media_staff_StaffConnection_pageInfo_PageInfo | null, edges?: Array<AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge | null> | null };

export type AniMediaQuery_Media_Media_reviews_ReviewConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review_user_User_avatar_UserAvatar | null };

export type AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review = { __typename?: 'Review', id: number, summary?: string | null, rating?: number | null, ratingAmount?: number | null, userRating?: ReviewRating | null, score?: number | null, siteUrl?: string | null, createdAt: number, updatedAt: number, user?: AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review_user_User | null };

export type AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge = { __typename?: 'ReviewEdge', node?: AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge_node_Review | null };

export type AniMediaQuery_Media_Media_reviews_ReviewConnection = { __typename?: 'ReviewConnection', pageInfo?: AniMediaQuery_Media_Media_reviews_ReviewConnection_pageInfo_PageInfo | null, edges?: Array<AniMediaQuery_Media_Media_reviews_ReviewConnection_edges_ReviewEdge | null> | null };

export type AniMediaQuery_Media_Media_studios_StudioConnection_edges_StudioEdge_node_Studio = { __typename?: 'Studio', id: number, name: string, isFavourite: boolean };

export type AniMediaQuery_Media_Media_studios_StudioConnection_edges_StudioEdge = { __typename?: 'StudioEdge', isMain: boolean, node?: AniMediaQuery_Media_Media_studios_StudioConnection_edges_StudioEdge_node_Studio | null };

export type AniMediaQuery_Media_Media_studios_StudioConnection = { __typename?: 'StudioConnection', edges?: Array<AniMediaQuery_Media_Media_studios_StudioConnection_edges_StudioEdge | null> | null };

export type AniMediaQuery_Media_Media_airingSchedule_AiringScheduleConnection_nodes_AiringSchedule = { __typename?: 'AiringSchedule', id: number, airingAt: number, timeUntilAiring: number, episode: number };

export type AniMediaQuery_Media_Media_airingSchedule_AiringScheduleConnection = { __typename?: 'AiringScheduleConnection', nodes?: Array<AniMediaQuery_Media_Media_airingSchedule_AiringScheduleConnection_nodes_AiringSchedule | null> | null };

export type AniMediaQuery_Media_Media = { __typename?: 'Media', averageScore?: number | null, meanScore?: number | null, source?: MediaSource | null, idMal?: number | null, id: number, bannerImage?: string | null, description?: string | null, siteUrl?: string | null, updatedAt?: number | null, season?: MediaSeason | null, seasonYear?: number | null, type?: MediaType | null, format?: MediaFormat | null, status?: MediaStatus | null, episodes?: number | null, duration?: number | null, chapters?: number | null, volumes?: number | null, isAdult?: boolean | null, genres?: Array<string | null> | null, countryOfOrigin?: any | null, isLicensed?: boolean | null, hashtag?: string | null, synonyms?: Array<string | null> | null, popularity?: number | null, isLocked?: boolean | null, trending?: number | null, favourites?: number | null, isFavourite: boolean, descriptionHTML?: string | null, title?: AniMediaQuery_Media_Media_title_MediaTitle | null, startDate?: AniMediaQuery_Media_Media_startDate_FuzzyDate | null, endDate?: AniMediaQuery_Media_Media_endDate_FuzzyDate | null, tags?: Array<AniMediaQuery_Media_Media_tags_MediaTag | null> | null, trailer?: AniMediaQuery_Media_Media_trailer_MediaTrailer | null, stats?: AniMediaQuery_Media_Media_stats_MediaStats | null, relations?: AniMediaQuery_Media_Media_relations_MediaConnection | null, externalLinks?: Array<AniMediaQuery_Media_Media_externalLinks_MediaExternalLink | null> | null, rankings?: Array<AniMediaQuery_Media_Media_rankings_MediaRank | null> | null, streamingEpisodes?: Array<AniMediaQuery_Media_Media_streamingEpisodes_MediaStreamingEpisode | null> | null, nextAiringEpisode?: AniMediaQuery_Media_Media_nextAiringEpisode_AiringSchedule | null, coverImage?: AniMediaQuery_Media_Media_coverImage_MediaCoverImage | null, characters?: AniMediaQuery_Media_Media_characters_CharacterConnection | null, recommendations?: AniMediaQuery_Media_Media_recommendations_RecommendationConnection | null, mediaListEntry?: AniMediaQuery_Media_Media_mediaListEntry_MediaList | null, staff?: AniMediaQuery_Media_Media_staff_StaffConnection | null, reviews?: AniMediaQuery_Media_Media_reviews_ReviewConnection | null, studios?: AniMediaQuery_Media_Media_studios_StudioConnection | null, airingSchedule?: AniMediaQuery_Media_Media_airingSchedule_AiringScheduleConnection | null };

export type AniMediaQuery_Query = { __typename?: 'Query', User?: AniMediaQuery_User_User | null, Following?: AniMediaQuery_Following_Page | null, Media?: AniMediaQuery_Media_Media | null };


export type AniMediaQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  sort_c?: InputMaybe<Array<InputMaybe<CharacterSort>> | InputMaybe<CharacterSort>>;
  role_c?: InputMaybe<CharacterRole>;
  page_c?: InputMaybe<Scalars['Int']['input']>;
  perPage_c?: InputMaybe<Scalars['Int']['input']>;
  page_rec?: InputMaybe<Scalars['Int']['input']>;
  perPage_rec?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  skipUser: Scalars['Boolean']['input'];
}>;


export type AniMediaQuery = AniMediaQuery_Query;

export type MediaFollowingQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type MediaFollowingQuery_Page_Page_mediaList_MediaList_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type MediaFollowingQuery_Page_Page_mediaList_MediaList_user_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null };

export type MediaFollowingQuery_Page_Page_mediaList_MediaList_user_User = { __typename?: 'User', id: number, name: string, avatar?: MediaFollowingQuery_Page_Page_mediaList_MediaList_user_User_avatar_UserAvatar | null, mediaListOptions?: MediaFollowingQuery_Page_Page_mediaList_MediaList_user_User_mediaListOptions_MediaListOptions | null };

export type MediaFollowingQuery_Page_Page_mediaList_MediaList = { __typename?: 'MediaList', id: number, status?: MediaListStatus | null, score?: number | null, progress?: number | null, user?: MediaFollowingQuery_Page_Page_mediaList_MediaList_user_User | null };

export type MediaFollowingQuery_Page_Page = { __typename?: 'Page', pageInfo?: MediaFollowingQuery_Page_Page_pageInfo_PageInfo | null, mediaList?: Array<MediaFollowingQuery_Page_Page_mediaList_MediaList | null> | null };

export type MediaFollowingQuery_Query = { __typename?: 'Query', Page?: MediaFollowingQuery_Page_Page | null };


export type MediaFollowingQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MediaFollowingQuery = MediaFollowingQuery_Query;

export type CharacterListQuery_Media_Media_characters_CharacterConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff_name_StaffName = { __typename?: 'StaffName', native?: string | null, full?: string | null };

export type CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff_image_StaffImage = { __typename?: 'StaffImage', large?: string | null };

export type CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff = { __typename?: 'Staff', id: number, isFavourite: boolean, favourites?: number | null, languageV2?: string | null, name?: CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff_name_StaffName | null, image?: CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff_image_StaffImage | null };

export type CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType = { __typename?: 'StaffRoleType', roleNotes?: string | null, voiceActor?: CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff | null };

export type CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character = { __typename?: 'Character', id: number, isFavourite: boolean, gender?: string | null, description?: string | null, favourites?: number | null, siteUrl?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_name_CharacterName | null, image?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_image_CharacterImage | null };

export type CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge = { __typename?: 'CharacterEdge', id?: number | null, role?: CharacterRole | null, voiceActorRoles?: Array<CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_voiceActorRoles_StaffRoleType | null> | null, node?: CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character | null };

export type CharacterListQuery_Media_Media_characters_CharacterConnection = { __typename?: 'CharacterConnection', pageInfo?: CharacterListQuery_Media_Media_characters_CharacterConnection_pageInfo_PageInfo | null, edges?: Array<CharacterListQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge | null> | null };

export type CharacterListQuery_Media_Media = { __typename?: 'Media', id: number, characters?: CharacterListQuery_Media_Media_characters_CharacterConnection | null };

export type CharacterListQuery_Query = { __typename?: 'Query', Media?: CharacterListQuery_Media_Media | null };


export type CharacterListQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CharacterSort>> | InputMaybe<CharacterSort>>;
}>;


export type CharacterListQuery = CharacterListQuery_Query;

export type CharacterDetailsQuery_Character_Character_name_CharacterName = { __typename?: 'CharacterName', full?: string | null, first?: string | null, last?: string | null, native?: string | null, alternative?: Array<string | null> | null };

export type CharacterDetailsQuery_Character_Character_image_CharacterImage = { __typename?: 'CharacterImage', large?: string | null };

export type CharacterDetailsQuery_Character_Character_dateOfBirth_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff = { __typename?: 'Staff', id: number, isFavourite: boolean, description?: string | null, gender?: string | null, favourites?: number | null, siteUrl?: string | null, language?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_name_StaffName | null, image?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_image_StaffImage | null };

export type CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_voiceActorRoles_StaffRoleType = { __typename?: 'StaffRoleType', roleNotes?: string | null, voiceActor?: CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_voiceActorRoles_StaffRoleType_voiceActor_Staff | null };

export type CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_node_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge = { __typename?: 'MediaEdge', characterRole?: CharacterRole | null, voiceActorRoles?: Array<CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_voiceActorRoles_StaffRoleType | null> | null, node?: CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge_node_Media | null };

export type CharacterDetailsQuery_Character_Character_media_MediaConnection = { __typename?: 'MediaConnection', edges?: Array<CharacterDetailsQuery_Character_Character_media_MediaConnection_edges_MediaEdge | null> | null };

export type CharacterDetailsQuery_Character_Character = { __typename?: 'Character', description?: string | null, gender?: string | null, age?: string | null, bloodType?: string | null, isFavourite: boolean, siteUrl?: string | null, favourites?: number | null, name?: CharacterDetailsQuery_Character_Character_name_CharacterName | null, image?: CharacterDetailsQuery_Character_Character_image_CharacterImage | null, dateOfBirth?: CharacterDetailsQuery_Character_Character_dateOfBirth_FuzzyDate | null, media?: CharacterDetailsQuery_Character_Character_media_MediaConnection | null };

export type CharacterDetailsQuery_Query = { __typename?: 'Query', Character?: CharacterDetailsQuery_Character_Character | null };


export type CharacterDetailsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<MediaSort>> | InputMaybe<MediaSort>>;
}>;


export type CharacterDetailsQuery = CharacterDetailsQuery_Query;

export type StaffListQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff = { __typename?: 'Staff', id: number, isFavourite: boolean, description?: string | null, gender?: string | null, favourites?: number | null, siteUrl?: string | null, language?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_name_StaffName | null, image?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_image_StaffImage | null };

export type StaffListQuery_Media_Media_staff_StaffConnection_edges_StaffEdge = { __typename?: 'StaffEdge', role?: string | null, node?: StaffListQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff | null };

export type StaffListQuery_Media_Media_staff_StaffConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, perPage?: number | null, lastPage?: number | null };

export type StaffListQuery_Media_Media_staff_StaffConnection = { __typename?: 'StaffConnection', edges?: Array<StaffListQuery_Media_Media_staff_StaffConnection_edges_StaffEdge | null> | null, pageInfo?: StaffListQuery_Media_Media_staff_StaffConnection_pageInfo_PageInfo | null };

export type StaffListQuery_Media_Media = { __typename?: 'Media', id: number, staff?: StaffListQuery_Media_Media_staff_StaffConnection | null };

export type StaffListQuery_Query = { __typename?: 'Query', Media?: StaffListQuery_Media_Media | null };


export type StaffListQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StaffListQuery = StaffListQuery_Query;

export type StaffDetailsQuery_Staff_Staff_name_StaffName = { __typename?: 'StaffName', full?: string | null, native?: string | null, alternative?: Array<string | null> | null };

export type StaffDetailsQuery_Staff_Staff_image_StaffImage = { __typename?: 'StaffImage', large?: string | null };

export type StaffDetailsQuery_Staff_Staff_dateOfBirth_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type StaffDetailsQuery_Staff_Staff_dateOfDeath_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection_edges_MediaEdge_node_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection_edges_MediaEdge = { __typename?: 'MediaEdge', staffRole?: string | null, node?: StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection_edges_MediaEdge_node_Media | null };

export type StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection = { __typename?: 'MediaConnection', pageInfo?: StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection_pageInfo_PageInfo | null, edges?: Array<StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection_edges_MediaEdge | null> | null };

export type StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_edges_CharacterEdge_node_Character_name_CharacterName = { __typename?: 'CharacterName', full?: string | null, native?: string | null };

export type StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_edges_CharacterEdge_node_Character_image_CharacterImage = { __typename?: 'CharacterImage', large?: string | null };

export type StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_edges_CharacterEdge_node_Character = { __typename?: 'Character', id: number, favourites?: number | null, isFavourite: boolean, name?: StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_edges_CharacterEdge_node_Character_name_CharacterName | null, image?: StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_edges_CharacterEdge_node_Character_image_CharacterImage | null };

export type StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_edges_CharacterEdge = { __typename?: 'CharacterEdge', role?: CharacterRole | null, node?: StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_edges_CharacterEdge_node_Character | null };

export type StaffDetailsQuery_Staff_Staff_characters_CharacterConnection = { __typename?: 'CharacterConnection', pageInfo?: StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_pageInfo_PageInfo | null, edges?: Array<StaffDetailsQuery_Staff_Staff_characters_CharacterConnection_edges_CharacterEdge | null> | null };

export type StaffDetailsQuery_Staff_Staff = { __typename?: 'Staff', languageV2?: string | null, description?: string | null, primaryOccupations?: Array<string | null> | null, gender?: string | null, age?: number | null, yearsActive?: Array<number | null> | null, homeTown?: string | null, bloodType?: string | null, isFavourite: boolean, siteUrl?: string | null, favourites?: number | null, modNotes?: string | null, name?: StaffDetailsQuery_Staff_Staff_name_StaffName | null, image?: StaffDetailsQuery_Staff_Staff_image_StaffImage | null, dateOfBirth?: StaffDetailsQuery_Staff_Staff_dateOfBirth_FuzzyDate | null, dateOfDeath?: StaffDetailsQuery_Staff_Staff_dateOfDeath_FuzzyDate | null, staffMedia?: StaffDetailsQuery_Staff_Staff_staffMedia_MediaConnection | null, characters?: StaffDetailsQuery_Staff_Staff_characters_CharacterConnection | null };

export type StaffDetailsQuery_Query = { __typename?: 'Query', Staff?: StaffDetailsQuery_Staff_Staff | null };


export type StaffDetailsQueryVariables = Exact<{
  staff_media_page?: InputMaybe<Scalars['Int']['input']>;
  staff_media_perPage?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  char_page?: InputMaybe<Scalars['Int']['input']>;
  char_perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StaffDetailsQuery = StaffDetailsQuery_Query;

export type GetNotificationsQuery_Viewer_User = { __typename?: 'User', id: number, unreadNotificationCount?: number | null };

export type GetNotificationsQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_activity_ListActivity = { __typename: 'ListActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_activity_MessageActivity = { __typename: 'MessageActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_activity_TextActivity = { __typename: 'TextActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_activity = GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_activity_ListActivity | GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_activity_MessageActivity | GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_activity_TextActivity;

export type GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification_activity_ListActivity = { __typename: 'ListActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification_activity_MessageActivity = { __typename: 'MessageActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification_activity_TextActivity = { __typename: 'TextActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification_activity = GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification_activity_ListActivity | GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification_activity_MessageActivity | GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification_activity_TextActivity;

export type GetNotificationsQuery_Page_Page_notifications_ActivityMessageNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityMessageNotification_message_MessageActivity = { __typename?: 'MessageActivity', siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification_activity_ListActivity = { __typename: 'ListActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification_activity_MessageActivity = { __typename: 'MessageActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification_activity_TextActivity = { __typename: 'TextActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification_activity = GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification_activity_ListActivity | GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification_activity_MessageActivity | GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification_activity_TextActivity;

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification_activity_ListActivity = { __typename: 'ListActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification_activity_MessageActivity = { __typename: 'MessageActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification_activity_TextActivity = { __typename: 'TextActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification_activity = GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification_activity_ListActivity | GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification_activity_MessageActivity | GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification_activity_TextActivity;

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification_activity_ListActivity = { __typename: 'ListActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification_activity_MessageActivity = { __typename: 'MessageActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification_activity_TextActivity = { __typename: 'TextActivity', id: number, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification_activity = GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification_activity_ListActivity | GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification_activity_MessageActivity | GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification_activity_TextActivity;

export type GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_title_MediaTitle = { __typename?: 'MediaTitle', userPreferred?: string | null, native?: string | null, romaji?: string | null, english?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_mediaListEntry_MediaList = { __typename?: 'MediaList', status?: MediaListStatus | null };

export type GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', extraLarge?: string | null, large?: string | null, color?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media = { __typename?: 'Media', id: number, type?: MediaType | null, format?: MediaFormat | null, status?: MediaStatus | null, idMal?: number | null, bannerImage?: string | null, siteUrl?: string | null, title?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_title_MediaTitle | null, mediaListEntry?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_mediaListEntry_MediaList | null, coverImage?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_coverImage_MediaCoverImage | null };

export type GetNotificationsQuery_Page_Page_notifications_FollowingNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_MediaDataChangeNotification_media_Media = { __typename?: 'Media', id: number, type?: MediaType | null, format?: MediaFormat | null, status?: MediaStatus | null, idMal?: number | null, bannerImage?: string | null, siteUrl?: string | null, title?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_title_MediaTitle | null, mediaListEntry?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_mediaListEntry_MediaList | null, coverImage?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_coverImage_MediaCoverImage | null };

export type GetNotificationsQuery_Page_Page_notifications_MediaMergeNotification_media_Media = { __typename?: 'Media', id: number, type?: MediaType | null, format?: MediaFormat | null, status?: MediaStatus | null, idMal?: number | null, bannerImage?: string | null, siteUrl?: string | null, title?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_title_MediaTitle | null, mediaListEntry?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_mediaListEntry_MediaList | null, coverImage?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_coverImage_MediaCoverImage | null };

export type GetNotificationsQuery_Page_Page_notifications_RelatedMediaAdditionNotification_media_Media = { __typename?: 'Media', id: number, type?: MediaType | null, format?: MediaFormat | null, status?: MediaStatus | null, idMal?: number | null, bannerImage?: string | null, siteUrl?: string | null, title?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_title_MediaTitle | null, mediaListEntry?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_mediaListEntry_MediaList | null, coverImage?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_coverImage_MediaCoverImage | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentLikeNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentLikeNotification_thread_Thread = { __typename?: 'Thread', id: number, title?: string | null, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentLikeNotification_comment_ThreadComment = { __typename?: 'ThreadComment', comment?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentMentionNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentMentionNotification_thread_Thread = { __typename?: 'Thread', id: number, title?: string | null, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentMentionNotification_comment_ThreadComment = { __typename?: 'ThreadComment', comment?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentReplyNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentReplyNotification_thread_Thread = { __typename?: 'Thread', id: number, title?: string | null, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentReplyNotification_comment_ThreadComment = { __typename?: 'ThreadComment', comment?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentSubscribedNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentSubscribedNotification_thread_Thread = { __typename?: 'Thread', id: number, title?: string | null, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentSubscribedNotification_comment_ThreadComment = { __typename?: 'ThreadComment', comment?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadLikeNotification_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadLikeNotification_thread_Thread = { __typename?: 'Thread', id: number, title?: string | null, siteUrl?: string | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification = { __typename: 'ActivityLikeNotification', id: number, activityId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User | null, activity?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_activity | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification = { __typename: 'ActivityMentionNotification', id: number, activityId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification_user_User | null, activity?: GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification_activity | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityMessageNotification = { __typename: 'ActivityMessageNotification', id: number, activityId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ActivityMessageNotification_user_User | null, message?: GetNotificationsQuery_Page_Page_notifications_ActivityMessageNotification_message_MessageActivity | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification = { __typename: 'ActivityReplyLikeNotification', id: number, activityId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification_user_User | null, activity?: GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification_activity | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification = { __typename: 'ActivityReplyNotification', id: number, activityId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification_user_User | null, activity?: GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification_activity | null };

export type GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification = { __typename: 'ActivityReplySubscribedNotification', id: number, activityId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification_user_User | null, activity?: GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification_activity | null };

export type GetNotificationsQuery_Page_Page_notifications_AiringNotification = { __typename: 'AiringNotification', id: number, episode: number, contexts?: Array<string | null> | null, createdAt?: number | null, type?: NotificationType | null, media?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media | null };

export type GetNotificationsQuery_Page_Page_notifications_FollowingNotification = { __typename: 'FollowingNotification', id: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_FollowingNotification_user_User | null };

export type GetNotificationsQuery_Page_Page_notifications_MediaDataChangeNotification = { __typename: 'MediaDataChangeNotification', id: number, reason?: string | null, context?: string | null, createdAt?: number | null, type?: NotificationType | null, media?: GetNotificationsQuery_Page_Page_notifications_MediaDataChangeNotification_media_Media | null };

export type GetNotificationsQuery_Page_Page_notifications_MediaDeletionNotification = { __typename: 'MediaDeletionNotification', id: number, deletedMediaTitle?: string | null, context?: string | null, reason?: string | null, createdAt?: number | null, type?: NotificationType | null };

export type GetNotificationsQuery_Page_Page_notifications_MediaMergeNotification = { __typename: 'MediaMergeNotification', id: number, reason?: string | null, deletedMediaTitles?: Array<string | null> | null, context?: string | null, createdAt?: number | null, type?: NotificationType | null, media?: GetNotificationsQuery_Page_Page_notifications_MediaMergeNotification_media_Media | null };

export type GetNotificationsQuery_Page_Page_notifications_RelatedMediaAdditionNotification = { __typename: 'RelatedMediaAdditionNotification', id: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, media?: GetNotificationsQuery_Page_Page_notifications_RelatedMediaAdditionNotification_media_Media | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentLikeNotification = { __typename: 'ThreadCommentLikeNotification', id: number, commentId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentLikeNotification_user_User | null, thread?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentLikeNotification_thread_Thread | null, comment?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentLikeNotification_comment_ThreadComment | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentMentionNotification = { __typename: 'ThreadCommentMentionNotification', id: number, commentId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentMentionNotification_user_User | null, thread?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentMentionNotification_thread_Thread | null, comment?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentMentionNotification_comment_ThreadComment | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentReplyNotification = { __typename: 'ThreadCommentReplyNotification', id: number, commentId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentReplyNotification_user_User | null, thread?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentReplyNotification_thread_Thread | null, comment?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentReplyNotification_comment_ThreadComment | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadCommentSubscribedNotification = { __typename: 'ThreadCommentSubscribedNotification', id: number, commentId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentSubscribedNotification_user_User | null, thread?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentSubscribedNotification_thread_Thread | null, comment?: GetNotificationsQuery_Page_Page_notifications_ThreadCommentSubscribedNotification_comment_ThreadComment | null };

export type GetNotificationsQuery_Page_Page_notifications_ThreadLikeNotification = { __typename: 'ThreadLikeNotification', id: number, threadId: number, context?: string | null, createdAt?: number | null, type?: NotificationType | null, user?: GetNotificationsQuery_Page_Page_notifications_ThreadLikeNotification_user_User | null, thread?: GetNotificationsQuery_Page_Page_notifications_ThreadLikeNotification_thread_Thread | null };

export type GetNotificationsQuery_Page_Page_notifications = GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification | GetNotificationsQuery_Page_Page_notifications_ActivityMentionNotification | GetNotificationsQuery_Page_Page_notifications_ActivityMessageNotification | GetNotificationsQuery_Page_Page_notifications_ActivityReplyLikeNotification | GetNotificationsQuery_Page_Page_notifications_ActivityReplyNotification | GetNotificationsQuery_Page_Page_notifications_ActivityReplySubscribedNotification | GetNotificationsQuery_Page_Page_notifications_AiringNotification | GetNotificationsQuery_Page_Page_notifications_FollowingNotification | GetNotificationsQuery_Page_Page_notifications_MediaDataChangeNotification | GetNotificationsQuery_Page_Page_notifications_MediaDeletionNotification | GetNotificationsQuery_Page_Page_notifications_MediaMergeNotification | GetNotificationsQuery_Page_Page_notifications_RelatedMediaAdditionNotification | GetNotificationsQuery_Page_Page_notifications_ThreadCommentLikeNotification | GetNotificationsQuery_Page_Page_notifications_ThreadCommentMentionNotification | GetNotificationsQuery_Page_Page_notifications_ThreadCommentReplyNotification | GetNotificationsQuery_Page_Page_notifications_ThreadCommentSubscribedNotification | GetNotificationsQuery_Page_Page_notifications_ThreadLikeNotification;

export type GetNotificationsQuery_Page_Page = { __typename?: 'Page', pageInfo?: GetNotificationsQuery_Page_Page_pageInfo_PageInfo | null, notifications?: Array<GetNotificationsQuery_Page_Page_notifications | null> | null };

export type GetNotificationsQuery_Query = { __typename?: 'Query', Viewer?: GetNotificationsQuery_Viewer_User | null, Page?: GetNotificationsQuery_Page_Page | null };


export type GetNotificationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  reset?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetNotificationsQuery = GetNotificationsQuery_Query;

export type ActivityDetailQuery_Activity_ListActivity_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type ActivityDetailQuery_Activity_ListActivity_media_Media = { __typename?: 'Media', id: number, type?: MediaType | null, format?: MediaFormat | null, status?: MediaStatus | null, idMal?: number | null, bannerImage?: string | null, siteUrl?: string | null, title?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_title_MediaTitle | null, mediaListEntry?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_mediaListEntry_MediaList | null, coverImage?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_coverImage_MediaCoverImage | null };

export type ActivityDetailQuery_Activity_ListActivity_replies_ActivityReply_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type ActivityDetailQuery_Activity_ListActivity_replies_ActivityReply = { __typename?: 'ActivityReply', id: number, userId?: number | null, activityId?: number | null, text?: string | null, likeCount: number, isLiked?: boolean | null, createdAt: number, user?: ActivityDetailQuery_Activity_ListActivity_replies_ActivityReply_user_User | null };

export type ActivityDetailQuery_Activity_MessageActivity_recipient_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type ActivityDetailQuery_Activity_MessageActivity_messenger_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type ActivityDetailQuery_Activity_MessageActivity_replies_ActivityReply_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type ActivityDetailQuery_Activity_MessageActivity_replies_ActivityReply = { __typename?: 'ActivityReply', id: number, userId?: number | null, activityId?: number | null, text?: string | null, likeCount: number, isLiked?: boolean | null, createdAt: number, user?: ActivityDetailQuery_Activity_MessageActivity_replies_ActivityReply_user_User | null };

export type ActivityDetailQuery_Activity_TextActivity_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type ActivityDetailQuery_Activity_TextActivity_replies_ActivityReply_user_User = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type ActivityDetailQuery_Activity_TextActivity_replies_ActivityReply = { __typename?: 'ActivityReply', id: number, userId?: number | null, activityId?: number | null, text?: string | null, likeCount: number, isLiked?: boolean | null, createdAt: number, user?: ActivityDetailQuery_Activity_TextActivity_replies_ActivityReply_user_User | null };

export type ActivityDetailQuery_Activity_ListActivity = { __typename: 'ListActivity', id: number, userId?: number | null, type?: ActivityType | null, replyCount: number, status?: string | null, progress?: string | null, isLocked?: boolean | null, isSubscribed?: boolean | null, likeCount: number, isLiked?: boolean | null, isPinned?: boolean | null, siteUrl?: string | null, createdAt: number, user?: ActivityDetailQuery_Activity_ListActivity_user_User | null, media?: ActivityDetailQuery_Activity_ListActivity_media_Media | null, replies?: Array<ActivityDetailQuery_Activity_ListActivity_replies_ActivityReply | null> | null };

export type ActivityDetailQuery_Activity_MessageActivity = { __typename: 'MessageActivity', id: number, recipientId?: number | null, messengerId?: number | null, type?: ActivityType | null, replyCount: number, message?: string | null, isLocked?: boolean | null, isSubscribed?: boolean | null, likeCount: number, isLiked?: boolean | null, isPrivate?: boolean | null, siteUrl?: string | null, createdAt: number, recipient?: ActivityDetailQuery_Activity_MessageActivity_recipient_User | null, messenger?: ActivityDetailQuery_Activity_MessageActivity_messenger_User | null, replies?: Array<ActivityDetailQuery_Activity_MessageActivity_replies_ActivityReply | null> | null };

export type ActivityDetailQuery_Activity_TextActivity = { __typename: 'TextActivity', id: number, userId?: number | null, type?: ActivityType | null, replyCount: number, text?: string | null, siteUrl?: string | null, isLocked?: boolean | null, isSubscribed?: boolean | null, likeCount: number, isLiked?: boolean | null, isPinned?: boolean | null, createdAt: number, user?: ActivityDetailQuery_Activity_TextActivity_user_User | null, replies?: Array<ActivityDetailQuery_Activity_TextActivity_replies_ActivityReply | null> | null };

export type ActivityDetailQuery_Activity = ActivityDetailQuery_Activity_ListActivity | ActivityDetailQuery_Activity_MessageActivity | ActivityDetailQuery_Activity_TextActivity;

export type ActivityDetailQuery_Query = { __typename?: 'Query', Activity?: ActivityDetailQuery_Activity | null };


export type ActivityDetailQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ActivityDetailQuery = ActivityDetailQuery_Query;

export type MediaFragment = { __typename?: 'Media', id: number, type?: MediaType | null, format?: MediaFormat | null, status?: MediaStatus | null, idMal?: number | null, bannerImage?: string | null, siteUrl?: string | null, title?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_title_MediaTitle | null, mediaListEntry?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_mediaListEntry_MediaList | null, coverImage?: GetNotificationsQuery_Page_Page_notifications_AiringNotification_media_Media_coverImage_MediaCoverImage | null };

export type UserFragment = { __typename?: 'User', id: number, name: string, siteUrl?: string | null, avatar?: GetNotificationsQuery_Page_Page_notifications_ActivityLikeNotification_user_User_avatar_UserAvatar | null };

export type ThreadFragment = { __typename?: 'Thread', id: number, title?: string | null, siteUrl?: string | null };

type Activity_ListActivity_Fragment = { __typename: 'ListActivity', id: number, siteUrl?: string | null };

type Activity_MessageActivity_Fragment = { __typename: 'MessageActivity', id: number, siteUrl?: string | null };

type Activity_TextActivity_Fragment = { __typename: 'TextActivity', id: number, siteUrl?: string | null };

export type ActivityFragment = Activity_ListActivity_Fragment | Activity_MessageActivity_Fragment | Activity_TextActivity_Fragment;

export type ReviewsQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', lastPage?: number | null, total?: number | null, hasNextPage?: boolean | null, currentPage?: number | null };

export type ReviewsQuery_Page_Page_reviews_Review_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type ReviewsQuery_Page_Page_reviews_Review_user_User = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, siteUrl?: string | null, avatar?: ReviewsQuery_Page_Page_reviews_Review_user_User_avatar_UserAvatar | null };

export type ReviewsQuery_Page_Page_reviews_Review = { __typename?: 'Review', id: number, summary?: string | null, rating?: number | null, ratingAmount?: number | null, score?: number | null, createdAt: number, updatedAt: number, user?: ReviewsQuery_Page_Page_reviews_Review_user_User | null };

export type ReviewsQuery_Page_Page = { __typename?: 'Page', pageInfo?: ReviewsQuery_Page_Page_pageInfo_PageInfo | null, reviews?: Array<ReviewsQuery_Page_Page_reviews_Review | null> | null };

export type ReviewsQuery_Query = { __typename?: 'Query', Page?: ReviewsQuery_Page_Page | null };


export type ReviewsQueryVariables = Exact<{
  mediaId?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ReviewsQuery = ReviewsQuery_Query;

export type ReviewsByIdQuery_Review_Review_media_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', extraLarge?: string | null, color?: string | null };

export type ReviewsByIdQuery_Review_Review_media_Media = { __typename?: 'Media', bannerImage?: string | null, coverImage?: ReviewsByIdQuery_Review_Review_media_Media_coverImage_MediaCoverImage | null };

export type ReviewsByIdQuery_Review_Review_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type ReviewsByIdQuery_Review_Review_user_User = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, isFollowing?: boolean | null, siteUrl?: string | null, avatar?: ReviewsByIdQuery_Review_Review_user_User_avatar_UserAvatar | null };

export type ReviewsByIdQuery_Review_Review = { __typename?: 'Review', id: number, summary?: string | null, body?: string | null, mediaType?: MediaType | null, rating?: number | null, ratingAmount?: number | null, score?: number | null, siteUrl?: string | null, createdAt: number, updatedAt: number, userRating?: ReviewRating | null, htmlBody?: string | null, media?: ReviewsByIdQuery_Review_Review_media_Media | null, user?: ReviewsByIdQuery_Review_Review_user_User | null };

export type ReviewsByIdQuery_Query = { __typename?: 'Query', Review?: ReviewsByIdQuery_Review_Review | null };


export type ReviewsByIdQueryVariables = Exact<{
  reviewId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ReviewsByIdQuery = ReviewsByIdQuery_Query;

export type CharacterMetaDataFragment = { __typename?: 'Character', id: number, isFavourite: boolean, gender?: string | null, description?: string | null, favourites?: number | null, siteUrl?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_name_CharacterName | null, image?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_image_CharacterImage | null };

export type StaffMetaDataFragment = { __typename?: 'Staff', id: number, isFavourite: boolean, description?: string | null, gender?: string | null, favourites?: number | null, siteUrl?: string | null, language?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_name_StaffName | null, image?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_image_StaffImage | null };

export type MediaSearchQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type MediaSearchQuery_Page_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type MediaSearchQuery_Page_Page = { __typename?: 'Page', pageInfo?: MediaSearchQuery_Page_Page_pageInfo_PageInfo | null, media?: Array<MediaSearchQuery_Page_Page_media_Media | null> | null };

export type MediaSearchQuery_Query = { __typename?: 'Query', Page?: MediaSearchQuery_Page_Page | null };


export type MediaSearchQueryVariables = Exact<{
  type?: InputMaybe<MediaType>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  idMal?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  season?: InputMaybe<MediaSeason>;
  seasonYear?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<MediaFormat>;
  status?: InputMaybe<MediaStatus>;
  episodes?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  chapters?: InputMaybe<Scalars['Int']['input']>;
  volumes?: InputMaybe<Scalars['Int']['input']>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  minimumTagRank?: InputMaybe<Scalars['Int']['input']>;
  tagCategory?: InputMaybe<Scalars['String']['input']>;
  onList?: InputMaybe<Scalars['Boolean']['input']>;
  licensedBy?: InputMaybe<Scalars['String']['input']>;
  licensedById?: InputMaybe<Scalars['Int']['input']>;
  averageScore?: InputMaybe<Scalars['Int']['input']>;
  popularity?: InputMaybe<Scalars['Int']['input']>;
  source?: InputMaybe<MediaSource>;
  countryOfOrigin?: InputMaybe<Scalars['CountryCode']['input']>;
  isLicensed?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  idMal_not?: InputMaybe<Scalars['Int']['input']>;
  idMal_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  idMal_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  startDate_like?: InputMaybe<Scalars['String']['input']>;
  endDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>;
  endDate_like?: InputMaybe<Scalars['String']['input']>;
  format_in?: InputMaybe<Array<InputMaybe<MediaFormat>> | InputMaybe<MediaFormat>>;
  format_not?: InputMaybe<MediaFormat>;
  format_not_in?: InputMaybe<Array<InputMaybe<MediaFormat>> | InputMaybe<MediaFormat>>;
  status_in?: InputMaybe<Array<InputMaybe<MediaStatus>> | InputMaybe<MediaStatus>>;
  status_not?: InputMaybe<MediaStatus>;
  status_not_in?: InputMaybe<Array<InputMaybe<MediaStatus>> | InputMaybe<MediaStatus>>;
  episodes_greater?: InputMaybe<Scalars['Int']['input']>;
  episodes_lesser?: InputMaybe<Scalars['Int']['input']>;
  duration_greater?: InputMaybe<Scalars['Int']['input']>;
  duration_lesser?: InputMaybe<Scalars['Int']['input']>;
  chapters_greater?: InputMaybe<Scalars['Int']['input']>;
  chapters_lesser?: InputMaybe<Scalars['Int']['input']>;
  volumes_greater?: InputMaybe<Scalars['Int']['input']>;
  volumes_lesser?: InputMaybe<Scalars['Int']['input']>;
  genre_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  genre_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  tag_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  tag_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  tagCategory_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  tagCategory_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  licensedBy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  licensedById_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  averageScore_not?: InputMaybe<Scalars['Int']['input']>;
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>;
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>;
  popularity_not?: InputMaybe<Scalars['Int']['input']>;
  popularity_greater?: InputMaybe<Scalars['Int']['input']>;
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>;
  source_in?: InputMaybe<Array<InputMaybe<MediaSource>> | InputMaybe<MediaSource>>;
  sort?: InputMaybe<Array<InputMaybe<MediaSort>> | InputMaybe<MediaSort>>;
}>;


export type MediaSearchQuery = MediaSearchQuery_Query;

export type UserSearchMetaFragment = { __typename?: 'User', id: number, name: string, isFollowing?: boolean | null, isFollower?: boolean | null, createdAt?: number | null, siteUrl?: string | null, aboutHTML?: string | null, avatar?: AniMediaQuery_Following_Page_mediaList_MediaList_user_User_avatar_UserAvatar | null, mediaListOptions?: AniMediaQuery_Following_Page_mediaList_MediaList_user_User_mediaListOptions_MediaListOptions | null };

export type UserSearchQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type UserSearchQuery_Page_Page_users_User = { __typename?: 'User', id: number, name: string, isFollowing?: boolean | null, isFollower?: boolean | null, createdAt?: number | null, siteUrl?: string | null, aboutHTML?: string | null, avatar?: AniMediaQuery_Following_Page_mediaList_MediaList_user_User_avatar_UserAvatar | null, mediaListOptions?: AniMediaQuery_Following_Page_mediaList_MediaList_user_User_mediaListOptions_MediaListOptions | null };

export type UserSearchQuery_Page_Page = { __typename?: 'Page', pageInfo?: UserSearchQuery_Page_Page_pageInfo_PageInfo | null, users?: Array<UserSearchQuery_Page_Page_users_User | null> | null };

export type UserSearchQuery_Query = { __typename?: 'Query', Page?: UserSearchQuery_Page_Page | null };


export type UserSearchQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>> | InputMaybe<UserSort>>;
  isModerator?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UserSearchQuery = UserSearchQuery_Query;

export type CharacterSearchQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type CharacterSearchQuery_Page_Page_characters_Character = { __typename?: 'Character', id: number, isFavourite: boolean, gender?: string | null, description?: string | null, favourites?: number | null, siteUrl?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_name_CharacterName | null, image?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_image_CharacterImage | null };

export type CharacterSearchQuery_Page_Page = { __typename?: 'Page', pageInfo?: CharacterSearchQuery_Page_Page_pageInfo_PageInfo | null, characters?: Array<CharacterSearchQuery_Page_Page_characters_Character | null> | null };

export type CharacterSearchQuery_Query = { __typename?: 'Query', Page?: CharacterSearchQuery_Page_Page | null };


export type CharacterSearchQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CharacterSort>> | InputMaybe<CharacterSort>>;
}>;


export type CharacterSearchQuery = CharacterSearchQuery_Query;

export type StaffSearchQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type StaffSearchQuery_Page_Page_staff_Staff = { __typename?: 'Staff', id: number, isFavourite: boolean, description?: string | null, gender?: string | null, favourites?: number | null, siteUrl?: string | null, language?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_name_StaffName | null, image?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_image_StaffImage | null };

export type StaffSearchQuery_Page_Page = { __typename?: 'Page', pageInfo?: StaffSearchQuery_Page_Page_pageInfo_PageInfo | null, staff?: Array<StaffSearchQuery_Page_Page_staff_Staff | null> | null };

export type StaffSearchQuery_Query = { __typename?: 'Query', Page?: StaffSearchQuery_Page_Page | null };


export type StaffSearchQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<InputMaybe<StaffSort>> | InputMaybe<StaffSort>>;
}>;


export type StaffSearchQuery = StaffSearchQuery_Query;

export type StudioSearchQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type StudioSearchQuery_Page_Page_studios_Studio_media_MediaConnection_edges_MediaEdge_node_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type StudioSearchQuery_Page_Page_studios_Studio_media_MediaConnection_edges_MediaEdge = { __typename?: 'MediaEdge', node?: StudioSearchQuery_Page_Page_studios_Studio_media_MediaConnection_edges_MediaEdge_node_Media | null };

export type StudioSearchQuery_Page_Page_studios_Studio_media_MediaConnection = { __typename?: 'MediaConnection', edges?: Array<StudioSearchQuery_Page_Page_studios_Studio_media_MediaConnection_edges_MediaEdge | null> | null };

export type StudioSearchQuery_Page_Page_studios_Studio = { __typename?: 'Studio', id: number, name: string, isFavourite: boolean, siteUrl?: string | null, media?: StudioSearchQuery_Page_Page_studios_Studio_media_MediaConnection | null };

export type StudioSearchQuery_Page_Page = { __typename?: 'Page', pageInfo?: StudioSearchQuery_Page_Page_pageInfo_PageInfo | null, studios?: Array<StudioSearchQuery_Page_Page_studios_Studio | null> | null };

export type StudioSearchQuery_Query = { __typename?: 'Query', Page?: StudioSearchQuery_Page_Page | null };


export type StudioSearchQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<StudioSort>> | InputMaybe<StudioSort>>;
}>;


export type StudioSearchQuery = StudioSearchQuery_Query;

export type SearchAllQuery_Anime_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type SearchAllQuery_Anime_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type SearchAllQuery_Anime_Page = { __typename?: 'Page', pageInfo?: SearchAllQuery_Anime_Page_pageInfo_PageInfo | null, media?: Array<SearchAllQuery_Anime_Page_media_Media | null> | null };

export type SearchAllQuery_Manga_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', hasNextPage?: boolean | null, currentPage?: number | null, total?: number | null };

export type SearchAllQuery_Manga_Page_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type SearchAllQuery_Manga_Page = { __typename?: 'Page', pageInfo?: SearchAllQuery_Manga_Page_pageInfo_PageInfo | null, media?: Array<SearchAllQuery_Manga_Page_media_Media | null> | null };

export type SearchAllQuery_Characters_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type SearchAllQuery_Characters_Page_characters_Character_dateOfBirth_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type SearchAllQuery_Characters_Page_characters_Character_name_CharacterName = { __typename?: 'CharacterName', full?: string | null, native?: string | null };

export type SearchAllQuery_Characters_Page_characters_Character_image_CharacterImage = { __typename?: 'CharacterImage', large?: string | null };

export type SearchAllQuery_Characters_Page_characters_Character = { __typename?: 'Character', id: number, isFavourite: boolean, dateOfBirth?: SearchAllQuery_Characters_Page_characters_Character_dateOfBirth_FuzzyDate | null, name?: SearchAllQuery_Characters_Page_characters_Character_name_CharacterName | null, image?: SearchAllQuery_Characters_Page_characters_Character_image_CharacterImage | null };

export type SearchAllQuery_Characters_Page = { __typename?: 'Page', pageInfo?: SearchAllQuery_Characters_Page_pageInfo_PageInfo | null, characters?: Array<SearchAllQuery_Characters_Page_characters_Character | null> | null };

export type SearchAllQuery_Staff_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type SearchAllQuery_Staff_Page_staff_Staff_dateOfBirth_FuzzyDate = { __typename?: 'FuzzyDate', year?: number | null, month?: number | null, day?: number | null };

export type SearchAllQuery_Staff_Page_staff_Staff_name_StaffName = { __typename?: 'StaffName', full?: string | null, native?: string | null };

export type SearchAllQuery_Staff_Page_staff_Staff_image_StaffImage = { __typename?: 'StaffImage', large?: string | null };

export type SearchAllQuery_Staff_Page_staff_Staff = { __typename?: 'Staff', id: number, isFavourite: boolean, dateOfBirth?: SearchAllQuery_Staff_Page_staff_Staff_dateOfBirth_FuzzyDate | null, name?: SearchAllQuery_Staff_Page_staff_Staff_name_StaffName | null, image?: SearchAllQuery_Staff_Page_staff_Staff_image_StaffImage | null };

export type SearchAllQuery_Staff_Page = { __typename?: 'Page', pageInfo?: SearchAllQuery_Staff_Page_pageInfo_PageInfo | null, staff?: Array<SearchAllQuery_Staff_Page_staff_Staff | null> | null };

export type SearchAllQuery_Studios_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type SearchAllQuery_Studios_Page_studios_Studio_media_MediaConnection_edges_MediaEdge_node_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type SearchAllQuery_Studios_Page_studios_Studio_media_MediaConnection_edges_MediaEdge = { __typename?: 'MediaEdge', node?: SearchAllQuery_Studios_Page_studios_Studio_media_MediaConnection_edges_MediaEdge_node_Media | null };

export type SearchAllQuery_Studios_Page_studios_Studio_media_MediaConnection = { __typename?: 'MediaConnection', edges?: Array<SearchAllQuery_Studios_Page_studios_Studio_media_MediaConnection_edges_MediaEdge | null> | null };

export type SearchAllQuery_Studios_Page_studios_Studio = { __typename?: 'Studio', id: number, name: string, isFavourite: boolean, siteUrl?: string | null, media?: SearchAllQuery_Studios_Page_studios_Studio_media_MediaConnection | null };

export type SearchAllQuery_Studios_Page = { __typename?: 'Page', pageInfo?: SearchAllQuery_Studios_Page_pageInfo_PageInfo | null, studios?: Array<SearchAllQuery_Studios_Page_studios_Studio | null> | null };

export type SearchAllQuery_Users_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type SearchAllQuery_Users_Page_users_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type SearchAllQuery_Users_Page_users_User = { __typename?: 'User', id: number, name: string, isFollowing?: boolean | null, isFollower?: boolean | null, avatar?: SearchAllQuery_Users_Page_users_User_avatar_UserAvatar | null };

export type SearchAllQuery_Users_Page = { __typename?: 'Page', pageInfo?: SearchAllQuery_Users_Page_pageInfo_PageInfo | null, users?: Array<SearchAllQuery_Users_Page_users_User | null> | null };

export type SearchAllQuery_Query = { __typename?: 'Query', Anime?: SearchAllQuery_Anime_Page | null, Manga?: SearchAllQuery_Manga_Page | null, Characters?: SearchAllQuery_Characters_Page | null, Staff?: SearchAllQuery_Staff_Page | null, Studios?: SearchAllQuery_Studios_Page | null, Users?: SearchAllQuery_Users_Page | null };


export type SearchAllQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SearchAllQuery = SearchAllQuery_Query;

export type SiteTrendFragment_SiteTrendConnection_nodes_SiteTrend = { __typename?: 'SiteTrend', date: number, count: number, change: number };

export type SiteTrendFragment = { __typename?: 'SiteTrendConnection', nodes?: Array<SiteTrendFragment_SiteTrendConnection_nodes_SiteTrend | null> | null };

export type SiteStatsQuery_SiteStatistics_SiteStatistics_users_SiteTrendConnection = { __typename?: 'SiteTrendConnection', nodes?: Array<SiteTrendFragment_SiteTrendConnection_nodes_SiteTrend | null> | null };

export type SiteStatsQuery_SiteStatistics_SiteStatistics_anime_SiteTrendConnection = { __typename?: 'SiteTrendConnection', nodes?: Array<SiteTrendFragment_SiteTrendConnection_nodes_SiteTrend | null> | null };

export type SiteStatsQuery_SiteStatistics_SiteStatistics_manga_SiteTrendConnection = { __typename?: 'SiteTrendConnection', nodes?: Array<SiteTrendFragment_SiteTrendConnection_nodes_SiteTrend | null> | null };

export type SiteStatsQuery_SiteStatistics_SiteStatistics_characters_SiteTrendConnection = { __typename?: 'SiteTrendConnection', nodes?: Array<SiteTrendFragment_SiteTrendConnection_nodes_SiteTrend | null> | null };

export type SiteStatsQuery_SiteStatistics_SiteStatistics_staff_SiteTrendConnection = { __typename?: 'SiteTrendConnection', nodes?: Array<SiteTrendFragment_SiteTrendConnection_nodes_SiteTrend | null> | null };

export type SiteStatsQuery_SiteStatistics_SiteStatistics_reviews_SiteTrendConnection = { __typename?: 'SiteTrendConnection', nodes?: Array<SiteTrendFragment_SiteTrendConnection_nodes_SiteTrend | null> | null };

export type SiteStatsQuery_SiteStatistics_SiteStatistics = { __typename?: 'SiteStatistics', users?: SiteStatsQuery_SiteStatistics_SiteStatistics_users_SiteTrendConnection | null, anime?: SiteStatsQuery_SiteStatistics_SiteStatistics_anime_SiteTrendConnection | null, manga?: SiteStatsQuery_SiteStatistics_SiteStatistics_manga_SiteTrendConnection | null, characters?: SiteStatsQuery_SiteStatistics_SiteStatistics_characters_SiteTrendConnection | null, staff?: SiteStatsQuery_SiteStatistics_SiteStatistics_staff_SiteTrendConnection | null, reviews?: SiteStatsQuery_SiteStatistics_SiteStatistics_reviews_SiteTrendConnection | null };

export type SiteStatsQuery_Query = { __typename?: 'Query', SiteStatistics?: SiteStatsQuery_SiteStatistics_SiteStatistics | null };


export type SiteStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteStatsQuery = SiteStatsQuery_Query;

export type MediaTrendsQuery_Media_Media_title_MediaTitle = { __typename?: 'MediaTitle', romaji?: string | null, english?: string | null, native?: string | null, userPreferred?: string | null };

export type MediaTrendsQuery_Media_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', extraLarge?: string | null, color?: string | null };

export type MediaTrendsQuery_Media_Media_rankings_MediaRank = { __typename?: 'MediaRank', id: number, rank: number, type: MediaRankType, format: MediaFormat, year?: number | null, season?: MediaSeason | null, allTime?: boolean | null, context: string };

export type MediaTrendsQuery_Media_Media_trends_MediaTrendConnection_nodes_MediaTrend = { __typename?: 'MediaTrend', averageScore?: number | null, date: number, trending: number, popularity?: number | null };

export type MediaTrendsQuery_Media_Media_trends_MediaTrendConnection = { __typename?: 'MediaTrendConnection', nodes?: Array<MediaTrendsQuery_Media_Media_trends_MediaTrendConnection_nodes_MediaTrend | null> | null };

export type MediaTrendsQuery_Media_Media_airingTrends_MediaTrendConnection_nodes_MediaTrend = { __typename?: 'MediaTrend', averageScore?: number | null, inProgress?: number | null, episode?: number | null };

export type MediaTrendsQuery_Media_Media_airingTrends_MediaTrendConnection = { __typename?: 'MediaTrendConnection', nodes?: Array<MediaTrendsQuery_Media_Media_airingTrends_MediaTrendConnection_nodes_MediaTrend | null> | null };

export type MediaTrendsQuery_Media_Media_distribution_MediaStats_status_StatusDistribution = { __typename?: 'StatusDistribution', status?: MediaListStatus | null, amount?: number | null };

export type MediaTrendsQuery_Media_Media_distribution_MediaStats_score_ScoreDistribution = { __typename?: 'ScoreDistribution', score?: number | null, amount?: number | null };

export type MediaTrendsQuery_Media_Media_distribution_MediaStats = { __typename?: 'MediaStats', status?: Array<MediaTrendsQuery_Media_Media_distribution_MediaStats_status_StatusDistribution | null> | null, score?: Array<MediaTrendsQuery_Media_Media_distribution_MediaStats_score_ScoreDistribution | null> | null };

export type MediaTrendsQuery_Media_Media = { __typename?: 'Media', id: number, type?: MediaType | null, format?: MediaFormat | null, title?: MediaTrendsQuery_Media_Media_title_MediaTitle | null, coverImage?: MediaTrendsQuery_Media_Media_coverImage_MediaCoverImage | null, rankings?: Array<MediaTrendsQuery_Media_Media_rankings_MediaRank | null> | null, trends?: MediaTrendsQuery_Media_Media_trends_MediaTrendConnection | null, airingTrends?: MediaTrendsQuery_Media_Media_airingTrends_MediaTrendConnection | null, distribution?: MediaTrendsQuery_Media_Media_distribution_MediaStats | null };

export type MediaTrendsQuery_Query = { __typename?: 'Query', Media?: MediaTrendsQuery_Media_Media | null };


export type MediaTrendsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MediaTrendsQuery = MediaTrendsQuery_Query;

export type ThreadsOverviewQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type ThreadsOverviewQuery_Page_Page_threads_Thread_categories_ThreadCategory = { __typename?: 'ThreadCategory', id: number, name: string };

export type ThreadsOverviewQuery_Page_Page_threads_Thread_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type ThreadsOverviewQuery_Page_Page_threads_Thread_user_User = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, avatar?: ThreadsOverviewQuery_Page_Page_threads_Thread_user_User_avatar_UserAvatar | null };

export type ThreadsOverviewQuery_Page_Page_threads_Thread_replyUser_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type ThreadsOverviewQuery_Page_Page_threads_Thread_replyUser_User = { __typename?: 'User', id: number, name: string, avatar?: ThreadsOverviewQuery_Page_Page_threads_Thread_replyUser_User_avatar_UserAvatar | null };

export type ThreadsOverviewQuery_Page_Page_threads_Thread = { __typename?: 'Thread', id: number, title?: string | null, replyCount?: number | null, viewCount?: number | null, replyCommentId?: number | null, repliedAt?: number | null, createdAt: number, categories?: Array<ThreadsOverviewQuery_Page_Page_threads_Thread_categories_ThreadCategory | null> | null, user?: ThreadsOverviewQuery_Page_Page_threads_Thread_user_User | null, replyUser?: ThreadsOverviewQuery_Page_Page_threads_Thread_replyUser_User | null };

export type ThreadsOverviewQuery_Page_Page = { __typename?: 'Page', pageInfo?: ThreadsOverviewQuery_Page_Page_pageInfo_PageInfo | null, threads?: Array<ThreadsOverviewQuery_Page_Page_threads_Thread | null> | null };

export type ThreadsOverviewQuery_Query = { __typename?: 'Query', Page?: ThreadsOverviewQuery_Page_Page | null };


export type ThreadsOverviewQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ThreadsOverviewQuery = ThreadsOverviewQuery_Query;

export type ThreadsQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type ThreadsQuery_Page_Page_threads_Thread_categories_ThreadCategory = { __typename?: 'ThreadCategory', id: number, name: string };

export type ThreadsQuery_Page_Page_threads_Thread_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type ThreadsQuery_Page_Page_threads_Thread_user_User = { __typename?: 'User', id: number, name: string, avatar?: ThreadsQuery_Page_Page_threads_Thread_user_User_avatar_UserAvatar | null };

export type ThreadsQuery_Page_Page_threads_Thread_replyUser_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type ThreadsQuery_Page_Page_threads_Thread_replyUser_User = { __typename?: 'User', id: number, name: string, avatar?: ThreadsQuery_Page_Page_threads_Thread_replyUser_User_avatar_UserAvatar | null };

export type ThreadsQuery_Page_Page_threads_Thread = { __typename?: 'Thread', id: number, title?: string | null, replyCount?: number | null, viewCount?: number | null, replyCommentId?: number | null, repliedAt?: number | null, createdAt: number, categories?: Array<ThreadsQuery_Page_Page_threads_Thread_categories_ThreadCategory | null> | null, user?: ThreadsQuery_Page_Page_threads_Thread_user_User | null, replyUser?: ThreadsQuery_Page_Page_threads_Thread_replyUser_User | null };

export type ThreadsQuery_Page_Page = { __typename?: 'Page', pageInfo?: ThreadsQuery_Page_Page_pageInfo_PageInfo | null, threads?: Array<ThreadsQuery_Page_Page_threads_Thread | null> | null };

export type ThreadsQuery_Query = { __typename?: 'Query', Page?: ThreadsQuery_Page_Page | null };


export type ThreadsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ThreadsQuery = ThreadsQuery_Query;

export type ThreadDetailQuery_Thread_Thread_likes_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type ThreadDetailQuery_Thread_Thread_likes_User = { __typename?: 'User', id: number, name: string, avatar?: ThreadDetailQuery_Thread_Thread_likes_User_avatar_UserAvatar | null };

export type ThreadDetailQuery_Thread_Thread_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type ThreadDetailQuery_Thread_Thread_user_User = { __typename?: 'User', id: number, name: string, avatar?: ThreadDetailQuery_Thread_Thread_user_User_avatar_UserAvatar | null };

export type ThreadDetailQuery_Thread_Thread_categories_ThreadCategory = { __typename?: 'ThreadCategory', id: number, name: string };

export type ThreadDetailQuery_Thread_Thread_mediaCategories_Media_title_MediaTitle = { __typename?: 'MediaTitle', userPreferred?: string | null };

export type ThreadDetailQuery_Thread_Thread_mediaCategories_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', large?: string | null };

export type ThreadDetailQuery_Thread_Thread_mediaCategories_Media = { __typename?: 'Media', id: number, type?: MediaType | null, format?: MediaFormat | null, title?: ThreadDetailQuery_Thread_Thread_mediaCategories_Media_title_MediaTitle | null, coverImage?: ThreadDetailQuery_Thread_Thread_mediaCategories_Media_coverImage_MediaCoverImage | null };

export type ThreadDetailQuery_Thread_Thread = { __typename?: 'Thread', id: number, title?: string | null, body?: string | null, userId: number, replyCount?: number | null, viewCount?: number | null, isLocked?: boolean | null, isSticky?: boolean | null, isSubscribed?: boolean | null, isLiked?: boolean | null, likeCount: number, repliedAt?: number | null, createdAt: number, htmlBody?: string | null, likes?: Array<ThreadDetailQuery_Thread_Thread_likes_User | null> | null, user?: ThreadDetailQuery_Thread_Thread_user_User | null, categories?: Array<ThreadDetailQuery_Thread_Thread_categories_ThreadCategory | null> | null, mediaCategories?: Array<ThreadDetailQuery_Thread_Thread_mediaCategories_Media | null> | null };

export type ThreadDetailQuery_Query = { __typename?: 'Query', Thread?: ThreadDetailQuery_Thread_Thread | null };


export type ThreadDetailQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ThreadDetailQuery = ThreadDetailQuery_Query;

export type AniListCommentsQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, lastPage?: number | null, hasNextPage?: boolean | null };

export type AniListCommentsQuery_Page_Page_threadComments_ThreadComment_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type AniListCommentsQuery_Page_Page_threadComments_ThreadComment_user_User = { __typename?: 'User', id: number, name: string, donatorTier?: number | null, donatorBadge?: string | null, moderatorRoles?: Array<ModRole | null> | null, avatar?: AniListCommentsQuery_Page_Page_threadComments_ThreadComment_user_User_avatar_UserAvatar | null };

export type AniListCommentsQuery_Page_Page_threadComments_ThreadComment = { __typename?: 'ThreadComment', id: number, threadId?: number | null, comment?: string | null, isLiked?: boolean | null, likeCount: number, createdAt: number, childComments?: any | null, isLocked?: boolean | null, htmlComment?: string | null, user?: AniListCommentsQuery_Page_Page_threadComments_ThreadComment_user_User | null };

export type AniListCommentsQuery_Page_Page = { __typename?: 'Page', pageInfo?: AniListCommentsQuery_Page_Page_pageInfo_PageInfo | null, threadComments?: Array<AniListCommentsQuery_Page_Page_threadComments_ThreadComment | null> | null };

export type AniListCommentsQuery_Query = { __typename?: 'Query', Page?: AniListCommentsQuery_Page_Page | null };


export type AniListCommentsQueryVariables = Exact<{
  threadId?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AniListCommentsQuery = AniListCommentsQuery_Query;

export type AniListCommentDetailsQuery_ThreadComment_ThreadComment_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type AniListCommentDetailsQuery_ThreadComment_ThreadComment_user_User = { __typename?: 'User', id: number, name: string, isFollowing?: boolean | null, isFollower?: boolean | null, isBlocked?: boolean | null, avatar?: AniListCommentDetailsQuery_ThreadComment_ThreadComment_user_User_avatar_UserAvatar | null };

export type AniListCommentDetailsQuery_ThreadComment_ThreadComment_likes_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type AniListCommentDetailsQuery_ThreadComment_ThreadComment_likes_User = { __typename?: 'User', id: number, name: string, avatar?: AniListCommentDetailsQuery_ThreadComment_ThreadComment_likes_User_avatar_UserAvatar | null };

export type AniListCommentDetailsQuery_ThreadComment_ThreadComment = { __typename?: 'ThreadComment', id: number, comment?: string | null, userId?: number | null, threadId?: number | null, likeCount: number, isLiked?: boolean | null, siteUrl?: string | null, createdAt: number, updatedAt: number, childComments?: any | null, isLocked?: boolean | null, htmlComment?: string | null, user?: AniListCommentDetailsQuery_ThreadComment_ThreadComment_user_User | null, likes?: Array<AniListCommentDetailsQuery_ThreadComment_ThreadComment_likes_User | null> | null };

export type AniListCommentDetailsQuery_Query = { __typename?: 'Query', ThreadComment?: Array<AniListCommentDetailsQuery_ThreadComment_ThreadComment | null> | null };


export type AniListCommentDetailsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AniListCommentDetailsQuery = AniListCommentDetailsQuery_Query;

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_formats_UserFormatStatistic = { __typename?: 'UserFormatStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, format?: MediaFormat | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_statuses_UserStatusStatistic = { __typename?: 'UserStatusStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, status?: MediaListStatus | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_scores_UserScoreStatistic = { __typename?: 'UserScoreStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, score?: number | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_lengths_UserLengthStatistic = { __typename?: 'UserLengthStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, length?: string | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_releaseYears_UserReleaseYearStatistic = { __typename?: 'UserReleaseYearStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, releaseYear?: number | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_startYears_UserStartYearStatistic = { __typename?: 'UserStartYearStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, startYear?: number | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_genres_UserGenreStatistic = { __typename?: 'UserGenreStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, genre?: string | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_tags_UserTagStatistic_tag_MediaTag = { __typename?: 'MediaTag', id: number, name: string, description?: string | null, category?: string | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_tags_UserTagStatistic = { __typename?: 'UserTagStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, tag?: UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_tags_UserTagStatistic_tag_MediaTag | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_countries_UserCountryStatistic = { __typename?: 'UserCountryStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, country?: any | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_voiceActors_UserVoiceActorStatistic_voiceActor_Staff_image_StaffImage = { __typename?: 'StaffImage', large?: string | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_voiceActors_UserVoiceActorStatistic_voiceActor_Staff_name_StaffName = { __typename?: 'StaffName', userPreferred?: string | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_voiceActors_UserVoiceActorStatistic_voiceActor_Staff = { __typename?: 'Staff', id: number, languageV2?: string | null, isFavourite: boolean, favourites?: number | null, image?: UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_voiceActors_UserVoiceActorStatistic_voiceActor_Staff_image_StaffImage | null, name?: UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_voiceActors_UserVoiceActorStatistic_voiceActor_Staff_name_StaffName | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_voiceActors_UserVoiceActorStatistic = { __typename?: 'UserVoiceActorStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, voiceActor?: UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_voiceActors_UserVoiceActorStatistic_voiceActor_Staff | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_staff_UserStaffStatistic_staff_Staff_image_StaffImage = { __typename?: 'StaffImage', large?: string | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_staff_UserStaffStatistic_staff_Staff_name_StaffName = { __typename?: 'StaffName', userPreferred?: string | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_staff_UserStaffStatistic_staff_Staff = { __typename?: 'Staff', id: number, languageV2?: string | null, isFavourite: boolean, favourites?: number | null, image?: UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_staff_UserStaffStatistic_staff_Staff_image_StaffImage | null, name?: UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_staff_UserStaffStatistic_staff_Staff_name_StaffName | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_staff_UserStaffStatistic = { __typename?: 'UserStaffStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, staff?: UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_staff_UserStaffStatistic_staff_Staff | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_studios_UserStudioStatistic_studio_Studio = { __typename?: 'Studio', id: number, name: string, favourites?: number | null, isFavourite: boolean };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_studios_UserStudioStatistic = { __typename?: 'UserStudioStatistic', count: number, meanScore: number, minutesWatched: number, mediaIds: Array<number | null>, studio?: UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_studios_UserStudioStatistic_studio_Studio | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics = { __typename?: 'UserStatistics', count: number, meanScore: number, standardDeviation: number, minutesWatched: number, episodesWatched: number, formats?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_formats_UserFormatStatistic | null> | null, statuses?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_statuses_UserStatusStatistic | null> | null, scores?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_scores_UserScoreStatistic | null> | null, lengths?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_lengths_UserLengthStatistic | null> | null, releaseYears?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_releaseYears_UserReleaseYearStatistic | null> | null, startYears?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_startYears_UserStartYearStatistic | null> | null, genres?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_genres_UserGenreStatistic | null> | null, tags?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_tags_UserTagStatistic | null> | null, countries?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_countries_UserCountryStatistic | null> | null, voiceActors?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_voiceActors_UserVoiceActorStatistic | null> | null, staff?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_staff_UserStaffStatistic | null> | null, studios?: Array<UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics_studios_UserStudioStatistic | null> | null };

export type UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes = { __typename?: 'UserStatisticTypes', anime?: UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes_anime_UserStatistics | null };

export type UserAnimeStatsQuery_User_User = { __typename?: 'User', statistics?: UserAnimeStatsQuery_User_User_statistics_UserStatisticTypes | null };

export type UserAnimeStatsQuery_Query = { __typename?: 'Query', User?: UserAnimeStatsQuery_User_User | null };


export type UserAnimeStatsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserAnimeStatsQuery = UserAnimeStatsQuery_Query;

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_formats_UserFormatStatistic = { __typename?: 'UserFormatStatistic', count: number, meanScore: number, chaptersRead: number, mediaIds: Array<number | null>, format?: MediaFormat | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_statuses_UserStatusStatistic = { __typename?: 'UserStatusStatistic', count: number, meanScore: number, chaptersRead: number, mediaIds: Array<number | null>, status?: MediaListStatus | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_scores_UserScoreStatistic = { __typename?: 'UserScoreStatistic', count: number, meanScore: number, chaptersRead: number, mediaIds: Array<number | null>, score?: number | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_lengths_UserLengthStatistic = { __typename?: 'UserLengthStatistic', count: number, meanScore: number, chaptersRead: number, mediaIds: Array<number | null>, length?: string | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_releaseYears_UserReleaseYearStatistic = { __typename?: 'UserReleaseYearStatistic', count: number, meanScore: number, chaptersRead: number, mediaIds: Array<number | null>, releaseYear?: number | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_startYears_UserStartYearStatistic = { __typename?: 'UserStartYearStatistic', count: number, meanScore: number, chaptersRead: number, mediaIds: Array<number | null>, startYear?: number | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_genres_UserGenreStatistic = { __typename?: 'UserGenreStatistic', count: number, meanScore: number, chaptersRead: number, mediaIds: Array<number | null>, genre?: string | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_tags_UserTagStatistic_tag_MediaTag = { __typename?: 'MediaTag', id: number, name: string, description?: string | null, category?: string | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_tags_UserTagStatistic = { __typename?: 'UserTagStatistic', count: number, meanScore: number, chaptersRead: number, mediaIds: Array<number | null>, tag?: UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_tags_UserTagStatistic_tag_MediaTag | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_countries_UserCountryStatistic = { __typename?: 'UserCountryStatistic', count: number, meanScore: number, chaptersRead: number, mediaIds: Array<number | null>, country?: any | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_staff_UserStaffStatistic_staff_Staff_image_StaffImage = { __typename?: 'StaffImage', large?: string | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_staff_UserStaffStatistic_staff_Staff_name_StaffName = { __typename?: 'StaffName', userPreferred?: string | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_staff_UserStaffStatistic_staff_Staff = { __typename?: 'Staff', id: number, languageV2?: string | null, isFavourite: boolean, favourites?: number | null, image?: UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_staff_UserStaffStatistic_staff_Staff_image_StaffImage | null, name?: UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_staff_UserStaffStatistic_staff_Staff_name_StaffName | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_staff_UserStaffStatistic = { __typename?: 'UserStaffStatistic', count: number, meanScore: number, chaptersRead: number, mediaIds: Array<number | null>, staff?: UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_staff_UserStaffStatistic_staff_Staff | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics = { __typename?: 'UserStatistics', count: number, meanScore: number, standardDeviation: number, chaptersRead: number, volumesRead: number, formats?: Array<UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_formats_UserFormatStatistic | null> | null, statuses?: Array<UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_statuses_UserStatusStatistic | null> | null, scores?: Array<UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_scores_UserScoreStatistic | null> | null, lengths?: Array<UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_lengths_UserLengthStatistic | null> | null, releaseYears?: Array<UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_releaseYears_UserReleaseYearStatistic | null> | null, startYears?: Array<UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_startYears_UserStartYearStatistic | null> | null, genres?: Array<UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_genres_UserGenreStatistic | null> | null, tags?: Array<UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_tags_UserTagStatistic | null> | null, countries?: Array<UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_countries_UserCountryStatistic | null> | null, staff?: Array<UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics_staff_UserStaffStatistic | null> | null };

export type UserMangaStatsQuery_User_User_statistics_UserStatisticTypes = { __typename?: 'UserStatisticTypes', manga?: UserMangaStatsQuery_User_User_statistics_UserStatisticTypes_manga_UserStatistics | null };

export type UserMangaStatsQuery_User_User = { __typename?: 'User', statistics?: UserMangaStatsQuery_User_User_statistics_UserStatisticTypes | null };

export type UserMangaStatsQuery_Query = { __typename?: 'Query', User?: UserMangaStatsQuery_User_User | null };


export type UserMangaStatsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserMangaStatsQuery = UserMangaStatsQuery_Query;

export type UserActivityQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, currentPage?: number | null, hasNextPage?: boolean | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_options_UserOptions = { __typename?: 'UserOptions', profileColor?: string | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media_title_MediaTitle = { __typename?: 'MediaTitle', userPreferred?: string | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', extraLarge?: string | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, siteUrl?: string | null, title?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media_title_MediaTitle | null, coverImage?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media_coverImage_MediaCoverImage | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_anime_MediaConnection = { __typename?: 'MediaConnection', nodes?: Array<UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_anime_MediaConnection_nodes_Media | null> | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media_title_MediaTitle = { __typename?: 'MediaTitle', userPreferred?: string | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', extraLarge?: string | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, siteUrl?: string | null, title?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media_title_MediaTitle | null, coverImage?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media_coverImage_MediaCoverImage | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_manga_MediaConnection = { __typename?: 'MediaConnection', nodes?: Array<UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_manga_MediaConnection_nodes_Media | null> | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_name_CharacterName = { __typename?: 'CharacterName', userPreferred?: string | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_image_CharacterImage = { __typename?: 'CharacterImage', large?: string | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character = { __typename?: 'Character', id: number, gender?: string | null, siteUrl?: string | null, name?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_name_CharacterName | null, image?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_image_CharacterImage | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_characters_CharacterConnection = { __typename?: 'CharacterConnection', nodes?: Array<UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_characters_CharacterConnection_nodes_Character | null> | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites = { __typename?: 'Favourites', anime?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_anime_MediaConnection | null, manga?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_manga_MediaConnection | null, characters?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites_characters_CharacterConnection | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_user_User = { __typename?: 'User', id: number, name: string, about?: string | null, createdAt?: number | null, bannerImage?: string | null, siteUrl?: string | null, options?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_options_UserOptions | null, avatar?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_avatar_UserAvatar | null, favourites?: UserActivityQuery_Page_Page_activities_ListActivity_user_User_favourites_Favourites | null };

export type UserActivityQuery_Page_Page_activities_ListActivity_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type UserActivityQuery_Page_Page_activities_MessageActivity_recipient_User_options_UserOptions = { __typename?: 'UserOptions', profileColor?: string | null };

export type UserActivityQuery_Page_Page_activities_MessageActivity_recipient_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type UserActivityQuery_Page_Page_activities_MessageActivity_recipient_User = { __typename?: 'User', id: number, name: string, about?: string | null, createdAt?: number | null, bannerImage?: string | null, siteUrl?: string | null, options?: UserActivityQuery_Page_Page_activities_MessageActivity_recipient_User_options_UserOptions | null, avatar?: UserActivityQuery_Page_Page_activities_MessageActivity_recipient_User_avatar_UserAvatar | null };

export type UserActivityQuery_Page_Page_activities_MessageActivity_messenger_User_options_UserOptions = { __typename?: 'UserOptions', profileColor?: string | null };

export type UserActivityQuery_Page_Page_activities_MessageActivity_messenger_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type UserActivityQuery_Page_Page_activities_MessageActivity_messenger_User = { __typename?: 'User', id: number, name: string, about?: string | null, createdAt?: number | null, bannerImage?: string | null, siteUrl?: string | null, options?: UserActivityQuery_Page_Page_activities_MessageActivity_messenger_User_options_UserOptions | null, avatar?: UserActivityQuery_Page_Page_activities_MessageActivity_messenger_User_avatar_UserAvatar | null };

export type UserActivityQuery_Page_Page_activities_TextActivity_user_User_options_UserOptions = { __typename?: 'UserOptions', profileColor?: string | null };

export type UserActivityQuery_Page_Page_activities_TextActivity_user_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type UserActivityQuery_Page_Page_activities_TextActivity_user_User = { __typename?: 'User', id: number, name: string, about?: string | null, createdAt?: number | null, bannerImage?: string | null, siteUrl?: string | null, options?: UserActivityQuery_Page_Page_activities_TextActivity_user_User_options_UserOptions | null, avatar?: UserActivityQuery_Page_Page_activities_TextActivity_user_User_avatar_UserAvatar | null };

export type UserActivityQuery_Page_Page_activities_ListActivity = { __typename: 'ListActivity', id: number, progress?: string | null, status?: string | null, likeCount: number, createdAt: number, replyCount: number, siteUrl?: string | null, user?: UserActivityQuery_Page_Page_activities_ListActivity_user_User | null, media?: UserActivityQuery_Page_Page_activities_ListActivity_media_Media | null };

export type UserActivityQuery_Page_Page_activities_MessageActivity = { __typename: 'MessageActivity', id: number, recipientId?: number | null, messengerId?: number | null, type?: ActivityType | null, replyCount: number, message?: string | null, isLocked?: boolean | null, isSubscribed?: boolean | null, likeCount: number, isLiked?: boolean | null, isPrivate?: boolean | null, siteUrl?: string | null, createdAt: number, recipient?: UserActivityQuery_Page_Page_activities_MessageActivity_recipient_User | null, messenger?: UserActivityQuery_Page_Page_activities_MessageActivity_messenger_User | null };

export type UserActivityQuery_Page_Page_activities_TextActivity = { __typename: 'TextActivity', id: number, userId?: number | null, type?: ActivityType | null, replyCount: number, text?: string | null, siteUrl?: string | null, isLocked?: boolean | null, isSubscribed?: boolean | null, likeCount: number, isLiked?: boolean | null, isPinned?: boolean | null, createdAt: number, user?: UserActivityQuery_Page_Page_activities_TextActivity_user_User | null };

export type UserActivityQuery_Page_Page_activities = UserActivityQuery_Page_Page_activities_ListActivity | UserActivityQuery_Page_Page_activities_MessageActivity | UserActivityQuery_Page_Page_activities_TextActivity;

export type UserActivityQuery_Page_Page = { __typename?: 'Page', pageInfo?: UserActivityQuery_Page_Page_pageInfo_PageInfo | null, activities?: Array<UserActivityQuery_Page_Page_activities | null> | null };

export type UserActivityQuery_Query = { __typename?: 'Query', Page?: UserActivityQuery_Page_Page | null };


export type UserActivityQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserActivityQuery = UserActivityQuery_Query;

export type UserMetaDataFragment_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type UserMetaDataFragment_User_stats_UserStats_favouredGenresOverview_GenreStats = { __typename?: 'GenreStats', genre?: string | null, amount?: number | null, meanScore?: number | null, timeWatched?: number | null };

export type UserMetaDataFragment_User_stats_UserStats_activityHistory_UserActivityHistory = { __typename?: 'UserActivityHistory', date?: number | null, amount?: number | null, level?: number | null };

export type UserMetaDataFragment_User_stats_UserStats = { __typename?: 'UserStats', favouredGenresOverview?: Array<UserMetaDataFragment_User_stats_UserStats_favouredGenresOverview_GenreStats | null> | null, activityHistory?: Array<UserMetaDataFragment_User_stats_UserStats_activityHistory_UserActivityHistory | null> | null };

export type UserMetaDataFragment_User_statistics_UserStatisticTypes_anime_UserStatistics = { __typename?: 'UserStatistics', minutesWatched: number, episodesWatched: number, meanScore: number, count: number };

export type UserMetaDataFragment_User_statistics_UserStatisticTypes_manga_UserStatistics = { __typename?: 'UserStatistics', chaptersRead: number, volumesRead: number, meanScore: number, count: number };

export type UserMetaDataFragment_User_statistics_UserStatisticTypes = { __typename?: 'UserStatisticTypes', anime?: UserMetaDataFragment_User_statistics_UserStatisticTypes_anime_UserStatistics | null, manga?: UserMetaDataFragment_User_statistics_UserStatisticTypes_manga_UserStatistics | null };

export type UserMetaDataFragment_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null };

export type UserMetaDataFragment_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null };

export type UserMetaDataFragment_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null, animeList?: UserMetaDataFragment_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions | null, mangaList?: UserMetaDataFragment_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions | null };

export type UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_nodes_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', extraLarge?: string | null, color?: string | null };

export type UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_nodes_Media_title_MediaTitle = { __typename?: 'MediaTitle', english?: string | null, native?: string | null, romaji?: string | null };

export type UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_nodes_Media_stats_MediaStats_scoreDistribution_ScoreDistribution = { __typename?: 'ScoreDistribution', score?: number | null, amount?: number | null };

export type UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_nodes_Media_stats_MediaStats = { __typename?: 'MediaStats', scoreDistribution?: Array<UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_nodes_Media_stats_MediaStats_scoreDistribution_ScoreDistribution | null> | null };

export type UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, averageScore?: number | null, meanScore?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, genres?: Array<string | null> | null, episodes?: number | null, status?: MediaStatus | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, isLicensed?: boolean | null, isFavourite: boolean, coverImage?: UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_nodes_Media_coverImage_MediaCoverImage | null, title?: UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_nodes_Media_title_MediaTitle | null, stats?: UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_nodes_Media_stats_MediaStats | null };

export type UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection = { __typename?: 'MediaConnection', pageInfo?: UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_pageInfo_PageInfo | null, nodes?: Array<UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection_nodes_Media | null> | null };

export type UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_nodes_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', extraLarge?: string | null, color?: string | null };

export type UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_nodes_Media_title_MediaTitle = { __typename?: 'MediaTitle', english?: string | null, native?: string | null, romaji?: string | null };

export type UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_nodes_Media_stats_MediaStats_scoreDistribution_ScoreDistribution = { __typename?: 'ScoreDistribution', score?: number | null, amount?: number | null };

export type UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_nodes_Media_stats_MediaStats = { __typename?: 'MediaStats', scoreDistribution?: Array<UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_nodes_Media_stats_MediaStats_scoreDistribution_ScoreDistribution | null> | null };

export type UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, averageScore?: number | null, meanScore?: number | null, bannerImage?: string | null, chapters?: number | null, volumes?: number | null, type?: MediaType | null, format?: MediaFormat | null, genres?: Array<string | null> | null, status?: MediaStatus | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, isLicensed?: boolean | null, isFavourite: boolean, coverImage?: UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_nodes_Media_coverImage_MediaCoverImage | null, title?: UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_nodes_Media_title_MediaTitle | null, stats?: UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_nodes_Media_stats_MediaStats | null };

export type UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection = { __typename?: 'MediaConnection', pageInfo?: UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_pageInfo_PageInfo | null, nodes?: Array<UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection_nodes_Media | null> | null };

export type UserMetaDataFragment_User_favourites_Favourites_characters_CharacterConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type UserMetaDataFragment_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_name_CharacterName = { __typename?: 'CharacterName', full?: string | null, native?: string | null };

export type UserMetaDataFragment_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_image_CharacterImage = { __typename?: 'CharacterImage', large?: string | null };

export type UserMetaDataFragment_User_favourites_Favourites_characters_CharacterConnection_nodes_Character = { __typename?: 'Character', id: number, gender?: string | null, isFavourite: boolean, name?: UserMetaDataFragment_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_name_CharacterName | null, image?: UserMetaDataFragment_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_image_CharacterImage | null };

export type UserMetaDataFragment_User_favourites_Favourites_characters_CharacterConnection = { __typename?: 'CharacterConnection', pageInfo?: UserMetaDataFragment_User_favourites_Favourites_characters_CharacterConnection_pageInfo_PageInfo | null, nodes?: Array<UserMetaDataFragment_User_favourites_Favourites_characters_CharacterConnection_nodes_Character | null> | null };

export type UserMetaDataFragment_User_favourites_Favourites = { __typename?: 'Favourites', anime?: UserMetaDataFragment_User_favourites_Favourites_anime_MediaConnection | null, manga?: UserMetaDataFragment_User_favourites_Favourites_manga_MediaConnection | null, characters?: UserMetaDataFragment_User_favourites_Favourites_characters_CharacterConnection | null };

export type UserMetaDataFragment = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, about?: string | null, siteUrl?: string | null, createdAt?: number | null, unreadNotificationCount?: number | null, aboutHTML?: string | null, avatar?: UserMetaDataFragment_User_avatar_UserAvatar | null, stats?: UserMetaDataFragment_User_stats_UserStats | null, statistics?: UserMetaDataFragment_User_statistics_UserStatisticTypes | null, mediaListOptions?: UserMetaDataFragment_User_mediaListOptions_MediaListOptions | null, favourites?: UserMetaDataFragment_User_favourites_Favourites | null };

export type UserDataQuery_User_User = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, about?: string | null, siteUrl?: string | null, createdAt?: number | null, unreadNotificationCount?: number | null, aboutHTML?: string | null, avatar?: UserMetaDataFragment_User_avatar_UserAvatar | null, stats?: UserMetaDataFragment_User_stats_UserStats | null, statistics?: UserMetaDataFragment_User_statistics_UserStatisticTypes | null, mediaListOptions?: UserMetaDataFragment_User_mediaListOptions_MediaListOptions | null, favourites?: UserMetaDataFragment_User_favourites_Favourites | null };

export type UserDataQuery_Query = { __typename?: 'Query', User?: UserDataQuery_User_User | null };


export type UserDataQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  favoritesPerPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserDataQuery = UserDataQuery_Query;

export type ViewerDataQuery_Viewer_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null };

export type ViewerDataQuery_Viewer_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null };

export type ViewerDataQuery_Viewer_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions = { __typename?: 'MediaListTypeOptions', customLists?: Array<string | null> | null };

export type ViewerDataQuery_Viewer_User_mediaListOptions_MediaListOptions = { __typename?: 'MediaListOptions', scoreFormat?: ScoreFormat | null, animeList?: ViewerDataQuery_Viewer_User_mediaListOptions_MediaListOptions_animeList_MediaListTypeOptions | null, mangaList?: ViewerDataQuery_Viewer_User_mediaListOptions_MediaListOptions_mangaList_MediaListTypeOptions | null };

export type ViewerDataQuery_Viewer_User = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, unreadNotificationCount?: number | null, avatar?: ViewerDataQuery_Viewer_User_avatar_UserAvatar | null, mediaListOptions?: ViewerDataQuery_Viewer_User_mediaListOptions_MediaListOptions | null };

export type ViewerDataQuery_Query = { __typename?: 'Query', Viewer?: ViewerDataQuery_Viewer_User | null };


export type ViewerDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerDataQuery = ViewerDataQuery_Query;

export type UserOverviewQuery_following_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, hasNextPage?: boolean | null };

export type UserOverviewQuery_following_Page_following_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null, medium?: string | null };

export type UserOverviewQuery_following_Page_following_User = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, isFollowing?: boolean | null, isFollower?: boolean | null, isBlocked?: boolean | null, siteUrl?: string | null, createdAt?: number | null, aboutHTML?: string | null, avatar?: UserOverviewQuery_following_Page_following_User_avatar_UserAvatar | null };

export type UserOverviewQuery_following_Page = { __typename?: 'Page', pageInfo?: UserOverviewQuery_following_Page_pageInfo_PageInfo | null, following?: Array<UserOverviewQuery_following_Page_following_User | null> | null };

export type UserOverviewQuery_followers_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, hasNextPage?: boolean | null };

export type UserOverviewQuery_followers_Page_followers_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null, medium?: string | null };

export type UserOverviewQuery_followers_Page_followers_User = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, isFollowing?: boolean | null, isFollower?: boolean | null, isBlocked?: boolean | null, siteUrl?: string | null, createdAt?: number | null, aboutHTML?: string | null, avatar?: UserOverviewQuery_followers_Page_followers_User_avatar_UserAvatar | null };

export type UserOverviewQuery_followers_Page = { __typename?: 'Page', pageInfo?: UserOverviewQuery_followers_Page_pageInfo_PageInfo | null, followers?: Array<UserOverviewQuery_followers_Page_followers_User | null> | null };

export type UserOverviewQuery_reviews_Page_reviews_Review = { __typename?: 'Review', id: number, summary?: string | null, rating?: number | null, ratingAmount?: number | null, score?: number | null, createdAt: number, updatedAt: number };

export type UserOverviewQuery_reviews_Page = { __typename?: 'Page', reviews?: Array<UserOverviewQuery_reviews_Page_reviews_Review | null> | null };

export type UserOverviewQuery_list_Page_mediaList_MediaList_media_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type UserOverviewQuery_list_Page_mediaList_MediaList = { __typename?: 'MediaList', media?: UserOverviewQuery_list_Page_mediaList_MediaList_media_Media | null };

export type UserOverviewQuery_list_Page = { __typename?: 'Page', mediaList?: Array<UserOverviewQuery_list_Page_mediaList_MediaList | null> | null };

export type UserOverviewQuery_Query = { __typename?: 'Query', following?: UserOverviewQuery_following_Page | null, followers?: UserOverviewQuery_followers_Page | null, reviews?: UserOverviewQuery_reviews_Page | null, list?: UserOverviewQuery_list_Page | null };


export type UserOverviewQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  followingPerPage?: InputMaybe<Scalars['Int']['input']>;
  followersPerPage?: InputMaybe<Scalars['Int']['input']>;
  reviewsPerPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserOverviewQuery = UserOverviewQuery_Query;

export type UserFollowingQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, hasNextPage?: boolean | null, currentPage?: number | null };

export type UserFollowingQuery_Page_Page_following_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null, medium?: string | null };

export type UserFollowingQuery_Page_Page_following_User = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, isFollowing?: boolean | null, isFollower?: boolean | null, isBlocked?: boolean | null, siteUrl?: string | null, createdAt?: number | null, aboutHTML?: string | null, avatar?: UserFollowingQuery_Page_Page_following_User_avatar_UserAvatar | null };

export type UserFollowingQuery_Page_Page = { __typename?: 'Page', pageInfo?: UserFollowingQuery_Page_Page_pageInfo_PageInfo | null, following?: Array<UserFollowingQuery_Page_Page_following_User | null> | null };

export type UserFollowingQuery_Query = { __typename?: 'Query', Page?: UserFollowingQuery_Page_Page | null };


export type UserFollowingQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserFollowingQuery = UserFollowingQuery_Query;

export type UserFollowersQuery_Page_Page_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, hasNextPage?: boolean | null, currentPage?: number | null };

export type UserFollowersQuery_Page_Page_followers_User_avatar_UserAvatar = { __typename?: 'UserAvatar', large?: string | null, medium?: string | null };

export type UserFollowersQuery_Page_Page_followers_User = { __typename?: 'User', id: number, name: string, bannerImage?: string | null, isFollowing?: boolean | null, isFollower?: boolean | null, isBlocked?: boolean | null, siteUrl?: string | null, createdAt?: number | null, aboutHTML?: string | null, avatar?: UserFollowersQuery_Page_Page_followers_User_avatar_UserAvatar | null };

export type UserFollowersQuery_Page_Page = { __typename?: 'Page', pageInfo?: UserFollowersQuery_Page_Page_pageInfo_PageInfo | null, followers?: Array<UserFollowersQuery_Page_Page_followers_User | null> | null };

export type UserFollowersQuery_Query = { __typename?: 'Query', Page?: UserFollowersQuery_Page_Page | null };


export type UserFollowersQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserFollowersQuery = UserFollowersQuery_Query;

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', extraLarge?: string | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, coverImage?: UserFavoritesOverviewQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media_coverImage_MediaCoverImage | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_anime_MediaConnection = { __typename?: 'MediaConnection', nodes?: Array<UserFavoritesOverviewQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media | null> | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media_coverImage_MediaCoverImage = { __typename?: 'MediaCoverImage', extraLarge?: string | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, coverImage?: UserFavoritesOverviewQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media_coverImage_MediaCoverImage | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_manga_MediaConnection = { __typename?: 'MediaConnection', nodes?: Array<UserFavoritesOverviewQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media | null> | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_image_CharacterImage = { __typename?: 'CharacterImage', large?: string | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_characters_CharacterConnection_nodes_Character = { __typename?: 'Character', id: number, image?: UserFavoritesOverviewQuery_User_User_favourites_Favourites_characters_CharacterConnection_nodes_Character_image_CharacterImage | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_characters_CharacterConnection = { __typename?: 'CharacterConnection', nodes?: Array<UserFavoritesOverviewQuery_User_User_favourites_Favourites_characters_CharacterConnection_nodes_Character | null> | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_staff_StaffConnection_nodes_Staff_image_StaffImage = { __typename?: 'StaffImage', large?: string | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_staff_StaffConnection_nodes_Staff = { __typename?: 'Staff', id: number, image?: UserFavoritesOverviewQuery_User_User_favourites_Favourites_staff_StaffConnection_nodes_Staff_image_StaffImage | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_staff_StaffConnection = { __typename?: 'StaffConnection', nodes?: Array<UserFavoritesOverviewQuery_User_User_favourites_Favourites_staff_StaffConnection_nodes_Staff | null> | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_studios_StudioConnection_nodes_Studio = { __typename?: 'Studio', id: number, name: string };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites_studios_StudioConnection = { __typename?: 'StudioConnection', nodes?: Array<UserFavoritesOverviewQuery_User_User_favourites_Favourites_studios_StudioConnection_nodes_Studio | null> | null };

export type UserFavoritesOverviewQuery_User_User_favourites_Favourites = { __typename?: 'Favourites', anime?: UserFavoritesOverviewQuery_User_User_favourites_Favourites_anime_MediaConnection | null, manga?: UserFavoritesOverviewQuery_User_User_favourites_Favourites_manga_MediaConnection | null, characters?: UserFavoritesOverviewQuery_User_User_favourites_Favourites_characters_CharacterConnection | null, staff?: UserFavoritesOverviewQuery_User_User_favourites_Favourites_staff_StaffConnection | null, studios?: UserFavoritesOverviewQuery_User_User_favourites_Favourites_studios_StudioConnection | null };

export type UserFavoritesOverviewQuery_User_User = { __typename?: 'User', favourites?: UserFavoritesOverviewQuery_User_User_favourites_Favourites | null };

export type UserFavoritesOverviewQuery_Query = { __typename?: 'Query', User?: UserFavoritesOverviewQuery_User_User | null };


export type UserFavoritesOverviewQueryVariables = Exact<{
  userID?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserFavoritesOverviewQuery = UserFavoritesOverviewQuery_Query;

export type UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media_characters_CharacterConnection_nodes_Character_name_CharacterName = { __typename?: 'CharacterName', full?: string | null, native?: string | null, alternative?: Array<string | null> | null };

export type UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media_characters_CharacterConnection_nodes_Character = { __typename?: 'Character', id: number, name?: UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media_characters_CharacterConnection_nodes_Character_name_CharacterName | null };

export type UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media_characters_CharacterConnection = { __typename?: 'CharacterConnection', nodes?: Array<UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media_characters_CharacterConnection_nodes_Character | null> | null };

export type UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, characters?: UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media_characters_CharacterConnection | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection = { __typename?: 'MediaConnection', pageInfo?: UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_pageInfo_PageInfo | null, nodes?: Array<UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection_nodes_Media | null> | null };

export type UserAnimeFavoritesQuery_User_User_favourites_Favourites = { __typename?: 'Favourites', anime?: UserAnimeFavoritesQuery_User_User_favourites_Favourites_anime_MediaConnection | null };

export type UserAnimeFavoritesQuery_User_User = { __typename?: 'User', favourites?: UserAnimeFavoritesQuery_User_User_favourites_Favourites | null };

export type UserAnimeFavoritesQuery_Query = { __typename?: 'Query', User?: UserAnimeFavoritesQuery_User_User | null };


export type UserAnimeFavoritesQueryVariables = Exact<{
  userID?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserAnimeFavoritesQuery = UserAnimeFavoritesQuery_Query;

export type UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media_characters_CharacterConnection_nodes_Character_name_CharacterName = { __typename?: 'CharacterName', full?: string | null, native?: string | null, alternative?: Array<string | null> | null };

export type UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media_characters_CharacterConnection_nodes_Character = { __typename?: 'Character', id: number, name?: UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media_characters_CharacterConnection_nodes_Character_name_CharacterName | null };

export type UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media_characters_CharacterConnection = { __typename?: 'CharacterConnection', nodes?: Array<UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media_characters_CharacterConnection_nodes_Character | null> | null };

export type UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media = { __typename?: 'Media', id: number, idMal?: number | null, bannerImage?: string | null, type?: MediaType | null, format?: MediaFormat | null, isFavourite: boolean, description?: string | null, genres?: Array<string | null> | null, status?: MediaStatus | null, siteUrl?: string | null, meanScore?: number | null, averageScore?: number | null, episodes?: number | null, chapters?: number | null, volumes?: number | null, duration?: number | null, season?: MediaSeason | null, isLicensed?: boolean | null, isAdult?: boolean | null, synonyms?: Array<string | null> | null, popularity?: number | null, countryOfOrigin?: any | null, descriptionHTML?: string | null, characters?: UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media_characters_CharacterConnection | null, startDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_startDate_FuzzyDate | null, endDate?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_endDate_FuzzyDate | null, title?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_title_MediaTitle | null, coverImage?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_coverImage_MediaCoverImage | null, mediaListEntry?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_mediaListEntry_MediaList | null, stats?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_stats_MediaStats | null, nextAiringEpisode?: WeeklyAnimeQuery_Page_Page_airingSchedules_AiringSchedule_media_Media_nextAiringEpisode_AiringSchedule | null };

export type UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection = { __typename?: 'MediaConnection', pageInfo?: UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_pageInfo_PageInfo | null, nodes?: Array<UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection_nodes_Media | null> | null };

export type UserMangaFavoritesQuery_User_User_favourites_Favourites = { __typename?: 'Favourites', manga?: UserMangaFavoritesQuery_User_User_favourites_Favourites_manga_MediaConnection | null };

export type UserMangaFavoritesQuery_User_User = { __typename?: 'User', favourites?: UserMangaFavoritesQuery_User_User_favourites_Favourites | null };

export type UserMangaFavoritesQuery_Query = { __typename?: 'Query', User?: UserMangaFavoritesQuery_User_User | null };


export type UserMangaFavoritesQueryVariables = Exact<{
  userID?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserMangaFavoritesQuery = UserMangaFavoritesQuery_Query;

export type UserWaifuFavoritesQuery_User_User_favourites_Favourites_characters_CharacterConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type UserWaifuFavoritesQuery_User_User_favourites_Favourites_characters_CharacterConnection_nodes_Character = { __typename?: 'Character', id: number, isFavourite: boolean, gender?: string | null, description?: string | null, favourites?: number | null, siteUrl?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_name_CharacterName | null, image?: AniMediaQuery_Media_Media_characters_CharacterConnection_edges_CharacterEdge_node_Character_image_CharacterImage | null };

export type UserWaifuFavoritesQuery_User_User_favourites_Favourites_characters_CharacterConnection = { __typename?: 'CharacterConnection', pageInfo?: UserWaifuFavoritesQuery_User_User_favourites_Favourites_characters_CharacterConnection_pageInfo_PageInfo | null, nodes?: Array<UserWaifuFavoritesQuery_User_User_favourites_Favourites_characters_CharacterConnection_nodes_Character | null> | null };

export type UserWaifuFavoritesQuery_User_User_favourites_Favourites = { __typename?: 'Favourites', characters?: UserWaifuFavoritesQuery_User_User_favourites_Favourites_characters_CharacterConnection | null };

export type UserWaifuFavoritesQuery_User_User = { __typename?: 'User', favourites?: UserWaifuFavoritesQuery_User_User_favourites_Favourites | null };

export type UserWaifuFavoritesQuery_Query = { __typename?: 'Query', User?: UserWaifuFavoritesQuery_User_User | null };


export type UserWaifuFavoritesQueryVariables = Exact<{
  userID?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserWaifuFavoritesQuery = UserWaifuFavoritesQuery_Query;

export type UserStaffFavoritesQuery_User_User_favourites_Favourites_staff_StaffConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type UserStaffFavoritesQuery_User_User_favourites_Favourites_staff_StaffConnection_nodes_Staff = { __typename?: 'Staff', id: number, isFavourite: boolean, description?: string | null, gender?: string | null, favourites?: number | null, siteUrl?: string | null, language?: string | null, descriptionHTML?: string | null, dateOfBirth?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_dateOfBirth_FuzzyDate | null, name?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_name_StaffName | null, image?: AniMediaQuery_Media_Media_staff_StaffConnection_edges_StaffEdge_node_Staff_image_StaffImage | null };

export type UserStaffFavoritesQuery_User_User_favourites_Favourites_staff_StaffConnection = { __typename?: 'StaffConnection', pageInfo?: UserStaffFavoritesQuery_User_User_favourites_Favourites_staff_StaffConnection_pageInfo_PageInfo | null, nodes?: Array<UserStaffFavoritesQuery_User_User_favourites_Favourites_staff_StaffConnection_nodes_Staff | null> | null };

export type UserStaffFavoritesQuery_User_User_favourites_Favourites = { __typename?: 'Favourites', staff?: UserStaffFavoritesQuery_User_User_favourites_Favourites_staff_StaffConnection | null };

export type UserStaffFavoritesQuery_User_User = { __typename?: 'User', favourites?: UserStaffFavoritesQuery_User_User_favourites_Favourites | null };

export type UserStaffFavoritesQuery_Query = { __typename?: 'Query', User?: UserStaffFavoritesQuery_User_User | null };


export type UserStaffFavoritesQueryVariables = Exact<{
  userID?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserStaffFavoritesQuery = UserStaffFavoritesQuery_Query;

export type UserStudiosFavoritesQuery_User_User_favourites_Favourites_studios_StudioConnection_pageInfo_PageInfo = { __typename?: 'PageInfo', total?: number | null, perPage?: number | null, currentPage?: number | null, hasNextPage?: boolean | null, lastPage?: number | null };

export type UserStudiosFavoritesQuery_User_User_favourites_Favourites_studios_StudioConnection_nodes_Studio = { __typename?: 'Studio', id: number, name: string, isAnimationStudio: boolean, isFavourite: boolean };

export type UserStudiosFavoritesQuery_User_User_favourites_Favourites_studios_StudioConnection = { __typename?: 'StudioConnection', pageInfo?: UserStudiosFavoritesQuery_User_User_favourites_Favourites_studios_StudioConnection_pageInfo_PageInfo | null, nodes?: Array<UserStudiosFavoritesQuery_User_User_favourites_Favourites_studios_StudioConnection_nodes_Studio | null> | null };

export type UserStudiosFavoritesQuery_User_User_favourites_Favourites = { __typename?: 'Favourites', studios?: UserStudiosFavoritesQuery_User_User_favourites_Favourites_studios_StudioConnection | null };

export type UserStudiosFavoritesQuery_User_User = { __typename?: 'User', favourites?: UserStudiosFavoritesQuery_User_User_favourites_Favourites | null };

export type UserStudiosFavoritesQuery_Query = { __typename?: 'Query', User?: UserStudiosFavoritesQuery_User_User | null };


export type UserStudiosFavoritesQueryVariables = Exact<{
  userID?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserStudiosFavoritesQuery = UserStudiosFavoritesQuery_Query;


export const MediaListEntryMetaFragmentDoc = `
    fragment MediaListEntryMeta on MediaList {
  id
  mediaId
  status
  score
  advancedScores
  progress
  progressVolumes
  repeat
  startedAt {
    year
    month
    day
  }
  completedAt {
    year
    month
    day
  }
  notes
  private
  hiddenFromStatusLists
  customLists(asArray: true)
  updatedAt
  createdAt
  user {
    mediaListOptions {
      animeList {
        customLists
      }
      mangaList {
        customLists
      }
      scoreFormat
    }
  }
}
    `;
export const MainMetaFragmentDoc = `
    fragment MainMeta on Media {
  id
  idMal
  bannerImage
  type
  format
  isFavourite
  description
  descriptionHTML: description(asHtml: true)
  genres
  status(version: 2)
  siteUrl
  meanScore
  averageScore
  episodes
  chapters
  volumes
  duration
  season
  isLicensed
  isAdult
  synonyms
  popularity
  countryOfOrigin
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  title {
    english
    native
    romaji
    userPreferred
  }
  coverImage {
    medium
    large
    extraLarge
    color
  }
  mediaListEntry {
    ...MediaListEntryMeta
  }
  stats {
    scoreDistribution {
      score
      amount
    }
  }
  chapters
  volumes
  episodes
  nextAiringEpisode {
    id
    airingAt
    timeUntilAiring
    episode
    mediaId
  }
}
    `;
export const MediaListEntryFragmentDoc = `
    fragment mediaListEntry on MediaList {
  id
  mediaId
  status
  score
  progress
  progressVolumes
  repeat
  priority
  private
  hiddenFromStatusLists
  customLists
  advancedScores
  createdAt
  notes
  updatedAt
  startedAt {
    year
    month
    day
  }
  completedAt {
    year
    month
    day
  }
  media {
    ...MainMeta
    synonyms
    tags {
      id
      name
      description
      isAdult
      isMediaSpoiler
      isGeneralSpoiler
      category
    }
  }
}
    `;
export const MediaFragmentDoc = `
    fragment media on Media {
  id
  type
  format
  status
  idMal
  title {
    userPreferred
    native
    romaji
    english
  }
  mediaListEntry {
    status
  }
  bannerImage
  coverImage {
    extraLarge
    large
    color
  }
  siteUrl
}
    `;
export const UserFragmentDoc = `
    fragment user on User {
  id
  name
  avatar {
    large
  }
  siteUrl
}
    `;
export const ThreadFragmentDoc = `
    fragment thread on Thread {
  id
  title
  siteUrl
}
    `;
export const ActivityFragmentDoc = `
    fragment activity on ActivityUnion {
  __typename
  ... on TextActivity {
    id
    siteUrl
  }
  ... on ListActivity {
    id
    siteUrl
  }
  ... on MessageActivity {
    id
    siteUrl
  }
}
    `;
export const CharacterMetaDataFragmentDoc = `
    fragment CharacterMetaData on Character {
  id
  isFavourite
  dateOfBirth {
    year
    month
    day
  }
  name {
    full
    native
  }
  image {
    large
  }
  gender
  description
  favourites
  descriptionHTML: description(asHtml: true)
  siteUrl
}
    `;
export const StaffMetaDataFragmentDoc = `
    fragment StaffMetaData on Staff {
  id
  isFavourite
  dateOfBirth {
    year
    month
    day
  }
  name {
    full
    native
  }
  image {
    large
  }
  description
  gender
  favourites
  language: languageV2
  descriptionHTML: description(asHtml: true)
  siteUrl
}
    `;
export const UserSearchMetaFragmentDoc = `
    fragment UserSearchMeta on User {
  id
  name
  aboutHTML: about(asHtml: true)
  isFollowing
  isFollower
  avatar {
    large
  }
  mediaListOptions {
    scoreFormat
  }
  createdAt
  siteUrl
}
    `;
export const SiteTrendFragmentDoc = `
    fragment siteTrend on SiteTrendConnection {
  nodes {
    date
    count
    change
  }
}
    `;
export const UserMetaDataFragmentDoc = `
    fragment UserMetaData on User {
  id
  name
  avatar {
    large
  }
  bannerImage
  about
  aboutHTML: about(asHtml: true)
  stats {
    favouredGenresOverview {
      genre
      amount
      meanScore
      timeWatched
    }
    activityHistory {
      date
      amount
      level
    }
  }
  statistics {
    anime {
      minutesWatched
      episodesWatched
      meanScore
      count
    }
    manga {
      chaptersRead
      volumesRead
      meanScore
      count
    }
  }
  mediaListOptions {
    scoreFormat
    animeList {
      customLists
    }
    mangaList {
      customLists
    }
  }
  favourites {
    anime(page: 1, perPage: $favoritesPerPage) {
      pageInfo {
        total
        perPage
        currentPage
        hasNextPage
        lastPage
      }
      nodes {
        id
        coverImage {
          extraLarge
          color
        }
        title {
          english
          native
          romaji
        }
        averageScore
        meanScore
        bannerImage
        type
        format
        genres
        episodes
        status
        isAdult
        synonyms
        isLicensed
        isFavourite
        stats {
          scoreDistribution {
            score
            amount
          }
        }
      }
    }
    manga(page: 1, perPage: $favoritesPerPage) {
      pageInfo {
        total
        perPage
        currentPage
        hasNextPage
        lastPage
      }
      nodes {
        id
        coverImage {
          extraLarge
          color
        }
        title {
          english
          native
          romaji
        }
        averageScore
        meanScore
        bannerImage
        chapters
        volumes
        type
        format
        genres
        status
        isAdult
        synonyms
        isLicensed
        isFavourite
        stats {
          scoreDistribution {
            score
            amount
          }
        }
      }
    }
    characters(page: 1, perPage: $favoritesPerPage) {
      pageInfo {
        total
        perPage
        currentPage
        hasNextPage
        lastPage
      }
      nodes {
        id
        name {
          full
          native
        }
        gender
        isFavourite
        image {
          large
        }
      }
    }
  }
  siteUrl
  createdAt
  unreadNotificationCount
}
    `;
export const ToggleFavDocument = `
    mutation ToggleFav($animeId: Int, $mangaId: Int, $characterId: Int, $staffId: Int, $studioId: Int) {
  ToggleFavourite(
    animeId: $animeId
    mangaId: $mangaId
    characterId: $characterId
    staffId: $staffId
    studioId: $studioId
  ) {
    __typename
    anime {
      edges {
        node {
          id
          isFavourite
        }
      }
    }
    manga {
      edges {
        node {
          id
          isFavourite
        }
      }
    }
    characters {
      edges {
        node {
          id
          isFavourite
        }
      }
    }
    staff {
      edges {
        node {
          id
          isFavourite
        }
      }
    }
    studios {
      edges {
        node {
          id
          isFavourite
        }
      }
    }
  }
}
    `;

export const useToggleFavMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ToggleFavMutation, TError, ToggleFavMutationVariables, TContext>) => {
    
    return useMutation<ToggleFavMutation, TError, ToggleFavMutationVariables, TContext>(
      {
    mutationKey: ['ToggleFav'],
    mutationFn: (variables?: ToggleFavMutationVariables) => fetchAnilistData<ToggleFavMutation, ToggleFavMutationVariables>(ToggleFavDocument, variables)(),
    ...options
  }
    )};


useToggleFavMutation.fetcher = (variables?: ToggleFavMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<ToggleFavMutation, ToggleFavMutationVariables>(ToggleFavDocument, variables, options);

export const SaveMediaListItemDocument = `
    mutation SaveMediaListItem($id: Int, $mediaId: Int, $status: MediaListStatus, $score: Float, $scoreRaw: Int, $progress: Int, $progressVolumes: Int, $private: Boolean, $hideFromStatusList: Boolean, $repeat: Int, $startedAt: FuzzyDateInput, $completedAt: FuzzyDateInput, $notes: String, $customLists: [String]) {
  SaveMediaListEntry(
    id: $id
    mediaId: $mediaId
    status: $status
    score: $score
    progress: $progress
    progressVolumes: $progressVolumes
    repeat: $repeat
    startedAt: $startedAt
    completedAt: $completedAt
    notes: $notes
    private: $private
    hiddenFromStatusLists: $hideFromStatusList
    scoreRaw: $scoreRaw
    customLists: $customLists
  ) {
    ...MediaListEntryMeta
    media {
      id
      type
      countryOfOrigin
    }
  }
}
    ${MediaListEntryMetaFragmentDoc}`;

export const useSaveMediaListItemMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveMediaListItemMutation, TError, SaveMediaListItemMutationVariables, TContext>) => {
    
    return useMutation<SaveMediaListItemMutation, TError, SaveMediaListItemMutationVariables, TContext>(
      {
    mutationKey: ['SaveMediaListItem'],
    mutationFn: (variables?: SaveMediaListItemMutationVariables) => fetchAnilistData<SaveMediaListItemMutation, SaveMediaListItemMutationVariables>(SaveMediaListItemDocument, variables)(),
    ...options
  }
    )};


useSaveMediaListItemMutation.fetcher = (variables?: SaveMediaListItemMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<SaveMediaListItemMutation, SaveMediaListItemMutationVariables>(SaveMediaListItemDocument, variables, options);

export const DeleteMediaListItemDocument = `
    mutation DeleteMediaListItem($id: Int) {
  DeleteMediaListEntry(id: $id) {
    deleted
  }
}
    `;

export const useDeleteMediaListItemMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteMediaListItemMutation, TError, DeleteMediaListItemMutationVariables, TContext>) => {
    
    return useMutation<DeleteMediaListItemMutation, TError, DeleteMediaListItemMutationVariables, TContext>(
      {
    mutationKey: ['DeleteMediaListItem'],
    mutationFn: (variables?: DeleteMediaListItemMutationVariables) => fetchAnilistData<DeleteMediaListItemMutation, DeleteMediaListItemMutationVariables>(DeleteMediaListItemDocument, variables)(),
    ...options
  }
    )};


useDeleteMediaListItemMutation.fetcher = (variables?: DeleteMediaListItemMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<DeleteMediaListItemMutation, DeleteMediaListItemMutationVariables>(DeleteMediaListItemDocument, variables, options);

export const ChangeLanguageDocument = `
    mutation ChangeLanguage($titleLanguage: UserTitleLanguage, $staffNameLanguage: UserStaffNameLanguage) {
  UpdateUser(titleLanguage: $titleLanguage, staffNameLanguage: $staffNameLanguage) {
    id
  }
}
    `;

export const useChangeLanguageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ChangeLanguageMutation, TError, ChangeLanguageMutationVariables, TContext>) => {
    
    return useMutation<ChangeLanguageMutation, TError, ChangeLanguageMutationVariables, TContext>(
      {
    mutationKey: ['ChangeLanguage'],
    mutationFn: (variables?: ChangeLanguageMutationVariables) => fetchAnilistData<ChangeLanguageMutation, ChangeLanguageMutationVariables>(ChangeLanguageDocument, variables)(),
    ...options
  }
    )};


useChangeLanguageMutation.fetcher = (variables?: ChangeLanguageMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<ChangeLanguageMutation, ChangeLanguageMutationVariables>(ChangeLanguageDocument, variables, options);

export const UpdateViewerDocument = `
    mutation UpdateViewer($notificationOptions: [NotificationOptionInput], $displayNSFW: Boolean) {
  UpdateUser(
    displayAdultContent: $displayNSFW
    notificationOptions: $notificationOptions
  ) {
    id
  }
}
    `;

export const useUpdateViewerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateViewerMutation, TError, UpdateViewerMutationVariables, TContext>) => {
    
    return useMutation<UpdateViewerMutation, TError, UpdateViewerMutationVariables, TContext>(
      {
    mutationKey: ['UpdateViewer'],
    mutationFn: (variables?: UpdateViewerMutationVariables) => fetchAnilistData<UpdateViewerMutation, UpdateViewerMutationVariables>(UpdateViewerDocument, variables)(),
    ...options
  }
    )};


useUpdateViewerMutation.fetcher = (variables?: UpdateViewerMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<UpdateViewerMutation, UpdateViewerMutationVariables>(UpdateViewerDocument, variables, options);

export const SaveRecomDocument = `
    mutation SaveRecom($mediaId: Int, $mediaRecommendationId: Int, $rating: RecommendationRating) {
  SaveRecommendation(
    mediaId: $mediaId
    mediaRecommendationId: $mediaRecommendationId
    rating: $rating
  ) {
    rating
    userRating
  }
}
    `;

export const useSaveRecomMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveRecomMutation, TError, SaveRecomMutationVariables, TContext>) => {
    
    return useMutation<SaveRecomMutation, TError, SaveRecomMutationVariables, TContext>(
      {
    mutationKey: ['SaveRecom'],
    mutationFn: (variables?: SaveRecomMutationVariables) => fetchAnilistData<SaveRecomMutation, SaveRecomMutationVariables>(SaveRecomDocument, variables)(),
    ...options
  }
    )};


useSaveRecomMutation.fetcher = (variables?: SaveRecomMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<SaveRecomMutation, SaveRecomMutationVariables>(SaveRecomDocument, variables, options);

export const DeleteActDocument = `
    mutation DeleteAct($id: Int) {
  DeleteActivity(id: $id) {
    deleted
  }
}
    `;

export const useDeleteActMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteActMutation, TError, DeleteActMutationVariables, TContext>) => {
    
    return useMutation<DeleteActMutation, TError, DeleteActMutationVariables, TContext>(
      {
    mutationKey: ['DeleteAct'],
    mutationFn: (variables?: DeleteActMutationVariables) => fetchAnilistData<DeleteActMutation, DeleteActMutationVariables>(DeleteActDocument, variables)(),
    ...options
  }
    )};


useDeleteActMutation.fetcher = (variables?: DeleteActMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<DeleteActMutation, DeleteActMutationVariables>(DeleteActDocument, variables, options);

export const ReviewRatingDocument = `
    mutation ReviewRating($id: Int, $rating: ReviewRating) {
  RateReview(reviewId: $id, rating: $rating) {
    id
    userRating
    rating
    ratingAmount
  }
}
    `;

export const useReviewRatingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ReviewRatingMutation, TError, ReviewRatingMutationVariables, TContext>) => {
    
    return useMutation<ReviewRatingMutation, TError, ReviewRatingMutationVariables, TContext>(
      {
    mutationKey: ['ReviewRating'],
    mutationFn: (variables?: ReviewRatingMutationVariables) => fetchAnilistData<ReviewRatingMutation, ReviewRatingMutationVariables>(ReviewRatingDocument, variables)(),
    ...options
  }
    )};


useReviewRatingMutation.fetcher = (variables?: ReviewRatingMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<ReviewRatingMutation, ReviewRatingMutationVariables>(ReviewRatingDocument, variables, options);

export const UpdateUserDocument = `
    mutation UpdateUser($about: String, $titleLanguage: UserTitleLanguage, $staffNameLanguage: UserStaffNameLanguage, $airingNotifications: Boolean, $displayAdultContent: Boolean, $scoreFormat: ScoreFormat, $rowOrder: String, $profileColor: String, $donatorBadge: String, $notificationOptions: [NotificationOptionInput], $animeListOptions: MediaListOptionsInput, $mangaListOptions: MediaListOptionsInput, $timezone: String, $activityMergeTime: Int, $restrictMessagesToFollowing: Boolean, $disabledListActivity: [ListActivityOptionInput]) {
  UpdateUser(
    about: $about
    titleLanguage: $titleLanguage
    staffNameLanguage: $staffNameLanguage
    airingNotifications: $airingNotifications
    displayAdultContent: $displayAdultContent
    scoreFormat: $scoreFormat
    rowOrder: $rowOrder
    profileColor: $profileColor
    donatorBadge: $donatorBadge
    notificationOptions: $notificationOptions
    animeListOptions: $animeListOptions
    mangaListOptions: $mangaListOptions
    timezone: $timezone
    activityMergeTime: $activityMergeTime
    restrictMessagesToFollowing: $restrictMessagesToFollowing
    disabledListActivity: $disabledListActivity
  ) {
    id
    name
    about
    avatar {
      large
    }
    bannerImage
    unreadNotificationCount
    donatorTier
    donatorBadge
    moderatorRoles
    options {
      titleLanguage
      staffNameLanguage
      restrictMessagesToFollowing
      airingNotifications
      displayAdultContent
      profileColor
      timezone
      activityMergeTime
      notificationOptions {
        type
        enabled
      }
      disabledListActivity {
        type
        disabled
      }
    }
    mediaListOptions {
      scoreFormat
      rowOrder
      animeList {
        customLists
        sectionOrder
        splitCompletedSectionByFormat
        advancedScoring
        advancedScoringEnabled
      }
      mangaList {
        customLists
        sectionOrder
        splitCompletedSectionByFormat
        advancedScoring
        advancedScoringEnabled
      }
    }
  }
}
    `;

export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>) => {
    
    return useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      {
    mutationKey: ['UpdateUser'],
    mutationFn: (variables?: UpdateUserMutationVariables) => fetchAnilistData<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables)(),
    ...options
  }
    )};


useUpdateUserMutation.fetcher = (variables?: UpdateUserMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables, options);

export const ToggleFollowDocument = `
    mutation ToggleFollow($userId: Int) {
  ToggleFollow(userId: $userId) {
    id
    isFollowing
  }
}
    `;

export const useToggleFollowMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ToggleFollowMutation, TError, ToggleFollowMutationVariables, TContext>) => {
    
    return useMutation<ToggleFollowMutation, TError, ToggleFollowMutationVariables, TContext>(
      {
    mutationKey: ['ToggleFollow'],
    mutationFn: (variables?: ToggleFollowMutationVariables) => fetchAnilistData<ToggleFollowMutation, ToggleFollowMutationVariables>(ToggleFollowDocument, variables)(),
    ...options
  }
    )};


useToggleFollowMutation.fetcher = (variables?: ToggleFollowMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<ToggleFollowMutation, ToggleFollowMutationVariables>(ToggleFollowDocument, variables, options);

export const ToggleLikeDocument = `
    mutation ToggleLike($id: Int, $type: LikeableType) {
  ToggleLikeV2(id: $id, type: $type) {
    __typename
    ... on ThreadComment {
      id
      isLiked
      likeCount
    }
    ... on Thread {
      id
      isLiked
      likeCount
    }
    ... on ListActivity {
      id
      isLiked
      likeCount
    }
    ... on TextActivity {
      id
      isLiked
      likeCount
    }
    ... on MessageActivity {
      id
      isLiked
      likeCount
    }
    ... on ActivityReply {
      id
      isLiked
      likeCount
    }
  }
}
    `;

export const useToggleLikeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ToggleLikeMutation, TError, ToggleLikeMutationVariables, TContext>) => {
    
    return useMutation<ToggleLikeMutation, TError, ToggleLikeMutationVariables, TContext>(
      {
    mutationKey: ['ToggleLike'],
    mutationFn: (variables?: ToggleLikeMutationVariables) => fetchAnilistData<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, variables)(),
    ...options
  }
    )};


useToggleLikeMutation.fetcher = (variables?: ToggleLikeMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, variables, options);

export const ToggleThreadSubscriptionDocument = `
    mutation ToggleThreadSubscription($threadId: Int, $subscribe: Boolean) {
  ToggleThreadSubscription(threadId: $threadId, subscribe: $subscribe) {
    id
    isSubscribed
  }
}
    `;

export const useToggleThreadSubscriptionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ToggleThreadSubscriptionMutation, TError, ToggleThreadSubscriptionMutationVariables, TContext>) => {
    
    return useMutation<ToggleThreadSubscriptionMutation, TError, ToggleThreadSubscriptionMutationVariables, TContext>(
      {
    mutationKey: ['ToggleThreadSubscription'],
    mutationFn: (variables?: ToggleThreadSubscriptionMutationVariables) => fetchAnilistData<ToggleThreadSubscriptionMutation, ToggleThreadSubscriptionMutationVariables>(ToggleThreadSubscriptionDocument, variables)(),
    ...options
  }
    )};


useToggleThreadSubscriptionMutation.fetcher = (variables?: ToggleThreadSubscriptionMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<ToggleThreadSubscriptionMutation, ToggleThreadSubscriptionMutationVariables>(ToggleThreadSubscriptionDocument, variables, options);

export const SaveThreadCommentDocument = `
    mutation SaveThreadComment($id: Int, $threadId: Int, $parentCommentId: Int, $comment: String) {
  SaveThreadComment(
    id: $id
    threadId: $threadId
    comment: $comment
    parentCommentId: $parentCommentId
  ) {
    id
  }
}
    `;

export const useSaveThreadCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveThreadCommentMutation, TError, SaveThreadCommentMutationVariables, TContext>) => {
    
    return useMutation<SaveThreadCommentMutation, TError, SaveThreadCommentMutationVariables, TContext>(
      {
    mutationKey: ['SaveThreadComment'],
    mutationFn: (variables?: SaveThreadCommentMutationVariables) => fetchAnilistData<SaveThreadCommentMutation, SaveThreadCommentMutationVariables>(SaveThreadCommentDocument, variables)(),
    ...options
  }
    )};


useSaveThreadCommentMutation.fetcher = (variables?: SaveThreadCommentMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<SaveThreadCommentMutation, SaveThreadCommentMutationVariables>(SaveThreadCommentDocument, variables, options);

export const DeleteThreadCommentDocument = `
    mutation DeleteThreadComment($id: Int) {
  DeleteThreadComment(id: $id) {
    deleted
  }
}
    `;

export const useDeleteThreadCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteThreadCommentMutation, TError, DeleteThreadCommentMutationVariables, TContext>) => {
    
    return useMutation<DeleteThreadCommentMutation, TError, DeleteThreadCommentMutationVariables, TContext>(
      {
    mutationKey: ['DeleteThreadComment'],
    mutationFn: (variables?: DeleteThreadCommentMutationVariables) => fetchAnilistData<DeleteThreadCommentMutation, DeleteThreadCommentMutationVariables>(DeleteThreadCommentDocument, variables)(),
    ...options
  }
    )};


useDeleteThreadCommentMutation.fetcher = (variables?: DeleteThreadCommentMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<DeleteThreadCommentMutation, DeleteThreadCommentMutationVariables>(DeleteThreadCommentDocument, variables, options);

export const SaveThreadDocument = `
    mutation SaveThread($id: Int, $title: String, $body: String, $categories: [Int], $mediaCategories: [Int]) {
  SaveThread(
    id: $id
    title: $title
    body: $body
    categories: $categories
    mediaCategories: $mediaCategories
  ) {
    id
  }
}
    `;

export const useSaveThreadMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveThreadMutation, TError, SaveThreadMutationVariables, TContext>) => {
    
    return useMutation<SaveThreadMutation, TError, SaveThreadMutationVariables, TContext>(
      {
    mutationKey: ['SaveThread'],
    mutationFn: (variables?: SaveThreadMutationVariables) => fetchAnilistData<SaveThreadMutation, SaveThreadMutationVariables>(SaveThreadDocument, variables)(),
    ...options
  }
    )};


useSaveThreadMutation.fetcher = (variables?: SaveThreadMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<SaveThreadMutation, SaveThreadMutationVariables>(SaveThreadDocument, variables, options);

export const DeleteThreadDocument = `
    mutation DeleteThread($id: Int) {
  DeleteThread(id: $id) {
    deleted
  }
}
    `;

export const useDeleteThreadMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteThreadMutation, TError, DeleteThreadMutationVariables, TContext>) => {
    
    return useMutation<DeleteThreadMutation, TError, DeleteThreadMutationVariables, TContext>(
      {
    mutationKey: ['DeleteThread'],
    mutationFn: (variables?: DeleteThreadMutationVariables) => fetchAnilistData<DeleteThreadMutation, DeleteThreadMutationVariables>(DeleteThreadDocument, variables)(),
    ...options
  }
    )};


useDeleteThreadMutation.fetcher = (variables?: DeleteThreadMutationVariables, options?: RequestInit['headers']) => fetchAnilistData<DeleteThreadMutation, DeleteThreadMutationVariables>(DeleteThreadDocument, variables, options);

export const MediaAniCardQueryDocument = `
    query MediaAniCardQuery($id: Int) {
  Media(id: $id) {
    type
    format
    averageScore
    meanScore
    status
    descriptionHTML: description(asHtml: true)
    episodes
    chapters
    volumes
    idMal
    title {
      romaji
      english
      native
      userPreferred
    }
    coverImage {
      color
      extraLarge
    }
    startDate {
      year
      month
      day
    }
    genres
    tags {
      name
    }
  }
}
    `;

export const useMediaAniCardQueryQuery = <
      TData = MediaAniCardQueryQuery,
      TError = unknown
    >(
      variables?: MediaAniCardQueryQueryVariables,
      options?: Omit<UseQueryOptions<MediaAniCardQueryQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MediaAniCardQueryQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MediaAniCardQueryQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['MediaAniCardQuery'] : ['MediaAniCardQuery', variables],
    queryFn: fetchAnilistData<MediaAniCardQueryQuery, MediaAniCardQueryQueryVariables>(MediaAniCardQueryDocument, variables),
    ...options
  }
    )};

useMediaAniCardQueryQuery.getKey = (variables?: MediaAniCardQueryQueryVariables) => variables === undefined ? ['MediaAniCardQuery'] : ['MediaAniCardQuery', variables];

export const useInfiniteMediaAniCardQueryQuery = <
      TData = InfiniteData<MediaAniCardQueryQuery>,
      TError = unknown
    >(
      variables: MediaAniCardQueryQueryVariables,
      options: Omit<UseInfiniteQueryOptions<MediaAniCardQueryQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<MediaAniCardQueryQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<MediaAniCardQueryQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['MediaAniCardQuery.infinite'] : ['MediaAniCardQuery.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<MediaAniCardQueryQuery, MediaAniCardQueryQueryVariables>(MediaAniCardQueryDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteMediaAniCardQueryQuery.getKey = (variables?: MediaAniCardQueryQueryVariables) => variables === undefined ? ['MediaAniCardQuery.infinite'] : ['MediaAniCardQuery.infinite', variables];


useMediaAniCardQueryQuery.fetcher = (variables?: MediaAniCardQueryQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<MediaAniCardQueryQuery, MediaAniCardQueryQueryVariables>(MediaAniCardQueryDocument, variables, options);

export const WeeklyAnimeDocument = `
    query WeeklyAnime($weekStart: Int, $weekEnd: Int, $page: Int) {
  Page(page: $page) {
    pageInfo {
      hasNextPage
      total
    }
    airingSchedules(airingAt_greater: $weekStart, airingAt_lesser: $weekEnd) {
      id
      episode
      airingAt
      timeUntilAiring
      media {
        ...MainMeta
      }
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useWeeklyAnimeQuery = <
      TData = WeeklyAnimeQuery,
      TError = unknown
    >(
      variables?: WeeklyAnimeQueryVariables,
      options?: Omit<UseQueryOptions<WeeklyAnimeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WeeklyAnimeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WeeklyAnimeQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['WeeklyAnime'] : ['WeeklyAnime', variables],
    queryFn: fetchAnilistData<WeeklyAnimeQuery, WeeklyAnimeQueryVariables>(WeeklyAnimeDocument, variables),
    ...options
  }
    )};

useWeeklyAnimeQuery.getKey = (variables?: WeeklyAnimeQueryVariables) => variables === undefined ? ['WeeklyAnime'] : ['WeeklyAnime', variables];

export const useInfiniteWeeklyAnimeQuery = <
      TData = InfiniteData<WeeklyAnimeQuery>,
      TError = unknown
    >(
      variables: WeeklyAnimeQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WeeklyAnimeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WeeklyAnimeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WeeklyAnimeQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['WeeklyAnime.infinite'] : ['WeeklyAnime.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<WeeklyAnimeQuery, WeeklyAnimeQueryVariables>(WeeklyAnimeDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWeeklyAnimeQuery.getKey = (variables?: WeeklyAnimeQueryVariables) => variables === undefined ? ['WeeklyAnime.infinite'] : ['WeeklyAnime.infinite', variables];


useWeeklyAnimeQuery.fetcher = (variables?: WeeklyAnimeQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<WeeklyAnimeQuery, WeeklyAnimeQueryVariables>(WeeklyAnimeDocument, variables, options);

export const AiringRangeDocument = `
    query AiringRange($start: Int, $end: Int, $page: Int) {
  Page(page: $page, perPage: 50) {
    pageInfo {
      hasNextPage
      total
    }
    airingSchedules(airingAt_greater: $start, airingAt_lesser: $end) {
      id
      episode
      airingAt
      timeUntilAiring
      media {
        ...MainMeta
      }
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useAiringRangeQuery = <
      TData = AiringRangeQuery,
      TError = unknown
    >(
      variables?: AiringRangeQueryVariables,
      options?: Omit<UseQueryOptions<AiringRangeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AiringRangeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AiringRangeQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['AiringRange'] : ['AiringRange', variables],
    queryFn: fetchAnilistData<AiringRangeQuery, AiringRangeQueryVariables>(AiringRangeDocument, variables),
    ...options
  }
    )};

useAiringRangeQuery.getKey = (variables?: AiringRangeQueryVariables) => variables === undefined ? ['AiringRange'] : ['AiringRange', variables];

export const useInfiniteAiringRangeQuery = <
      TData = InfiniteData<AiringRangeQuery>,
      TError = unknown
    >(
      variables: AiringRangeQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AiringRangeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AiringRangeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AiringRangeQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['AiringRange.infinite'] : ['AiringRange.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<AiringRangeQuery, AiringRangeQueryVariables>(AiringRangeDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAiringRangeQuery.getKey = (variables?: AiringRangeQueryVariables) => variables === undefined ? ['AiringRange.infinite'] : ['AiringRange.infinite', variables];


useAiringRangeQuery.fetcher = (variables?: AiringRangeQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<AiringRangeQuery, AiringRangeQueryVariables>(AiringRangeDocument, variables, options);

export const SeasonalAnimeDocument = `
    query SeasonalAnime($season: MediaSeason, $seasonYear: Int, $onList: Boolean, $page: Int) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      hasNextPage
      total
    }
    media(type: ANIME, onList: $onList, season: $season, seasonYear: $seasonYear) {
      ...MainMeta
      airingSchedule {
        nodes {
          airingAt
        }
      }
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useSeasonalAnimeQuery = <
      TData = SeasonalAnimeQuery,
      TError = unknown
    >(
      variables?: SeasonalAnimeQueryVariables,
      options?: Omit<UseQueryOptions<SeasonalAnimeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<SeasonalAnimeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<SeasonalAnimeQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['SeasonalAnime'] : ['SeasonalAnime', variables],
    queryFn: fetchAnilistData<SeasonalAnimeQuery, SeasonalAnimeQueryVariables>(SeasonalAnimeDocument, variables),
    ...options
  }
    )};

useSeasonalAnimeQuery.getKey = (variables?: SeasonalAnimeQueryVariables) => variables === undefined ? ['SeasonalAnime'] : ['SeasonalAnime', variables];

export const useInfiniteSeasonalAnimeQuery = <
      TData = InfiniteData<SeasonalAnimeQuery>,
      TError = unknown
    >(
      variables: SeasonalAnimeQueryVariables,
      options: Omit<UseInfiniteQueryOptions<SeasonalAnimeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<SeasonalAnimeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<SeasonalAnimeQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['SeasonalAnime.infinite'] : ['SeasonalAnime.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<SeasonalAnimeQuery, SeasonalAnimeQueryVariables>(SeasonalAnimeDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteSeasonalAnimeQuery.getKey = (variables?: SeasonalAnimeQueryVariables) => variables === undefined ? ['SeasonalAnime.infinite'] : ['SeasonalAnime.infinite', variables];


useSeasonalAnimeQuery.fetcher = (variables?: SeasonalAnimeQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<SeasonalAnimeQuery, SeasonalAnimeQueryVariables>(SeasonalAnimeDocument, variables, options);

export const TagCollectionDocument = `
    query TagCollection {
  MediaTagCollection {
    id
    name
    description
    category
    rank
    isGeneralSpoiler
    isMediaSpoiler
    isAdult
    userId
  }
}
    `;

export const useTagCollectionQuery = <
      TData = TagCollectionQuery,
      TError = unknown
    >(
      variables?: TagCollectionQueryVariables,
      options?: Omit<UseQueryOptions<TagCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<TagCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<TagCollectionQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['TagCollection'] : ['TagCollection', variables],
    queryFn: fetchAnilistData<TagCollectionQuery, TagCollectionQueryVariables>(TagCollectionDocument, variables),
    ...options
  }
    )};

useTagCollectionQuery.getKey = (variables?: TagCollectionQueryVariables) => variables === undefined ? ['TagCollection'] : ['TagCollection', variables];

export const useInfiniteTagCollectionQuery = <
      TData = InfiniteData<TagCollectionQuery>,
      TError = unknown
    >(
      variables: TagCollectionQueryVariables,
      options: Omit<UseInfiniteQueryOptions<TagCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<TagCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<TagCollectionQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['TagCollection.infinite'] : ['TagCollection.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<TagCollectionQuery, TagCollectionQueryVariables>(TagCollectionDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteTagCollectionQuery.getKey = (variables?: TagCollectionQueryVariables) => variables === undefined ? ['TagCollection.infinite'] : ['TagCollection.infinite', variables];


useTagCollectionQuery.fetcher = (variables?: TagCollectionQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<TagCollectionQuery, TagCollectionQueryVariables>(TagCollectionDocument, variables, options);

export const LinkSourceCollectionDocument = `
    query LinkSourceCollection {
  AnimeExternalLinkSourceCollection: ExternalLinkSourceCollection(
    mediaType: ANIME
  ) {
    id
    url
    site
    siteId
    type
    language
    color
    icon
    notes
    isDisabled
  }
  MangaExternalLinkSourceCollection: ExternalLinkSourceCollection(
    mediaType: MANGA
  ) {
    id
    url
    site
    siteId
    type
    language
    color
    icon
    notes
    isDisabled
  }
}
    `;

export const useLinkSourceCollectionQuery = <
      TData = LinkSourceCollectionQuery,
      TError = unknown
    >(
      variables?: LinkSourceCollectionQueryVariables,
      options?: Omit<UseQueryOptions<LinkSourceCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<LinkSourceCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<LinkSourceCollectionQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['LinkSourceCollection'] : ['LinkSourceCollection', variables],
    queryFn: fetchAnilistData<LinkSourceCollectionQuery, LinkSourceCollectionQueryVariables>(LinkSourceCollectionDocument, variables),
    ...options
  }
    )};

useLinkSourceCollectionQuery.getKey = (variables?: LinkSourceCollectionQueryVariables) => variables === undefined ? ['LinkSourceCollection'] : ['LinkSourceCollection', variables];

export const useInfiniteLinkSourceCollectionQuery = <
      TData = InfiniteData<LinkSourceCollectionQuery>,
      TError = unknown
    >(
      variables: LinkSourceCollectionQueryVariables,
      options: Omit<UseInfiniteQueryOptions<LinkSourceCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<LinkSourceCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<LinkSourceCollectionQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['LinkSourceCollection.infinite'] : ['LinkSourceCollection.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<LinkSourceCollectionQuery, LinkSourceCollectionQueryVariables>(LinkSourceCollectionDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteLinkSourceCollectionQuery.getKey = (variables?: LinkSourceCollectionQueryVariables) => variables === undefined ? ['LinkSourceCollection.infinite'] : ['LinkSourceCollection.infinite', variables];


useLinkSourceCollectionQuery.fetcher = (variables?: LinkSourceCollectionQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<LinkSourceCollectionQuery, LinkSourceCollectionQueryVariables>(LinkSourceCollectionDocument, variables, options);

export const GenreCollectionDocument = `
    query GenreCollection {
  GenreCollection
}
    `;

export const useGenreCollectionQuery = <
      TData = GenreCollectionQuery,
      TError = unknown
    >(
      variables?: GenreCollectionQueryVariables,
      options?: Omit<UseQueryOptions<GenreCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GenreCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GenreCollectionQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GenreCollection'] : ['GenreCollection', variables],
    queryFn: fetchAnilistData<GenreCollectionQuery, GenreCollectionQueryVariables>(GenreCollectionDocument, variables),
    ...options
  }
    )};

useGenreCollectionQuery.getKey = (variables?: GenreCollectionQueryVariables) => variables === undefined ? ['GenreCollection'] : ['GenreCollection', variables];

export const useInfiniteGenreCollectionQuery = <
      TData = InfiniteData<GenreCollectionQuery>,
      TError = unknown
    >(
      variables: GenreCollectionQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GenreCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GenreCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GenreCollectionQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GenreCollection.infinite'] : ['GenreCollection.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<GenreCollectionQuery, GenreCollectionQueryVariables>(GenreCollectionDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGenreCollectionQuery.getKey = (variables?: GenreCollectionQueryVariables) => variables === undefined ? ['GenreCollection.infinite'] : ['GenreCollection.infinite', variables];


useGenreCollectionQuery.fetcher = (variables?: GenreCollectionQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<GenreCollectionQuery, GenreCollectionQueryVariables>(GenreCollectionDocument, variables, options);

export const AllCollectionsDocument = `
    query AllCollections {
  GenreCollection
  MediaTagCollection {
    id
    name
    description
    category
    rank
    isGeneralSpoiler
    isMediaSpoiler
    isAdult
    userId
  }
  AnimeExternalLinkSourceCollection: ExternalLinkSourceCollection(
    mediaType: ANIME
  ) {
    id
    url
    site
    siteId
    type
    language
    color
    icon
    notes
    isDisabled
  }
  MangaExternalLinkSourceCollection: ExternalLinkSourceCollection(
    mediaType: MANGA
  ) {
    id
    url
    site
    siteId
    type
    language
    color
    icon
    notes
    isDisabled
  }
}
    `;

export const useAllCollectionsQuery = <
      TData = AllCollectionsQuery,
      TError = unknown
    >(
      variables?: AllCollectionsQueryVariables,
      options?: Omit<UseQueryOptions<AllCollectionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllCollectionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AllCollectionsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['AllCollections'] : ['AllCollections', variables],
    queryFn: fetchAnilistData<AllCollectionsQuery, AllCollectionsQueryVariables>(AllCollectionsDocument, variables),
    ...options
  }
    )};

useAllCollectionsQuery.getKey = (variables?: AllCollectionsQueryVariables) => variables === undefined ? ['AllCollections'] : ['AllCollections', variables];

export const useInfiniteAllCollectionsQuery = <
      TData = InfiniteData<AllCollectionsQuery>,
      TError = unknown
    >(
      variables: AllCollectionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AllCollectionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AllCollectionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AllCollectionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['AllCollections.infinite'] : ['AllCollections.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<AllCollectionsQuery, AllCollectionsQueryVariables>(AllCollectionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAllCollectionsQuery.getKey = (variables?: AllCollectionsQueryVariables) => variables === undefined ? ['AllCollections.infinite'] : ['AllCollections.infinite', variables];


useAllCollectionsQuery.fetcher = (variables?: AllCollectionsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<AllCollectionsQuery, AllCollectionsQueryVariables>(AllCollectionsDocument, variables, options);

export const AnimeExploreDocument = `
    query AnimeExplore($includeViewer: Boolean!, $perPage: Int, $season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextSeasonYear: Int, $onList: Boolean, $isAdult: Boolean, $tag_not_in: [String]) {
  Viewer @include(if: $includeViewer) {
    mediaListOptions {
      scoreFormat
    }
  }
  trending: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: ANIME
      isAdult: $isAdult
      onList: $onList
      sort: [TRENDING_DESC, POPULARITY_DESC]
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
  popular: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: ANIME
      isAdult: $isAdult
      onList: $onList
      sort: POPULARITY_DESC
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
  top: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: ANIME
      isAdult: $isAdult
      onList: $onList
      sort: SCORE_DESC
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
  thisSeason: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: ANIME
      season: $season
      seasonYear: $seasonYear
      isAdult: $isAdult
      onList: $onList
      sort: SCORE_DESC
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
  nextSeason: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: ANIME
      season: $nextSeason
      seasonYear: $nextSeasonYear
      isAdult: $isAdult
      onList: $onList
      sort: TRENDING_DESC
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useAnimeExploreQuery = <
      TData = AnimeExploreQuery,
      TError = unknown
    >(
      variables: AnimeExploreQueryVariables,
      options?: Omit<UseQueryOptions<AnimeExploreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AnimeExploreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AnimeExploreQuery, TError, TData>(
      {
    queryKey: ['AnimeExplore', variables],
    queryFn: fetchAnilistData<AnimeExploreQuery, AnimeExploreQueryVariables>(AnimeExploreDocument, variables),
    ...options
  }
    )};

useAnimeExploreQuery.getKey = (variables: AnimeExploreQueryVariables) => ['AnimeExplore', variables];

export const useInfiniteAnimeExploreQuery = <
      TData = InfiniteData<AnimeExploreQuery>,
      TError = unknown
    >(
      variables: AnimeExploreQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AnimeExploreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AnimeExploreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AnimeExploreQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AnimeExplore.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<AnimeExploreQuery, AnimeExploreQueryVariables>(AnimeExploreDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAnimeExploreQuery.getKey = (variables: AnimeExploreQueryVariables) => ['AnimeExplore.infinite', variables];


useAnimeExploreQuery.fetcher = (variables: AnimeExploreQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<AnimeExploreQuery, AnimeExploreQueryVariables>(AnimeExploreDocument, variables, options);

export const MangaExploreDocument = `
    query MangaExplore($includeViewer: Boolean!, $perPage: Int, $startDate_greater: FuzzyDateInt, $onList: Boolean, $isAdult: Boolean, $tag_not_in: [String]) {
  Viewer @include(if: $includeViewer) {
    mediaListOptions {
      scoreFormat
    }
  }
  newReleases: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: JP
      status: RELEASING
      isAdult: $isAdult
      onList: $onList
      tag_not_in: $tag_not_in
      startDate_greater: $startDate_greater
      format_not_in: [NOVEL, ONE_SHOT]
      sort: [TRENDING_DESC, POPULARITY_DESC]
    ) {
      ...MainMeta
    }
  }
  trending: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: JP
      isAdult: $isAdult
      onList: $onList
      sort: [TRENDING_DESC]
      tag_not_in: $tag_not_in
      format_not_in: NOVEL
    ) {
      ...MainMeta
    }
  }
  popular: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: JP
      isAdult: $isAdult
      onList: $onList
      sort: POPULARITY_DESC
      tag_not_in: $tag_not_in
      format_not_in: NOVEL
    ) {
      ...MainMeta
    }
  }
  top: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: JP
      isAdult: $isAdult
      onList: $onList
      sort: SCORE_DESC
      tag_not_in: $tag_not_in
      format_not_in: NOVEL
    ) {
      ...MainMeta
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useMangaExploreQuery = <
      TData = MangaExploreQuery,
      TError = unknown
    >(
      variables: MangaExploreQueryVariables,
      options?: Omit<UseQueryOptions<MangaExploreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MangaExploreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MangaExploreQuery, TError, TData>(
      {
    queryKey: ['MangaExplore', variables],
    queryFn: fetchAnilistData<MangaExploreQuery, MangaExploreQueryVariables>(MangaExploreDocument, variables),
    ...options
  }
    )};

useMangaExploreQuery.getKey = (variables: MangaExploreQueryVariables) => ['MangaExplore', variables];

export const useInfiniteMangaExploreQuery = <
      TData = InfiniteData<MangaExploreQuery>,
      TError = unknown
    >(
      variables: MangaExploreQueryVariables,
      options: Omit<UseInfiniteQueryOptions<MangaExploreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<MangaExploreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<MangaExploreQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['MangaExplore.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<MangaExploreQuery, MangaExploreQueryVariables>(MangaExploreDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteMangaExploreQuery.getKey = (variables: MangaExploreQueryVariables) => ['MangaExplore.infinite', variables];


useMangaExploreQuery.fetcher = (variables: MangaExploreQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<MangaExploreQuery, MangaExploreQueryVariables>(MangaExploreDocument, variables, options);

export const ManhwaExploreDocument = `
    query ManhwaExplore($includeViewer: Boolean!, $perPage: Int, $startDate_greater: FuzzyDateInt, $onList: Boolean, $isAdult: Boolean, $tag_not_in: [String]) {
  Viewer @include(if: $includeViewer) {
    mediaListOptions {
      scoreFormat
    }
  }
  newReleases: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: KR
      status: RELEASING
      isAdult: $isAdult
      onList: $onList
      tag_not_in: $tag_not_in
      startDate_greater: $startDate_greater
      format_not_in: [NOVEL, ONE_SHOT]
      sort: [TRENDING_DESC, POPULARITY_DESC]
    ) {
      ...MainMeta
    }
  }
  trending: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: KR
      isAdult: $isAdult
      onList: $onList
      sort: [TRENDING_DESC, POPULARITY_DESC]
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
  popular: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: KR
      isAdult: $isAdult
      onList: $onList
      sort: POPULARITY_DESC
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
  top: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: KR
      isAdult: $isAdult
      onList: $onList
      sort: SCORE_DESC
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useManhwaExploreQuery = <
      TData = ManhwaExploreQuery,
      TError = unknown
    >(
      variables: ManhwaExploreQueryVariables,
      options?: Omit<UseQueryOptions<ManhwaExploreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ManhwaExploreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ManhwaExploreQuery, TError, TData>(
      {
    queryKey: ['ManhwaExplore', variables],
    queryFn: fetchAnilistData<ManhwaExploreQuery, ManhwaExploreQueryVariables>(ManhwaExploreDocument, variables),
    ...options
  }
    )};

useManhwaExploreQuery.getKey = (variables: ManhwaExploreQueryVariables) => ['ManhwaExplore', variables];

export const useInfiniteManhwaExploreQuery = <
      TData = InfiniteData<ManhwaExploreQuery>,
      TError = unknown
    >(
      variables: ManhwaExploreQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ManhwaExploreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ManhwaExploreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ManhwaExploreQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['ManhwaExplore.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<ManhwaExploreQuery, ManhwaExploreQueryVariables>(ManhwaExploreDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteManhwaExploreQuery.getKey = (variables: ManhwaExploreQueryVariables) => ['ManhwaExplore.infinite', variables];


useManhwaExploreQuery.fetcher = (variables: ManhwaExploreQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<ManhwaExploreQuery, ManhwaExploreQueryVariables>(ManhwaExploreDocument, variables, options);

export const ManhuaExploreDocument = `
    query ManhuaExplore($includeViewer: Boolean!, $perPage: Int, $startDate_greater: FuzzyDateInt, $onList: Boolean, $isAdult: Boolean, $tag_not_in: [String]) {
  Viewer @include(if: $includeViewer) {
    mediaListOptions {
      scoreFormat
    }
  }
  newReleases: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: CN
      status: RELEASING
      isAdult: $isAdult
      onList: $onList
      tag_not_in: $tag_not_in
      startDate_greater: $startDate_greater
      format_not_in: [NOVEL, ONE_SHOT]
      sort: [TRENDING_DESC, POPULARITY_DESC]
    ) {
      ...MainMeta
    }
  }
  trending: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: CN
      isAdult: $isAdult
      onList: $onList
      sort: [TRENDING_DESC, POPULARITY_DESC]
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
  popular: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: CN
      isAdult: $isAdult
      onList: $onList
      sort: POPULARITY_DESC
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
  top: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      countryOfOrigin: CN
      isAdult: $isAdult
      onList: $onList
      sort: SCORE_DESC
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useManhuaExploreQuery = <
      TData = ManhuaExploreQuery,
      TError = unknown
    >(
      variables: ManhuaExploreQueryVariables,
      options?: Omit<UseQueryOptions<ManhuaExploreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ManhuaExploreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ManhuaExploreQuery, TError, TData>(
      {
    queryKey: ['ManhuaExplore', variables],
    queryFn: fetchAnilistData<ManhuaExploreQuery, ManhuaExploreQueryVariables>(ManhuaExploreDocument, variables),
    ...options
  }
    )};

useManhuaExploreQuery.getKey = (variables: ManhuaExploreQueryVariables) => ['ManhuaExplore', variables];

export const useInfiniteManhuaExploreQuery = <
      TData = InfiniteData<ManhuaExploreQuery>,
      TError = unknown
    >(
      variables: ManhuaExploreQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ManhuaExploreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ManhuaExploreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ManhuaExploreQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['ManhuaExplore.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<ManhuaExploreQuery, ManhuaExploreQueryVariables>(ManhuaExploreDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteManhuaExploreQuery.getKey = (variables: ManhuaExploreQueryVariables) => ['ManhuaExplore.infinite', variables];


useManhuaExploreQuery.fetcher = (variables: ManhuaExploreQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<ManhuaExploreQuery, ManhuaExploreQueryVariables>(ManhuaExploreDocument, variables, options);

export const NovelExploreDocument = `
    query NovelExplore($includeViewer: Boolean!, $perPage: Int, $startDate_greater: FuzzyDateInt, $onList: Boolean, $isAdult: Boolean, $tag_not_in: [String]) {
  Viewer @include(if: $includeViewer) {
    mediaListOptions {
      scoreFormat
    }
  }
  newReleases: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      status: RELEASING
      isAdult: $isAdult
      onList: $onList
      tag_not_in: $tag_not_in
      startDate_greater: $startDate_greater
      format: NOVEL
      sort: [TRENDING_DESC, POPULARITY_DESC]
    ) {
      ...MainMeta
    }
  }
  trending: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      isAdult: $isAdult
      onList: $onList
      sort: [TRENDING_DESC, POPULARITY_DESC]
      format: NOVEL
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
  popular: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      isAdult: $isAdult
      onList: $onList
      sort: POPULARITY_DESC
      format: NOVEL
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
  top: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      type: MANGA
      isAdult: $isAdult
      onList: $onList
      sort: SCORE_DESC
      format: NOVEL
      tag_not_in: $tag_not_in
    ) {
      ...MainMeta
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useNovelExploreQuery = <
      TData = NovelExploreQuery,
      TError = unknown
    >(
      variables: NovelExploreQueryVariables,
      options?: Omit<UseQueryOptions<NovelExploreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NovelExploreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NovelExploreQuery, TError, TData>(
      {
    queryKey: ['NovelExplore', variables],
    queryFn: fetchAnilistData<NovelExploreQuery, NovelExploreQueryVariables>(NovelExploreDocument, variables),
    ...options
  }
    )};

useNovelExploreQuery.getKey = (variables: NovelExploreQueryVariables) => ['NovelExplore', variables];

export const useInfiniteNovelExploreQuery = <
      TData = InfiniteData<NovelExploreQuery>,
      TError = unknown
    >(
      variables: NovelExploreQueryVariables,
      options: Omit<UseInfiniteQueryOptions<NovelExploreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<NovelExploreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<NovelExploreQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['NovelExplore.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<NovelExploreQuery, NovelExploreQueryVariables>(NovelExploreDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteNovelExploreQuery.getKey = (variables: NovelExploreQueryVariables) => ['NovelExplore.infinite', variables];


useNovelExploreQuery.fetcher = (variables: NovelExploreQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<NovelExploreQuery, NovelExploreQueryVariables>(NovelExploreDocument, variables, options);

export const RecommendationsDocument = `
    query Recommendations($page: Int, $perPage: Int, $sort: [RecommendationSort], $onList: Boolean) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      currentPage
      hasNextPage
    }
    recommendations(sort: $sort, onList: $onList) {
      id
      rating
      userRating
      media {
        id
        idMal
        type
        bannerImage
        isAdult
        title {
          userPreferred
          romaji
          native
          english
        }
        coverImage {
          color
          extraLarge
        }
        meanScore
        averageScore
        stats {
          scoreDistribution {
            score
            amount
          }
        }
      }
      mediaRecommendation {
        id
        idMal
        type
        bannerImage
        title {
          userPreferred
          romaji
          native
          english
        }
        coverImage {
          color
          extraLarge
        }
        stats {
          scoreDistribution {
            score
            amount
          }
        }
        meanScore
        averageScore
      }
      user {
        id
        name
        bannerImage
        about
        createdAt
        options {
          profileColor
        }
        avatar {
          large
        }
        favourites {
          anime(perPage: 1) {
            nodes {
              id
              title {
                userPreferred
              }
              coverImage {
                color
                extraLarge
              }
              siteUrl
            }
          }
          manga(perPage: 1) {
            nodes {
              id
              title {
                userPreferred
              }
              coverImage {
                color
                extraLarge
              }
              siteUrl
            }
          }
          characters(perPage: 1) {
            nodes {
              id
              name {
                userPreferred
              }
              image {
                large
              }
              gender
              siteUrl
            }
          }
        }
        siteUrl
      }
    }
  }
}
    `;

export const useRecommendationsQuery = <
      TData = RecommendationsQuery,
      TError = unknown
    >(
      variables?: RecommendationsQueryVariables,
      options?: Omit<UseQueryOptions<RecommendationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RecommendationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RecommendationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Recommendations'] : ['Recommendations', variables],
    queryFn: fetchAnilistData<RecommendationsQuery, RecommendationsQueryVariables>(RecommendationsDocument, variables),
    ...options
  }
    )};

useRecommendationsQuery.getKey = (variables?: RecommendationsQueryVariables) => variables === undefined ? ['Recommendations'] : ['Recommendations', variables];

export const useInfiniteRecommendationsQuery = <
      TData = InfiniteData<RecommendationsQuery>,
      TError = unknown
    >(
      variables: RecommendationsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<RecommendationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<RecommendationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<RecommendationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Recommendations.infinite'] : ['Recommendations.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<RecommendationsQuery, RecommendationsQueryVariables>(RecommendationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteRecommendationsQuery.getKey = (variables?: RecommendationsQueryVariables) => variables === undefined ? ['Recommendations.infinite'] : ['Recommendations.infinite', variables];


useRecommendationsQuery.fetcher = (variables?: RecommendationsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<RecommendationsQuery, RecommendationsQueryVariables>(RecommendationsDocument, variables, options);

export const StudioListDocument = `
    query StudioList($studioId: Int, $page: Int, $perPage: Int) {
  Studio(id: $studioId) {
    id
    name
    isAnimationStudio
    siteUrl
    isFavourite
    media(page: $page, perPage: $perPage, sort: [TRENDING_DESC, POPULARITY_DESC]) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      nodes {
        ...MainMeta
      }
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useStudioListQuery = <
      TData = StudioListQuery,
      TError = unknown
    >(
      variables?: StudioListQueryVariables,
      options?: Omit<UseQueryOptions<StudioListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<StudioListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<StudioListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['StudioList'] : ['StudioList', variables],
    queryFn: fetchAnilistData<StudioListQuery, StudioListQueryVariables>(StudioListDocument, variables),
    ...options
  }
    )};

useStudioListQuery.getKey = (variables?: StudioListQueryVariables) => variables === undefined ? ['StudioList'] : ['StudioList', variables];

export const useInfiniteStudioListQuery = <
      TData = InfiniteData<StudioListQuery>,
      TError = unknown
    >(
      variables: StudioListQueryVariables,
      options: Omit<UseInfiniteQueryOptions<StudioListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<StudioListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<StudioListQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['StudioList.infinite'] : ['StudioList.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<StudioListQuery, StudioListQueryVariables>(StudioListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteStudioListQuery.getKey = (variables?: StudioListQueryVariables) => variables === undefined ? ['StudioList.infinite'] : ['StudioList.infinite', variables];


useStudioListQuery.fetcher = (variables?: StudioListQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<StudioListQuery, StudioListQueryVariables>(StudioListDocument, variables, options);

export const UserAnimeListCollectionDocument = `
    query UserAnimeListCollection($userId: Int, $userName: String, $sort: [MediaListSort]) {
  MediaListCollection(
    userId: $userId
    userName: $userName
    type: ANIME
    sort: $sort
  ) {
    lists {
      name
      isCustomList
      isSplitCompletedList
      entries {
        ...mediaListEntry
      }
    }
    user {
      statistics {
        anime {
          count
        }
        manga {
          count
        }
      }
    }
  }
}
    ${MediaListEntryFragmentDoc}
${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useUserAnimeListCollectionQuery = <
      TData = UserAnimeListCollectionQuery,
      TError = unknown
    >(
      variables?: UserAnimeListCollectionQueryVariables,
      options?: Omit<UseQueryOptions<UserAnimeListCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserAnimeListCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserAnimeListCollectionQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserAnimeListCollection'] : ['UserAnimeListCollection', variables],
    queryFn: fetchAnilistData<UserAnimeListCollectionQuery, UserAnimeListCollectionQueryVariables>(UserAnimeListCollectionDocument, variables),
    ...options
  }
    )};

useUserAnimeListCollectionQuery.getKey = (variables?: UserAnimeListCollectionQueryVariables) => variables === undefined ? ['UserAnimeListCollection'] : ['UserAnimeListCollection', variables];

export const useInfiniteUserAnimeListCollectionQuery = <
      TData = InfiniteData<UserAnimeListCollectionQuery>,
      TError = unknown
    >(
      variables: UserAnimeListCollectionQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserAnimeListCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserAnimeListCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserAnimeListCollectionQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserAnimeListCollection.infinite'] : ['UserAnimeListCollection.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserAnimeListCollectionQuery, UserAnimeListCollectionQueryVariables>(UserAnimeListCollectionDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserAnimeListCollectionQuery.getKey = (variables?: UserAnimeListCollectionQueryVariables) => variables === undefined ? ['UserAnimeListCollection.infinite'] : ['UserAnimeListCollection.infinite', variables];


useUserAnimeListCollectionQuery.fetcher = (variables?: UserAnimeListCollectionQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserAnimeListCollectionQuery, UserAnimeListCollectionQueryVariables>(UserAnimeListCollectionDocument, variables, options);

export const UserMangaListCollectionDocument = `
    query UserMangaListCollection($userId: Int, $userName: String, $sort: [MediaListSort]) {
  MediaListCollection(
    userId: $userId
    userName: $userName
    type: MANGA
    sort: $sort
  ) {
    lists {
      name
      isCustomList
      isSplitCompletedList
      entries {
        ...mediaListEntry
      }
    }
    user {
      statistics {
        anime {
          count
        }
        manga {
          count
        }
      }
    }
  }
}
    ${MediaListEntryFragmentDoc}
${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useUserMangaListCollectionQuery = <
      TData = UserMangaListCollectionQuery,
      TError = unknown
    >(
      variables?: UserMangaListCollectionQueryVariables,
      options?: Omit<UseQueryOptions<UserMangaListCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserMangaListCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserMangaListCollectionQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserMangaListCollection'] : ['UserMangaListCollection', variables],
    queryFn: fetchAnilistData<UserMangaListCollectionQuery, UserMangaListCollectionQueryVariables>(UserMangaListCollectionDocument, variables),
    ...options
  }
    )};

useUserMangaListCollectionQuery.getKey = (variables?: UserMangaListCollectionQueryVariables) => variables === undefined ? ['UserMangaListCollection'] : ['UserMangaListCollection', variables];

export const useInfiniteUserMangaListCollectionQuery = <
      TData = InfiniteData<UserMangaListCollectionQuery>,
      TError = unknown
    >(
      variables: UserMangaListCollectionQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserMangaListCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserMangaListCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserMangaListCollectionQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserMangaListCollection.infinite'] : ['UserMangaListCollection.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserMangaListCollectionQuery, UserMangaListCollectionQueryVariables>(UserMangaListCollectionDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserMangaListCollectionQuery.getKey = (variables?: UserMangaListCollectionQueryVariables) => variables === undefined ? ['UserMangaListCollection.infinite'] : ['UserMangaListCollection.infinite', variables];


useUserMangaListCollectionQuery.fetcher = (variables?: UserMangaListCollectionQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserMangaListCollectionQuery, UserMangaListCollectionQueryVariables>(UserMangaListCollectionDocument, variables, options);

export const UserCustomListsDocument = `
    query UserCustomLists($userId: Int, $userName: String, $type: MediaType) {
  MediaListCollection(userId: $userId, userName: $userName, type: $type) {
    user {
      mediaListOptions {
        animeList {
          customLists
        }
        mangaList {
          customLists
        }
      }
    }
  }
}
    `;

export const useUserCustomListsQuery = <
      TData = UserCustomListsQuery,
      TError = unknown
    >(
      variables?: UserCustomListsQueryVariables,
      options?: Omit<UseQueryOptions<UserCustomListsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserCustomListsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserCustomListsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserCustomLists'] : ['UserCustomLists', variables],
    queryFn: fetchAnilistData<UserCustomListsQuery, UserCustomListsQueryVariables>(UserCustomListsDocument, variables),
    ...options
  }
    )};

useUserCustomListsQuery.getKey = (variables?: UserCustomListsQueryVariables) => variables === undefined ? ['UserCustomLists'] : ['UserCustomLists', variables];

export const useInfiniteUserCustomListsQuery = <
      TData = InfiniteData<UserCustomListsQuery>,
      TError = unknown
    >(
      variables: UserCustomListsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserCustomListsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserCustomListsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserCustomListsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserCustomLists.infinite'] : ['UserCustomLists.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserCustomListsQuery, UserCustomListsQueryVariables>(UserCustomListsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserCustomListsQuery.getKey = (variables?: UserCustomListsQueryVariables) => variables === undefined ? ['UserCustomLists.infinite'] : ['UserCustomLists.infinite', variables];


useUserCustomListsQuery.fetcher = (variables?: UserCustomListsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserCustomListsQuery, UserCustomListsQueryVariables>(UserCustomListsDocument, variables, options);

export const RandomMediaDocument = `
    query RandomMedia($random: Int, $perRandom: Int, $type: MediaType, $isAdult: Boolean) {
  Page(page: $random, perPage: $perRandom) {
    pageInfo {
      total
    }
    media(type: $type, isAdult: $isAdult) {
      id
      idMal
      type
      format
      isAdult
      genres
      description(asHtml: true)
      status(version: 3)
      tags {
        id
        name
        description
        rank
        category
        isAdult
        isGeneralSpoiler
        isMediaSpoiler
      }
      title {
        userPreferred
        romaji
        native
        english
      }
      coverImage {
        extraLarge
      }
      bannerImage
      meanScore
      averageScore
    }
  }
}
    `;

export const useRandomMediaQuery = <
      TData = RandomMediaQuery,
      TError = unknown
    >(
      variables?: RandomMediaQueryVariables,
      options?: Omit<UseQueryOptions<RandomMediaQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RandomMediaQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RandomMediaQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['RandomMedia'] : ['RandomMedia', variables],
    queryFn: fetchAnilistData<RandomMediaQuery, RandomMediaQueryVariables>(RandomMediaDocument, variables),
    ...options
  }
    )};

useRandomMediaQuery.getKey = (variables?: RandomMediaQueryVariables) => variables === undefined ? ['RandomMedia'] : ['RandomMedia', variables];

export const useInfiniteRandomMediaQuery = <
      TData = InfiniteData<RandomMediaQuery>,
      TError = unknown
    >(
      variables: RandomMediaQueryVariables,
      options: Omit<UseInfiniteQueryOptions<RandomMediaQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<RandomMediaQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<RandomMediaQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['RandomMedia.infinite'] : ['RandomMedia.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<RandomMediaQuery, RandomMediaQueryVariables>(RandomMediaDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteRandomMediaQuery.getKey = (variables?: RandomMediaQueryVariables) => variables === undefined ? ['RandomMedia.infinite'] : ['RandomMedia.infinite', variables];


useRandomMediaQuery.fetcher = (variables?: RandomMediaQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<RandomMediaQuery, RandomMediaQueryVariables>(RandomMediaDocument, variables, options);

export const AniMediaDocument = `
    query AniMedia($id: Int, $sort_c: [CharacterSort], $role_c: CharacterRole, $page_c: Int, $perPage_c: Int, $page_rec: Int, $perPage_rec: Int, $userId: Int, $skipUser: Boolean!) {
  User(id: $userId) @skip(if: $skipUser) {
    mediaListOptions {
      animeList {
        customLists
      }
      mangaList {
        customLists
      }
      scoreFormat
    }
  }
  Following: Page(page: 1) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    mediaList(mediaId: $id, isFollowing: true, sort: UPDATED_TIME_DESC) {
      id
      status
      score
      progress
      user {
        ...UserSearchMeta
      }
    }
  }
  Media(id: $id) {
    title {
      romaji
      english
      native
      userPreferred
    }
    averageScore
    meanScore
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    tags {
      id
      name
      description
      rank
      category
      isAdult
      isGeneralSpoiler
      isMediaSpoiler
      userId
    }
    trailer {
      id
      site
      thumbnail
    }
    stats {
      statusDistribution {
        status
        amount
      }
      scoreDistribution {
        score
        amount
      }
    }
    relations {
      edges {
        id
        relationType(version: 2)
        node {
          ...MainMeta
        }
      }
    }
    externalLinks {
      id
      site
      url
      color
      icon
      notes
      type
      language
    }
    rankings {
      id
      rank
      type
      format
      year
      season
      allTime
      context
    }
    streamingEpisodes {
      title
      thumbnail
      url
      site
    }
    nextAiringEpisode {
      id
      airingAt
      timeUntilAiring
      episode
      mediaId
    }
    coverImage {
      color
      extraLarge
    }
    characters(sort: $sort_c, role: $role_c, page: $page_c, perPage: $perPage_c) {
      pageInfo {
        total
        hasNextPage
        currentPage
      }
      edges {
        id
        role
        voiceActorRoles(sort: [RELEVANCE, ID]) {
          voiceActor {
            id
            name {
              full
              userPreferred
              native
            }
            language: languageV2
            image {
              large
            }
          }
        }
        node {
          ...CharacterMetaData
        }
      }
    }
    recommendations(sort: [RATING_DESC, ID], page: $page_rec, perPage: $perPage_rec) {
      edges {
        node {
          id
          rating
          userRating
          mediaRecommendation {
            ...MainMeta
          }
        }
      }
    }
    mediaListEntry {
      ...MediaListEntryMeta
    }
    staff(page: 1, perPage: 25, sort: [RELEVANCE, ID]) {
      pageInfo {
        total
        hasNextPage
        currentPage
      }
      edges {
        role
        node {
          ...StaffMetaData
        }
      }
    }
    reviews(sort: [RATING_DESC, ID], page: 1, perPage: 20) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        node {
          id
          summary
          rating
          ratingAmount
          userRating
          score
          siteUrl
          createdAt
          updatedAt
          user {
            id
            name
            avatar {
              large
            }
            siteUrl
          }
        }
      }
    }
    studios {
      edges {
        isMain
        node {
          id
          name
          isFavourite
        }
      }
    }
    airingSchedule(page: 1, perPage: 25) {
      nodes {
        id
        airingAt
        timeUntilAiring
        episode
      }
    }
    source(version: 3)
    idMal
    id
    bannerImage
    description(asHtml: false)
    descriptionHTML: description(asHtml: true)
    siteUrl
    updatedAt
    season
    seasonYear
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    isAdult
    genres
    countryOfOrigin
    isLicensed
    hashtag
    synonyms
    popularity
    isLocked
    trending
    favourites
    isFavourite
  }
}
    ${UserSearchMetaFragmentDoc}
${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}
${CharacterMetaDataFragmentDoc}
${StaffMetaDataFragmentDoc}`;

export const useAniMediaQuery = <
      TData = AniMediaQuery,
      TError = unknown
    >(
      variables: AniMediaQueryVariables,
      options?: Omit<UseQueryOptions<AniMediaQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AniMediaQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AniMediaQuery, TError, TData>(
      {
    queryKey: ['AniMedia', variables],
    queryFn: fetchAnilistData<AniMediaQuery, AniMediaQueryVariables>(AniMediaDocument, variables),
    ...options
  }
    )};

useAniMediaQuery.getKey = (variables: AniMediaQueryVariables) => ['AniMedia', variables];

export const useInfiniteAniMediaQuery = <
      TData = InfiniteData<AniMediaQuery>,
      TError = unknown
    >(
      variables: AniMediaQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AniMediaQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AniMediaQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AniMediaQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['AniMedia.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<AniMediaQuery, AniMediaQueryVariables>(AniMediaDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAniMediaQuery.getKey = (variables: AniMediaQueryVariables) => ['AniMedia.infinite', variables];


useAniMediaQuery.fetcher = (variables: AniMediaQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<AniMediaQuery, AniMediaQueryVariables>(AniMediaDocument, variables, options);

export const MediaFollowingDocument = `
    query MediaFollowing($id: Int, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    mediaList(mediaId: $id, isFollowing: true, sort: UPDATED_TIME_DESC) {
      id
      status
      score
      progress
      user {
        id
        name
        avatar {
          large
        }
        mediaListOptions {
          scoreFormat
        }
      }
    }
  }
}
    `;

export const useMediaFollowingQuery = <
      TData = MediaFollowingQuery,
      TError = unknown
    >(
      variables?: MediaFollowingQueryVariables,
      options?: Omit<UseQueryOptions<MediaFollowingQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MediaFollowingQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MediaFollowingQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['MediaFollowing'] : ['MediaFollowing', variables],
    queryFn: fetchAnilistData<MediaFollowingQuery, MediaFollowingQueryVariables>(MediaFollowingDocument, variables),
    ...options
  }
    )};

useMediaFollowingQuery.getKey = (variables?: MediaFollowingQueryVariables) => variables === undefined ? ['MediaFollowing'] : ['MediaFollowing', variables];

export const useInfiniteMediaFollowingQuery = <
      TData = InfiniteData<MediaFollowingQuery>,
      TError = unknown
    >(
      variables: MediaFollowingQueryVariables,
      options: Omit<UseInfiniteQueryOptions<MediaFollowingQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<MediaFollowingQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<MediaFollowingQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['MediaFollowing.infinite'] : ['MediaFollowing.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<MediaFollowingQuery, MediaFollowingQueryVariables>(MediaFollowingDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteMediaFollowingQuery.getKey = (variables?: MediaFollowingQueryVariables) => variables === undefined ? ['MediaFollowing.infinite'] : ['MediaFollowing.infinite', variables];


useMediaFollowingQuery.fetcher = (variables?: MediaFollowingQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<MediaFollowingQuery, MediaFollowingQueryVariables>(MediaFollowingDocument, variables, options);

export const CharacterListDocument = `
    query CharacterList($id: Int, $page: Int, $perPage: Int, $sort: [CharacterSort]) {
  Media(id: $id) {
    id
    characters(sort: $sort, page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        hasNextPage
        lastPage
      }
      edges {
        id
        role
        voiceActorRoles(sort: ROLE_DESC) {
          roleNotes
          voiceActor {
            id
            isFavourite
            favourites
            languageV2
            name {
              native
              full
            }
            image {
              large
            }
          }
        }
        node {
          ...CharacterMetaData
        }
      }
    }
  }
}
    ${CharacterMetaDataFragmentDoc}`;

export const useCharacterListQuery = <
      TData = CharacterListQuery,
      TError = unknown
    >(
      variables?: CharacterListQueryVariables,
      options?: Omit<UseQueryOptions<CharacterListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CharacterListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CharacterListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['CharacterList'] : ['CharacterList', variables],
    queryFn: fetchAnilistData<CharacterListQuery, CharacterListQueryVariables>(CharacterListDocument, variables),
    ...options
  }
    )};

useCharacterListQuery.getKey = (variables?: CharacterListQueryVariables) => variables === undefined ? ['CharacterList'] : ['CharacterList', variables];

export const useInfiniteCharacterListQuery = <
      TData = InfiniteData<CharacterListQuery>,
      TError = unknown
    >(
      variables: CharacterListQueryVariables,
      options: Omit<UseInfiniteQueryOptions<CharacterListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<CharacterListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<CharacterListQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['CharacterList.infinite'] : ['CharacterList.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<CharacterListQuery, CharacterListQueryVariables>(CharacterListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteCharacterListQuery.getKey = (variables?: CharacterListQueryVariables) => variables === undefined ? ['CharacterList.infinite'] : ['CharacterList.infinite', variables];


useCharacterListQuery.fetcher = (variables?: CharacterListQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<CharacterListQuery, CharacterListQueryVariables>(CharacterListDocument, variables, options);

export const CharacterDetailsDocument = `
    query CharacterDetails($id: Int, $page: Int, $perPage: Int, $sort: [MediaSort]) {
  Character(id: $id) {
    name {
      full
      first
      last
      native
      alternative
    }
    image {
      large
    }
    description(asHtml: true)
    gender
    dateOfBirth {
      year
      month
      day
    }
    age
    bloodType
    isFavourite
    siteUrl
    favourites
    media(sort: $sort, page: $page, perPage: $perPage) {
      edges {
        voiceActorRoles(sort: [LANGUAGE, RELEVANCE]) {
          roleNotes
          voiceActor {
            ...StaffMetaData
            language: languageV2
          }
        }
        characterRole
        node {
          ...MainMeta
        }
      }
    }
  }
}
    ${StaffMetaDataFragmentDoc}
${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useCharacterDetailsQuery = <
      TData = CharacterDetailsQuery,
      TError = unknown
    >(
      variables?: CharacterDetailsQueryVariables,
      options?: Omit<UseQueryOptions<CharacterDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CharacterDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CharacterDetailsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['CharacterDetails'] : ['CharacterDetails', variables],
    queryFn: fetchAnilistData<CharacterDetailsQuery, CharacterDetailsQueryVariables>(CharacterDetailsDocument, variables),
    ...options
  }
    )};

useCharacterDetailsQuery.getKey = (variables?: CharacterDetailsQueryVariables) => variables === undefined ? ['CharacterDetails'] : ['CharacterDetails', variables];

export const useInfiniteCharacterDetailsQuery = <
      TData = InfiniteData<CharacterDetailsQuery>,
      TError = unknown
    >(
      variables: CharacterDetailsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<CharacterDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<CharacterDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<CharacterDetailsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['CharacterDetails.infinite'] : ['CharacterDetails.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<CharacterDetailsQuery, CharacterDetailsQueryVariables>(CharacterDetailsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteCharacterDetailsQuery.getKey = (variables?: CharacterDetailsQueryVariables) => variables === undefined ? ['CharacterDetails.infinite'] : ['CharacterDetails.infinite', variables];


useCharacterDetailsQuery.fetcher = (variables?: CharacterDetailsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<CharacterDetailsQuery, CharacterDetailsQueryVariables>(CharacterDetailsDocument, variables, options);

export const StaffListDocument = `
    query StaffList($id: Int, $page: Int, $perPage: Int) {
  Media(id: $id) {
    id
    staff(page: $page, perPage: $perPage, sort: [RELEVANCE, ID]) {
      edges {
        role
        node {
          ...StaffMetaData
        }
      }
      pageInfo {
        total
        currentPage
        hasNextPage
        perPage
        lastPage
      }
    }
  }
}
    ${StaffMetaDataFragmentDoc}`;

export const useStaffListQuery = <
      TData = StaffListQuery,
      TError = unknown
    >(
      variables?: StaffListQueryVariables,
      options?: Omit<UseQueryOptions<StaffListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<StaffListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<StaffListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['StaffList'] : ['StaffList', variables],
    queryFn: fetchAnilistData<StaffListQuery, StaffListQueryVariables>(StaffListDocument, variables),
    ...options
  }
    )};

useStaffListQuery.getKey = (variables?: StaffListQueryVariables) => variables === undefined ? ['StaffList'] : ['StaffList', variables];

export const useInfiniteStaffListQuery = <
      TData = InfiniteData<StaffListQuery>,
      TError = unknown
    >(
      variables: StaffListQueryVariables,
      options: Omit<UseInfiniteQueryOptions<StaffListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<StaffListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<StaffListQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['StaffList.infinite'] : ['StaffList.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<StaffListQuery, StaffListQueryVariables>(StaffListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteStaffListQuery.getKey = (variables?: StaffListQueryVariables) => variables === undefined ? ['StaffList.infinite'] : ['StaffList.infinite', variables];


useStaffListQuery.fetcher = (variables?: StaffListQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<StaffListQuery, StaffListQueryVariables>(StaffListDocument, variables, options);

export const StaffDetailsDocument = `
    query StaffDetails($staff_media_page: Int, $staff_media_perPage: Int, $id: Int, $char_page: Int, $char_perPage: Int) {
  Staff(id: $id) {
    name {
      full
      native
      alternative
    }
    languageV2
    image {
      large
    }
    description(asHtml: true)
    primaryOccupations
    gender
    dateOfBirth {
      year
      month
      day
    }
    dateOfDeath {
      year
      month
      day
    }
    age
    yearsActive
    homeTown
    bloodType
    isFavourite
    siteUrl
    favourites
    modNotes
    staffMedia(
      page: $staff_media_page
      perPage: $staff_media_perPage
      sort: POPULARITY_DESC
    ) {
      pageInfo {
        total
        perPage
        currentPage
        hasNextPage
        lastPage
      }
      edges {
        staffRole
        node {
          ...MainMeta
        }
      }
    }
    characters(page: $char_page, perPage: $char_perPage, sort: FAVOURITES_DESC) {
      pageInfo {
        total
        perPage
        currentPage
        hasNextPage
        lastPage
      }
      edges {
        role
        node {
          id
          name {
            full
            native
          }
          image {
            large
          }
          favourites
          isFavourite
        }
      }
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useStaffDetailsQuery = <
      TData = StaffDetailsQuery,
      TError = unknown
    >(
      variables?: StaffDetailsQueryVariables,
      options?: Omit<UseQueryOptions<StaffDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<StaffDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<StaffDetailsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['StaffDetails'] : ['StaffDetails', variables],
    queryFn: fetchAnilistData<StaffDetailsQuery, StaffDetailsQueryVariables>(StaffDetailsDocument, variables),
    ...options
  }
    )};

useStaffDetailsQuery.getKey = (variables?: StaffDetailsQueryVariables) => variables === undefined ? ['StaffDetails'] : ['StaffDetails', variables];

export const useInfiniteStaffDetailsQuery = <
      TData = InfiniteData<StaffDetailsQuery>,
      TError = unknown
    >(
      variables: StaffDetailsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<StaffDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<StaffDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<StaffDetailsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['StaffDetails.infinite'] : ['StaffDetails.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<StaffDetailsQuery, StaffDetailsQueryVariables>(StaffDetailsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteStaffDetailsQuery.getKey = (variables?: StaffDetailsQueryVariables) => variables === undefined ? ['StaffDetails.infinite'] : ['StaffDetails.infinite', variables];


useStaffDetailsQuery.fetcher = (variables?: StaffDetailsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<StaffDetailsQuery, StaffDetailsQueryVariables>(StaffDetailsDocument, variables, options);

export const GetNotificationsDocument = `
    query GetNotifications($page: Int, $amount: Int, $reset: Boolean) {
  Viewer {
    id
    unreadNotificationCount
  }
  Page(page: $page, perPage: $amount) {
    pageInfo {
      hasNextPage
      currentPage
    }
    notifications(resetNotificationCount: $reset) {
      __typename
      ... on ActivityLikeNotification {
        id
        activityId
        user {
          ...user
        }
        activity {
          ...activity
        }
        context
        createdAt
        type
      }
      ... on ActivityMentionNotification {
        id
        activityId
        user {
          ...user
        }
        activity {
          ...activity
        }
        context
        createdAt
        type
      }
      ... on ActivityMessageNotification {
        id
        activityId
        user {
          ...user
        }
        message {
          siteUrl
        }
        activityId
        context
        createdAt
        type
      }
      ... on ActivityReplyNotification {
        id
        activityId
        user {
          ...user
        }
        activity {
          ...activity
        }
        context
        createdAt
        type
      }
      ... on ActivityReplyLikeNotification {
        id
        activityId
        user {
          ...user
        }
        activity {
          ...activity
        }
        context
        createdAt
        type
      }
      ... on ActivityReplySubscribedNotification {
        id
        activityId
        user {
          ...user
        }
        activity {
          ...activity
        }
        context
        createdAt
        type
      }
      ... on AiringNotification {
        id
        media {
          ...media
        }
        episode
        contexts
        createdAt
        type
      }
      ... on RelatedMediaAdditionNotification {
        id
        media {
          ...media
        }
        context
        createdAt
        type
      }
      ... on FollowingNotification {
        id
        user {
          ...user
        }
        context
        createdAt
        type
      }
      ... on MediaDataChangeNotification {
        id
        media {
          ...media
        }
        reason
        context
        createdAt
        type
      }
      ... on MediaDeletionNotification {
        id
        deletedMediaTitle
        context
        reason
        createdAt
        type
      }
      ... on MediaMergeNotification {
        id
        media {
          ...media
        }
        reason
        deletedMediaTitles
        context
        createdAt
        type
      }
      ... on ThreadLikeNotification {
        id
        threadId
        context
        user {
          ...user
        }
        thread {
          ...thread
        }
        context
        createdAt
        type
      }
      ... on ThreadCommentLikeNotification {
        id
        commentId
        context
        user {
          ...user
        }
        thread {
          ...thread
        }
        comment {
          comment
        }
        context
        createdAt
        type
      }
      ... on ThreadCommentReplyNotification {
        id
        commentId
        context
        user {
          ...user
        }
        thread {
          ...thread
        }
        comment {
          comment
        }
        context
        createdAt
        type
      }
      ... on ThreadCommentMentionNotification {
        id
        commentId
        context
        user {
          ...user
        }
        thread {
          ...thread
        }
        comment {
          comment
        }
        context
        createdAt
        type
      }
      ... on ThreadCommentSubscribedNotification {
        id
        commentId
        context
        user {
          ...user
        }
        thread {
          ...thread
        }
        comment {
          comment
        }
        context
        createdAt
        type
      }
    }
  }
}
    ${UserFragmentDoc}
${ActivityFragmentDoc}
${MediaFragmentDoc}
${ThreadFragmentDoc}`;

export const useGetNotificationsQuery = <
      TData = GetNotificationsQuery,
      TError = unknown
    >(
      variables?: GetNotificationsQueryVariables,
      options?: Omit<UseQueryOptions<GetNotificationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetNotificationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetNotificationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetNotifications'] : ['GetNotifications', variables],
    queryFn: fetchAnilistData<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, variables),
    ...options
  }
    )};

useGetNotificationsQuery.getKey = (variables?: GetNotificationsQueryVariables) => variables === undefined ? ['GetNotifications'] : ['GetNotifications', variables];

export const useInfiniteGetNotificationsQuery = <
      TData = InfiniteData<GetNotificationsQuery>,
      TError = unknown
    >(
      variables: GetNotificationsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetNotificationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetNotificationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetNotificationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetNotifications.infinite'] : ['GetNotifications.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetNotificationsQuery.getKey = (variables?: GetNotificationsQueryVariables) => variables === undefined ? ['GetNotifications.infinite'] : ['GetNotifications.infinite', variables];


useGetNotificationsQuery.fetcher = (variables?: GetNotificationsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, variables, options);

export const ActivityDetailDocument = `
    query ActivityDetail($id: Int) {
  Activity(id: $id) {
    __typename
    ... on TextActivity {
      id
      userId
      type
      replyCount
      text(asHtml: true)
      siteUrl
      isLocked
      isSubscribed
      likeCount
      isLiked
      isPinned
      createdAt
      user {
        ...user
      }
      replies {
        id
        userId
        activityId
        text(asHtml: true)
        likeCount
        isLiked
        createdAt
        user {
          ...user
        }
      }
    }
    ... on ListActivity {
      id
      userId
      type
      replyCount
      status
      progress
      isLocked
      isSubscribed
      likeCount
      isLiked
      isPinned
      siteUrl
      createdAt
      user {
        ...user
      }
      media {
        ...media
      }
      replies {
        id
        userId
        activityId
        text(asHtml: true)
        likeCount
        isLiked
        createdAt
        user {
          ...user
        }
      }
    }
    ... on MessageActivity {
      id
      recipientId
      messengerId
      type
      replyCount
      message(asHtml: true)
      isLocked
      isSubscribed
      likeCount
      isLiked
      isPrivate
      siteUrl
      createdAt
      recipient {
        ...user
      }
      messenger {
        ...user
      }
      replies {
        id
        userId
        activityId
        text(asHtml: true)
        likeCount
        isLiked
        createdAt
        user {
          ...user
        }
      }
    }
  }
}
    ${UserFragmentDoc}
${MediaFragmentDoc}`;

export const useActivityDetailQuery = <
      TData = ActivityDetailQuery,
      TError = unknown
    >(
      variables?: ActivityDetailQueryVariables,
      options?: Omit<UseQueryOptions<ActivityDetailQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ActivityDetailQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ActivityDetailQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ActivityDetail'] : ['ActivityDetail', variables],
    queryFn: fetchAnilistData<ActivityDetailQuery, ActivityDetailQueryVariables>(ActivityDetailDocument, variables),
    ...options
  }
    )};

useActivityDetailQuery.getKey = (variables?: ActivityDetailQueryVariables) => variables === undefined ? ['ActivityDetail'] : ['ActivityDetail', variables];

export const useInfiniteActivityDetailQuery = <
      TData = InfiniteData<ActivityDetailQuery>,
      TError = unknown
    >(
      variables: ActivityDetailQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ActivityDetailQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ActivityDetailQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ActivityDetailQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['ActivityDetail.infinite'] : ['ActivityDetail.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<ActivityDetailQuery, ActivityDetailQueryVariables>(ActivityDetailDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteActivityDetailQuery.getKey = (variables?: ActivityDetailQueryVariables) => variables === undefined ? ['ActivityDetail.infinite'] : ['ActivityDetail.infinite', variables];


useActivityDetailQuery.fetcher = (variables?: ActivityDetailQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<ActivityDetailQuery, ActivityDetailQueryVariables>(ActivityDetailDocument, variables, options);

export const ReviewsDocument = `
    query Reviews($mediaId: Int, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      lastPage
      total
      hasNextPage
      currentPage
    }
    reviews(mediaId: $mediaId, sort: [RATING_DESC, ID]) {
      id
      summary
      rating
      ratingAmount
      score
      createdAt
      updatedAt
      user {
        id
        name
        avatar {
          large
        }
        bannerImage
        siteUrl
      }
    }
  }
}
    `;

export const useReviewsQuery = <
      TData = ReviewsQuery,
      TError = unknown
    >(
      variables?: ReviewsQueryVariables,
      options?: Omit<UseQueryOptions<ReviewsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ReviewsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ReviewsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Reviews'] : ['Reviews', variables],
    queryFn: fetchAnilistData<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, variables),
    ...options
  }
    )};

useReviewsQuery.getKey = (variables?: ReviewsQueryVariables) => variables === undefined ? ['Reviews'] : ['Reviews', variables];

export const useInfiniteReviewsQuery = <
      TData = InfiniteData<ReviewsQuery>,
      TError = unknown
    >(
      variables: ReviewsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ReviewsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ReviewsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ReviewsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Reviews.infinite'] : ['Reviews.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteReviewsQuery.getKey = (variables?: ReviewsQueryVariables) => variables === undefined ? ['Reviews.infinite'] : ['Reviews.infinite', variables];


useReviewsQuery.fetcher = (variables?: ReviewsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, variables, options);

export const ReviewsByIdDocument = `
    query ReviewsById($reviewId: Int) {
  Review(id: $reviewId) {
    id
    summary
    body(asHtml: false)
    htmlBody: body(asHtml: true)
    mediaType
    media {
      coverImage {
        extraLarge
        color
      }
      bannerImage
    }
    rating
    ratingAmount
    score
    siteUrl
    createdAt
    updatedAt
    userRating
    user {
      id
      name
      avatar {
        large
      }
      bannerImage
      isFollowing
      siteUrl
    }
  }
}
    `;

export const useReviewsByIdQuery = <
      TData = ReviewsByIdQuery,
      TError = unknown
    >(
      variables?: ReviewsByIdQueryVariables,
      options?: Omit<UseQueryOptions<ReviewsByIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ReviewsByIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ReviewsByIdQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ReviewsById'] : ['ReviewsById', variables],
    queryFn: fetchAnilistData<ReviewsByIdQuery, ReviewsByIdQueryVariables>(ReviewsByIdDocument, variables),
    ...options
  }
    )};

useReviewsByIdQuery.getKey = (variables?: ReviewsByIdQueryVariables) => variables === undefined ? ['ReviewsById'] : ['ReviewsById', variables];

export const useInfiniteReviewsByIdQuery = <
      TData = InfiniteData<ReviewsByIdQuery>,
      TError = unknown
    >(
      variables: ReviewsByIdQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ReviewsByIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ReviewsByIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ReviewsByIdQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['ReviewsById.infinite'] : ['ReviewsById.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<ReviewsByIdQuery, ReviewsByIdQueryVariables>(ReviewsByIdDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteReviewsByIdQuery.getKey = (variables?: ReviewsByIdQueryVariables) => variables === undefined ? ['ReviewsById.infinite'] : ['ReviewsById.infinite', variables];


useReviewsByIdQuery.fetcher = (variables?: ReviewsByIdQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<ReviewsByIdQuery, ReviewsByIdQueryVariables>(ReviewsByIdDocument, variables, options);

export const MediaSearchDocument = `
    query MediaSearch($type: MediaType, $page: Int, $perPage: Int, $id: Int, $idMal: Int, $startDate: FuzzyDateInt, $endDate: FuzzyDateInt, $season: MediaSeason, $seasonYear: Int, $format: MediaFormat, $status: MediaStatus, $episodes: Int, $duration: Int, $chapters: Int, $volumes: Int, $isAdult: Boolean, $genre: String, $tag: String, $minimumTagRank: Int, $tagCategory: String, $onList: Boolean, $licensedBy: String, $licensedById: Int, $averageScore: Int, $popularity: Int, $source: MediaSource, $countryOfOrigin: CountryCode, $isLicensed: Boolean, $search: String, $id_not: Int, $id_in: [Int], $id_not_in: [Int], $idMal_not: Int, $idMal_in: [Int], $idMal_not_in: [Int], $startDate_greater: FuzzyDateInt, $startDate_lesser: FuzzyDateInt, $startDate_like: String, $endDate_greater: FuzzyDateInt, $endDate_lesser: FuzzyDateInt, $endDate_like: String, $format_in: [MediaFormat], $format_not: MediaFormat, $format_not_in: [MediaFormat], $status_in: [MediaStatus], $status_not: MediaStatus, $status_not_in: [MediaStatus], $episodes_greater: Int, $episodes_lesser: Int, $duration_greater: Int, $duration_lesser: Int, $chapters_greater: Int, $chapters_lesser: Int, $volumes_greater: Int, $volumes_lesser: Int, $genre_in: [String], $genre_not_in: [String], $tag_in: [String], $tag_not_in: [String], $tagCategory_in: [String], $tagCategory_not_in: [String], $licensedBy_in: [String], $licensedById_in: [Int], $averageScore_not: Int, $averageScore_greater: Int, $averageScore_lesser: Int, $popularity_not: Int, $popularity_greater: Int, $popularity_lesser: Int, $source_in: [MediaSource], $sort: [MediaSort]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(
      id: $id
      idMal: $idMal
      startDate: $startDate
      endDate: $endDate
      season: $season
      seasonYear: $seasonYear
      type: $type
      format: $format
      status: $status
      episodes: $episodes
      duration: $duration
      chapters: $chapters
      volumes: $volumes
      isAdult: $isAdult
      genre: $genre
      tag: $tag
      minimumTagRank: $minimumTagRank
      tagCategory: $tagCategory
      onList: $onList
      licensedBy: $licensedBy
      licensedById: $licensedById
      averageScore: $averageScore
      popularity: $popularity
      source: $source
      countryOfOrigin: $countryOfOrigin
      isLicensed: $isLicensed
      search: $search
      id_not: $id_not
      id_in: $id_in
      id_not_in: $id_not_in
      idMal_not: $idMal_not
      idMal_in: $idMal_in
      idMal_not_in: $idMal_not_in
      startDate_greater: $startDate_greater
      startDate_lesser: $startDate_lesser
      startDate_like: $startDate_like
      endDate_greater: $endDate_greater
      endDate_lesser: $endDate_lesser
      endDate_like: $endDate_like
      format_in: $format_in
      format_not: $format_not
      format_not_in: $format_not_in
      status_in: $status_in
      status_not: $status_not
      status_not_in: $status_not_in
      episodes_greater: $episodes_greater
      episodes_lesser: $episodes_lesser
      duration_greater: $duration_greater
      duration_lesser: $duration_lesser
      chapters_greater: $chapters_greater
      chapters_lesser: $chapters_lesser
      volumes_greater: $volumes_greater
      volumes_lesser: $volumes_lesser
      genre_in: $genre_in
      genre_not_in: $genre_not_in
      tag_in: $tag_in
      tag_not_in: $tag_not_in
      tagCategory_in: $tagCategory_in
      tagCategory_not_in: $tagCategory_not_in
      licensedBy_in: $licensedBy_in
      licensedById_in: $licensedById_in
      averageScore_not: $averageScore_not
      averageScore_greater: $averageScore_greater
      averageScore_lesser: $averageScore_lesser
      popularity_not: $popularity_not
      popularity_greater: $popularity_greater
      popularity_lesser: $popularity_lesser
      source_in: $source_in
      sort: $sort
    ) {
      ...MainMeta
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useMediaSearchQuery = <
      TData = MediaSearchQuery,
      TError = unknown
    >(
      variables?: MediaSearchQueryVariables,
      options?: Omit<UseQueryOptions<MediaSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MediaSearchQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MediaSearchQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['MediaSearch'] : ['MediaSearch', variables],
    queryFn: fetchAnilistData<MediaSearchQuery, MediaSearchQueryVariables>(MediaSearchDocument, variables),
    ...options
  }
    )};

useMediaSearchQuery.getKey = (variables?: MediaSearchQueryVariables) => variables === undefined ? ['MediaSearch'] : ['MediaSearch', variables];

export const useInfiniteMediaSearchQuery = <
      TData = InfiniteData<MediaSearchQuery>,
      TError = unknown
    >(
      variables: MediaSearchQueryVariables,
      options: Omit<UseInfiniteQueryOptions<MediaSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<MediaSearchQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<MediaSearchQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['MediaSearch.infinite'] : ['MediaSearch.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<MediaSearchQuery, MediaSearchQueryVariables>(MediaSearchDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteMediaSearchQuery.getKey = (variables?: MediaSearchQueryVariables) => variables === undefined ? ['MediaSearch.infinite'] : ['MediaSearch.infinite', variables];


useMediaSearchQuery.fetcher = (variables?: MediaSearchQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<MediaSearchQuery, MediaSearchQueryVariables>(MediaSearchDocument, variables, options);

export const UserSearchDocument = `
    query UserSearch($id: Int, $search: String, $sort: [UserSort], $isModerator: Boolean) {
  Page(page: 1) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    users(id: $id, search: $search, isModerator: $isModerator, sort: $sort) {
      ...UserSearchMeta
    }
  }
}
    ${UserSearchMetaFragmentDoc}`;

export const useUserSearchQuery = <
      TData = UserSearchQuery,
      TError = unknown
    >(
      variables?: UserSearchQueryVariables,
      options?: Omit<UseQueryOptions<UserSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserSearchQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserSearchQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserSearch'] : ['UserSearch', variables],
    queryFn: fetchAnilistData<UserSearchQuery, UserSearchQueryVariables>(UserSearchDocument, variables),
    ...options
  }
    )};

useUserSearchQuery.getKey = (variables?: UserSearchQueryVariables) => variables === undefined ? ['UserSearch'] : ['UserSearch', variables];

export const useInfiniteUserSearchQuery = <
      TData = InfiniteData<UserSearchQuery>,
      TError = unknown
    >(
      variables: UserSearchQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserSearchQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserSearchQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserSearch.infinite'] : ['UserSearch.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserSearchQuery, UserSearchQueryVariables>(UserSearchDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserSearchQuery.getKey = (variables?: UserSearchQueryVariables) => variables === undefined ? ['UserSearch.infinite'] : ['UserSearch.infinite', variables];


useUserSearchQuery.fetcher = (variables?: UserSearchQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserSearchQuery, UserSearchQueryVariables>(UserSearchDocument, variables, options);

export const CharacterSearchDocument = `
    query CharacterSearch($id: Int, $search: String, $page: Int, $isBirthday: Boolean, $sort: [CharacterSort]) {
  Page(page: $page, perPage: 50) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    characters(id: $id, search: $search, isBirthday: $isBirthday, sort: $sort) {
      ...CharacterMetaData
    }
  }
}
    ${CharacterMetaDataFragmentDoc}`;

export const useCharacterSearchQuery = <
      TData = CharacterSearchQuery,
      TError = unknown
    >(
      variables?: CharacterSearchQueryVariables,
      options?: Omit<UseQueryOptions<CharacterSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CharacterSearchQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CharacterSearchQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['CharacterSearch'] : ['CharacterSearch', variables],
    queryFn: fetchAnilistData<CharacterSearchQuery, CharacterSearchQueryVariables>(CharacterSearchDocument, variables),
    ...options
  }
    )};

useCharacterSearchQuery.getKey = (variables?: CharacterSearchQueryVariables) => variables === undefined ? ['CharacterSearch'] : ['CharacterSearch', variables];

export const useInfiniteCharacterSearchQuery = <
      TData = InfiniteData<CharacterSearchQuery>,
      TError = unknown
    >(
      variables: CharacterSearchQueryVariables,
      options: Omit<UseInfiniteQueryOptions<CharacterSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<CharacterSearchQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<CharacterSearchQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['CharacterSearch.infinite'] : ['CharacterSearch.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<CharacterSearchQuery, CharacterSearchQueryVariables>(CharacterSearchDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteCharacterSearchQuery.getKey = (variables?: CharacterSearchQueryVariables) => variables === undefined ? ['CharacterSearch.infinite'] : ['CharacterSearch.infinite', variables];


useCharacterSearchQuery.fetcher = (variables?: CharacterSearchQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<CharacterSearchQuery, CharacterSearchQueryVariables>(CharacterSearchDocument, variables, options);

export const StaffSearchDocument = `
    query StaffSearch($id: Int, $search: String, $page: Int, $isBirthday: Boolean, $sort: [StaffSort]) {
  Page(page: $page, perPage: 50) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    staff(id: $id, search: $search, isBirthday: $isBirthday, sort: $sort) {
      ...StaffMetaData
    }
  }
}
    ${StaffMetaDataFragmentDoc}`;

export const useStaffSearchQuery = <
      TData = StaffSearchQuery,
      TError = unknown
    >(
      variables?: StaffSearchQueryVariables,
      options?: Omit<UseQueryOptions<StaffSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<StaffSearchQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<StaffSearchQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['StaffSearch'] : ['StaffSearch', variables],
    queryFn: fetchAnilistData<StaffSearchQuery, StaffSearchQueryVariables>(StaffSearchDocument, variables),
    ...options
  }
    )};

useStaffSearchQuery.getKey = (variables?: StaffSearchQueryVariables) => variables === undefined ? ['StaffSearch'] : ['StaffSearch', variables];

export const useInfiniteStaffSearchQuery = <
      TData = InfiniteData<StaffSearchQuery>,
      TError = unknown
    >(
      variables: StaffSearchQueryVariables,
      options: Omit<UseInfiniteQueryOptions<StaffSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<StaffSearchQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<StaffSearchQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['StaffSearch.infinite'] : ['StaffSearch.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<StaffSearchQuery, StaffSearchQueryVariables>(StaffSearchDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteStaffSearchQuery.getKey = (variables?: StaffSearchQueryVariables) => variables === undefined ? ['StaffSearch.infinite'] : ['StaffSearch.infinite', variables];


useStaffSearchQuery.fetcher = (variables?: StaffSearchQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<StaffSearchQuery, StaffSearchQueryVariables>(StaffSearchDocument, variables, options);

export const StudioSearchDocument = `
    query StudioSearch($id: Int, $search: String, $page: Int, $sort: [StudioSort]) {
  Page(page: $page, perPage: 50) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    studios(id: $id, search: $search, sort: $sort) {
      id
      name
      media(page: 1, perPage: 5, sort: [TRENDING_DESC, POPULARITY_DESC]) {
        edges {
          node {
            ...MainMeta
          }
        }
      }
      isFavourite
      siteUrl
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useStudioSearchQuery = <
      TData = StudioSearchQuery,
      TError = unknown
    >(
      variables?: StudioSearchQueryVariables,
      options?: Omit<UseQueryOptions<StudioSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<StudioSearchQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<StudioSearchQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['StudioSearch'] : ['StudioSearch', variables],
    queryFn: fetchAnilistData<StudioSearchQuery, StudioSearchQueryVariables>(StudioSearchDocument, variables),
    ...options
  }
    )};

useStudioSearchQuery.getKey = (variables?: StudioSearchQueryVariables) => variables === undefined ? ['StudioSearch'] : ['StudioSearch', variables];

export const useInfiniteStudioSearchQuery = <
      TData = InfiniteData<StudioSearchQuery>,
      TError = unknown
    >(
      variables: StudioSearchQueryVariables,
      options: Omit<UseInfiniteQueryOptions<StudioSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<StudioSearchQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<StudioSearchQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['StudioSearch.infinite'] : ['StudioSearch.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<StudioSearchQuery, StudioSearchQueryVariables>(StudioSearchDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteStudioSearchQuery.getKey = (variables?: StudioSearchQueryVariables) => variables === undefined ? ['StudioSearch.infinite'] : ['StudioSearch.infinite', variables];


useStudioSearchQuery.fetcher = (variables?: StudioSearchQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<StudioSearchQuery, StudioSearchQueryVariables>(StudioSearchDocument, variables, options);

export const SearchAllDocument = `
    query SearchAll($search: String, $perPage: Int, $isAdult: Boolean) {
  Anime: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(type: ANIME, search: $search, isAdult: $isAdult) {
      ...MainMeta
    }
  }
  Manga: Page(page: 1, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
      total
    }
    media(type: MANGA, search: $search, isAdult: $isAdult) {
      ...MainMeta
    }
  }
  Characters: Page(page: 1, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    characters(search: $search) {
      id
      isFavourite
      dateOfBirth {
        year
        month
        day
      }
      name {
        full
        native
      }
      image {
        large
      }
    }
  }
  Staff: Page(page: 1, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    staff(search: $search) {
      id
      isFavourite
      dateOfBirth {
        year
        month
        day
      }
      name {
        full
        native
      }
      image {
        large
      }
    }
  }
  Studios: Page(page: 1, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    studios(search: $search) {
      id
      name
      media(page: 1, perPage: 5, sort: [TRENDING_DESC, POPULARITY_DESC]) {
        edges {
          node {
            ...MainMeta
          }
        }
      }
      isFavourite
      siteUrl
    }
  }
  Users: Page(page: 1, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    users(search: $search) {
      id
      name
      avatar {
        large
      }
      isFollowing
      isFollower
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useSearchAllQuery = <
      TData = SearchAllQuery,
      TError = unknown
    >(
      variables?: SearchAllQueryVariables,
      options?: Omit<UseQueryOptions<SearchAllQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<SearchAllQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<SearchAllQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['SearchAll'] : ['SearchAll', variables],
    queryFn: fetchAnilistData<SearchAllQuery, SearchAllQueryVariables>(SearchAllDocument, variables),
    ...options
  }
    )};

useSearchAllQuery.getKey = (variables?: SearchAllQueryVariables) => variables === undefined ? ['SearchAll'] : ['SearchAll', variables];

export const useInfiniteSearchAllQuery = <
      TData = InfiniteData<SearchAllQuery>,
      TError = unknown
    >(
      variables: SearchAllQueryVariables,
      options: Omit<UseInfiniteQueryOptions<SearchAllQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<SearchAllQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<SearchAllQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['SearchAll.infinite'] : ['SearchAll.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<SearchAllQuery, SearchAllQueryVariables>(SearchAllDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteSearchAllQuery.getKey = (variables?: SearchAllQueryVariables) => variables === undefined ? ['SearchAll.infinite'] : ['SearchAll.infinite', variables];


useSearchAllQuery.fetcher = (variables?: SearchAllQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<SearchAllQuery, SearchAllQueryVariables>(SearchAllDocument, variables, options);

export const SiteStatsDocument = `
    query SiteStats {
  SiteStatistics {
    users(sort: DATE_DESC) {
      ...siteTrend
    }
    anime(sort: DATE_DESC) {
      ...siteTrend
    }
    manga(sort: DATE_DESC) {
      ...siteTrend
    }
    characters(sort: DATE_DESC) {
      ...siteTrend
    }
    staff(sort: DATE_DESC) {
      ...siteTrend
    }
    reviews(sort: DATE_DESC) {
      ...siteTrend
    }
  }
}
    ${SiteTrendFragmentDoc}`;

export const useSiteStatsQuery = <
      TData = SiteStatsQuery,
      TError = unknown
    >(
      variables?: SiteStatsQueryVariables,
      options?: Omit<UseQueryOptions<SiteStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<SiteStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<SiteStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['SiteStats'] : ['SiteStats', variables],
    queryFn: fetchAnilistData<SiteStatsQuery, SiteStatsQueryVariables>(SiteStatsDocument, variables),
    ...options
  }
    )};

useSiteStatsQuery.getKey = (variables?: SiteStatsQueryVariables) => variables === undefined ? ['SiteStats'] : ['SiteStats', variables];

export const useInfiniteSiteStatsQuery = <
      TData = InfiniteData<SiteStatsQuery>,
      TError = unknown
    >(
      variables: SiteStatsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<SiteStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<SiteStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<SiteStatsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['SiteStats.infinite'] : ['SiteStats.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<SiteStatsQuery, SiteStatsQueryVariables>(SiteStatsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteSiteStatsQuery.getKey = (variables?: SiteStatsQueryVariables) => variables === undefined ? ['SiteStats.infinite'] : ['SiteStats.infinite', variables];


useSiteStatsQuery.fetcher = (variables?: SiteStatsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<SiteStatsQuery, SiteStatsQueryVariables>(SiteStatsDocument, variables, options);

export const MediaTrendsDocument = `
    query MediaTrends($id: Int) {
  Media(id: $id) {
    id
    title {
      romaji
      english
      native
      userPreferred
    }
    coverImage {
      extraLarge
      color
    }
    type
    format
    rankings {
      id
      rank
      type
      format
      year
      season
      allTime
      context
    }
    trends(sort: ID_DESC) {
      nodes {
        averageScore
        date
        trending
        popularity
      }
    }
    airingTrends: trends(releasing: true, sort: EPISODE_DESC) {
      nodes {
        averageScore
        inProgress
        episode
      }
    }
    distribution: stats {
      status: statusDistribution {
        status
        amount
      }
      score: scoreDistribution {
        score
        amount
      }
    }
  }
}
    `;

export const useMediaTrendsQuery = <
      TData = MediaTrendsQuery,
      TError = unknown
    >(
      variables?: MediaTrendsQueryVariables,
      options?: Omit<UseQueryOptions<MediaTrendsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MediaTrendsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MediaTrendsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['MediaTrends'] : ['MediaTrends', variables],
    queryFn: fetchAnilistData<MediaTrendsQuery, MediaTrendsQueryVariables>(MediaTrendsDocument, variables),
    ...options
  }
    )};

useMediaTrendsQuery.getKey = (variables?: MediaTrendsQueryVariables) => variables === undefined ? ['MediaTrends'] : ['MediaTrends', variables];

export const useInfiniteMediaTrendsQuery = <
      TData = InfiniteData<MediaTrendsQuery>,
      TError = unknown
    >(
      variables: MediaTrendsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<MediaTrendsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<MediaTrendsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<MediaTrendsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['MediaTrends.infinite'] : ['MediaTrends.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<MediaTrendsQuery, MediaTrendsQueryVariables>(MediaTrendsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteMediaTrendsQuery.getKey = (variables?: MediaTrendsQueryVariables) => variables === undefined ? ['MediaTrends.infinite'] : ['MediaTrends.infinite', variables];


useMediaTrendsQuery.fetcher = (variables?: MediaTrendsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<MediaTrendsQuery, MediaTrendsQueryVariables>(MediaTrendsDocument, variables, options);

export const ThreadsOverviewDocument = `
    query ThreadsOverview($id: Int, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    threads(mediaCategoryId: $id, sort: ID_DESC) {
      id
      title
      replyCount
      viewCount
      replyCommentId
      repliedAt
      createdAt
      categories {
        id
        name
      }
      user {
        id
        name
        bannerImage
        avatar {
          large
        }
      }
      replyUser {
        id
        name
        avatar {
          large
        }
      }
    }
  }
}
    `;

export const useThreadsOverviewQuery = <
      TData = ThreadsOverviewQuery,
      TError = unknown
    >(
      variables?: ThreadsOverviewQueryVariables,
      options?: Omit<UseQueryOptions<ThreadsOverviewQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ThreadsOverviewQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ThreadsOverviewQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ThreadsOverview'] : ['ThreadsOverview', variables],
    queryFn: fetchAnilistData<ThreadsOverviewQuery, ThreadsOverviewQueryVariables>(ThreadsOverviewDocument, variables),
    ...options
  }
    )};

useThreadsOverviewQuery.getKey = (variables?: ThreadsOverviewQueryVariables) => variables === undefined ? ['ThreadsOverview'] : ['ThreadsOverview', variables];

export const useInfiniteThreadsOverviewQuery = <
      TData = InfiniteData<ThreadsOverviewQuery>,
      TError = unknown
    >(
      variables: ThreadsOverviewQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ThreadsOverviewQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ThreadsOverviewQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ThreadsOverviewQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['ThreadsOverview.infinite'] : ['ThreadsOverview.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<ThreadsOverviewQuery, ThreadsOverviewQueryVariables>(ThreadsOverviewDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteThreadsOverviewQuery.getKey = (variables?: ThreadsOverviewQueryVariables) => variables === undefined ? ['ThreadsOverview.infinite'] : ['ThreadsOverview.infinite', variables];


useThreadsOverviewQuery.fetcher = (variables?: ThreadsOverviewQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<ThreadsOverviewQuery, ThreadsOverviewQueryVariables>(ThreadsOverviewDocument, variables, options);

export const ThreadsDocument = `
    query Threads($id: Int, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    threads(mediaCategoryId: $id, sort: ID_DESC) {
      id
      title
      replyCount
      viewCount
      replyCommentId
      repliedAt
      createdAt
      categories {
        id
        name
      }
      user {
        id
        name
        avatar {
          large
        }
      }
      replyUser {
        id
        name
        avatar {
          large
        }
      }
    }
  }
}
    `;

export const useThreadsQuery = <
      TData = ThreadsQuery,
      TError = unknown
    >(
      variables?: ThreadsQueryVariables,
      options?: Omit<UseQueryOptions<ThreadsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ThreadsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ThreadsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Threads'] : ['Threads', variables],
    queryFn: fetchAnilistData<ThreadsQuery, ThreadsQueryVariables>(ThreadsDocument, variables),
    ...options
  }
    )};

useThreadsQuery.getKey = (variables?: ThreadsQueryVariables) => variables === undefined ? ['Threads'] : ['Threads', variables];

export const useInfiniteThreadsQuery = <
      TData = InfiniteData<ThreadsQuery>,
      TError = unknown
    >(
      variables: ThreadsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ThreadsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ThreadsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ThreadsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Threads.infinite'] : ['Threads.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<ThreadsQuery, ThreadsQueryVariables>(ThreadsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteThreadsQuery.getKey = (variables?: ThreadsQueryVariables) => variables === undefined ? ['Threads.infinite'] : ['Threads.infinite', variables];


useThreadsQuery.fetcher = (variables?: ThreadsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<ThreadsQuery, ThreadsQueryVariables>(ThreadsDocument, variables, options);

export const ThreadDetailDocument = `
    query ThreadDetail($id: Int) {
  Thread(id: $id) {
    id
    title
    body
    htmlBody: body(asHtml: true)
    userId
    replyCount
    viewCount
    isLocked
    isSticky
    isSubscribed
    isLiked
    likeCount
    repliedAt
    createdAt
    likes {
      id
      name
      avatar {
        large
      }
    }
    user {
      id
      name
      avatar {
        large
      }
    }
    categories {
      id
      name
    }
    mediaCategories {
      id
      title {
        userPreferred
      }
      coverImage {
        large
      }
      type
      format
    }
  }
}
    `;

export const useThreadDetailQuery = <
      TData = ThreadDetailQuery,
      TError = unknown
    >(
      variables?: ThreadDetailQueryVariables,
      options?: Omit<UseQueryOptions<ThreadDetailQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ThreadDetailQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ThreadDetailQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ThreadDetail'] : ['ThreadDetail', variables],
    queryFn: fetchAnilistData<ThreadDetailQuery, ThreadDetailQueryVariables>(ThreadDetailDocument, variables),
    ...options
  }
    )};

useThreadDetailQuery.getKey = (variables?: ThreadDetailQueryVariables) => variables === undefined ? ['ThreadDetail'] : ['ThreadDetail', variables];

export const useInfiniteThreadDetailQuery = <
      TData = InfiniteData<ThreadDetailQuery>,
      TError = unknown
    >(
      variables: ThreadDetailQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ThreadDetailQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ThreadDetailQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ThreadDetailQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['ThreadDetail.infinite'] : ['ThreadDetail.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<ThreadDetailQuery, ThreadDetailQueryVariables>(ThreadDetailDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteThreadDetailQuery.getKey = (variables?: ThreadDetailQueryVariables) => variables === undefined ? ['ThreadDetail.infinite'] : ['ThreadDetail.infinite', variables];


useThreadDetailQuery.fetcher = (variables?: ThreadDetailQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<ThreadDetailQuery, ThreadDetailQueryVariables>(ThreadDetailDocument, variables, options);

export const AniListCommentsDocument = `
    query AniListComments($threadId: Int, $page: Int) {
  Page(page: $page, perPage: 15) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    threadComments(threadId: $threadId) {
      id
      threadId
      comment
      htmlComment: comment(asHtml: true)
      isLiked
      likeCount
      createdAt
      childComments
      user {
        id
        name
        donatorTier
        donatorBadge
        moderatorRoles
        avatar {
          large
        }
      }
      isLocked
    }
  }
}
    `;

export const useAniListCommentsQuery = <
      TData = AniListCommentsQuery,
      TError = unknown
    >(
      variables?: AniListCommentsQueryVariables,
      options?: Omit<UseQueryOptions<AniListCommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AniListCommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AniListCommentsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['AniListComments'] : ['AniListComments', variables],
    queryFn: fetchAnilistData<AniListCommentsQuery, AniListCommentsQueryVariables>(AniListCommentsDocument, variables),
    ...options
  }
    )};

useAniListCommentsQuery.getKey = (variables?: AniListCommentsQueryVariables) => variables === undefined ? ['AniListComments'] : ['AniListComments', variables];

export const useInfiniteAniListCommentsQuery = <
      TData = InfiniteData<AniListCommentsQuery>,
      TError = unknown
    >(
      variables: AniListCommentsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AniListCommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AniListCommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AniListCommentsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['AniListComments.infinite'] : ['AniListComments.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<AniListCommentsQuery, AniListCommentsQueryVariables>(AniListCommentsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAniListCommentsQuery.getKey = (variables?: AniListCommentsQueryVariables) => variables === undefined ? ['AniListComments.infinite'] : ['AniListComments.infinite', variables];


useAniListCommentsQuery.fetcher = (variables?: AniListCommentsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<AniListCommentsQuery, AniListCommentsQueryVariables>(AniListCommentsDocument, variables, options);

export const AniListCommentDetailsDocument = `
    query AniListCommentDetails($id: Int) {
  ThreadComment(id: $id) {
    id
    comment
    htmlComment: comment(asHtml: true)
    userId
    threadId
    likeCount
    isLiked
    siteUrl
    createdAt
    updatedAt
    childComments
    user {
      id
      name
      avatar {
        large
      }
      isFollowing
      isFollower
      isBlocked
    }
    likes {
      id
      name
      avatar {
        large
      }
    }
    isLocked
  }
}
    `;

export const useAniListCommentDetailsQuery = <
      TData = AniListCommentDetailsQuery,
      TError = unknown
    >(
      variables?: AniListCommentDetailsQueryVariables,
      options?: Omit<UseQueryOptions<AniListCommentDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AniListCommentDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AniListCommentDetailsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['AniListCommentDetails'] : ['AniListCommentDetails', variables],
    queryFn: fetchAnilistData<AniListCommentDetailsQuery, AniListCommentDetailsQueryVariables>(AniListCommentDetailsDocument, variables),
    ...options
  }
    )};

useAniListCommentDetailsQuery.getKey = (variables?: AniListCommentDetailsQueryVariables) => variables === undefined ? ['AniListCommentDetails'] : ['AniListCommentDetails', variables];

export const useInfiniteAniListCommentDetailsQuery = <
      TData = InfiniteData<AniListCommentDetailsQuery>,
      TError = unknown
    >(
      variables: AniListCommentDetailsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<AniListCommentDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<AniListCommentDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<AniListCommentDetailsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['AniListCommentDetails.infinite'] : ['AniListCommentDetails.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<AniListCommentDetailsQuery, AniListCommentDetailsQueryVariables>(AniListCommentDetailsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteAniListCommentDetailsQuery.getKey = (variables?: AniListCommentDetailsQueryVariables) => variables === undefined ? ['AniListCommentDetails.infinite'] : ['AniListCommentDetails.infinite', variables];


useAniListCommentDetailsQuery.fetcher = (variables?: AniListCommentDetailsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<AniListCommentDetailsQuery, AniListCommentDetailsQueryVariables>(AniListCommentDetailsDocument, variables, options);

export const UserAnimeStatsDocument = `
    query UserAnimeStats($userId: Int, $username: String) {
  User(id: $userId, name: $username) {
    statistics {
      anime {
        count
        meanScore
        standardDeviation
        minutesWatched
        episodesWatched
        formats(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          format
        }
        statuses(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          status
        }
        scores(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          score
        }
        lengths(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          length
        }
        releaseYears(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          releaseYear
        }
        startYears(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          startYear
        }
        genres(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          genre
        }
        tags(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          tag {
            id
            name
            description
            category
          }
        }
        countries(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          country
        }
        voiceActors(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          voiceActor {
            id
            languageV2
            image {
              large
            }
            isFavourite
            favourites
            name {
              userPreferred
            }
          }
        }
        staff(sort: [COUNT_DESC]) {
          count
          meanScore
          minutesWatched
          mediaIds
          staff {
            id
            languageV2
            image {
              large
            }
            isFavourite
            favourites
            name {
              userPreferred
            }
          }
        }
        studios {
          count
          meanScore
          minutesWatched
          mediaIds
          studio {
            id
            name
            favourites
            isFavourite
          }
        }
      }
    }
  }
}
    `;

export const useUserAnimeStatsQuery = <
      TData = UserAnimeStatsQuery,
      TError = unknown
    >(
      variables?: UserAnimeStatsQueryVariables,
      options?: Omit<UseQueryOptions<UserAnimeStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserAnimeStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserAnimeStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserAnimeStats'] : ['UserAnimeStats', variables],
    queryFn: fetchAnilistData<UserAnimeStatsQuery, UserAnimeStatsQueryVariables>(UserAnimeStatsDocument, variables),
    ...options
  }
    )};

useUserAnimeStatsQuery.getKey = (variables?: UserAnimeStatsQueryVariables) => variables === undefined ? ['UserAnimeStats'] : ['UserAnimeStats', variables];

export const useInfiniteUserAnimeStatsQuery = <
      TData = InfiniteData<UserAnimeStatsQuery>,
      TError = unknown
    >(
      variables: UserAnimeStatsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserAnimeStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserAnimeStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserAnimeStatsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserAnimeStats.infinite'] : ['UserAnimeStats.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserAnimeStatsQuery, UserAnimeStatsQueryVariables>(UserAnimeStatsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserAnimeStatsQuery.getKey = (variables?: UserAnimeStatsQueryVariables) => variables === undefined ? ['UserAnimeStats.infinite'] : ['UserAnimeStats.infinite', variables];


useUserAnimeStatsQuery.fetcher = (variables?: UserAnimeStatsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserAnimeStatsQuery, UserAnimeStatsQueryVariables>(UserAnimeStatsDocument, variables, options);

export const UserMangaStatsDocument = `
    query UserMangaStats($userId: Int, $username: String) {
  User(id: $userId, name: $username) {
    statistics {
      manga {
        count
        meanScore
        standardDeviation
        chaptersRead
        volumesRead
        formats(sort: [COUNT_DESC]) {
          count
          meanScore
          chaptersRead
          mediaIds
          format
        }
        statuses(sort: [COUNT_DESC]) {
          count
          meanScore
          chaptersRead
          mediaIds
          status
        }
        scores(sort: [COUNT_DESC]) {
          count
          meanScore
          chaptersRead
          mediaIds
          score
        }
        lengths(sort: [COUNT_DESC]) {
          count
          meanScore
          chaptersRead
          mediaIds
          length
        }
        releaseYears(sort: [COUNT_DESC]) {
          count
          meanScore
          chaptersRead
          mediaIds
          releaseYear
        }
        startYears(sort: [COUNT_DESC]) {
          count
          meanScore
          chaptersRead
          mediaIds
          startYear
        }
        genres(sort: [COUNT_DESC]) {
          count
          meanScore
          chaptersRead
          mediaIds
          genre
        }
        tags(sort: [COUNT_DESC]) {
          count
          meanScore
          chaptersRead
          mediaIds
          tag {
            id
            name
            description
            category
          }
        }
        countries(sort: [COUNT_DESC]) {
          count
          meanScore
          chaptersRead
          mediaIds
          country
        }
        staff(sort: [COUNT_DESC]) {
          count
          meanScore
          chaptersRead
          mediaIds
          staff {
            id
            languageV2
            image {
              large
            }
            isFavourite
            favourites
            name {
              userPreferred
            }
          }
        }
      }
    }
  }
}
    `;

export const useUserMangaStatsQuery = <
      TData = UserMangaStatsQuery,
      TError = unknown
    >(
      variables?: UserMangaStatsQueryVariables,
      options?: Omit<UseQueryOptions<UserMangaStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserMangaStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserMangaStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserMangaStats'] : ['UserMangaStats', variables],
    queryFn: fetchAnilistData<UserMangaStatsQuery, UserMangaStatsQueryVariables>(UserMangaStatsDocument, variables),
    ...options
  }
    )};

useUserMangaStatsQuery.getKey = (variables?: UserMangaStatsQueryVariables) => variables === undefined ? ['UserMangaStats'] : ['UserMangaStats', variables];

export const useInfiniteUserMangaStatsQuery = <
      TData = InfiniteData<UserMangaStatsQuery>,
      TError = unknown
    >(
      variables: UserMangaStatsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserMangaStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserMangaStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserMangaStatsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserMangaStats.infinite'] : ['UserMangaStats.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserMangaStatsQuery, UserMangaStatsQueryVariables>(UserMangaStatsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserMangaStatsQuery.getKey = (variables?: UserMangaStatsQueryVariables) => variables === undefined ? ['UserMangaStats.infinite'] : ['UserMangaStats.infinite', variables];


useUserMangaStatsQuery.fetcher = (variables?: UserMangaStatsQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserMangaStatsQuery, UserMangaStatsQueryVariables>(UserMangaStatsDocument, variables, options);

export const UserActivityDocument = `
    query UserActivity($page: Int, $perPage: Int, $isFollowing: Boolean, $userId: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      hasNextPage
    }
    activities(sort: ID_DESC, isFollowing: $isFollowing, userId: $userId) {
      __typename
      ... on ListActivity {
        id
        progress
        status
        likeCount
        createdAt
        replyCount
        user {
          id
          name
          about
          createdAt
          bannerImage
          options {
            profileColor
          }
          avatar {
            large
          }
          favourites {
            anime(perPage: 1) {
              nodes {
                id
                title {
                  userPreferred
                }
                coverImage {
                  extraLarge
                }
                siteUrl
              }
            }
            manga(perPage: 1) {
              nodes {
                id
                title {
                  userPreferred
                }
                coverImage {
                  extraLarge
                }
                siteUrl
              }
            }
            characters(perPage: 1) {
              nodes {
                id
                name {
                  userPreferred
                }
                image {
                  large
                }
                gender
                siteUrl
              }
            }
          }
          siteUrl
        }
        media {
          ...MainMeta
        }
        siteUrl
      }
      ... on TextActivity {
        id
        userId
        type
        replyCount
        text
        siteUrl
        isLocked
        isSubscribed
        likeCount
        isLiked
        isPinned
        createdAt
        user {
          id
          name
          about
          createdAt
          bannerImage
          options {
            profileColor
          }
          avatar {
            large
          }
          siteUrl
        }
      }
      ... on MessageActivity {
        id
        recipientId
        messengerId
        type
        replyCount
        message
        isLocked
        isSubscribed
        likeCount
        isLiked
        isPrivate
        siteUrl
        createdAt
        recipient {
          id
          name
          about
          createdAt
          bannerImage
          options {
            profileColor
          }
          avatar {
            large
          }
          siteUrl
        }
        messenger {
          id
          name
          about
          createdAt
          bannerImage
          options {
            profileColor
          }
          avatar {
            large
          }
          siteUrl
        }
      }
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useUserActivityQuery = <
      TData = UserActivityQuery,
      TError = unknown
    >(
      variables?: UserActivityQueryVariables,
      options?: Omit<UseQueryOptions<UserActivityQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserActivityQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserActivityQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserActivity'] : ['UserActivity', variables],
    queryFn: fetchAnilistData<UserActivityQuery, UserActivityQueryVariables>(UserActivityDocument, variables),
    ...options
  }
    )};

useUserActivityQuery.getKey = (variables?: UserActivityQueryVariables) => variables === undefined ? ['UserActivity'] : ['UserActivity', variables];

export const useInfiniteUserActivityQuery = <
      TData = InfiniteData<UserActivityQuery>,
      TError = unknown
    >(
      variables: UserActivityQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserActivityQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserActivityQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserActivityQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserActivity.infinite'] : ['UserActivity.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserActivityQuery, UserActivityQueryVariables>(UserActivityDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserActivityQuery.getKey = (variables?: UserActivityQueryVariables) => variables === undefined ? ['UserActivity.infinite'] : ['UserActivity.infinite', variables];


useUserActivityQuery.fetcher = (variables?: UserActivityQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserActivityQuery, UserActivityQueryVariables>(UserActivityDocument, variables, options);

export const UserDataDocument = `
    query UserData($id: Int, $username: String, $favoritesPerPage: Int) {
  User(id: $id, name: $username) {
    ...UserMetaData
  }
}
    ${UserMetaDataFragmentDoc}`;

export const useUserDataQuery = <
      TData = UserDataQuery,
      TError = unknown
    >(
      variables?: UserDataQueryVariables,
      options?: Omit<UseQueryOptions<UserDataQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserDataQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserDataQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserData'] : ['UserData', variables],
    queryFn: fetchAnilistData<UserDataQuery, UserDataQueryVariables>(UserDataDocument, variables),
    ...options
  }
    )};

useUserDataQuery.getKey = (variables?: UserDataQueryVariables) => variables === undefined ? ['UserData'] : ['UserData', variables];

export const useInfiniteUserDataQuery = <
      TData = InfiniteData<UserDataQuery>,
      TError = unknown
    >(
      variables: UserDataQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserDataQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserDataQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserDataQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserData.infinite'] : ['UserData.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserDataQuery, UserDataQueryVariables>(UserDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserDataQuery.getKey = (variables?: UserDataQueryVariables) => variables === undefined ? ['UserData.infinite'] : ['UserData.infinite', variables];


useUserDataQuery.fetcher = (variables?: UserDataQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserDataQuery, UserDataQueryVariables>(UserDataDocument, variables, options);

export const ViewerDataDocument = `
    query ViewerData {
  Viewer {
    id
    name
    avatar {
      large
    }
    bannerImage
    unreadNotificationCount
    mediaListOptions {
      scoreFormat
      animeList {
        customLists
      }
      mangaList {
        customLists
      }
    }
  }
}
    `;

export const useViewerDataQuery = <
      TData = ViewerDataQuery,
      TError = unknown
    >(
      variables?: ViewerDataQueryVariables,
      options?: Omit<UseQueryOptions<ViewerDataQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ViewerDataQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ViewerDataQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ViewerData'] : ['ViewerData', variables],
    queryFn: fetchAnilistData<ViewerDataQuery, ViewerDataQueryVariables>(ViewerDataDocument, variables),
    ...options
  }
    )};

useViewerDataQuery.getKey = (variables?: ViewerDataQueryVariables) => variables === undefined ? ['ViewerData'] : ['ViewerData', variables];

export const useInfiniteViewerDataQuery = <
      TData = InfiniteData<ViewerDataQuery>,
      TError = unknown
    >(
      variables: ViewerDataQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ViewerDataQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ViewerDataQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ViewerDataQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['ViewerData.infinite'] : ['ViewerData.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<ViewerDataQuery, ViewerDataQueryVariables>(ViewerDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteViewerDataQuery.getKey = (variables?: ViewerDataQueryVariables) => variables === undefined ? ['ViewerData.infinite'] : ['ViewerData.infinite', variables];


useViewerDataQuery.fetcher = (variables?: ViewerDataQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<ViewerDataQuery, ViewerDataQueryVariables>(ViewerDataDocument, variables, options);

export const UserOverviewDocument = `
    query UserOverview($userId: Int!, $followingPerPage: Int, $followersPerPage: Int, $reviewsPerPage: Int) {
  following: Page(page: 1, perPage: $followingPerPage) {
    pageInfo {
      total
      hasNextPage
    }
    following(userId: $userId) {
      id
      name
      avatar {
        large
        medium
      }
      aboutHTML: about(asHtml: true)
      bannerImage
      isFollowing
      isFollower
      isBlocked
      siteUrl
      createdAt
    }
  }
  followers: Page(page: 1, perPage: $followersPerPage) {
    pageInfo {
      total
      hasNextPage
    }
    followers(userId: $userId) {
      id
      name
      avatar {
        large
        medium
      }
      aboutHTML: about(asHtml: true)
      bannerImage
      isFollowing
      isFollower
      isBlocked
      siteUrl
      createdAt
    }
  }
  reviews: Page(page: 1, perPage: $reviewsPerPage) {
    reviews(userId: $userId) {
      id
      summary
      rating
      ratingAmount
      score
      createdAt
      updatedAt
    }
  }
  list: Page(page: 1, perPage: 10) {
    mediaList(userId: $userId, status: CURRENT) {
      media {
        ...MainMeta
      }
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useUserOverviewQuery = <
      TData = UserOverviewQuery,
      TError = unknown
    >(
      variables: UserOverviewQueryVariables,
      options?: Omit<UseQueryOptions<UserOverviewQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserOverviewQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserOverviewQuery, TError, TData>(
      {
    queryKey: ['UserOverview', variables],
    queryFn: fetchAnilistData<UserOverviewQuery, UserOverviewQueryVariables>(UserOverviewDocument, variables),
    ...options
  }
    )};

useUserOverviewQuery.getKey = (variables: UserOverviewQueryVariables) => ['UserOverview', variables];

export const useInfiniteUserOverviewQuery = <
      TData = InfiniteData<UserOverviewQuery>,
      TError = unknown
    >(
      variables: UserOverviewQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserOverviewQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserOverviewQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserOverviewQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['UserOverview.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserOverviewQuery, UserOverviewQueryVariables>(UserOverviewDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserOverviewQuery.getKey = (variables: UserOverviewQueryVariables) => ['UserOverview.infinite', variables];


useUserOverviewQuery.fetcher = (variables: UserOverviewQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserOverviewQuery, UserOverviewQueryVariables>(UserOverviewDocument, variables, options);

export const UserFollowingDocument = `
    query UserFollowing($userId: Int!, $page: Int) {
  Page(page: $page) {
    pageInfo {
      total
      hasNextPage
      currentPage
    }
    following(userId: $userId) {
      id
      name
      avatar {
        large
        medium
      }
      aboutHTML: about(asHtml: true)
      bannerImage
      isFollowing
      isFollower
      isBlocked
      siteUrl
      createdAt
    }
  }
}
    `;

export const useUserFollowingQuery = <
      TData = UserFollowingQuery,
      TError = unknown
    >(
      variables: UserFollowingQueryVariables,
      options?: Omit<UseQueryOptions<UserFollowingQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserFollowingQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserFollowingQuery, TError, TData>(
      {
    queryKey: ['UserFollowing', variables],
    queryFn: fetchAnilistData<UserFollowingQuery, UserFollowingQueryVariables>(UserFollowingDocument, variables),
    ...options
  }
    )};

useUserFollowingQuery.getKey = (variables: UserFollowingQueryVariables) => ['UserFollowing', variables];

export const useInfiniteUserFollowingQuery = <
      TData = InfiniteData<UserFollowingQuery>,
      TError = unknown
    >(
      variables: UserFollowingQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserFollowingQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserFollowingQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserFollowingQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['UserFollowing.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserFollowingQuery, UserFollowingQueryVariables>(UserFollowingDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserFollowingQuery.getKey = (variables: UserFollowingQueryVariables) => ['UserFollowing.infinite', variables];


useUserFollowingQuery.fetcher = (variables: UserFollowingQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserFollowingQuery, UserFollowingQueryVariables>(UserFollowingDocument, variables, options);

export const UserFollowersDocument = `
    query UserFollowers($userId: Int!, $page: Int) {
  Page(page: $page) {
    pageInfo {
      total
      hasNextPage
      currentPage
    }
    followers(userId: $userId) {
      id
      name
      avatar {
        large
        medium
      }
      aboutHTML: about(asHtml: true)
      bannerImage
      isFollowing
      isFollower
      isBlocked
      siteUrl
      createdAt
    }
  }
}
    `;

export const useUserFollowersQuery = <
      TData = UserFollowersQuery,
      TError = unknown
    >(
      variables: UserFollowersQueryVariables,
      options?: Omit<UseQueryOptions<UserFollowersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserFollowersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserFollowersQuery, TError, TData>(
      {
    queryKey: ['UserFollowers', variables],
    queryFn: fetchAnilistData<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, variables),
    ...options
  }
    )};

useUserFollowersQuery.getKey = (variables: UserFollowersQueryVariables) => ['UserFollowers', variables];

export const useInfiniteUserFollowersQuery = <
      TData = InfiniteData<UserFollowersQuery>,
      TError = unknown
    >(
      variables: UserFollowersQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserFollowersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserFollowersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserFollowersQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['UserFollowers.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserFollowersQuery.getKey = (variables: UserFollowersQueryVariables) => ['UserFollowers.infinite', variables];


useUserFollowersQuery.fetcher = (variables: UserFollowersQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, variables, options);

export const UserFavoritesOverviewDocument = `
    query UserFavoritesOverview($userID: Int, $username: String) {
  User(id: $userID, name: $username) {
    favourites {
      anime(perPage: 16) {
        nodes {
          id
          coverImage {
            extraLarge
          }
        }
      }
      manga(perPage: 16) {
        nodes {
          id
          coverImage {
            extraLarge
          }
        }
      }
      characters(perPage: 16) {
        nodes {
          id
          image {
            large
          }
        }
      }
      staff(perPage: 16) {
        nodes {
          id
          image {
            large
          }
        }
      }
      studios(perPage: 16) {
        nodes {
          id
          name
        }
      }
    }
  }
}
    `;

export const useUserFavoritesOverviewQuery = <
      TData = UserFavoritesOverviewQuery,
      TError = unknown
    >(
      variables?: UserFavoritesOverviewQueryVariables,
      options?: Omit<UseQueryOptions<UserFavoritesOverviewQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserFavoritesOverviewQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserFavoritesOverviewQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserFavoritesOverview'] : ['UserFavoritesOverview', variables],
    queryFn: fetchAnilistData<UserFavoritesOverviewQuery, UserFavoritesOverviewQueryVariables>(UserFavoritesOverviewDocument, variables),
    ...options
  }
    )};

useUserFavoritesOverviewQuery.getKey = (variables?: UserFavoritesOverviewQueryVariables) => variables === undefined ? ['UserFavoritesOverview'] : ['UserFavoritesOverview', variables];

export const useInfiniteUserFavoritesOverviewQuery = <
      TData = InfiniteData<UserFavoritesOverviewQuery>,
      TError = unknown
    >(
      variables: UserFavoritesOverviewQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserFavoritesOverviewQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserFavoritesOverviewQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserFavoritesOverviewQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserFavoritesOverview.infinite'] : ['UserFavoritesOverview.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserFavoritesOverviewQuery, UserFavoritesOverviewQueryVariables>(UserFavoritesOverviewDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserFavoritesOverviewQuery.getKey = (variables?: UserFavoritesOverviewQueryVariables) => variables === undefined ? ['UserFavoritesOverview.infinite'] : ['UserFavoritesOverview.infinite', variables];


useUserFavoritesOverviewQuery.fetcher = (variables?: UserFavoritesOverviewQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserFavoritesOverviewQuery, UserFavoritesOverviewQueryVariables>(UserFavoritesOverviewDocument, variables, options);

export const UserAnimeFavoritesDocument = `
    query UserAnimeFavorites($userID: Int, $username: String, $page: Int, $perPage: Int) {
  User(id: $userID, name: $username) {
    favourites {
      anime(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          currentPage
          hasNextPage
          lastPage
        }
        nodes {
          ...MainMeta
          characters {
            nodes {
              id
              name {
                full
                native
                alternative
              }
            }
          }
        }
      }
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useUserAnimeFavoritesQuery = <
      TData = UserAnimeFavoritesQuery,
      TError = unknown
    >(
      variables?: UserAnimeFavoritesQueryVariables,
      options?: Omit<UseQueryOptions<UserAnimeFavoritesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserAnimeFavoritesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserAnimeFavoritesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserAnimeFavorites'] : ['UserAnimeFavorites', variables],
    queryFn: fetchAnilistData<UserAnimeFavoritesQuery, UserAnimeFavoritesQueryVariables>(UserAnimeFavoritesDocument, variables),
    ...options
  }
    )};

useUserAnimeFavoritesQuery.getKey = (variables?: UserAnimeFavoritesQueryVariables) => variables === undefined ? ['UserAnimeFavorites'] : ['UserAnimeFavorites', variables];

export const useInfiniteUserAnimeFavoritesQuery = <
      TData = InfiniteData<UserAnimeFavoritesQuery>,
      TError = unknown
    >(
      variables: UserAnimeFavoritesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserAnimeFavoritesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserAnimeFavoritesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserAnimeFavoritesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserAnimeFavorites.infinite'] : ['UserAnimeFavorites.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserAnimeFavoritesQuery, UserAnimeFavoritesQueryVariables>(UserAnimeFavoritesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserAnimeFavoritesQuery.getKey = (variables?: UserAnimeFavoritesQueryVariables) => variables === undefined ? ['UserAnimeFavorites.infinite'] : ['UserAnimeFavorites.infinite', variables];


useUserAnimeFavoritesQuery.fetcher = (variables?: UserAnimeFavoritesQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserAnimeFavoritesQuery, UserAnimeFavoritesQueryVariables>(UserAnimeFavoritesDocument, variables, options);

export const UserMangaFavoritesDocument = `
    query UserMangaFavorites($userID: Int, $username: String, $page: Int, $perPage: Int) {
  User(id: $userID, name: $username) {
    favourites {
      manga(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          currentPage
          hasNextPage
          lastPage
        }
        nodes {
          ...MainMeta
          characters {
            nodes {
              id
              name {
                full
                native
                alternative
              }
            }
          }
        }
      }
    }
  }
}
    ${MainMetaFragmentDoc}
${MediaListEntryMetaFragmentDoc}`;

export const useUserMangaFavoritesQuery = <
      TData = UserMangaFavoritesQuery,
      TError = unknown
    >(
      variables?: UserMangaFavoritesQueryVariables,
      options?: Omit<UseQueryOptions<UserMangaFavoritesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserMangaFavoritesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserMangaFavoritesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserMangaFavorites'] : ['UserMangaFavorites', variables],
    queryFn: fetchAnilistData<UserMangaFavoritesQuery, UserMangaFavoritesQueryVariables>(UserMangaFavoritesDocument, variables),
    ...options
  }
    )};

useUserMangaFavoritesQuery.getKey = (variables?: UserMangaFavoritesQueryVariables) => variables === undefined ? ['UserMangaFavorites'] : ['UserMangaFavorites', variables];

export const useInfiniteUserMangaFavoritesQuery = <
      TData = InfiniteData<UserMangaFavoritesQuery>,
      TError = unknown
    >(
      variables: UserMangaFavoritesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserMangaFavoritesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserMangaFavoritesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserMangaFavoritesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserMangaFavorites.infinite'] : ['UserMangaFavorites.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserMangaFavoritesQuery, UserMangaFavoritesQueryVariables>(UserMangaFavoritesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserMangaFavoritesQuery.getKey = (variables?: UserMangaFavoritesQueryVariables) => variables === undefined ? ['UserMangaFavorites.infinite'] : ['UserMangaFavorites.infinite', variables];


useUserMangaFavoritesQuery.fetcher = (variables?: UserMangaFavoritesQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserMangaFavoritesQuery, UserMangaFavoritesQueryVariables>(UserMangaFavoritesDocument, variables, options);

export const UserWaifuFavoritesDocument = `
    query UserWaifuFavorites($userID: Int, $username: String, $page: Int, $perPage: Int) {
  User(id: $userID, name: $username) {
    favourites {
      characters(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          currentPage
          hasNextPage
          lastPage
        }
        nodes {
          ...CharacterMetaData
        }
      }
    }
  }
}
    ${CharacterMetaDataFragmentDoc}`;

export const useUserWaifuFavoritesQuery = <
      TData = UserWaifuFavoritesQuery,
      TError = unknown
    >(
      variables?: UserWaifuFavoritesQueryVariables,
      options?: Omit<UseQueryOptions<UserWaifuFavoritesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserWaifuFavoritesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserWaifuFavoritesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserWaifuFavorites'] : ['UserWaifuFavorites', variables],
    queryFn: fetchAnilistData<UserWaifuFavoritesQuery, UserWaifuFavoritesQueryVariables>(UserWaifuFavoritesDocument, variables),
    ...options
  }
    )};

useUserWaifuFavoritesQuery.getKey = (variables?: UserWaifuFavoritesQueryVariables) => variables === undefined ? ['UserWaifuFavorites'] : ['UserWaifuFavorites', variables];

export const useInfiniteUserWaifuFavoritesQuery = <
      TData = InfiniteData<UserWaifuFavoritesQuery>,
      TError = unknown
    >(
      variables: UserWaifuFavoritesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserWaifuFavoritesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserWaifuFavoritesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserWaifuFavoritesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserWaifuFavorites.infinite'] : ['UserWaifuFavorites.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserWaifuFavoritesQuery, UserWaifuFavoritesQueryVariables>(UserWaifuFavoritesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserWaifuFavoritesQuery.getKey = (variables?: UserWaifuFavoritesQueryVariables) => variables === undefined ? ['UserWaifuFavorites.infinite'] : ['UserWaifuFavorites.infinite', variables];


useUserWaifuFavoritesQuery.fetcher = (variables?: UserWaifuFavoritesQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserWaifuFavoritesQuery, UserWaifuFavoritesQueryVariables>(UserWaifuFavoritesDocument, variables, options);

export const UserStaffFavoritesDocument = `
    query UserStaffFavorites($userID: Int, $username: String, $page: Int, $perPage: Int) {
  User(id: $userID, name: $username) {
    favourites {
      staff(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          currentPage
          hasNextPage
          lastPage
        }
        nodes {
          ...StaffMetaData
        }
      }
    }
  }
}
    ${StaffMetaDataFragmentDoc}`;

export const useUserStaffFavoritesQuery = <
      TData = UserStaffFavoritesQuery,
      TError = unknown
    >(
      variables?: UserStaffFavoritesQueryVariables,
      options?: Omit<UseQueryOptions<UserStaffFavoritesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserStaffFavoritesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserStaffFavoritesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserStaffFavorites'] : ['UserStaffFavorites', variables],
    queryFn: fetchAnilistData<UserStaffFavoritesQuery, UserStaffFavoritesQueryVariables>(UserStaffFavoritesDocument, variables),
    ...options
  }
    )};

useUserStaffFavoritesQuery.getKey = (variables?: UserStaffFavoritesQueryVariables) => variables === undefined ? ['UserStaffFavorites'] : ['UserStaffFavorites', variables];

export const useInfiniteUserStaffFavoritesQuery = <
      TData = InfiniteData<UserStaffFavoritesQuery>,
      TError = unknown
    >(
      variables: UserStaffFavoritesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserStaffFavoritesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserStaffFavoritesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserStaffFavoritesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserStaffFavorites.infinite'] : ['UserStaffFavorites.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserStaffFavoritesQuery, UserStaffFavoritesQueryVariables>(UserStaffFavoritesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserStaffFavoritesQuery.getKey = (variables?: UserStaffFavoritesQueryVariables) => variables === undefined ? ['UserStaffFavorites.infinite'] : ['UserStaffFavorites.infinite', variables];


useUserStaffFavoritesQuery.fetcher = (variables?: UserStaffFavoritesQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserStaffFavoritesQuery, UserStaffFavoritesQueryVariables>(UserStaffFavoritesDocument, variables, options);

export const UserStudiosFavoritesDocument = `
    query UserStudiosFavorites($userID: Int, $username: String, $page: Int, $perPage: Int) {
  User(id: $userID, name: $username) {
    favourites {
      studios(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          currentPage
          hasNextPage
          lastPage
        }
        nodes {
          id
          name
          isAnimationStudio
          isFavourite
        }
      }
    }
  }
}
    `;

export const useUserStudiosFavoritesQuery = <
      TData = UserStudiosFavoritesQuery,
      TError = unknown
    >(
      variables?: UserStudiosFavoritesQueryVariables,
      options?: Omit<UseQueryOptions<UserStudiosFavoritesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserStudiosFavoritesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserStudiosFavoritesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserStudiosFavorites'] : ['UserStudiosFavorites', variables],
    queryFn: fetchAnilistData<UserStudiosFavoritesQuery, UserStudiosFavoritesQueryVariables>(UserStudiosFavoritesDocument, variables),
    ...options
  }
    )};

useUserStudiosFavoritesQuery.getKey = (variables?: UserStudiosFavoritesQueryVariables) => variables === undefined ? ['UserStudiosFavorites'] : ['UserStudiosFavorites', variables];

export const useInfiniteUserStudiosFavoritesQuery = <
      TData = InfiniteData<UserStudiosFavoritesQuery>,
      TError = unknown
    >(
      variables: UserStudiosFavoritesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserStudiosFavoritesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserStudiosFavoritesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserStudiosFavoritesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['UserStudiosFavorites.infinite'] : ['UserStudiosFavorites.infinite', variables],
      queryFn: (metaData) => fetchAnilistData<UserStudiosFavoritesQuery, UserStudiosFavoritesQueryVariables>(UserStudiosFavoritesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserStudiosFavoritesQuery.getKey = (variables?: UserStudiosFavoritesQueryVariables) => variables === undefined ? ['UserStudiosFavorites.infinite'] : ['UserStudiosFavorites.infinite', variables];


useUserStudiosFavoritesQuery.fetcher = (variables?: UserStudiosFavoritesQueryVariables, options?: RequestInit['headers']) => fetchAnilistData<UserStudiosFavoritesQuery, UserStudiosFavoritesQueryVariables>(UserStudiosFavoritesDocument, variables, options);
