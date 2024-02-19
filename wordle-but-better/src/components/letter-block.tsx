import * as React from 'react';

type LetterBlockProps = {
  letter: string;
  color?: string;
}

export const LetterBlock: React.FC<LetterBlockProps> = (props) => {
  const { letter, color } = props;

  return (
    <div className={`flex w-12 h-12 border-4 rounded-md p-2 m-2 justify-center items-center font-sans font-bold text-3xl ${color ? color : ""}`}> 
      <span>{letter}</span>
    </div>
  )
}