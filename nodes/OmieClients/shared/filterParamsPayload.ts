import {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

//import { getDateTimeString } from './utils';


type filterTypeRecord = 'filtrarApenasInclusao' | 'filtrarApenasAlteracao';

export function filterParamsPayload(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, index: number): IDataObject {

	const filter = this.getNodeParameter('filter', index) as IDataObject;
	const params: IDataObject = {}

	if (Object.keys(filter).length === 0) {
		return params;
	}

	// Handle TipoDeRegistro filter
	if (filter?.TipoDeRegistro) {
		switch (filter.TipoDeRegistro as filterTypeRecord) {
			case 'filtrarApenasInclusao':
				params['filtrar_apenas_inclusao'] = 'S';
				break;
			case 'filtrarApenasAlteracao':
				params['filtrar_apenas_alteracao'] = 'S';
				break;
		}
	}

	// Handle FiltrarPorDataDe filter
	//if (filter?.filtrarPorDataDe) {}

	return params;
}
