import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';

export class OmieClients implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Omie Clientes',
    name: 'omieClients',
    icon: 'file:../../icons/omie.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Omie clients API',
    defaults: {
      name: 'Omie Clientes',
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: 'omieAppKeyApi',
        required: true,
        disabledOptions: {
          show: {
            authentication: ['accessToken'],
          },
        },
      },
      {
        name: 'omieAppSecretApi',
        required: true,
        disabledOptions: {
          show: {
            authentication: ['accessToken'],
          },
        },
      }
    ],
    requestDefaults: {
      baseURL: 'https://app.omie.com.br/api/v1/geral/clientes/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'OMIE CALL',
        name: 'OMIE_CALL',
        type: 'options',
        options: [
          {
            name: 'Listar Clientes',
            value: 'listarClientes',
          },
          {
            name: 'Consultar Cliente',
            value: 'ConsultarCliente',
          },
          {
            name: 'Listar Clientes Resumido',
            value: 'ListarClientesResumido',
          },
        ],
        default: 'ListarClientesResumido',
        required: true,
        noDataExpression: true,
        routing: {
          request: {
            body: {
              app_key: '={{$credentials.omieAppKeyApi}}',
              app_secret: '={{$credentials.omieAppSecretApi}}',
              call: '={{$parameter["OMIE_CALL"]}}',
            }
          },
        },
      },
    ]
  };
}
