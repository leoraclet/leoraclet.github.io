import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import { rehypePrettyCode } from 'rehype-pretty-code';
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import icon from "astro-icon";

// Shiki
import {
  transformerNotationDiff,
} from '@shikijs/transformers'
import { transformerCopyButton } from "@rehype-pretty/transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://leoraclet.github.io",
  integrations: [icon(), mdx(), sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          transformers: [
            transformerNotationDiff(),
            transformerCopyButton({
              visibility: "hover",
              feedbackDuration: 3_000,
            }),
          ],
        },
      ],
      [rehypeKatex, {}]
    ],
  },
})