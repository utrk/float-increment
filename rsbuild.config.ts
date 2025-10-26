import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    assetPrefix: "/float-increment/",
  },
  html: {
    title: "Increment/decrement floating-point number",
    tags: [
      {
        tag: "link",
        attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
      },
      {
        tag: "link",
        attrs: {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: true,
        },
      },
      {
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
        },
      },
    ],
  },
});
