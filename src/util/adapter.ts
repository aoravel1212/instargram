import {
  addUser,
  fetchUserByEmail,
  fetchUserById,
  updateUserEmailVerified,
} from '@/service/user';
import {
  addAccount,
  fetchAccount,
  fetchUserByAccountId,
} from '@/service/account';
import {
  Adapter,
  AdapterAccount,
  AdapterUser,
  VerificationToken,
} from 'next-auth/adapters';
import {
  addVerificationToken,
  deleteVerificationToken,
  fetchVerificationToken,
} from '@/service/verificationToken';

export default function Adapter(): Adapter {
  return {
    async createUser(user): Promise<AdapterUser> {
      await addUser(user);
      return await fetchUserByEmail(user.email);
    },
    // email/passwordless login
    async getUserByEmail(email): Promise<null | AdapterUser> {
      return await fetchUserByEmail(email);
    },
    // OAuth에서만 사용
    async getUserByAccount({ providerAccountId }): Promise<null | AdapterUser> {
      return await fetchUserByAccountId(providerAccountId);
    },
    // 이메일에서만 사용
    async updateUser({ id, emailVerified }): Promise<AdapterUser> {
      await updateUserEmailVerified(id, emailVerified);
      return await fetchUserById(id);
    },
    // OAuth에서만 사용
    async linkAccount(data): Promise<undefined | null | AdapterAccount> {
      await addAccount(data);
      return await fetchAccount(data.userId);
    },
    async createVerificationToken(
      data
    ): Promise<undefined | null | VerificationToken> {
      return addVerificationToken(data);
    },
    async useVerificationToken({
      identifier,
      token,
    }): Promise<null | VerificationToken> {
      const verificationToken = fetchVerificationToken(identifier);
      await deleteVerificationToken(token);

      return verificationToken;
    },
    // @ts-ignore
    getUser() {
      return;
    },
    // @ts-ignore
    createSession() {
      return;
    },
    // @ts-ignore
    updateSession() {
      return;
    },
    // @ts-ignore
    deleteSession() {
      return;
    },
  };
}
