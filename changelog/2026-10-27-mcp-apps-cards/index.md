---
slug: mcp-apps-cards
title: Windmill cards in Claude and ChatGPT
version: v1.851.0
tags: ['MCP', 'AI']
description: MCP clients that support MCP Apps, such as Claude and ChatGPT, can show Windmill runs, run tables, deploy reviews and workspace items as interactive cards in the conversation, through four new tools on the /api/mcp server.
features:
  [
    'show_run: a live run with its status, result, logs and flow steps, and a Cancel run button while it runs.',
    'show_runs: up to 20 runs as a table.',
    'show_deploy_review: drafts with their diff, deployed when you check them and click Deploy.',
    'show_item: a script, flow, schedule, trigger, resource, app or saved AI agent, with links to its editor and page.',
    'Each card has an inline view and a fullscreen view.',
  ]
docs: /docs/core_concepts/mcp#cards-in-the-conversation
---
