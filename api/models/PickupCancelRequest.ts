/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.5-rc`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade. 
 *
 * The version of the OpenAPI document: 2021.5-rc
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AddressData,
    AddressDataFromJSON,
    AddressDataFromJSONTyped,
    AddressDataToJSON,
} from './';

/**
 * 
 * @export
 * @interface PickupCancelRequest
 */
export interface PickupCancelRequest {
    /**
     * The pickup confirmation identifier
     * @type {string}
     * @memberof PickupCancelRequest
     */
    confirmation_number: string;
    /**
     * 
     * @type {AddressData}
     * @memberof PickupCancelRequest
     */
    address?: AddressData;
    /**
     * 
     * The pickup date
     * 
     * Date Format: `YYYY-MM-DD`
     * @type {string}
     * @memberof PickupCancelRequest
     */
    pickup_date?: string | null;
    /**
     * The reason of the pickup cancellation
     * @type {string}
     * @memberof PickupCancelRequest
     */
    reason?: string;
}

export function PickupCancelRequestFromJSON(json: any): PickupCancelRequest {
    return PickupCancelRequestFromJSONTyped(json, false);
}

export function PickupCancelRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PickupCancelRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'confirmation_number': json['confirmation_number'],
        'address': !exists(json, 'address') ? undefined : AddressDataFromJSON(json['address']),
        'pickup_date': !exists(json, 'pickup_date') ? undefined : json['pickup_date'],
        'reason': !exists(json, 'reason') ? undefined : json['reason'],
    };
}

export function PickupCancelRequestToJSON(value?: PickupCancelRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'confirmation_number': value.confirmation_number,
        'address': AddressDataToJSON(value.address),
        'pickup_date': value.pickup_date,
        'reason': value.reason,
    };
}


