/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.3.1`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade. 
 *
 * The version of the OpenAPI document: 2021.3.1
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
    CustomsData,
    CustomsDataFromJSON,
    CustomsDataFromJSONTyped,
    CustomsDataToJSON,
    ParcelData,
    ParcelDataFromJSON,
    ParcelDataFromJSONTyped,
    ParcelDataToJSON,
    Payment,
    PaymentFromJSON,
    PaymentFromJSONTyped,
    PaymentToJSON,
    Rate,
    RateFromJSON,
    RateFromJSONTyped,
    RateToJSON,
} from './';

/**
 * 
 * @export
 * @interface ShippingRequest
 */
export interface ShippingRequest {
    /**
     * 
     * @type {AddressData}
     * @memberof ShippingRequest
     */
    shipper: AddressData;
    /**
     * 
     * @type {AddressData}
     * @memberof ShippingRequest
     */
    recipient: AddressData;
    /**
     * The shipment's parcels
     * @type {Array<ParcelData>}
     * @memberof ShippingRequest
     */
    parcels: Array<ParcelData>;
    /**
     * 
     * The options available for the shipment.<br/>
     * Please consult [the reference](#operation/references) for additional specific carriers options.
     * @type {object}
     * @memberof ShippingRequest
     */
    options?: object | null;
    /**
     * 
     * @type {Payment}
     * @memberof ShippingRequest
     */
    payment: Payment;
    /**
     * 
     * @type {CustomsData}
     * @memberof ShippingRequest
     */
    customs?: CustomsData;
    /**
     * The shipment reference
     * @type {string}
     * @memberof ShippingRequest
     */
    reference?: string | null;
    /**
     * The shipment label file type.
     * @type {string}
     * @memberof ShippingRequest
     */
    label_type?: ShippingRequestLabelTypeEnum;
    /**
     * The shipment selected rate.
     * @type {string}
     * @memberof ShippingRequest
     */
    selected_rate_id: string;
    /**
     * The list for shipment rates fetched previously
     * @type {Array<Rate>}
     * @memberof ShippingRequest
     */
    rates: Array<Rate>;
}

/**
* @export
* @enum {string}
*/
export enum ShippingRequestLabelTypeEnum {
    Pdf = 'PDF',
    Zpl = 'ZPL'
}

export function ShippingRequestFromJSON(json: any): ShippingRequest {
    return ShippingRequestFromJSONTyped(json, false);
}

export function ShippingRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShippingRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'shipper': AddressDataFromJSON(json['shipper']),
        'recipient': AddressDataFromJSON(json['recipient']),
        'parcels': ((json['parcels'] as Array<any>).map(ParcelDataFromJSON)),
        'options': !exists(json, 'options') ? undefined : json['options'],
        'payment': PaymentFromJSON(json['payment']),
        'customs': !exists(json, 'customs') ? undefined : CustomsDataFromJSON(json['customs']),
        'reference': !exists(json, 'reference') ? undefined : json['reference'],
        'label_type': !exists(json, 'label_type') ? undefined : json['label_type'],
        'selected_rate_id': json['selected_rate_id'],
        'rates': ((json['rates'] as Array<any>).map(RateFromJSON)),
    };
}

export function ShippingRequestToJSON(value?: ShippingRequest | null): any {
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
        'options': value.options,
        'payment': PaymentToJSON(value.payment),
        'customs': CustomsDataToJSON(value.customs),
        'reference': value.reference,
        'label_type': value.label_type,
        'selected_rate_id': value.selected_rate_id,
        'rates': ((value.rates as Array<any>).map(RateToJSON)),
    };
}


