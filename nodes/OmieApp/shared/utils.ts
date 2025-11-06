import { listRequestParams } from "./types";

type filterDateTime = 'filtrar_por_data_de' | 'filtrar_por_data_ate';
type filterHour = 'filtrar_por_hora_de' | 'filtrar_por_hora_ate';

export const getPropertiesForCall = (call: string): { endpoint: string, resultListKey: string } => {
	if (call === 'listarClientes') {
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

export const getHourString = (date: Date): string => {
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${hours}:${minutes}`;
}

export const dateTimeProcess = (
	dateString: string,
	includeTime: boolean,
	keyDate: filterDateTime,
	keyTime: filterHour
) => {

	const params: listRequestParams = {};
	const dateTime = new Date(dateString);
	const date = getDateTimeString(dateTime);
	params[keyDate] = date;

	if (includeTime === true) {
		const time = getHourString(dateTime);
		params[keyTime] = time;
	}

	return params;

}


