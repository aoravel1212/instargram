import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import InstagramLogoIcon from '@/components/ui/icons/InstagramLogoIcon';
import SigninForm from '@/components/SigninForm';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Instargram에 로그인 또는 가입',
};

export default async function SigninPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <section className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col h-[400px] w-[350px] sm:border sm:border-neutral-300 p-6">
          <InstagramLogoIcon componentType="Signin" />
          <div className="w-full p-4 mt-6">
            <SigninForm />
          </div>
        </div>
        <div className="text-center sm:border sm:border-neutral-300 p-4">
          <p className="text-sm text-neutral-700">
            계정이 없으신가요?{' '}
            <a
              href="#"
              className="font-semibold text-blue-500 hover:text-blue-600"
            >
              가입하기
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
