import {
	IHookFunctions,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	NodeApiError,
	JsonObject,
	sleep,
} from 'n8n-workflow';
import { omieApiRequest } from './omieApiRequest';
import { getEndpointForCall } from './utils';

/**
 * Executes a request to the Omie API, automatically handling pagination.
 **/

/**
 * Defines the structure for a paginated response from the Omie API.
 * @template T The type of the records in the list.
 */
/*interface OmiePaginatedResponse<T> {
	pagina: number;
	total_de_paginas: number;
	registros: number;
	total_de_registros: number;
	[key: string]: T[] | number; // Allows dynamic result keys like "clientes_cadastrados"
}*/

export async function handleRequest<T>(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	call: string,
	resultListKey: string,
	recordsPerPage: number,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: any = {},
): Promise<T[]> {
	let currentPage = 1;
	//let totalPages = 0;
	const allRecords: T[] = [];
	const endpoint = getEndpointForCall(call);

	//do {
		const payload = {
			call,
			app_key: (await this.getCredentials('omieAppApi'))!.apiKey,
			app_secret: (await this.getCredentials('omieAppApi'))!.apiSecret,
			param: [
				{
					...params,
					filtrar_por_data_de: "15/10/2025",
					pagina: currentPage,
					registros_por_pagina: recordsPerPage,
				},
			],
		};

		const response = await omieApiRequest.call(this, 'POST', endpoint, payload)

		//const data = await response.json();
		const records = response;

		/*if (data.faultstring) {
			throw new NodeApiError(this.getNode(), data as JsonObject);
		}*/

		//const pageResponse = data as OmiePaginatedResponse<T>;
		//totalPages = pageResponse?.total_de_paginas;
		//const records = pageResponse[resultListKey] as T[] | undefined;

		// if (records && Array.isArray(records)) {
		 	allRecords.push(...records);
		// }

		currentPage++;
		await sleep(1000);
	//} while (currentPage <= totalPages);
	throw new NodeApiError(this.getNode(), response as JsonObject)

	//return  Array.isArray(allRecords) ? allRecords : [allRecords];
}
