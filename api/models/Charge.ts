/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.4.4`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade. 
 *
 * The version of the OpenAPI document: 2021.4.4
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * The pickup cost details
 * @export
 * @interface Charge
 */
export interface Charge {
    /**
     * The charge description
     * @type {string}
     * @memberof Charge
     */
    name?: string | null;
    /**
     * The charge monetary value
     * @type {number}
     * @memberof Charge
     */
    amount?: number | null;
    /**
     * The charge amount currency
     * @type {string}
     * @memberof Charge
     */
    currency?: string | null;
}

export function ChargeFromJSON(json: any): Charge {
    return ChargeFromJSONTyped(json, false);
}

export function ChargeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Charge {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
        'currency': !exists(json, 'currency') ? undefined : json['currency'],
    };
}

export function ChargeToJSON(value?: Charge | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'amount': value.amount,
        'currency': value.currency,
    };
}


