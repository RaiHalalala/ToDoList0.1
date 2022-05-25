import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button, variantsForArrow } from './styled';

interface ArrowProps {
  isShow?: boolean;
  className?: string;
  children?: React.ReactNode;
  position?: 'vertical' | 'horizontal';
  onClick: () => void;
}

const Arrow: FC<ArrowProps> = ({
  onClick,
  children,
  className,
  isShow = true,
  position = 'vertical',
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
