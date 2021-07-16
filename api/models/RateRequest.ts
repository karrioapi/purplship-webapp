/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.7rc`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses,  list shipments, and list trackers. These list API methods share a common structure, taking at least these  two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order.  The offset parameter returns objects listed after an index.  The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=25\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates,  buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2021.7rc
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
    ParcelData,
    ParcelDataFromJSON,
    ParcelDataFromJSONTyped,
    ParcelDataToJSON,
} from './';

/**
 * 
 * @export
 * @interface RateRequest
 */
export interface RateRequest {
    /**
     * 
     * @type {AddressData}
     * @memberof RateRequest
     */
    shipper: AddressData;
    /**
     * 
     * @type {AddressData}
     * @memberof RateRequest
     */
    recipient: AddressData;
    /**
     * The shipment's parcels
     * @type {Array<ParcelData>}
     * @memberof RateRequest
     */
    parcels: Array<ParcelData>;
    /**
     * 
     * The requested carrier service for the shipment.<br/>
     * Please consult [the reference](#operation/references) for specific carriers services.
     * 
     * Note that this is a list because on a Multi-carrier rate request you could specify a service per carrier.
     * @type {Array<string>}
     * @memberof RateRequest
     */
    services?: Array<string> | null;
    /**
     * 
     * The options available for the shipment.
     * 
     * Please consult [the reference](#operation/references) for additional specific carriers options.
     * @type {object}
     * @memberof RateRequest
     */
    options?: object | null;
    /**
     * The shipment reference
     * @type {string}
     * @memberof RateRequest
     */
    reference?: string | null;
    /**
     * 
     * The list of configured carriers you wish to get rates from.
     * @type {Array<string>}
     * @memberof RateRequest
     */
    carrier_ids?: Array<string> | null;
}

export function RateRequestFromJSON(json: any): RateRequest {
    return RateRequestFromJSONTyped(json, false);
}

export function RateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): RateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'shipper': AddressDataFromJSON(json['shipper']),
        'recipient': AddressDataFromJSON(json['recipient']),
        'parcels': ((json['parcels'] as Array<any>).map(ParcelDataFromJSON)),
        'services': !exists(json, 'services') ? undefined : json['services'],
        'options': !exists(json, 'options') ? undefined : json['options'],
        'reference': !exists(json, 'reference') ? undefined : json['reference'],
        'carrier_ids': !exists(json, 'carrier_ids') ? undefined : json['carrier_ids'],
    };
}

export function RateRequestToJSON(value?: RateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'shipper': AddressDataToJSON(value.shipper),
        'recipient': AddressDataToJSON(value.recipient),
        'parcels': ((value.parcels as Array<any>).map(ParcelDataToJSON)),
        'services': value.services,
        'options': value.options,
        'reference': value.reference,
        'carrier_ids': value.carrier_ids,
    };
}


