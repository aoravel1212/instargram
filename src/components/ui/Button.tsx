type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
  buttonDisabled?: boolean;
  type: 'text' | 'box';
};

export default function Button({
  text,
  onClick,
  red,
  type,
  buttonDisabled = false,
}: Props) {
  return type === 'text' ? (
    <button
      disabled={buttonDisabled}
      className={`font-bold ${
        red ? 'text-red-500' : buttonDisabled ? 'text-sky-300' : 'text-sky-500'
      }`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  ) : (
    <button
      disabled={buttonDisabled}
      className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${
        red ? 'bg-red-500' : 'bg-sky-500'
      } ${buttonDisabled && 'opacity-80'}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
