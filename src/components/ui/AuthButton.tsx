'use client';
import {
  getProviders,
  ClientSafeProvider,
  signIn,
  signOut,
} from 'next-auth/react';
import { redirect } from 'next/navigation';
import { PropagateLoader } from 'react-spinners';
import useSWR from 'swr';

type Props = {
  children?: React.ReactNode;
  login?: boolean;
  id?: string;
  email?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: string;
};

type Providers = Record<string, ClientSafeProvider>;

function buttonStyle(style: string) {
  switch (style) {
    case 'blue':
      return 'w-full h-8 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none';
    case 'trans':
      return 'flex justify-center items-center gap-2 text-blue-800 font-semibold';
    default:
      return '';
  }
}

const fetchProviders = async () => {
  const providers = await getProviders();
  return providers ?? {};
};

export default function AuthButton({
  children,
  login = false,
  id,
  email,
  type,
  style,
}: Props) {
  const { data: providers, error } = useSWR<Providers>(
    'providers',
    fetchProviders
  );

  if (error) {
    return <div>Failed to load providers</div>;
  }

  if (!providers) {
    return (
      <div className="w-full text-center">
        <PropagateLoader size={4} color="red" />
      </div>
    );
  }

  const provider = Object.values(providers).filter((item) => item.id === id);

  const handleSignin = (e: React.MouseEvent) => {
    if (id === 'google') {
      signIn(id);
    }
    if (id === 'email') {
      e.preventDefault();
      signIn('email', { email });
    }
  };

  const handleSignout = async () => {
    await signOut();
    redirect('/');
  };

  return (
    <>
      {login ? (
        provider.map(({ id }) => (
          <button
            key={id}
            className={style && buttonStyle(style)}
            onClick={(e) => handleSignin(e)}
            type={type ? type : undefined}
          >
            {children}
          </button>
        ))
      ) : (
        <button key={id} onClick={handleSignout}>
          {children}
        </button>
      )}
    </>
  );
}
