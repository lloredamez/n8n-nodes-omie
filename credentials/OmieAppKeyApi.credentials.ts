import {
  IAuthenticateGeneric,
  Icon,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class OmieAppKeyApi implements ICredentialType {
  name = 'omieAppKeyApi';
  displayName = 'App Key API';
  icon: Icon = 'file:../../icons/omie.svg';
  documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
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
        'app_key': '={{$credentials.apiKey}}'
      }
    },
  };
}
