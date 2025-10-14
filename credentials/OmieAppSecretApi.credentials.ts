import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OmieAppSecretApi implements ICredentialType {
	name = 'omieAppKeyApi';
	displayName = 'App Secret API';
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Secret',
			name: 'apiSecret',
			typeOptions: {
				password: true,
			},
			required: true,
			type: 'string',
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				'app_secret': '={{$credentials.apiSecret}}'
			}
		},
	};
}
