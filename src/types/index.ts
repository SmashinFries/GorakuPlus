import { Endpoints } from '@octokit/types';

export type BasicDialogProps = {
	visible: boolean;
	onDismiss: () => void;
};

export type GithubReleaseResponse =
	Endpoints['GET /repos/{owner}/{repo}/releases']['response']['data'];
