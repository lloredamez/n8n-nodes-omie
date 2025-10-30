/**
 * Executes a request to the Omie API, automatically handling pagination.
 **/

import {
	GenericValue,
	IDataObject,
	sleep,
} from 'n8n-workflow';
import { omieApiRequest } from './omieApiRequest';
import { listRequestParams, thisIFunctions } from './types';
import { getPropertiesForCall } from './utils';


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
	this: thisIFunctions,
	params: listRequestParams,
	index: number,
): Promise<T[]> {
	let currentPage = 1;
	let totalPages = 1;
	const call = this.getNodeParameter('call', index) as string;
	const apenas_importado_api = this.getNodeParameter('apenasImportadoApi', index) as boolean;

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
						...params,
						apenas_importado_api: apenas_importado_api ? 'S' : 'N',
						pagina: currentPage,
						registros_por_pagina: 500,
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
