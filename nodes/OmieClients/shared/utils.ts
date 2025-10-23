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

export const getDateTimeString = (date: Date): string => {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

export const hoursString = (date: Date): string => {
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${hours}:${minutes}`;
}


