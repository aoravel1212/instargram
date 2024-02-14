import {
  getProviders,
  ClientSafeProvider,
  signIn,
  signOut,
} from 'next-auth/react';
import { PropagateLoader } from 'react-spinners';
import useSWR from 'swr';

type Props = {
  children?: React.ReactNode;
  login?: boolean;
  logout?: boolean;
};

type Providers = Record<string, ClientSafeProvider>;

const fetchProviders = async () => {
  const providers = await getProviders();
  return providers ?? {};
};

export default function AuthButton({
  children,
  login = false,
  logout = false,
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

  const handleClick = (id: string) => {
    if (login) {
      signIn(id);
    }
    if (logout) {
      signOut();
    }
  };

  return (
    <>
      {Object.values(providers).map(({ id }) => (
        <button key={id} onClick={() => handleClick(id)}>
          {children}
        </button>
      ))}
    </>
  );
}
