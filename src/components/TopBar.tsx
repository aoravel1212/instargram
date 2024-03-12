import LogoIcon from './ui/icons/LogoIcon';
import SignOutIcon from './ui/icons/SignOutIcon';
import AuthButton from './ui/AuthButton';

export default function TopBar() {
  return (
    <div className="flex justify-between place-content-center">
      <LogoIcon componentType="TopBar" />
      <AuthButton>
        <div className="p-4">
          <SignOutIcon />
        </div>
      </AuthButton>
    </div>
  );
}
