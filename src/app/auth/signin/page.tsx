import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LogoIcon from '@/components/ui/icons/LogoIcon';
import EmailSignin from '@/components/EmailSignin';
import OAuthSignin from '@/components/OAuthSignin';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Instargram에 로그인',
};

export default async function SigninPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <section className="flex justify-center items-center h-full">
      <div className="flex flex-col h-[400px] w-[350px] sm:border sm:border-neutral-300 px-10 py-16">
        <div className="flex flex-1 justify-center items-center cursor-default">
          <LogoIcon componentType="Signin" />
        </div>
        <div className="flex-grow w-full flex justify-center items-center">
          <EmailSignin />
        </div>
        <div className="flex flex-1 items-center">
          <div className="border-t border-neutral-300 w-full h-[1px]" />
          <div className="whitespace-nowrap mx-4 text-sm text-neutral-600">
            또는
          </div>
          <div className="border-t border-neutral-300 w-full h-[1px]" />
        </div>
        <div className="flex flex-1 justify-center items-center">
          <OAuthSignin />
        </div>
      </div>
    </section>
  );
}
