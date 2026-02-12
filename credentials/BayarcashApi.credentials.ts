import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BayarcashApi implements ICredentialType {
	name = 'bayarcashApi';
	displayName = 'Bayarcash API';
	documentationUrl = 'https://api.webimpian.support/bayarcash';
	icon = 'file:bayarcash-logo.svg' as const;
	properties: INodeProperties[] = [
		{
			displayName: 'Personal Access Token (PAT)',
			name: 'patToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Personal Access Token for Bayarcash API',
			required: true,
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Production - api.console.bayar.cash/v3',
					value: 'https://api.console.bayar.cash/v3',
				},
				{
					name: 'Sandbox - api.console.bayarcash-sandbox.com/v3',
					value: 'https://api.console.bayarcash-sandbox.com/v3',
				},
			],
			default: 'https://api.console.bayar.cash/v3',
			description: 'Choose between Production or Sandbox environment',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '=Bearer {{$credentials.patToken}}',
				'Accept': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment}}',
			url: '/portals',
			method: 'GET',
		},
	};
}
