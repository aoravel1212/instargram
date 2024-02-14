'use client';
import { useState } from 'react';
import AuthButton from './ui/AuthButton';
import GoogleIcon from './ui/icons/GoogleIcon';

export default function SigninForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 처리 로직
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <form className="flex flex-col gap-5 w-full" id="loginForm" method="post">
      <div className="flex flex-col gap-1">
        <div className="w-full h-10 rounded border border-neutral-300 focus-within:border-neutral-400 bg-neutral-50">
          <label className="w-full h-full inline-block relative">
            <span
              className={`w-[250px] h-full absolute leading-10 left-2 text-sm text-neutral-500 transition-all ${
                username ? 'text-xs -translate-y-2' : ''
              }`}
            >
              사용자 이메일
            </span>
            <input
              aria-label="사용자 이메일"
              aria-required="true"
              autoCapitalize="off"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full h-full p-2 text-sm focus:outline-none bg-transparent ${
                username ? 'text-xs translate-y-2' : ''
              }`}
            />
          </label>
        </div>
        <div className="w-full h-10 rounded border border-neutral-300 focus-within:border-neutral-400 bg-neutral-50">
          <label className="w-full h-full inline-block relative">
            <span
              className={`w-[250px] h-full absolute leading-10 left-2 text-sm text-neutral-500 transition-all ${
                password ? 'text-xs -translate-y-2' : ''
              }`}
            >
              비밀번호
            </span>
            <input
              aria-label="비밀번호"
              aria-required="true"
              autoCapitalize="off"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-full p-2 text-sm focus:outline-none bg-transparent ${
                password ? 'text-xs translate-y-2' : ''
              }`}
            />
          </label>
        </div>
      </div>
      <button
        type="button"
        onClick={handleLogin}
        className="w-full h-8 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none"
      >
        로그인
      </button>
      <div className="flex items-center">
        <div className="border-t border-neutral-300 w-full h-[1px]" />
        <div className="whitespace-nowrap mx-4 text-sm text-neutral-600">
          또는
        </div>
        <div className="border-t border-neutral-300 w-full h-[1px]" />
      </div>
      <AuthButton login>
        <div className="flex justify-center items-center gap-2 text-blue-800 font-semibold">
          <GoogleIcon /> Google로 로그인
        </div>
      </AuthButton>
    </form>
  );
}
