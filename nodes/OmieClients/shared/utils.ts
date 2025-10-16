export const getEndpointForCall = (call: string): string => {
	if (call.toLowerCase().includes('cliente')) return 'geral/clientes';
	if (call.toLowerCase().includes('produto')) return 'geral/produtos';

	return 'geral/clientes';
};
