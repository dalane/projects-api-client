import OpenAPIClient from 'openapi-client-axios';
import { Client } from '../schema/openapi';
export { Components } from '../schema/openapi';

export type ProjectsApiClient = Client;

// @ts-ignore
import { version } from '../package.json';

export interface ApiClientSettings {
	/**
	 * OPTIONAL URL to the API base including the version, default to
	 * "https://projects.api.dalane.cloud/v1"
	 */
	server?: { url: string; description?: string };
	/**
	 * OPTIONAL An identifier of the service using the client. It is added to the
	 * user-agent header.
	 */
	identifier?: string;
}

export async function createClient(options?: ApiClientSettings): Promise<ProjectsApiClient> {
	const { server, identifier } = options ?? {};
	const api = new OpenAPIClient({ definition: '../schema/openapi.json', withServer: server ?? 'live' });
	const client = await api.getClient<ProjectsApiClient>();
	client.defaults.headers = {
		'user-agent': `@dalane/projects-api-client:${version}${!!identifier ? `;${identifier}` : ''}`
	};
	return client;
}
