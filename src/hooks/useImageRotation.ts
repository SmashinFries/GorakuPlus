import { useEffect, useState } from 'react';

const useImageRotation = (urls: string[] = [null], duration = 8000) => {
	const [image_src_idx, setImageSrcIdx] = useState<number>(0);

	const updateImageSrc = (img_urls: string[]) => {
		setImageSrcIdx((prev) => {
			return (prev + 1) % img_urls?.length;
		});
	};

	useEffect(() => {
		if (urls.length > 1) {
			const interval = setInterval(() => {
				updateImageSrc(urls);
			}, duration);

			return () => {
				clearInterval(interval);
			};
		}
	}, [urls]);

	return urls[image_src_idx];
};

export default useImageRotation;
