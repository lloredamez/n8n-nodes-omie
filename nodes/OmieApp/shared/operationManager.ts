import { filterParams } from './filter/dateTime.helpers';
import { handleRequestOmie } from './handleRequestOmie';
import { thisIFunctions } from './types';

export async function operationManager(this: thisIFunctions, resource: string, operation: string, index: number) {
	if (resource === 'cliente') {
		if (operation === 'listarClientes') {
			const params = filterParams.call(this, index);
			const responseData = await handleRequestOmie.call(this, params, index);
			return responseData;
		}
	}
	return
}
