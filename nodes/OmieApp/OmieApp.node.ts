import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';
import { dateTimeProperties } from './shared/dateTimeProperties';
import { router } from './shared/router';

export class OmieApp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Omie App',
		name: 'omieApp',
		icon: 'file:../../icons/omie.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Omie clients API',
		defaults: {
			name: 'Omie API',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'omieAccessApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Cliente',
						value: 'cliente',
					},
					{
						name: 'Pedido',
						value: 'pedido',
					},
				],
				default: 'cliente',
			},

			// ----------------------------------
			//         operations
			// ----------------------------------

			{
				displayName: 'Operation Name or ID',
				name: 'operation',
				type: 'options',
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				/* typeOptions: {
					loadOptionsMethod: 'carregarClientes',
				}, */
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['cliente'],
					},
				},
				options: [
					{
						name: 'Consultar Cliente',
						value: 'consultarCliente',
						description: 'Consultar um cliente cadastrado no Omie',
						action: 'Consultar um cliente',
					},
					{
						name: 'Listar Clientes',
						value: 'listarClientes',
						description: 'Consultar uma lista de clientes cadastrados no Omie',
						action: 'Listar clientes',
					},
					{
						name: 'Listar Clientes Resumido',
						value: 'listarClientesResumido',
						description: 'Listar clientes de forma resumida',
						action: 'Listar clientes resumido',
					},
				],
				default: 'consultarCliente',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['pedido'],
					},
				},
				default: 'consultarPedido',
				options: [
					{
						name: 'Consultar Pedido',
						value: 'consultarPedido',
						description: 'Consultar um cliente cadastrado no Omie',
						action: 'Consultar um pedido',
					},
				]
			},
			{
				displayName: 'Filter Options',
				name: 'filterOptions',
				type: 'collection',
				default: {},
				displayOptions: {
					show: {
						resource: ['cliente', 'pedido'],
					},
				},
				options: dateTimeProperties
			}
		]
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let index: number = 0; index < items.length; index++) {
			const resource = this.getNodeParameter('resource', index) as string;
			const operation = this.getNodeParameter('operation', index) as string;

			const responseData = await router.call(this, resource, operation, index);
			returnData.push(...(responseData as IDataObject[]));
		}
		return [this.helpers.returnJsonArray(returnData)];
	};
}
