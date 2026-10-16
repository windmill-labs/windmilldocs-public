---
description: How do I connect Google Sheets to Windmill? Read and write spreadsheet data from scripts and flows.
---

import ResourceUsage from './_resource_usage.mdx';

# Google Sheets integration

[Google Sheets](https://www.google.com/sheets/about/) is an online spreadsheet application.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/adding_gsheets_resource.mp4"
/>

<br/>

The Google Sheets integration is done through OAuth. You just need to sign in from your Google account on your browser. The access will be automatically saved to the workspace as a [resource](../core_concepts/3_resources_and_types/index.mdx).

The connection requests the `https://www.googleapis.com/auth/spreadsheets` scope by default.
To list and search your spreadsheets in Google Drive, also tick `https://www.googleapis.com/auth/drive.metadata.readonly` in the connect dialog.

On [self-hosted instances](../advanced/1_self_host/index.mdx), integrating an OAuth API will require [Setup OAuth and SSO](../advanced/27_setup_oauth/index.mdx).

<ResourceUsage name="Google Sheets" hub="gsheets" />

