import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';

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
			const responseData = await handleRequest.call(this, index);
			returnData.push(...(responseData as IDataObject[]));
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
