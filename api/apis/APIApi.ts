/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.6rc4`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses,  list shipments, and list trackers. These list API methods share a common structure, taking at least these  two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order.  The offset parameter returns objects listed after an index.  The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates,  buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2021.6rc4
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    AccessToken,
    AccessTokenFromJSON,
    AccessTokenToJSON,
    References,
    ReferencesFromJSON,
    ReferencesToJSON,
    TokenObtainPair,
    TokenObtainPairFromJSON,
    TokenObtainPairToJSON,
    TokenPair,
    TokenPairFromJSON,
    TokenPairToJSON,
    TokenRefresh,
    TokenRefreshFromJSON,
    TokenRefreshToJSON,
    TokenVerify,
    TokenVerifyFromJSON,
    TokenVerifyToJSON,
} from '../models';

export interface AuthenticateRequest {
    data: TokenObtainPair;
}

export interface RefreshTokenRequest {
    data: TokenRefresh;
}

export interface VerifyTokenRequest {
    data: TokenVerify;
}

/**
 * 
 */
export class APIApi extends runtime.BaseAPI {

    /**
     * Authenticate the user and return a token pair
     * Obtain auth token pair
     */
    async authenticateRaw(requestParameters: AuthenticateRequest): Promise<runtime.ApiResponse<TokenPair>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling authenticate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/api/token`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TokenObtainPairToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TokenPairFromJSON(jsonValue));
    }

    /**
     * Authenticate the user and return a token pair
     * Obtain auth token pair
     */
    async authenticate(requestParameters: AuthenticateRequest): Promise<TokenPair> {
        const response = await this.authenticateRaw(requestParameters);
        return await response.value();
    }

    /**
     * Data References
     */
    async dataRaw(): Promise<runtime.ApiResponse<References>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/references`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReferencesFromJSON(jsonValue));
    }

    /**
     * Data References
     */
    async data(): Promise<References> {
        const response = await this.dataRaw();
        return await response.value();
    }

    /**
     * Authenticate the user and return a token pair
     * Refresh auth token
     */
    async refreshTokenRaw(requestParameters: RefreshTokenRequest): Promise<runtime.ApiResponse<AccessToken>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling refreshToken.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/api/token/refresh`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TokenRefreshToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AccessTokenFromJSON(jsonValue));
    }

    /**
     * Authenticate the user and return a token pair
     * Refresh auth token
     */
    async refreshToken(requestParameters: RefreshTokenRequest): Promise<AccessToken> {
        const response = await this.refreshTokenRaw(requestParameters);
        return await response.value();
    }

    /**
     * Verify an existent authentication token
     * Verify auth token
     */
    async verifyTokenRaw(requestParameters: VerifyTokenRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling verifyToken.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/api/token/verify`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TokenVerifyToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Verify an existent authentication token
     * Verify auth token
     */
    async verifyToken(requestParameters: VerifyTokenRequest): Promise<{ [key: string]: object; }> {
        const response = await this.verifyTokenRaw(requestParameters);
        return await response.value();
    }

}
