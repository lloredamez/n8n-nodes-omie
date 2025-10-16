import { INodeProperties } from 'n8n-workflow';

export const getProperties: INodeProperties[] = [
	{
		displayName: 'API Method (Call)',
		name: 'call',
		type: 'options',
		options: [
			{
				name: 'Listar Clientes',
				value: 'ListarClientes',
			},
			{
				name: 'Consultar Cliente',
				value: 'ConsultarCliente',
			},
			{
				name: 'Listar Clientes Resumido',
				value: 'ListarClientesResumido',
			},
		],
		default: 'ListarClientes',
		required: true,
		description: 'The method name to call on the Omie API',
		placeholder: 'Ex: ListarClientes, ListarPedidos, etc.',
	},
	{
		displayName: 'Records Per Page',
		name: 'recordsPerPage',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		default: 100,
		description: 'Number of records to fetch per API call (page). Max is 500.',
	},
];
