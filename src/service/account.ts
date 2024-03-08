import { AdapterAccount } from 'next-auth/adapters';
import { client } from './sanity';

export async function addAccount(data: AdapterAccount) {
  return await client.create({
    ...data,
    _type: 'account',
    userId: { _ref: data.userId },
  });
}

export async function fetchAccount(id: string) {
  return await client.fetch(
    `*[_type == "account" && userId._ref == "${id}"][0]{
            providerAccountId,
            "userId": userId._ref,
            provider,
            type,
          }`
  );
}

export async function fetchUserByAccountId(id: string) {
  return await client.fetch(`*[_type == "account" && providerAccountId == "${id}"][0].userId->{
      "id":_id,
      name,
      email,
      emailVerified,
      image,
    }`);
}
