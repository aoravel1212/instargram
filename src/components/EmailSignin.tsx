'use client';
import { useState } from 'react';
import AuthButton from './ui/AuthButton';

export default function EmailSignin() {
  const [email, setEmail] = useState('');

  return (
    <form
      className="flex flex-col gap-3 w-full"
      id="loginForm"
      method="post"
      action="/api/auth/signin/email"
    >
      <div className="w-full h-10 rounded border border-neutral-300 focus-within:border-neutral-400 bg-neutral-50">
        <label className="w-full h-full inline-block relative cursor-text">
          <span
            className={`w-[250px] h-full absolute leading-10 left-2 text-sm text-neutral-500 transition-all ${
              email ? 'text-xs -translate-y-2' : ''
            }`}
          >
            사용자 이메일
          </span>
          <input
            aria-label="사용자 이메일"
            type="email"
            inputMode="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="off"
            aria-required="true"
            required
            className={`w-full h-full p-2 text-sm focus:outline-none bg-transparent ${
              email ? 'text-xs translate-y-2' : ''
            }`}
            style={{
              WebkitBoxShadow: '0 0 0 30px #ffffff0 inset',
              WebkitTextFillColor: '#000',
              transition: 'background-color 5000s ease-in-out 0s',
            }}
          />
        </label>
      </div>
      <AuthButton login id="email" email={email} style="blue">
        이메일로 로그인
      </AuthButton>
    </form>
  );
}
