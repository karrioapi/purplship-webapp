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


import * as runtime from '../runtime';
import {
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    Operation,
    OperationFromJSON,
    OperationToJSON,
    TrackerList,
    TrackerListFromJSON,
    TrackerListToJSON,
    TrackingStatus,
    TrackingStatusFromJSON,
    TrackingStatusToJSON,
} from '../models';

export interface ListRequest {
    limit?: number;
    offset?: number;
}

export interface RemoveRequest {
    id: string;
}

export interface RetrieveRequest {
    carrierName: string;
    trackingNumber: string;
    test?: boolean | null;
}

/**
 * 
 */
export class TrackersApi extends runtime.BaseAPI {

    /**
     * Retrieve all shipment trackers.
     * List all shipment trackers
     */
    async listRaw(requestParameters: ListRequest): Promise<runtime.ApiResponse<TrackerList>> {
        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/trackers`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackerListFromJSON(jsonValue));
    }

    /**
     * Retrieve all shipment trackers.
     * List all shipment trackers
     */
    async list(requestParameters: ListRequest): Promise<TrackerList> {
        const response = await this.listRaw(requestParameters);
        return await response.value();
    }

    /**
     * Remove a shipment tracker.
     * Remove a shipment tracker
     */
    async removeRaw(requestParameters: RemoveRequest): Promise<runtime.ApiResponse<Operation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling remove.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/trackers/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationFromJSON(jsonValue));
    }

    /**
     * Remove a shipment tracker.
     * Remove a shipment tracker
     */
    async remove(requestParameters: RemoveRequest): Promise<Operation> {
        const response = await this.removeRaw(requestParameters);
        return await response.value();
    }

    /**
     * This API retrieves or creates (if non existent) a tracking status object containing the details and events of a shipping in progress.
     * Retrieve a shipment tracker
     */
    async retrieveRaw(requestParameters: RetrieveRequest): Promise<runtime.ApiResponse<TrackingStatus>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling retrieve.');
        }

        if (requestParameters.trackingNumber === null || requestParameters.trackingNumber === undefined) {
            throw new runtime.RequiredError('trackingNumber','Required parameter requestParameters.trackingNumber was null or undefined when calling retrieve.');
        }

        const queryParameters: any = {};

        if (requestParameters.test !== undefined) {
            queryParameters['test'] = requestParameters.test;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/trackers/{carrier_name}/{tracking_number}`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))).replace(`{${"tracking_number"}}`, encodeURIComponent(String(requestParameters.trackingNumber))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackingStatusFromJSON(jsonValue));
    }

    /**
     * This API retrieves or creates (if non existent) a tracking status object containing the details and events of a shipping in progress.
     * Retrieve a shipment tracker
     */
    async retrieve(requestParameters: RetrieveRequest): Promise<TrackingStatus> {
        const response = await this.retrieveRaw(requestParameters);
        return await response.value();
    }

}
