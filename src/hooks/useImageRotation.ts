import { useEffect, useState } from 'react';

const useImageRotation = (url: string, extraUrls: string[], duration = 8000) => {
	const [image_src_idx, setImageSrcIdx] = useState<number>(0);

	const all_urls =
		extraUrls && url ? [url, ...new Set(extraUrls)].filter((n) => n) : url ? [url] : null;

	const updateImageSrc = () => {
		setImageSrcIdx((prev) => (prev + 1) % all_urls.length);
	};

	useEffect(() => {
		if (extraUrls) {
			const interval = setInterval(() => {
				updateImageSrc();
			}, duration);

			return () => {
				clearInterval(interval);
			};
		}
	}, []);

	if (!all_urls) return null;

	return all_urls[image_src_idx];
};

export default useImageRotation;
