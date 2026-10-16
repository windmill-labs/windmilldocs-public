---
description: How do I connect Google Docs to Windmill? Create, read and edit documents from scripts and flows, with optional Drive scopes.
---

import ResourceUsage from './_resource_usage.mdx';

# Google Docs integration

[Google Docs](https://www.google.com/docs/about/) is an online word processor.

The Google Docs integration is done through OAuth.
You just need to sign in from your Google account on your browser.
The access will be automatically saved to the workspace as a [resource](../core_concepts/3_resources_and_types/index.mdx).

The connection requests the `https://www.googleapis.com/auth/documents` scope by default.
To read or edit Drive files the connection did not create, also tick `https://www.googleapis.com/auth/drive.readonly` or `https://www.googleapis.com/auth/drive` in the connect dialog.

On [self-hosted instances](../advanced/1_self_host/index.mdx), integrating an OAuth API will require [Setup OAuth and SSO](../advanced/27_setup_oauth/index.mdx).

<ResourceUsage name="Google Docs" hub="gdocs" />
