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
    CommodityData,
    CommodityDataFromJSON,
    CommodityDataToJSON,
    Customs,
    CustomsFromJSON,
    CustomsToJSON,
    CustomsData,
    CustomsDataFromJSON,
    CustomsDataToJSON,
    CustomsList,
    CustomsListFromJSON,
    CustomsListToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    Operation,
    OperationFromJSON,
    OperationToJSON,
} from '../models';

export interface AddCommodityRequest {
    id: string;
    data: CommodityData;
}

export interface CreateRequest {
    data: CustomsData;
}

export interface DiscardRequest {
    id: string;
}

export interface DiscardCommodityRequest {
    ck: string;
    id: string;
}

export interface ListRequest {
    limit?: number;
    offset?: number;
}

export interface RetrieveRequest {
    id: string;
}

export interface UpdateRequest {
    id: string;
    data: CustomsData;
}

/**
 * 
 */
export class CustomsApi extends runtime.BaseAPI {

    /**
     * Add a customs commodity.
     * Add a commodity
     */
    async addCommodityRaw(requestParameters: AddCommodityRequest): Promise<runtime.ApiResponse<Customs>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling addCommodity.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling addCommodity.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/customs_info/{id}/commodities`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CommodityDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CustomsFromJSON(jsonValue));
    }

    /**
     * Add a customs commodity.
     * Add a commodity
     */
    async addCommodity(requestParameters: AddCommodityRequest): Promise<Customs> {
        const response = await this.addCommodityRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a new customs declaration.
     * Create a customs info
     */
    async createRaw(requestParameters: CreateRequest): Promise<runtime.ApiResponse<Customs>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling create.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/customs_info`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CustomsDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CustomsFromJSON(jsonValue));
    }

    /**
     * Create a new customs declaration.
     * Create a customs info
     */
    async create(requestParameters: CreateRequest): Promise<Customs> {
        const response = await this.createRaw(requestParameters);
        return await response.value();
    }

    /**
     * Discard a customs declaration.
     * Discard a customs info
     */
    async discardRaw(requestParameters: DiscardRequest): Promise<runtime.ApiResponse<Operation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling discard.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/customs_info/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationFromJSON(jsonValue));
    }

    /**
     * Discard a customs declaration.
     * Discard a customs info
     */
    async discard(requestParameters: DiscardRequest): Promise<Operation> {
        const response = await this.discardRaw(requestParameters);
        return await response.value();
    }

    /**
     * Discard a customs commodity.
     * Discard a commodity
     */
    async discardCommodityRaw(requestParameters: DiscardCommodityRequest): Promise<runtime.ApiResponse<Operation>> {
        if (requestParameters.ck === null || requestParameters.ck === undefined) {
            throw new runtime.RequiredError('ck','Required parameter requestParameters.ck was null or undefined when calling discardCommodity.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling discardCommodity.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/customs_info/{id}/commodities/{ck}`.replace(`{${"ck"}}`, encodeURIComponent(String(requestParameters.ck))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationFromJSON(jsonValue));
    }

    /**
     * Discard a customs commodity.
     * Discard a commodity
     */
    async discardCommodity(requestParameters: DiscardCommodityRequest): Promise<Operation> {
        const response = await this.discardCommodityRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all stored customs declarations.
     * List all customs info
     */
    async listRaw(requestParameters: ListRequest): Promise<runtime.ApiResponse<CustomsList>> {
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
            path: `/v1/customs_info`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CustomsListFromJSON(jsonValue));
    }

    /**
     * Retrieve all stored customs declarations.
     * List all customs info
     */
    async list(requestParameters: ListRequest): Promise<CustomsList> {
        const response = await this.listRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve customs declaration.
     * Retrieve a customs info
     */
    async retrieveRaw(requestParameters: RetrieveRequest): Promise<runtime.ApiResponse<Customs>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling retrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/customs_info/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CustomsFromJSON(jsonValue));
    }

    /**
     * Retrieve customs declaration.
     * Retrieve a customs info
     */
    async retrieve(requestParameters: RetrieveRequest): Promise<Customs> {
        const response = await this.retrieveRaw(requestParameters);
        return await response.value();
    }

    /**
     * modify an existing customs declaration.
     * Update a customs info
     */
    async updateRaw(requestParameters: UpdateRequest): Promise<runtime.ApiResponse<Customs>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling update.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling update.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/customs_info/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: CustomsDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CustomsFromJSON(jsonValue));
    }

    /**
     * modify an existing customs declaration.
     * Update a customs info
     */
    async update(requestParameters: UpdateRequest): Promise<Customs> {
        const response = await this.updateRaw(requestParameters);
        return await response.value();
    }

}
