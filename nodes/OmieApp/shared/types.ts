import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

export type thisIFunctions = IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions

export interface listRequestParams {
	pagina?: number;
	registros_por_pagina?: number;
	apenas_importado_api?: 'S' | 'N';
	filtrar_apenas_inclusao?: 'S' | 'N';
	filtrar_apenas_alteracao?: 'S' | 'N';
	filtrar_por_data_de?: string;
	filtrar_por_hora_de?: string;
	filtrar_por_data_ate?: string;
	filtrar_por_hora_ate?: string;
}
