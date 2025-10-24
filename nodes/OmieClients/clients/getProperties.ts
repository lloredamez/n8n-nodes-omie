import { INodeProperties } from 'n8n-workflow';
import { dateTimeProperties } from '../shared/dateTimeProperties';

const showOnlyForCall = {
	call: ['ListarClientes', 'ListarClientesResumido'],
};

export const getProperties: INodeProperties[] = [
	{
		displayName: 'API Method (Call)',
		name: 'call',
		type: 'options',
		noDataExpression: true,
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
	},
	{
		displayName: 'Importado Api',
		name: 'apenasImportadoApi',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForCall,
		},
		description: 'Whether to fetch only records imported via the API',
	},
	{
		displayName: 'Filter',
		name: 'filter',
		placeholder: 'Add Filter',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		default: {},
		displayOptions: {
			show: showOnlyForCall,
		},
		options: [...dateTimeProperties],
	},
];
