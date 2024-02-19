import * as React from 'react';

type LetterBlockProps = {
  index: number;
  letter: string;
  color?: string;
  isEnterSubmitted?: boolean;
}

export const LetterBlock: React.FC<LetterBlockProps> = (props) => {
  const { index, letter, color, isEnterSubmitted } = props;

  let animationDelay = (Math.round(index * 0.2 * 10) / 10).toFixed(1);
  // ${isEnterSubmitted ? `[animation-delay:_${animationDelay}s] animate-flip` : "" }  // works only when 1.0
  return (
    <div 
      className={`
        flex w-12 h-12 border-4 rounded-md p-2 m-2 
        justify-center items-center font-sans font-bold text-3xl
        ${isEnterSubmitted ? `animate-flip` : "" } 
        ${color ? color : ""}
      `}
    > 
      <span>{letter}</span>
    </div>
  )
}