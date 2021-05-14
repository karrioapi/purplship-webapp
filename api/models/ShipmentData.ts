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
} from './';

/**
 * 
 * @export
 * @interface ShipmentData
 */
export interface ShipmentData {
    /**
     * 
     * @type {AddressData}
     * @memberof ShipmentData
     */
    shipper: AddressData;
    /**
     * 
     * @type {AddressData}
     * @memberof ShipmentData
     */
    recipient: AddressData;
    /**
     * The shipment's parcels
     * @type {Array<ParcelData>}
     * @memberof ShipmentData
     */
    parcels: Array<ParcelData>;
    /**
     * 
     * The options available for the shipment.<br/>
     * Please consult [the reference](#operation/references) for additional specific carriers options.
     * @type {object}
     * @memberof ShipmentData
     */
    options?: object | null;
    /**
     * 
     * @type {Payment}
     * @memberof ShipmentData
     */
    payment?: Payment;
    /**
     * 
     * @type {CustomsData}
     * @memberof ShipmentData
     */
    customs?: CustomsData;
    /**
     * The shipment reference
     * @type {string}
     * @memberof ShipmentData
     */
    reference?: string | null;
    /**
     * The shipment label file type.
     * @type {string}
     * @memberof ShipmentData
     */
    label_type?: ShipmentDataLabelTypeEnum;
    /**
     * 
     * The requested carrier service for the shipment.
     * 
     * Please consult [the reference](#operation/references) for specific carriers services.<br/>
     * Note that this is a list because on a Multi-carrier rate request you could specify a service per carrier.
     * @type {Array<string>}
     * @memberof ShipmentData
     */
    services?: Array<string> | null;
    /**
     * 
     * The list of configured carriers you wish to get rates from.
     * 
     * *Note that the request will be sent to all carriers in nothing is specified*
     * @type {Array<string>}
     * @memberof ShipmentData
     */
    carrier_ids?: Array<string> | null;
}

/**
* @export
* @enum {string}
*/
export enum ShipmentDataLabelTypeEnum {
    Pdf = 'PDF',
    Zpl = 'ZPL'
}

export function ShipmentDataFromJSON(json: any): ShipmentData {
    return ShipmentDataFromJSONTyped(json, false);
}

export function ShipmentDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShipmentData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'shipper': AddressDataFromJSON(json['shipper']),
        'recipient': AddressDataFromJSON(json['recipient']),
        'parcels': ((json['parcels'] as Array<any>).map(ParcelDataFromJSON)),
        'options': !exists(json, 'options') ? undefined : json['options'],
        'payment': !exists(json, 'payment') ? undefined : PaymentFromJSON(json['payment']),
        'customs': !exists(json, 'customs') ? undefined : CustomsDataFromJSON(json['customs']),
        'reference': !exists(json, 'reference') ? undefined : json['reference'],
        'label_type': !exists(json, 'label_type') ? undefined : json['label_type'],
        'services': !exists(json, 'services') ? undefined : json['services'],
        'carrier_ids': !exists(json, 'carrier_ids') ? undefined : json['carrier_ids'],
    };
}

export function ShipmentDataToJSON(value?: ShipmentData | null): any {
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
        'services': value.services,
        'carrier_ids': value.carrier_ids,
    };
}


