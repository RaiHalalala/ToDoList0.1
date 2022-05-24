import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Board as BoardType } from 'types/board';
import { useScreen } from 'hooks/useScreen';
//Components
import Star from 'components/Icons/Star';
import {
  Block,
  LinkContainer,
  Name,
  Description,
  Bottom,
  Buttons,
  animationFavorite,
  initialStateFavorite,
} from './styled';

interface CardProps extends BoardType {
  setFavorite: (id: number, is_favorite: boolean) => void;
  selectCard: () => void;
}

const Card: FC<CardProps> = ({
  id,
  name,
  colors,
  description,
  datecreated,
  is_favorite,
  selectCard,
  setFavorite,
}: CardProps) => {
  const { isMobile } = useScreen();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
    setFavorite(id, !isFavorite);
  };

  return (
    <Block
      colors={colors}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <LinkContainer to={{ pathname: `/${id}`, search: `?id=${id}` }}>
        <Name>{name}</Name>
        <Description dangerouslySetInnerHTML={{ __html: description }} />
        <Bottom>{datecreated}</Bottom>
      </LinkContainer>

      <Buttons>
        <button className="change" onClick={selectCard}>
          <img src="/static/images/pencil.png" alt="pencil" />
        </button>
        <motion.button
          className="star"
          onClick={handleFavorite}
          initial={isFavorite || isMobile ? initialStateFavorite : false}
          animate={!isFavorite && !isMobile && animationFavorite(isHovered)}>
          <Star className="icon" isActive={isFavorite} />
        </motion.button>
      </Buttons>
    </Block>
  );
};

export default Card;
