---
slug: tailwind-v4-full-code-apps
title: Tailwind CSS v4 in full-code apps
version: v1.868.0
tags: ['App Builder', 'React', 'Svelte']
description: Full-code apps that declare tailwindcss v4 in package.json now get their Tailwind stylesheets compiled, in the web editor and the CLI, with utilities generated from classes in the app and the workspace's shared /ui folder.
features:
  [
    'Add tailwindcss (^4) to package.json and start index.css with @import "tailwindcss".',
    'Utilities are generated from the app files and the shared /ui folder, along with @theme, @utility, @apply and @custom-variant.',
    'A shared theme can live in /ui and be imported with @import "/ui/theme.css".',
    '@plugin and @config are compiled by the CLI (wmill app bundle, wmill app push), not by the web editor.',
    'Apps without the tailwindcss dependency build exactly as before.',
  ]
docs: /docs/full_code_apps/frontend#styling
---
