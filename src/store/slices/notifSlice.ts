import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    ActivityType,
    ActivityUnion,
    GetNotificationsQuery,
    NotificationType,
} from '../../../../app/services/anilist/generated-anilist';

export type NotifTypes = GetNotificationsQuery['Page']['notifications'][0]['__typename'];

// Define a type for the slice state
export type NotifState = {
    isRegistered?: boolean;
    enabled?: NotifTypes[];
    fetchInterval?: number;
};

// Define the initial state using that type
const initialState: NotifState = {
    isRegistered: false,
    enabled: [
        'AiringNotification',
        'ActivityLikeNotification',
        'ActivityMentionNotification',
        'ActivityMessageNotification',
        'ActivityReplyNotification',
        'FollowingNotification',
        'MediaDataChangeNotification',
        'MediaDeletionNotification',
        'MediaMergeNotification',
        'RelatedMediaAdditionNotification',
    ],
    fetchInterval: 6,
};

export const notifSlice = createSlice({
    name: 'notiConfig',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addEnabledNotif: (state, action: PayloadAction<NotifTypes>) => {
            state.enabled?.push(action.payload);
        },
        removeEnabledNotif: (state, action: PayloadAction<NotifTypes>) => {
            state.enabled?.splice(state.enabled.indexOf(action.payload), 1);
        },
        enableAllNotifs: (state) => {
            state.enabled = initialState.enabled;
        },
        disableAllNotifs: (state) => {
            state.enabled = [];
        },
        setNotifInterval: (state, action: PayloadAction<number>) => {
            state.fetchInterval = action.payload;
        },
        setRegisteredState: (state, action: PayloadAction<boolean>) => {
            state.isRegistered = action.payload;
        },
    },
});

export const {
    addEnabledNotif,
    removeEnabledNotif,
    setNotifInterval,
    setRegisteredState,
    enableAllNotifs,
    disableAllNotifs,
} = notifSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default notifSlice.reducer;
