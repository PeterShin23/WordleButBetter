
type ResultCardProps = {
  result: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = (props) => {
  const { result } = props;

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border-4 rounded-3xl w-2/3 h-1/2">
        {result ? (
          <WinCard />
        ) : (
          <LossCard />
        )}
      </div>
    </div>
  )
}

const WinCard = () => {
  return <div className="flex justify-center items-center m-4">Win</div>
}

const LossCard = () => {
  return <div className="flex justify-center items-center m-4">Loss</div>
}

/**
 * - Win:
    - You got it! Your score is: {score}
    - user’s score gets compared to average of word’s score
    - This is how your score compares to everyone so far.
- Loss:
    - The correct word was…
    - Here’s a cookie, feel better and come try again tomorrow
 */