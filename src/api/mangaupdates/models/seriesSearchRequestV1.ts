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
import type { SeriesSearchRequestV1Filter } from './seriesSearchRequestV1Filter';
import type { SeriesSearchRequestV1FiltersItem } from './seriesSearchRequestV1FiltersItem';
import type { SeriesSearchRequestV1Licensed } from './seriesSearchRequestV1Licensed';
import type { SeriesSearchRequestV1Orderby } from './seriesSearchRequestV1Orderby';
import type { SeriesSearchRequestV1Stype } from './seriesSearchRequestV1Stype';

export interface SeriesSearchRequestV1 {
  added_by?: number;
  category?: string[];
  exclude_filtered_genres?: boolean;
  exclude_genre?: string[];
  filter?: SeriesSearchRequestV1Filter;
  filter_types?: string[];
  /** Meant to replace 'filter', it lets you specify multiple filters as an array of strings */
  filters?: SeriesSearchRequestV1FiltersItem[];
  genre?: string[];
  include_rank_metadata?: boolean;
  letter?: string;
  licensed?: SeriesSearchRequestV1Licensed;
  list?: string;
  orderby?: SeriesSearchRequestV1Orderby;
  page?: number;
  pending?: boolean;
  perpage?: number;
  pubname?: string;
  search?: string;
  stype?: SeriesSearchRequestV1Stype;
  type?: string[];
  year?: string;
}
