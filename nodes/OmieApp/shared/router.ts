import { getClientsParams } from '../clients/getClients';
import { handleRequest } from './handleRequest';
import { thisIFunctions } from './types';

export async function router(this: thisIFunctions, resource: string, operation: string, index: number) {
	if (resource === 'cliente') {
		if (operation === 'listarClientes') {
			const params = getClientsParams.call(this, index);
			const responseData = await handleRequest.call(this, params, index);
			return responseData;
		}
	}
	return
}
