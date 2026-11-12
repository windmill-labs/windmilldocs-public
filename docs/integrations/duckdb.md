---
description: How do I use DuckDB with Windmill? Run analytical SQL queries on S3, Parquet, CSV and JSON data.
---

# DuckDB integration

[DuckDB](https://duckdb.org/) is an open-source, in-process SQL OLAP database management system designed for fast analytical query workloads.

Windmill supports seamless integration with DuckDB, allowing you to manipulate data from S3 (csv, parquet, json), [Azure Blob Storage](./microsoft-azure-blob.md), BigQuery, PostgreSQL, and MySQL.

DuckDB in Windmill supports automatic column detection on S3 objects. You can query S3 paths directly without wrapping them in `read_parquet()` — for example `SELECT col1, col2 FROM 's3:///file.parquet'` — and the SQL parser will infer the referenced columns. The standard `read_parquet()`, `read_csv()`, and `read_json()` table functions also support column detection when used with S3 paths.

<video
	className="border-2 rounded-lg object-cover w-full h-full dark:border-gray-800"
	autoPlay
	controls
	id="main-video"
	src="/videos/duckdb_video.mp4"
/>
<br />

![Integration between DuckDB and Windmill](../assets/integrations/duckdb.webp 'Run a DuckDB script with Windmill')

## Azure Blob Storage support

DuckDB scripts in Windmill can read from and write to [Azure Blob Storage](./microsoft-azure-blob.md). When Azure Blob is configured as a [workspace storage](../core_concepts/38_object_storage_in_windmill/index.mdx), DuckDB can use the same storage paths to query and write data in Parquet, CSV, or JSON format.

This works with the same S3-compatible path syntax, and requires an Azure Blob storage resource to be configured in the workspace.

## Memory and spill limits

DuckDB runs in-process in the [worker](../core_concepts/9_worker_groups/index.mdx). A query that outgrows `DUCKDB_MEMORY_LIMIT` (by default 80% of the worker's memory) spills to disk in the job directory, and the `DUCKDB_MAX_TEMP_DIRECTORY_SIZE` env variable caps how much a single query may write there so one query cannot fill the worker's disk. Neither can be raised from a script: a query that needs more spill than the cap fails with an out of memory error naming the `max_temp_directory_size` setting.

Both take DuckDB's units (`KiB`, `MiB`, `GiB`, `TiB`, `KB`, `MB`, `GB`, `TB`); Kubernetes' `6Gi` spelling is rejected and fails every DuckDB job on the worker. Windmill Cloud caps the spill at `6GiB` per worker. Self-hosted instances leave it unset, which keeps DuckDB's default of 90% of the free space on the worker's temp volume.

## Pipelines and macro libraries

DuckDB is also the engine of Windmill [pipelines](../core_concepts/63_pipelines/index.mdx): DuckDB steps can [materialize](../core_concepts/63_pipelines/materialization.mdx) managed [DuckLake](../core_concepts/11_persistent_storage/ducklake.mdx) tables, and shared SQL logic can be published as workspace [macro libraries](../core_concepts/63_pipelines/macros.mdx) callable from any DuckDB script.

To get started, check out the [SQL Getting Started section](/docs/getting_started/scripts_quickstart/sql#duckdb-1).
