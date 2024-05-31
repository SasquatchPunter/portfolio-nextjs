import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import hljsLight from "react-syntax-highlighter/dist/esm/styles/hljs/nord";
import hljsDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark-reasonable";

const hljsLightClasses = Object.entries(hljsLight).reduce(
  (acc, [key, value]) => {
    acc[`& .${key}`] = value;
    return acc;
  },
  {}
);

const hljsDarkClasses = Object.entries(hljsDark).reduce((acc, [key, value]) => {
  acc[`& .${key}`] = value;
  return acc;
}, {});

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".hljs-codeblock": hljsLightClasses,
        ".hljs-codeblock-dark": hljsDarkClasses,
      });
    }),
  ],
};
export default config;
