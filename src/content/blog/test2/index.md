---
title: "Test 2"
summary: "Kicking off my blog with a quick intro of what I'll be sharing here"
date: "06/16/2025"
draft: true
tags:
- "2025"
---

```py file=main.py
import string
```

```ts title="src/content.config.ts" showLineNumbers /array/#v
export const blogSchema = z.object({
  // ...
  draft: z.boolean().optional(),
  // [!code highlight:1]
  tags: z.array(z.string()).default(["others"]), // replace "others" with whatever you want
  // ...
});
```
