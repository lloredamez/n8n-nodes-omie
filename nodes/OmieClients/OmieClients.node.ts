import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';

import {handleRequest} from './shared/handleRequest';
import { getProperties } from './shared/getProperties';

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

		for (let i: number = 0; i < items.length; i++) {

			const call = this.getNodeParameter('call', i) as string;
			const resultListKey = this.getNodeParameter('resultListKey', i) as string;
			const recordsPerPage = this.getNodeParameter('recordsPerPage', i) as number;


			const results = await handleRequest.call(this, call, resultListKey, recordsPerPage)



			for (const result of results) {
				returnData.push({
					json: result as IDataObject,
				});
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
