import { VerificationToken } from 'next-auth/adapters';
import { client } from './sanity';

export async function addVerificationToken(data: VerificationToken) {
  return await client.create({
    _type: 'verificationToken',
    ...data,
  });
}

export async function fetchVerificationToken(identifier: string) {
  return await client.fetch(
    `*[_type == "verificationToken" && identifier == "${identifier}"][0]`
  );
}

export async function deleteVerificationToken(token: string) {
  return await client.delete({
    query: `*[_type == "verificationToken" && token == "${token}"]`,
  });
}
