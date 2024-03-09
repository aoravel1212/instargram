import { FcGoogle } from 'react-icons/fc';
import { FaGoogle } from 'react-icons/fa';

type Props = {
  color?: boolean;
};

export default function GoogleIcon({ color = false }: Props) {
  return color ? (
    <FcGoogle className="w-4 h-4" />
  ) : (
    <FaGoogle className="w-4 h-4" />
  );
}
