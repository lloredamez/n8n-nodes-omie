import { INodeProperties } from 'n8n-workflow';

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
		options: [
			{
				displayName: 'Type Record',
				name: 'typeRecord',
				type: 'options',
				default: 'filtrarApenasAlteracao',
				options: [
					{
						name: 'Apenas Inclusao',
						value: 'filtrarApenasInclusao',
					},
					{
						name: 'Apenas Alteracao',
						value: 'filtrarApenasAlteracao',
					},
				],
				description: 'Filter by type of record',
			},
			{
				displayName: 'Date From',
				name: 'filtrarPorDataDe',
				type: 'dateTime',
				default: '',
				description: 'Fetch records modified from this date onwards',
			},
			{
				displayName: 'Date To',
				name: 'filtrarPorDataAte',
				type: 'dateTime',
				default: '',
				description: 'Fetch records modified up to this date',
			},
		],
	},
];
