import * as React from "react";
import Svg, {
    SvgProps,
    Defs,
    LinearGradient,
    Stop,
    G,
    Path,
  } from "react-native-svg";

  export const DanbooruIcon = (props: SvgProps) => (
    <Svg 
    {...props} 
    width={46} 
    height={46} 
    viewBox="0 0 16 16" 
    preserveAspectRatio="xMidYMid"
    >
      <Defs>
        <LinearGradient id="a" gradientTransform="rotate(85)">
          <Stop offset="49%" stopColor="#ba9570" />
          <Stop offset="67%" stopColor="#a4815f" />
        </LinearGradient>
      </Defs>
      <G stroke="#000">
        <Path fill="url(#a)" d="M1.5 14.5V4.25L4.25 1.5H14.5v10.25l-2.75 2.75z" />
        <Path fill="none" d="M1.5 4.5h10v10" />
        <Path d="m14.5 1.5-3 3" />
      </G>
    </Svg>
  )

export const AnilistIcon = (props: SvgProps) => (
  <Svg
    width={46}
    height={46}
    viewBox="0 0 172 172"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <Path
      d="M111.322 111.157V41.029c0-4.019-2.217-6.237-6.236-6.237H91.365c-4.019 0-6.237 2.218-6.237 6.237v33.304c0 .938 9.037 5.293 9.273 6.214 6.885 26.902 1.496 48.433-5.031 49.438 10.672.528 11.846 5.659 3.897 2.153 1.216-14.354 5.961-14.326 19.602-.528.117.119 2.797 5.741 2.964 5.741h32.217c4.019 0 6.236-2.217 6.236-6.236v-13.721c0-4.019-2.217-6.237-6.236-6.237h-36.728Z"
      style={{
        fillRule: "evenodd",
        fill: "#02a9ff",
      }}
    />
    <Path
      d="M54.365 34.792 18.331 137.351h27.996l6.098-17.74h30.49l5.96 17.74h27.857L80.836 34.792H54.365Zm4.435 62.09 8.731-28.412 9.563 28.412H58.8Z"
      style={{
        fill: "#fefefe",
        fillRule: "evenodd",
      }}
    />
  </Svg>
)