import { FC } from 'react';
import { Mode } from 'reducers/appSlice';

interface RadiusProps {
  mode?: Mode;
  className?: string;
}

const Radius: FC<RadiusProps> = ({
  mode = 'light',
  className = '',
}: RadiusProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1 1"
    className={className}>
    <path
      d="M16 16H0V0c1 7 9 16 16 16Z"
      transform="matrix(0 -.06112 .0611 0 0 1)"
      fill={mode === 'light' ? '#f3f3fb' : '#171f35'}
      stroke={mode === 'light' ? '#f3f3fb' : '#171f3'}
      strokeWidth="0.1"
    />
  </svg>
);

export default Radius;
