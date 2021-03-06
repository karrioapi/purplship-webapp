/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.7`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses,  list shipments, and list trackers. These list API methods share a common structure, taking at least these  two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order.  The offset parameter returns objects listed after an index.  The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=25\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates,  buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2021.7
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    CustomsData,
    CustomsDataFromJSON,
    CustomsDataToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    OperationResponse,
    OperationResponseFromJSON,
    OperationResponseToJSON,
    ParcelData,
    ParcelDataFromJSON,
    ParcelDataToJSON,
    Shipment,
    ShipmentFromJSON,
    ShipmentToJSON,
    ShipmentData,
    ShipmentDataFromJSON,
    ShipmentDataToJSON,
    ShipmentList,
    ShipmentListFromJSON,
    ShipmentListToJSON,
    ShipmentPurchaseData,
    ShipmentPurchaseDataFromJSON,
    ShipmentPurchaseDataToJSON,
    ShipmentRateData,
    ShipmentRateDataFromJSON,
    ShipmentRateDataToJSON,
} from '../models';

export interface AddCustomsRequest {
    id: string;
    data: CustomsData;
}

export interface AddParcelRequest {
    id: string;
    data: ParcelData;
}

export interface CancelRequest {
    id: string;
}

export interface CreateRequest {
    data: ShipmentData;
    test?: boolean | null;
}

export interface ListRequest {
    testMode?: boolean;
    status?: ListStatusEnum;
    createdStart?: Date;
    createdEnd?: Date;
    carrierId?: string;
    service?: string;
    reference?: string;
    limit?: number;
    offset?: number;
    carrierName?: ListCarrierNameEnum;
}

export interface PurchaseRequest {
    id: string;
    data: ShipmentPurchaseData;
}

export interface RatesRequest {
    id: string;
    data: ShipmentRateData;
}

export interface RetrieveRequest {
    id: string;
}

export interface SetOptionsRequest {
    id: string;
    data: object;
}

/**
 * 
 */
export class ShipmentsApi extends runtime.BaseAPI {

    /**
     * Add the customs declaration for the shipment if non existent.
     * Add a customs declaration
     */
    async addCustomsRaw(requestParameters: AddCustomsRequest): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling addCustoms.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling addCustoms.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}/customs`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CustomsDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Add the customs declaration for the shipment if non existent.
     * Add a customs declaration
     */
    async addCustoms(requestParameters: AddCustomsRequest): Promise<Shipment> {
        const response = await this.addCustomsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Add a parcel to an existing shipment for a multi-parcel shipment.
     * Add a shipment parcel
     */
    async addParcelRaw(requestParameters: AddParcelRequest): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling addParcel.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling addParcel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}/parcels`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ParcelDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Add a parcel to an existing shipment for a multi-parcel shipment.
     * Add a shipment parcel
     */
    async addParcel(requestParameters: AddParcelRequest): Promise<Shipment> {
        const response = await this.addParcelRaw(requestParameters);
        return await response.value();
    }

    /**
     * Void a shipment with the associated label.
     * Cancel a shipment
     */
    async cancelRaw(requestParameters: CancelRequest): Promise<runtime.ApiResponse<OperationResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling cancel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationResponseFromJSON(jsonValue));
    }

    /**
     * Void a shipment with the associated label.
     * Cancel a shipment
     */
    async cancel(requestParameters: CancelRequest): Promise<OperationResponse> {
        const response = await this.cancelRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a new shipment instance.
     * Create a shipment
     */
    async createRaw(requestParameters: CreateRequest): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling create.');
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
            path: `/v1/shipments`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShipmentDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Create a new shipment instance.
     * Create a shipment
     */
    async create(requestParameters: CreateRequest): Promise<Shipment> {
        const response = await this.createRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all shipments.
     * List all shipments
     */
    async listRaw(requestParameters: ListRequest): Promise<runtime.ApiResponse<ShipmentList>> {
        const queryParameters: any = {};

        if (requestParameters.testMode !== undefined) {
            queryParameters['test_mode'] = requestParameters.testMode;
        }

        if (requestParameters.status !== undefined) {
            queryParameters['status'] = requestParameters.status;
        }

        if (requestParameters.createdStart !== undefined) {
            queryParameters['created_start'] = (requestParameters.createdStart as any).toISOString().substr(0,10);
        }

        if (requestParameters.createdEnd !== undefined) {
            queryParameters['created_end'] = (requestParameters.createdEnd as any).toISOString().substr(0,10);
        }

        if (requestParameters.carrierId !== undefined) {
            queryParameters['carrier_id'] = requestParameters.carrierId;
        }

        if (requestParameters.service !== undefined) {
            queryParameters['service'] = requestParameters.service;
        }

        if (requestParameters.reference !== undefined) {
            queryParameters['reference'] = requestParameters.reference;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.carrierName !== undefined) {
            queryParameters['carrier_name'] = requestParameters.carrierName;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentListFromJSON(jsonValue));
    }

    /**
     * Retrieve all shipments.
     * List all shipments
     */
    async list(requestParameters: ListRequest): Promise<ShipmentList> {
        const response = await this.listRaw(requestParameters);
        return await response.value();
    }

    /**
     * Select your preferred rates to buy a shipment label.
     * Buy a shipment label
     */
    async purchaseRaw(requestParameters: PurchaseRequest): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling purchase.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling purchase.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}/purchase`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShipmentPurchaseDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Select your preferred rates to buy a shipment label.
     * Buy a shipment label
     */
    async purchase(requestParameters: PurchaseRequest): Promise<Shipment> {
        const response = await this.purchaseRaw(requestParameters);
        return await response.value();
    }

    /**
     * Refresh the list of the shipment rates
     * Fetch new shipment rates
     */
    async ratesRaw(requestParameters: RatesRequest): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling rates.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling rates.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}/rates`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShipmentRateDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Refresh the list of the shipment rates
     * Fetch new shipment rates
     */
    async rates(requestParameters: RatesRequest): Promise<Shipment> {
        const response = await this.ratesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a shipment.
     * Retrieve a shipment
     */
    async retrieveRaw(requestParameters: RetrieveRequest): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling retrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Retrieve a shipment.
     * Retrieve a shipment
     */
    async retrieve(requestParameters: RetrieveRequest): Promise<Shipment> {
        const response = await this.retrieveRaw(requestParameters);
        return await response.value();
    }

    /**
     * Add one or many options to your shipment.<br/> **eg:**<br/> - add shipment **insurance** - specify the preferred transaction **currency** - setup a **cash collected on delivery** option  ```json {     \"insurance\": 120,     \"currency\": \"USD\" } ```  And many more, check additional options available in the [reference](#operation/all_references).
     * Add shipment options
     */
    async setOptionsRaw(requestParameters: SetOptionsRequest): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling setOptions.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling setOptions.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}/options`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.data as any,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Add one or many options to your shipment.<br/> **eg:**<br/> - add shipment **insurance** - specify the preferred transaction **currency** - setup a **cash collected on delivery** option  ```json {     \"insurance\": 120,     \"currency\": \"USD\" } ```  And many more, check additional options available in the [reference](#operation/all_references).
     * Add shipment options
     */
    async setOptions(requestParameters: SetOptionsRequest): Promise<Shipment> {
        const response = await this.setOptionsRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum ListStatusEnum {
    Created = 'created',
    Purchased = 'purchased',
    Cancelled = 'cancelled',
    Shipped = 'shipped',
    InTransit = 'in-transit',
    Delivered = 'delivered'
}
/**
    * @export
    * @enum {string}
    */
export enum ListCarrierNameEnum {
    Aramex = 'aramex',
    Australiapost = 'australiapost',
    Canadapost = 'canadapost',
    Canpar = 'canpar',
    DhlExpress = 'dhl_express',
    DhlUniversal = 'dhl_universal',
    Dicom = 'dicom',
    Fedex = 'fedex',
    Purolator = 'purolator',
    Royalmail = 'royalmail',
    Sendle = 'sendle',
    SfExpress = 'sf_express',
    Tnt = 'tnt',
    Ups = 'ups',
    Usps = 'usps',
    UspsInternational = 'usps_international',
    Yanwen = 'yanwen',
    Yunexpress = 'yunexpress',
    Eshipper = 'eshipper',
    Freightcom = 'freightcom'
}
