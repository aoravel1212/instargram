export default {
  title: 'Account',
  name: 'account',
  type: 'document',
  fields: [
    {
      title: 'UserId',
      name: 'userId',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Provider',
      name: 'provider',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'ProviderAccountId',
      name: 'providerAccountId',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Refresh_token',
      name: 'refresh_token',
      type: 'string',
    },
    {
      title: 'Access_token',
      name: 'access_token',
      type: 'string',
    },
    {
      title: 'Expires_at',
      name: 'expires_at',
      type: 'number',
    },
    {
      title: 'Token_type',
      name: 'token_type',
      type: 'string',
    },
    {
      title: 'Scope',
      name: 'scope',
      type: 'string',
    },
    {
      title: 'Id_token',
      name: 'id_token',
      type: 'string',
    },
    {
      title: 'Session_state',
      name: 'session_state',
      type: 'string',
    },
  ],
  indexes: [
    {name: 'unique_provider_account', unique: true, fields: ['provider', 'providerAccountId']},
  ],
  preview: {
    select: {
      title: 'userId.username',
      subtitle: 'provider',
    },
  },
}
