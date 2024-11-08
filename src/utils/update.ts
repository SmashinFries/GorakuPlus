import RNBackgroundDownloader, {
	download,
	completeHandler,
} from '@kesha-antonov/react-native-background-downloader';
import * as FileSystem from 'expo-file-system';
import { startActivityAsync } from 'expo-intent-launcher';

export const launchAPK = async (destination: string) => {
	const localUri = await FileSystem.getContentUriAsync(destination);
	try {
		// 'android.intent.action.INSTALL_PACKAGE'
		startActivityAsync('android.intent.action.INSTALL_PACKAGE', {
			// data: destination.replace('///', '//'),
			data: localUri,
			flags: 1,
		});
	} catch (e) {
		console.log(e);
	}
};

export const downloadAppUpdate = async (
	url: string,
	version: string,
	onDownload: (progress: number) => void,
	onIsDownloading: (isDownloadActive: boolean) => void,
) => {
	const jobId = `goraku${version.replaceAll('.', '-')}`;
	const destination = `${FileSystem.documentDirectory}/${jobId}.apk`;
	download({
		id: jobId,
		url: url,
		destination,
		isNotificationVisible: true,
		metadata: {
			type: 'update',
			destination,
		},
	})
		.begin(({ expectedBytes }) => {
			onIsDownloading(true);
		})
		.progress(({ bytesDownloaded, bytesTotal }) => {
			onDownload((bytesDownloaded / bytesTotal) * 100);
		})
		.done(({ bytesDownloaded, bytesTotal }) => {
			onIsDownloading(false);
			// PROCESS YOUR STUFF
			launchAPK(destination);

			// FINISH DOWNLOAD JOB
			completeHandler(jobId);
		})
		.error(({ error, errorCode }) => {
			console.log(`Error ${errorCode}:`, error);
			onIsDownloading(false);
		});
};

export const reattachDownloads = async () => {
	const lostTasks = await RNBackgroundDownloader.checkForExistingDownloads();
	for (const task of lostTasks) {
		task.progress(({ bytesDownloaded, bytesTotal }) => {
			console.log(`Downloaded: ${(bytesDownloaded / bytesTotal) * 100}%`);
		})
			.done(({ bytesDownloaded, bytesTotal }) => {
				// @ts-ignore
				if (task.metadata.type === 'update') {
					// @ts-ignore
					launchAPK(task.metadata.destination);
				}
				console.log('Download is done!', { bytesDownloaded, bytesTotal });
			})
			.error(({ error, errorCode }) => {
				console.log('Download canceled due to error: ', { error, errorCode });
			});
	}
};

export const removeUpdateAPKs = async () => {
	const dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory as string);
	for (const file of dir) {
		if (file.includes('goraku') && file.includes('.apk')) {
			// console.log('Found!:', `${FileSystem.documentDirectory as string}/${file}`);
			await FileSystem.deleteAsync(`${FileSystem.documentDirectory as string}/${file}`);
		}
	}
};
