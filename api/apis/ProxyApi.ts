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


import * as runtime from '../runtime';
import {
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    OperationResponse,
    OperationResponseFromJSON,
    OperationResponseToJSON,
    PickupCancelRequest,
    PickupCancelRequestFromJSON,
    PickupCancelRequestToJSON,
    PickupRequest,
    PickupRequestFromJSON,
    PickupRequestToJSON,
    PickupResponse,
    PickupResponseFromJSON,
    PickupResponseToJSON,
    PickupUpdateRequest,
    PickupUpdateRequestFromJSON,
    PickupUpdateRequestToJSON,
    RateRequest,
    RateRequestFromJSON,
    RateRequestToJSON,
    RateResponse,
    RateResponseFromJSON,
    RateResponseToJSON,
    Shipment,
    ShipmentFromJSON,
    ShipmentToJSON,
    ShipmentCancelRequest,
    ShipmentCancelRequestFromJSON,
    ShipmentCancelRequestToJSON,
    ShippingRequest,
    ShippingRequestFromJSON,
    ShippingRequestToJSON,
    TrackingResponse,
    TrackingResponseFromJSON,
    TrackingResponseToJSON,
} from '../models';

export interface BuyLabelRequest {
    data: ShippingRequest;
}

export interface CancelPickupRequest {
    carrierName: string;
    data: PickupCancelRequest;
    test?: boolean | null;
}

export interface FetchRatesRequest {
    data: RateRequest;
}

export interface SchedulePickupRequest {
    carrierName: string;
    data: PickupRequest;
    test?: boolean | null;
}

export interface TrackShipmentRequest {
    carrierName: string;
    trackingNumber: string;
    test?: boolean | null;
}

export interface UpdatePickupRequest {
    carrierName: string;
    data: PickupUpdateRequest;
    test?: boolean | null;
}

export interface VoidLabelRequest {
    carrierName: string;
    data: ShipmentCancelRequest;
    test?: boolean | null;
}

/**
 * 
 */
export class ProxyApi extends runtime.BaseAPI {

    /**
     * Once the shipping rates are retrieved, provide the required info to submit the shipment by specifying your preferred rate.
     * Buy a shipment label
     */
    async buyLabelRaw(requestParameters: BuyLabelRequest): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling buyLabel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/shipping`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShippingRequestToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Once the shipping rates are retrieved, provide the required info to submit the shipment by specifying your preferred rate.
     * Buy a shipment label
     */
    async buyLabel(requestParameters: BuyLabelRequest): Promise<Shipment> {
        const response = await this.buyLabelRaw(requestParameters);
        return await response.value();
    }

    /**
     * Cancel a pickup previously scheduled
     * Cancel a pickup
     */
    async cancelPickupRaw(requestParameters: CancelPickupRequest): Promise<runtime.ApiResponse<OperationResponse>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling cancelPickup.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling cancelPickup.');
        }

        const queryParameters: any = {};

        if (requestParameters.test !== undefined) {
            queryParameters['test'] = requestParameters.test;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/pickups/{carrier_name}/cancel`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PickupCancelRequestToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationResponseFromJSON(jsonValue));
    }

    /**
     * Cancel a pickup previously scheduled
     * Cancel a pickup
     */
    async cancelPickup(requestParameters: CancelPickupRequest): Promise<OperationResponse> {
        const response = await this.cancelPickupRaw(requestParameters);
        return await response.value();
    }

    /**
     *  The Shipping process begins by fetching rates for your shipment. Use this service to fetch a shipping rates available. 
     * Fetch shipment rates
     */
    async fetchRatesRaw(requestParameters: FetchRatesRequest): Promise<runtime.ApiResponse<RateResponse>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling fetchRates.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/rates`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RateRequestToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RateResponseFromJSON(jsonValue));
    }

    /**
     *  The Shipping process begins by fetching rates for your shipment. Use this service to fetch a shipping rates available. 
     * Fetch shipment rates
     */
    async fetchRates(requestParameters: FetchRatesRequest): Promise<RateResponse> {
        const response = await this.fetchRatesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Schedule one or many parcels pickup
     * Schedule a pickup
     */
    async schedulePickupRaw(requestParameters: SchedulePickupRequest): Promise<runtime.ApiResponse<PickupResponse>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling schedulePickup.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling schedulePickup.');
        }

        const queryParameters: any = {};

        if (requestParameters.test !== undefined) {
            queryParameters['test'] = requestParameters.test;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/pickups/{carrier_name}`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PickupRequestToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PickupResponseFromJSON(jsonValue));
    }

    /**
     * Schedule one or many parcels pickup
     * Schedule a pickup
     */
    async schedulePickup(requestParameters: SchedulePickupRequest): Promise<PickupResponse> {
        const response = await this.schedulePickupRaw(requestParameters);
        return await response.value();
    }

    /**
     * You can track a shipment by specifying the carrier and the shipment tracking number.
     * Track a shipment
     */
    async trackShipmentRaw(requestParameters: TrackShipmentRequest): Promise<runtime.ApiResponse<TrackingResponse>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling trackShipment.');
        }

        if (requestParameters.trackingNumber === null || requestParameters.trackingNumber === undefined) {
            throw new runtime.RequiredError('trackingNumber','Required parameter requestParameters.trackingNumber was null or undefined when calling trackShipment.');
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
            path: `/v1/proxy/tracking/{carrier_name}/{tracking_number}`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))).replace(`{${"tracking_number"}}`, encodeURIComponent(String(requestParameters.trackingNumber))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackingResponseFromJSON(jsonValue));
    }

    /**
     * You can track a shipment by specifying the carrier and the shipment tracking number.
     * Track a shipment
     */
    async trackShipment(requestParameters: TrackShipmentRequest): Promise<TrackingResponse> {
        const response = await this.trackShipmentRaw(requestParameters);
        return await response.value();
    }

    /**
     * Modify a scheduled pickup
     * Update a pickup
     */
    async updatePickupRaw(requestParameters: UpdatePickupRequest): Promise<runtime.ApiResponse<PickupResponse>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling updatePickup.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling updatePickup.');
        }

        const queryParameters: any = {};

        if (requestParameters.test !== undefined) {
            queryParameters['test'] = requestParameters.test;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/pickups/{carrier_name}`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PickupUpdateRequestToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PickupResponseFromJSON(jsonValue));
    }

    /**
     * Modify a scheduled pickup
     * Update a pickup
     */
    async updatePickup(requestParameters: UpdatePickupRequest): Promise<PickupResponse> {
        const response = await this.updatePickupRaw(requestParameters);
        return await response.value();
    }

    /**
     * Cancel a shipment and the label previously created
     * Void a shipment label
     */
    async voidLabelRaw(requestParameters: VoidLabelRequest): Promise<runtime.ApiResponse<OperationResponse>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling voidLabel.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling voidLabel.');
        }

        const queryParameters: any = {};

        if (requestParameters.test !== undefined) {
            queryParameters['test'] = requestParameters.test;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/proxy/shipping/{carrier_name}/cancel`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShipmentCancelRequestToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationResponseFromJSON(jsonValue));
    }

    /**
     * Cancel a shipment and the label previously created
     * Void a shipment label
     */
    async voidLabel(requestParameters: VoidLabelRequest): Promise<OperationResponse> {
        const response = await this.voidLabelRaw(requestParameters);
        return await response.value();
    }

}
