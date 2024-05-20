import { nextui } from "@nextui-org/theme";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|card|dropdown|image|input|modal|navbar|pagination|select|table|tabs|ripple|spinner|menu|divider|popover|listbox|scroll-shadow|checkbox|spacer).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            foreground: "#ede6e5",
            secondary: "#a5150d",
            primary: "#f08e0f",
          },
        },
      },
    }),
    require("@tailwindcss/line-clamp"),
  ],
} satisfies Config;
