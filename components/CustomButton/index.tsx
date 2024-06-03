import { FC } from 'react';

interface CustomButtonProps {
  text: string;
  emoji?: string;
  handleClick: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ text, emoji, handleClick }) => {
  return (
    <button
      className="group rounded-lg border border-gray-200 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      onClick={handleClick}
    >
      <h2 className="text-2xl font-semibold">
        {text}{' '}
        {emoji && (
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            {emoji}
          </span>
        )}
      </h2>
    </button>
  );
};

export default CustomButton;
