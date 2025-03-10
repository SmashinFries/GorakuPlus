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
import type { ForumSearchRequestV1Method } from './forumSearchRequestV1Method';
import type { ForumSearchRequestV1SearchBy } from './forumSearchRequestV1SearchBy';

export interface ForumSearchRequestV1 {
  after_id?: number;
  before_id?: number;
  by_user_id?: number;
  filter_user_id?: number;
  method?: ForumSearchRequestV1Method;
  page?: number;
  perpage?: number;
  search?: string;
  search_by?: ForumSearchRequestV1SearchBy;
  since?: number;
}
