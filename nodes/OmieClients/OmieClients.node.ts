import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';

import { getClientsParams } from './clients/getClients';
import { getProperties } from './clients/getProperties';
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
			const params = getClientsParams.call(this, index);
			const responseData = await handleRequest.call(this, params, index);
			returnData.push(...(responseData as IDataObject[]));
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
