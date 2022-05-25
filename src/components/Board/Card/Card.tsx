import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Board as BoardType } from 'types/board';
import { useScreen } from 'hooks/useScreen';
//Components
import Star from 'components/Icons/Star';
import ButtonIcon from 'ui-kit/ButtonIcon';
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
  selectBoard: () => void;
  setFavoriteBoard: (id: number, is_favorite: boolean) => void;
}

const Card: FC<CardProps> = ({
  id,
  name,
  colors,
  description,
  datecreated,
  is_favorite,
  selectBoard,
  setFavoriteBoard,
}: CardProps) => {
  const { isMobile } = useScreen();
  const [isHovered, setHovered] = useState(false);
  const [isFavorite, setFavorite] = useState(is_favorite);
  const handleFavorite = () => {
    setFavorite((prev) => !prev);
    setFavoriteBoard(id, !isFavorite);
  };

  return (
    <Block
      colors={colors}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <LinkContainer to={{ pathname: `/${id}`, search: `?id=${id}` }}>
        <Name>{name}</Name>
        <Description dangerouslySetInnerHTML={{ __html: description }} />
        <Bottom>{datecreated}</Bottom>
      </LinkContainer>

      <Buttons>
        <ButtonIcon
          className="change"
          onClick={selectBoard}
          attrIcon={{
            src: '/static/images/pencil.png',
            alt: 'pencil',
            width: 'auto',
          }}
        />
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
