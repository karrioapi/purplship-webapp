/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.6rc3`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses,  list shipments, and list trackers. These list API methods share a common structure, taking at least these  two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order.  The offset parameter returns objects listed after an index.  The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates,  buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2021.6rc3
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * The parcel content items
 * @export
 * @interface Commodity
 */
export interface Commodity {
    /**
     * A unique identifier
     * @type {string}
     * @memberof Commodity
     */
    id?: string;
    /**
     * The commodity's weight
     * @type {number}
     * @memberof Commodity
     */
    weight: number;
    /**
     * The commodity's weight unit
     * @type {string}
     * @memberof Commodity
     */
    weight_unit: CommodityWeightUnitEnum;
    /**
     * A description of the commodity
     * @type {string}
     * @memberof Commodity
     */
    description?: string | null;
    /**
     * The commodity's quantity (number or item)
     * @type {number}
     * @memberof Commodity
     */
    quantity?: number | null;
    /**
     * The commodity's sku number
     * @type {string}
     * @memberof Commodity
     */
    sku?: string | null;
    /**
     * The monetary value of the commodity
     * @type {number}
     * @memberof Commodity
     */
    value_amount?: number | null;
    /**
     * The currency of the commodity value amount
     * @type {string}
     * @memberof Commodity
     */
    value_currency?: string | null;
    /**
     * The origin or manufacture country
     * @type {string}
     * @memberof Commodity
     */
    origin_country?: string | null;
}

/**
* @export
* @enum {string}
*/
export enum CommodityWeightUnitEnum {
    Kg = 'KG',
    Lb = 'LB'
}

export function CommodityFromJSON(json: any): Commodity {
    return CommodityFromJSONTyped(json, false);
}

export function CommodityFromJSONTyped(json: any, ignoreDiscriminator: boolean): Commodity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'weight': json['weight'],
        'weight_unit': json['weight_unit'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'quantity': !exists(json, 'quantity') ? undefined : json['quantity'],
        'sku': !exists(json, 'sku') ? undefined : json['sku'],
        'value_amount': !exists(json, 'value_amount') ? undefined : json['value_amount'],
        'value_currency': !exists(json, 'value_currency') ? undefined : json['value_currency'],
        'origin_country': !exists(json, 'origin_country') ? undefined : json['origin_country'],
    };
}

export function CommodityToJSON(value?: Commodity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'weight': value.weight,
        'weight_unit': value.weight_unit,
        'description': value.description,
        'quantity': value.quantity,
        'sku': value.sku,
        'value_amount': value.value_amount,
        'value_currency': value.value_currency,
        'origin_country': value.origin_country,
    };
}


