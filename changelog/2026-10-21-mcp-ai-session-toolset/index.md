---
slug: mcp-ai-session-toolset
title: Build and run from your AI client over MCP
version: v1.844.0
tags: ['MCP', 'AI']
description: Windmill's MCP server now has one URL, /api/mcp, and serves the tools of an AI session. Claude, ChatGPT, Cursor or any MCP client can explore a workspace, write scripts, flows and apps as your drafts, test-run, diff and deploy them, and run what is deployed. The access chosen at sign-in or on the token decides which tools the client gets.
features:
  [
    'One URL, <base_url>/api/mcp: the client signs in and you choose its workspaces and access.',
    'Access levels: Build and run (default), Read and run, Read only, or Scripts and flows as tools, each listing the tools the client gets.',
    'A token reaches one workspace, several, or all of yours including ones you join later.',
    'Scripts, flows, apps and their settings are written as your drafts; tools return links to runs, draft editors and deployed items.',
    'Legacy MCP URLs keep serving existing tokens.',
  ]
docs: /docs/core_concepts/mcp
---
