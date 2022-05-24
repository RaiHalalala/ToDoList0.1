import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button, variantsForArrow } from './styled';

interface ArrowProps {
  isShow?: boolean;
  className?: string;
  position?: 'vertical' | 'horizontal';
  onClick: () => void;
  children?: React.ReactNode;
}

const Arrow: FC<ArrowProps> = ({
  isShow = true,
  onClick,
  position = 'vertical',
  className,
  children,
  ...params
}: ArrowProps) => (
  <Button
    onClick={onClick}
    className={className}
    isMargin={!!children}
    {...params}>
    <motion.img
      variants={variantsForArrow}
      initial="show"
      animate={isShow ? 'show' : 'hide'}
      className="arrow"
      src={`/static/images/arrow-${position}.svg`}
      alt="arrow"
    />
    {children}
  </Button>
);

export default Arrow;
