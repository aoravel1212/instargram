import Link from 'next/link';

export default async function VerifyRequestPage() {
  return (
    <section className="flex flex-col items-center justify-center text-center h-full w-full">
      <div className="bg-white p-12 rounded-lg border-2 border-neutral-600 ">
        <h1 className="font-semibold text-xl mb-6">이메일을 확인해주세요</h1>
        <p className="mb-2">입력하신 메일 주소로 인증 메일이 전송되었습니다.</p>
        <Link
          className=" text-neutral-500"
          href={'https://instargram.vercel.app/'}
        >
          instargram.vercel.app
        </Link>
      </div>
    </section>
  );
}
