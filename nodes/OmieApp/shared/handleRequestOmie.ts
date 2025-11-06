/**
 * Executes a request to the Omie API, automatically handling pagination.
 **/

import {
	GenericValue,
	IDataObject,
	sleep,
} from 'n8n-workflow';
import { omieApiRequest } from './httpRequestOmie';
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

export async function handleRequestOmie<
	T extends IDataObject | IDataObject[] | GenericValue | GenericValue[],
>(
	this: thisIFunctions,
	params: listRequestParams,
	index: number,
): Promise<T[]> {
	let currentPage = 1;
	let totalPages = 1;
	const call = this.getNodeParameter('operation', index) as string;
	const apenas_importado_api = this.getNodeParameter('apenasImportadoApi', index) as boolean;
	const properties = getPropertiesForCall(call);
	const endpoint = properties?.endpoint;
	const resultListKey = properties?.resultListKey;
	const allRecords: T[] = [];

	try {
		do {
			const body: IDataObject = {
				app_key: (await this.getCredentials('omieAccessApi'))!.apiKey,
				app_secret: (await this.getCredentials('omieAccessApi'))!.apiSecret,
				call: call,
				param: [
					{
						...params,
						apenas_importado_api: apenas_importado_api ? 'S' : 'N',
						pagina: currentPage,
						registros_por_pagina: 500,
					},
				],
			};

			const data = await omieApiRequest.call(this, 'POST', endpoint, body);

			if (data.faultstring) {
				throw new Error(data.faultstring);
			}

			if (!data || typeof data !== 'object') {
				throw new Error('Invalid response from Omie API');
			}

			const pageResponse = data as OmiePaginatedResponse<T>;
			totalPages = pageResponse?.total_de_paginas;

			allRecords.push(...data[resultListKey]);

			currentPage++;
			await sleep(500);
		} while (currentPage <= totalPages);
	} catch (error) {
		throw new Error(error);
	}
	return allRecords;
}
