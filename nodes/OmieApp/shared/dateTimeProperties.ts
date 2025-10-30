import { INodeProperties } from 'n8n-workflow';

export const dateTimeProperties: INodeProperties[] = [
	{
		displayName: 'Tipo De Registro',
		name: 'TipoDeRegistro',
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
		displayName: 'Por Data De',
		name: 'filtrarPorDataDe',
		type: 'dateTime',
		default: '',
		description: 'Fetch records modified from this date onwards',
	},
	{
		displayName: 'Por Data Ate',
		name: 'filtrarPorDataAte',
		type: 'dateTime',
		default: '',
		description: 'Fetch records modified up to this date',
	},
	{
		displayName: 'Incluir a Hora',
		name: 'incluirHora',
		type: 'boolean',
		default: true,
		description: 'Whether to include time in the date filter',
	}
];
