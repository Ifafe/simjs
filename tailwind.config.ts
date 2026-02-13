import type { Config } from "tailwindcss";

const config: Config = {
      content: [
            "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
            extend: {
                  colors: {
                        primary: "var(--primary)",
                        "primary-light": "var(--primary-light)",
                        "primary-dark": "var(--primary-dark)",
                        background: "var(--bg)",
                        card: "var(--card)",
                        border: "var(--border)",
                  },
            },
      },
      plugins: [],
};
export default config;
