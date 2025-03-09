import { useMemo } from 'react';
import { DimensionValue, Image, useWindowDimensions, View } from 'react-native';
import gorakuBanner from '../../assets/iconsv3/banner.png';
import gorakuIcon from '../../assets/iconsv3/adaptive-icon.png';
import mascot from '../../assets/iconsv3/mascot.png';
import { useSettingsStore } from '@/store/settings/settingsStore';
import WebView from 'react-native-webview';

const mainOptions = {
	detectRetina: true,
	fpsLimit: 120,
	interactivity: {
		detectsOn: 'canvas',
		events: {
			// onClick: {
			// 	enable: true,
			// 	mode: 'push',
			// },
			// onHover: {
			// 	enable: true,
			// 	mode: 'bubble',
			// },
			// resize: true,
		},
		modes: {
			bubble: {
				distance: 400,
				duration: 2,
				opacity: 1,
				size: 40,
				speed: 3,
			},
			push: {
				quantity: 4,
			},
		},
	},
	particles: {
		rotate: {
			value: 5,
			random: true,
			direction: 'clockwise',
			animation: {
				enable: true,
				speed: 5,
				sync: false,
			},
		},
		move: {
			enable: true,
			outModes: 'out',
			speed: 2,
		},
		number: {
			density: {
				enable: true,
				// area: 800,
			},
			value: 80,
		},
		opacity: {
			value: 0.8,
		},
		shape: {
			type: 'image',
			options: {
				image: [
					{
						src: Image.resolveAssetSource(gorakuBanner).uri,
						width: 1592,
						height: 571,
						particles: {
							move: {
								direction: 'top',
							},
						},
					},
					{
						src: Image.resolveAssetSource(gorakuIcon).uri,
						width: 1024,
						height: 1024,
						particles: {
							move: {
								direction: 'bottom',
							},
						},
					},
					// MAKE IMAGES OPTIONAL?
					// {
					// 	src: RNImage.resolveAssetSource(mascot).uri,
					// 	width: 32,
					// 	height: 32,
					// 	particles: {
					// 		move: {
					// 			direction: 'bottom',
					// 		},
					// 	},
					// },
				],
			},
		},
		size: {
			value: 18,
		},
	},
};

type ParticleBackgroundProps = {
	height?: DimensionValue;
	backgroundColor?: string;
	mascotOnly?: boolean;
};
const ParticleBackground = ({
	height = '100%',
	backgroundColor = 'transparent',
	mascotOnly = false,
}: ParticleBackgroundProps) => {
	const { width } = useWindowDimensions();
	const { allowBgParticles: isEnabled } = useSettingsStore();

	const optionsMascot = useMemo(
		() => ({
			...mainOptions,
			particles: {
				...mainOptions.particles,
				shape: {
					...mainOptions.particles.shape,
					options: {
						...mainOptions.particles.shape.options,
						image: [
							{
								src: Image.resolveAssetSource(mascot).uri,
								width: 32,
								height: 32,
								particles: {
									move: {
										direction: 'bottom',
									},
								},
							},
						],
					},
				},
			},
		}),
		[],
	);

	const particleLoadHTML = `
	(async () => {
  await loadAll(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: ${JSON.stringify(mascotOnly ? optionsMascot : mainOptions)},
  });
})();
	`;

	const htmlSource = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>tsParticles</title>
  <style>

  html,
  body {
    margin: 0;
    padding: 0;
	height: 100%;
	width: 100%;
  }

  body {
    background-color: rgba(255, 0, 0, 0);
  }
</style>
</head>

<body>
	<div id="tsparticles"></div>
	<script
    src="https://cdn.jsdelivr.net/npm/@tsparticles/all@3.5.0/tsparticles.all.bundle.min.js"
    crossorigin="anonymous"
  ></script>
  <script>
  ${particleLoadHTML}
</script>
</body>
</html>
	`;

	return (
		<View style={{ width, height: height, flex: 1, position: 'absolute' }}>
			{isEnabled && (
				<WebView
					source={{ html: htmlSource }}
					javaScriptEnabled
					allowFileAccessFromFileURLs
					allowFileAccess
					domStorageEnabled
					style={{ width: width, height: height, backgroundColor }}
				/>
			)}
		</View>
	);
};

export default ParticleBackground;
