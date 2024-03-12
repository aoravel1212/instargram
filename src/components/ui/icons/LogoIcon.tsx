import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';

type ComponentType = 'TopBar' | 'Navbar' | 'Signin';
type Props = {
  componentType?: ComponentType;
};

export default function LogoIcon({ componentType = 'Navbar' }: Props) {
  switch (componentType) {
    case 'TopBar':
      return (
        <Link href="/">
          <h1 className="text-xl font-bold p-4">Instargram</h1>
        </Link>
      );

    case 'Navbar':
      return (
        <Link href="/" className="flex items-center text-2xl font-bold my-8">
          <span className="lg:hidden">
            <FaRegStar />
          </span>
          <h1 className="hidden lg:inline-block">Instargram</h1>
        </Link>
      );

    case 'Signin':
      return <h1 className="text-center font-bold text-3xl">Instargram</h1>;

    default:
      throw new Error(`Unsupported type: ${componentType}`);
  }
}
