import type { INodeProperties } from 'n8n-workflow';
import { repoNameSelect, repoOwnerSelect } from '../../shared/descriptions';
import { issueCreateDescription } from './create';
import { issueGetDescription } from './get';
import { issueGetManyDescription } from './getAll';

const showOnlyForIssues = {
	resource: ['issue'],
};

export const issueDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForIssues,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get issues and repository',
				description: 'Get many issues in a repository',
				routing: {
					request: {
						method: 'GET',
						url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an issue',
				description: 'Get the data of a single issue',
				routing: {
					request: {
						method: 'GET',
						url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues/{{$parameter.issue}}',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new issue',
				description: 'Create a new issue',
				routing: {
					request: {
						method: 'POST',
						url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...repoOwnerSelect,
		displayOptions: {
			show: showOnlyForIssues,
		},
	},
	{
		...repoNameSelect,
		displayOptions: {
			show: showOnlyForIssues,
		},
	},
	...issueGetManyDescription,
	...issueGetDescription,
	...issueCreateDescription,
];
