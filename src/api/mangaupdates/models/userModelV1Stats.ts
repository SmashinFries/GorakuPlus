/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * MangaUpdates API
 * This API powers our website.
Most API functions are public and do not require an account. For user-based functions, you must register an account.
Currently, user registration must be done through our main website and is disabled via this API.

Download OpenAPI Specification: [openapi.yaml](openapi.yaml)

Please contact us at the following emails if you have questions:

* lambchopsil@mangaupdates.com
* manick@mangaupdates.com

## Warranties

MangaUpdates makes no warranties about service availability, correctness of the data, or anything else. The service is provided as is, and may change at any time.

## Acceptable Use Policy

* You will credit MangaUpdates when using data provided by this API.
* You will use reasonable spacing between requests so as not to overwhelm the MangaUpdates servers, and employ caching mechanisms when accessing data.
* You will NOT use MangaUpdates data or API in a way that will:
    * Deceive or defraud users
    * Assist or perform an illegal action
    * Create spam
    * Damage the database

We reserve the right to change this policy at any time.
 * OpenAPI spec version: 1.0.0
 */
import type { UserModelV1StatsModeration } from './userModelV1StatsModeration';

export type UserModelV1Stats = {
  added_authors?: number;
  added_groups?: number;
  added_publishers?: number;
  added_releases?: number;
  added_series?: number;
  added_tags?: number;
  author_edits?: number;
  forum_posts?: number;
  moderation?: UserModelV1StatsModeration;
  publisher_edits?: number;
  series_edits?: number;
};
