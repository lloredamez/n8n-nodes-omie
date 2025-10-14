import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';

export class OmieClients implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Omie Clientes',
		name: 'omieClients',
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
				name: 'omieApi',
				required: true,
				disabledOptions: {
					show: {
						authentication: ['accessToken'],
					},
				},
			}
		],
		requestDefaults: {
			baseURL: 'https://api.github.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Metodos',
				name: 'metodos',
				type: 'options',
				options: [
					{
						name: 'Listar Clientes',
						value: 'listarClientes',
					},
					{
						name: 'ConsultarCliente',
						value: 'consultarCliente',
					},
				],
				default: 'listarClientes',
				required: true,
				noDataExpression: true,
				routing: {
					request: {
						body: {

						}
					},
				},
			},
		]
	};
}
