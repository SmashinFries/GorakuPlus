import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { GithubReleaseResponse } from '@/types';
import axios from 'axios';
import { router } from 'expo-router';
import Constants from 'expo-constants';

const REPO_URL = 'https://api.github.com/repos/KuzuLabz/GorakuSite';

type AppUpdateState = {
	isUpdated: boolean;
	updateDetails: GithubReleaseResponse[0] | null;
};
type AppUpdateAction = {
	checkForUpdate: () => Promise<boolean>;
};

export const useAppUpdaterStore = create<AppUpdateState & AppUpdateAction>()((set, _get) => ({
	isUpdated: true,
	updateDetails: null,
	checkForUpdate: async () => {
		const { data } = await axios.get<GithubReleaseResponse>(REPO_URL + '/releases');
		const newestVersion = data[0]?.tag_name ?? null;

		if (newestVersion && newestVersion !== Constants?.expoConfig?.version) {
			set((state) => ({ ...state, updateDetails: data[0], isUpdated: false }));
			// openAppUpdaterSheet({ updateDetails: data[0] });
			router.push({
				pathname: '/(sheets)/appUpdateSheet',
				// params: { params: JSON.stringify(data[0]) },
			});
			return true;
		} else {
			return false;
		}
	},
}));
