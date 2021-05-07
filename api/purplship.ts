import { PurplshipClient } from './index';

export const Client = PurplshipClient;

export class Purplship extends PurplshipClient {
    constructor({ apiKey, host }: {apiKey: string, host: string}) {
        super({
            apiKey,
            basePath: host,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            }
        })
    }
}