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
    options: object;
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
        'options': json['options'],
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
        'options': value.options,
        'package_presets': value.package_presets,
        'packaging_types': value.packaging_types,
        'payment_types': value.payment_types,
    };
}


