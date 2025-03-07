import {
	FuzzyDate,
	MediaListEntryMetaFragment,
	MediaListStatus,
	SaveMediaListItemMutationVariables,
} from '@/api/anilist/__genereated__/gql';
import { create } from 'zustand';

export type ListEntryParamsState = SaveMediaListItemMutationVariables;

export type ListEntryActions = {
	setValue: (
		type: keyof ListEntryParamsState,
		value: string | number | string[] | boolean | FuzzyDate | undefined,
	) => void;
	setProgress: (value: number, totalContent: number | undefined) => void;
	initialize: (entryData: MediaListEntryMetaFragment) => void;
	onReset: (initialEntry: MediaListEntryMetaFragment, customLists: string[]) => void;
	onDismiss: () => void;
};

const initialState: ListEntryParamsState = {
	status: undefined,
	score: 0,
	repeat: 0,
	completedAt: undefined,
	progress: 0,
	notes: undefined,
	hideFromStatusList: undefined,
	customLists: undefined,
	id: undefined,
	mediaId: undefined,
	private: undefined,
	progressVolumes: undefined,
	scoreRaw: undefined,
	startedAt: undefined,
};

export const useListEntryStore = create<ListEntryParamsState & ListEntryActions>()((set, _get) => ({
	...initialState,
	setValue(type, value) {
		switch (type) {
			case 'customLists':
				set((state) => ({
					customLists: state.customLists?.includes(value as string)
						? (state.customLists as string[])?.filter(
							(val) => val !== (value as string),
						)
						: [...(state.customLists ?? []), value as string],
				}));
				break;
			default:
				set({ [type]: value });
				break;
		}
	},
	setProgress(value, totalContent) {
		set((state) => {
			if (state.status === MediaListStatus.Planning) {
				if (totalContent === value) {
					return { ...state, status: MediaListStatus.Completed, progress: value };
				} else if (value > 0) {
					return { ...state, status: MediaListStatus.Current, progress: value };
				} else if (value === 0) {
					return { ...state, status: MediaListStatus.Planning, progress: value };
				}
			}
			return { ...state, progress: value };
		});
	},
	initialize(entryData) {
		const customlists =
			entryData?.customLists?.length > 0
				? (entryData?.customLists as { enabled: boolean; name: string }[])
					?.map((list) => {
						if (list.enabled) {
							return list.name;
						}
					})
					?.filter((list) => list !== undefined)
				: undefined;
		set({
			customLists: (customlists?.length ?? 0) > 0 ? customlists : undefined,
			completedAt: entryData?.completedAt?.day ? entryData?.completedAt : undefined,
			startedAt: entryData?.startedAt?.day ? entryData?.startedAt : undefined,
			hideFromStatusList: entryData?.hiddenFromStatusLists,
			id: entryData?.id,
			mediaId: entryData?.mediaId,
			notes: entryData?.notes,
			private: entryData?.private,
			progress: entryData?.progress,
			progressVolumes: entryData?.progressVolumes,
			score: entryData?.score,
			repeat: entryData?.repeat,
			// scoreRaw: entryData?.sco
			status: entryData?.status,
		});
	},
	onReset(initialData, customLists) {
		set({ ...initialState, ...initialData, customLists });
	},
	onDismiss() {
		set(initialState);
	},
}));
