import OpenAPIClient from 'openapi-client-axios';
import { Client } from '../schema/openapi';
export { Components } from '../schema/openapi';

export type ProjectsApiClient = Client;

export interface ApiClientSettings {
	/**
	 * URL to the API base including the version, default. "https: //projects.api.dalane.cloud/v1"
	 */
	server?: { url: string; description?: string };
}

export async function createClient(options?: ApiClientSettings): Promise<ProjectsApiClient> {
	const { server } = options ?? {};
	const api = new OpenAPIClient({ definition: '../schema/openapi.json', withServer: server ?? 'live' });
	const client = await api.getClient<ProjectsApiClient>();
	return client;
}
