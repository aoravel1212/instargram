import Link from 'next/link';

type Props = {
  username: string;
  children: React.ReactNode;
};

export default function LinkToUserPage({ username, children }: Props) {
  return <Link href={`/user/${username}`}>{children}</Link>;
}
