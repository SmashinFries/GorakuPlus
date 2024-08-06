import { useState } from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import { GithubReleaseResponse } from '../types';

const REPO_URL = 'https://api.github.com/repos/KuzuLabz/GorakuSite';

const useAppUpdates = () => {
	const [updateDetails, setUpdateDetails] = useState<GithubReleaseResponse[0] | null>(null);

	const checkForUpdates = async () => {
		console.log('Fetching update!');
		const { data } = await axios.get<GithubReleaseResponse>(REPO_URL + '/releases');
		const newestVersion = data[0]?.tag_name ?? null;

		if (newestVersion && newestVersion !== Constants?.expoConfig?.version) {
			setUpdateDetails(data[0]);
			return true;
		} else {
			return false;
		}
	};

	return { updateDetails, checkForUpdates };
};

export default useAppUpdates;
