import {
	IDataObject,
} from 'n8n-workflow';

import { thisIFunctions } from '../shared/types';
import { dateTimeProcess } from '../shared/utils';

export function getClientsParams(this: thisIFunctions, index: number): IDataObject {

	const filter = this.getNodeParameter('filter', index) as IDataObject;
	const params: IDataObject = {}

	if (Object.keys(filter).length === 0) {
		return params;
	}

	// Handle TipoDeRegistro filter
	if (filter?.TipoDeRegistro) {
		switch (filter.TipoDeRegistro) {
			case 'filtrarApenasInclusao':
				params['filtrar_apenas_inclusao'] = 'S';
				break;
			case 'filtrarApenasAlteracao':
				params['filtrar_apenas_alteracao'] = 'S';
				break;
		}
	}

	// Handle FiltrarPorDataDe filter
	if (filter?.filtrarPorDataDe) {
		const date = dateTimeProcess(
			filter.filtrarPorDataDe as string,
			filter?.incluirHora === true,
			'filtrar_por_data_de',
			'filtrar_por_hora_de'
		);

		Object.assign(params, date);
	}

	// Handle FiltrarPorDataAte filter
	if (filter?.filtrarPorDataAte) {
		const time = dateTimeProcess(
			filter.filtrarPorDataAte as string,
			filter?.incluirHora === true,
			'filtrar_por_data_ate',
			'filtrar_por_hora_ate'
		);

		Object.assign(params, time);
	}

	return params;
}
