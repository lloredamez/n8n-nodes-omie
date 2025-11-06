import {
	IAuthenticateGeneric,
	Icon,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OmieAccessApi implements ICredentialType {
	name = 'omieAccessApi';
	displayName = 'App Key API';
	icon: Icon = 'file:../../icons/omie.svg';
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'App Key',
			name: 'apiKey',
			default: '',
			description: 'Seu App Key da Omie',
			placeholder: 'A App Key gerada no painel da Omie',
			type: 'string',
			typeOptions: {
				password: true,
			},
			required: true,
		},
		{
			displayName: 'App Secret',
			name: 'apiSecret',
			default: '',
			description: 'Seu App Secret da Omie',
			placeholder: 'A App Secret gerada no painel da Omie',
			type: 'string',
			typeOptions: {
				password: true,
			},
			required: true,
		}
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				'app_key': '={{$credentials.apiKey}}',
				'app_secret': '={{$credentials.apiSecret}}',
			}
		},
	};
}
