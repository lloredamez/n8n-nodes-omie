export const getPropertiesForCall = (call: string): { endpoint: string, resultListKey: string } => {
	if (call === 'ListarClientes') {
		return {
			endpoint: 'geral/clientes/',
			resultListKey: 'clientes_cadastro'
		};
	}

	return {
		endpoint: 'geral/clientes/',
		resultListKey: 'clientes_cadastro'
	};
}
