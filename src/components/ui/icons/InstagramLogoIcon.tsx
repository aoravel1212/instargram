import { FaRegStar } from 'react-icons/fa';

type ComponentType = 'TopBar' | 'Navbar' | 'Signin';
type Props = {
  componentType?: ComponentType;
};

export default function InstagramLogoIcon({ componentType = 'Navbar' }: Props) {
  switch (componentType) {
    case 'TopBar':
      return <h1 className="text-xl font-semibold p-4">Instargram</h1>;

    case 'Navbar':
      return (
        <h1 className="flex items-center text-2xl font-semibold my-8">
          <span className="lg:hidden">
            <FaRegStar />
          </span>
          <span className="hidden lg:inline-block">Instargram</span>
        </h1>
      );

    case 'Signin':
      return <h1 className="text-center font-semibold text-3xl">Instargram</h1>;

    default:
      throw new Error(`Unsupported type: ${componentType}`);
  }
}
