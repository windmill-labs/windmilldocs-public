---
slug: standalone-ai-agents
title: Standalone AI agents
tags: ['AI']
version: v1.821.0
image: ./ai_agent_chat_page.png
description: Saved AI agents are listed on the home page, created from + New, and run or chatted with from their own page without a flow around them. Anyone who can read an agent can run it, operators included, and it runs as them.
features:
  [
    'A new agent starts with managed memory on, so its page is a chat; turn memory off for an agent only reused in flows.',
    'An agent runs as the caller, who needs access to its provider resource and to what its tools use.',
    'POST /api/w/<workspace>/jobs/run/agent/<path> runs a saved agent from the API, and a jobs:run:agents:<path> token scope limits a token to one agent.',
  ]
docs: /docs/core_concepts/ai_agents#standalone-agents
---
