import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';

//import { omieApiRequest } from './shared/omieApiRequest';
import { getProperties } from './shared/getProperties';
import { handleRequest } from './shared/handleRequest';

export class OmieClients implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Omie Clientes',
		name: 'omieClients',
		icon: 'file:../../icons/omie.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Omie clients API',
		defaults: {
			name: 'Omie Clientes',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'omieAppApi',
				required: true,
			},
		],
		properties: [...getProperties], // properties
	}; // description

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let index: number = 0; index < items.length; index++) {

			//const call = this.getNodeParameter('call', i) as string;
			//const resultListKey = this.getNodeParameter('resultListKey', i) as string;
			//const recordsPerPage = this.getNodeParameter('recordsPerPage', i) as number;


			//const results = await handleRequest.call(this, call, resultListKey, recordsPerPage)

			/* const body: IDataObject = {
				app_key: (await this.getCredentials('omieAppApi'))!.apiKey,
				app_secret: (await this.getCredentials('omieAppApi'))!.apiSecret,
				call: this.getNodeParameter('call', index) as string,
				param: [
					{
						pagina: 1,
						registros_por_pagina: 10,
						apenas_importado_api: 'N',
						filtrar_por_data_de: "15/10/2025",
					},
				],
			}; */



			const responseData = await handleRequest.call(this, index)

			const results = Array.isArray(responseData) ? responseData : [responseData];

			for (const result of results) {
				// Ensure 'result' is an object before spreading
				returnData.push({ json: result as IDataObject });
			}

		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
