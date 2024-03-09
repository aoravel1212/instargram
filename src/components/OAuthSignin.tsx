'use client';
import AuthButton from './ui/AuthButton';
import GoogleIcon from './ui/icons/GoogleIcon';

export default function OAuthSignin() {
  return (
    <div className="flex justify-center">
      <AuthButton id="google" login style="trans">
        <GoogleIcon color /> Google로 로그인
      </AuthButton>
    </div>
  );
}
