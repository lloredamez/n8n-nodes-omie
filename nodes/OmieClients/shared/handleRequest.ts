import {
	GenericValue,
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions
} from 'n8n-workflow';
import { omieApiRequest } from './omieApiRequest';

import { getPropertiesForCall } from './utils';
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

export async function handleRequest<T extends IDataObject | IDataObject[] | GenericValue | GenericValue[]>(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	index: number,
	//params: any = {},
): Promise<T[]> {
	//let currentPage = 1;
	//let totalPages = 0;
	const call = this.getNodeParameter('call', index) as string;
	const endpoint = getPropertiesForCall(call)?.endpoint;
	const allRecords: T[] = [];

	//do {
	const body: IDataObject = {
		app_key: (await this.getCredentials('omieAppApi'))!.apiKey,
		app_secret: (await this.getCredentials('omieAppApi'))!.apiSecret,
		call: call,
		param: [
			{
				pagina: 1,
				registros_por_pagina: 10,
				apenas_importado_api: 'N',
				filtrar_por_data_de: "15/10/2025",
			},
		],
	};

	const responseData = await omieApiRequest.call(this, 'POST', endpoint, body)

	//const pageResponse = data as OmiePaginatedResponse<T>;
	//totalPages = pageResponse?.total_de_paginas;
	//const records = pageResponse[resultListKey] as T[] | undefined;

	allRecords.push(responseData);

	//currentPage++;
	//await sleep(1000);
	//} while (currentPage <= totalPages);

	return responseData;
}
