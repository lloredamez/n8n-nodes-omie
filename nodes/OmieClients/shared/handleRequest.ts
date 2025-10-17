import {
	GenericValue,
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	sleep,
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
interface OmiePaginatedResponse<T> {
	pagina: number;
	total_de_paginas: number;
	registros: number;
	total_de_registros: number;
	[key: string]: T[] | number;
}

export async function handleRequest<
	T extends IDataObject | IDataObject[] | GenericValue | GenericValue[],
>(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	index: number,
): Promise<T[]> {
	let currentPage = 1;
	let totalPages = 1;
	const call = this.getNodeParameter('call', index) as string;
	const endpoint = getPropertiesForCall(call)?.endpoint;
	const allRecords: T[] = [];

	try {
		do {
			const body: IDataObject = {
				app_key: (await this.getCredentials('omieAppApi'))!.apiKey,
				app_secret: (await this.getCredentials('omieAppApi'))!.apiSecret,
				call: call,
				param: [
					{
						pagina: 1,
						registros_por_pagina: 1,
						apenas_importado_api: 'N',
						filtrar_por_data_de: '15/10/2025',
					},
				],
			};

			const data = await omieApiRequest.call(this, 'POST', endpoint, body);

			if (data.faultstring) {
				throw new Error(data.faultstring);
			}
			const pageResponse = data as OmiePaginatedResponse<T>;
			totalPages = pageResponse?.total_de_paginas;

			allRecords.push(...data.clientes_cadastro);

			currentPage++;
			await sleep(500);
		} while (currentPage <= totalPages);
	} catch (error) {
		throw new Error(error);
	}
	return allRecords;
}
