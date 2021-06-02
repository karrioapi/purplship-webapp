/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.6-rc`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses,  list shipments, and list trackers. These list API methods share a common structure, taking at least these  two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order.  The offset parameter returns objects listed after an index.  The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates,  buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2021.6-rc
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    TrackingStatus,
    TrackingStatusFromJSON,
    TrackingStatusFromJSONTyped,
    TrackingStatusToJSON,
} from './';

/**
 * 
 * @export
 * @interface TrackerList
 */
export interface TrackerList {
    /**
     * 
     * @type {string}
     * @memberof TrackerList
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof TrackerList
     */
    previous?: string;
    /**
     * 
     * @type {Array<TrackingStatus>}
     * @memberof TrackerList
     */
    results: Array<TrackingStatus>;
}

export function TrackerListFromJSON(json: any): TrackerList {
    return TrackerListFromJSONTyped(json, false);
}

export function TrackerListFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackerList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': ((json['results'] as Array<any>).map(TrackingStatusFromJSON)),
    };
}

export function TrackerListToJSON(value?: TrackerList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'next': value.next,
        'previous': value.previous,
        'results': ((value.results as Array<any>).map(TrackingStatusToJSON)),
    };
}


