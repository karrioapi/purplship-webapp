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
/**
 * 
 * @export
 * @interface References
 */
export interface References {
    /**
     * 
     * @type {string}
     * @memberof References
     */
    app_name: string;
    /**
     * 
     * @type {string}
     * @memberof References
     */
    app_version: string;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    countries: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    currencies: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    carriers: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    customs_content_type: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    incoterms: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    states: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    services: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    service_names: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    options: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    option_names: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    package_presets: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    packaging_types: object;
    /**
     * 
     * @type {object}
     * @memberof References
     */
    payment_types: object;
}

export function ReferencesFromJSON(json: any): References {
    return ReferencesFromJSONTyped(json, false);
}

export function ReferencesFromJSONTyped(json: any, ignoreDiscriminator: boolean): References {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'app_name': json['APP_NAME'],
        'app_version': json['APP_VERSION'],
        'countries': json['countries'],
        'currencies': json['currencies'],
        'carriers': json['carriers'],
        'customs_content_type': json['customs_content_type'],
        'incoterms': json['incoterms'],
        'states': json['states'],
        'services': json['services'],
        'service_names': json['service_names'],
        'options': json['options'],
        'option_names': json['option_names'],
        'package_presets': json['package_presets'],
        'packaging_types': json['packaging_types'],
        'payment_types': json['payment_types'],
    };
}

export function ReferencesToJSON(value?: References | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'APP_NAME': value.app_name,
        'APP_VERSION': value.app_version,
        'countries': value.countries,
        'currencies': value.currencies,
        'carriers': value.carriers,
        'customs_content_type': value.customs_content_type,
        'incoterms': value.incoterms,
        'states': value.states,
        'services': value.services,
        'service_names': value.service_names,
        'options': value.options,
        'option_names': value.option_names,
        'package_presets': value.package_presets,
        'packaging_types': value.packaging_types,
        'payment_types': value.payment_types,
    };
}


